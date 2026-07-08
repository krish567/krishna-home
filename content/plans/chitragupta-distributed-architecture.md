---
id: chitragupta-distributed-architecture
title: "Chitragupta distributed deployment — split RAG pipeline across VPS, HF Spaces, GPU server, and cloud LLM"
status: review
created: 2026-07-08
reviews:
  - date: 2026-07-08
    note: "Initial draft. Proposes splitting Chitragupta's monolithic 2-container setup into distributed components: VPS (API + indexer + LanceDB + query-time embedding), HF Spaces (batch corpus embedding), GPU server (cross-encoder reranking, future), cloud LLM API (answer generation). Bottlenecks and fallback strategies documented."
---

# Chitragupta Distributed Deployment Plan

## Context

Chitragupta is an on-prem RAG chat over documents — currently architected as 2 Docker containers (Ollama + FastAPI) on a single server. The VPS available (2 cores / 8GB RAM / no GPU) cannot run both containers simultaneously. This plan separates the pipeline into independently deployable components spread across multiple servers, then collates results locally on the VPS.

**Source code:** [github.com/krish567/Chitragupta](https://github.com/krish567/Chitragupta) (private)

---

## Current architecture (monolithic)

```
User → Web UI (port 8000)
         ↓
    FastAPI (api container)
      ├─ Chat (SSE streaming)
      ├─ Retriever (LanceDB + FTS5)
      ├─ Indexer (chunker, parser, embedder)
      └─ Admin/Setup
         ↓
    Ollama (ollama container, port 11434)
      ├─ Chat model (qwen2.5)
      └─ Embedding model (bge-m3)
```

Everything on one box. No separation.

---

## Proposed distributed architecture

```
INDEXING (batch, overnight or on-demand):
  Documents → [Parser + Chunker @ VPS] → chunks
  Chunks → [Embedder @ HF Space] → vectors (bge-m3, dim 1024)
  Vectors → [LanceDB @ VPS] (stored locally)

QUERY (real-time):
  User query → [Query embedder @ VPS] (bge-m3, CPU, ~300ms)
  Embedded query → [LanceDB vector search @ VPS] + [FTS5 sparse search @ VPS] → top-K
  Top-K → [Cross-encoder reranker @ GPU server] (if available) → top-N
  Top-N + query → [Cloud LLM API] → SSE stream → [FastAPI @ VPS] → User
```

### Component map

| Component | Where | Hardware | When |
|---|---|---|---|
| FastAPI + Web UI | VPS | 2 cores, 8GB | Always on |
| Parser + Chunker | VPS | CPU | Batch (indexing) |
| LanceDB (vectors) | VPS | Disk | Always on |
| SQLite + FTS5 (metadata) | VPS | Disk | Always on |
| Corpus embedder (batch) | HF Space | Free tier CPU | Overnight batch |
| Query embedder (real-time) | VPS | CPU | Per query |
| Cross-encoder reranker | GPU server (future) | NVIDIA GPU | Per query (when available) |
| Chat LLM | Cloud API | N/A | Per query |

### What gets removed

- **Ollama container** — replaced by cloud LLM API (chat) + local bge-m3 (query embedding) + HF Space (batch embedding)
- **GPU-only reranker** — moved to separate GPU server, with fallback to skip

### What stays on VPS

- FastAPI backend (chat, retrieval, admin, setup, git sync)
- Indexer pipeline (chunker, parser, resolver, attachments parser)
- LanceDB vector store
- SQLite + FTS5 metadata store
- Web UI (React + Vite, served statically by FastAPI)
- bge-m3 model for query-time embedding only (loaded on demand)

### What's new

- **Cloud LLM client** — replaces Ollama chat. SSE proxy from cloud API → FastAPI → user
- **Batch embedding service** — HF Space that accepts chunks, returns vectors. Resumable with checkpoints
- **Query embedding service** — local bge-m3 on VPS, loaded/unloaded per query to manage RAM
- **Reranker client** — HTTP call to GPU server if available, graceful fallback if not
- **Embedding pipeline orchestrator** — coordinates VPS → HF Space → VPS for batch indexing

---

## Detailed component design

### 1. Cloud LLM client (replaces Ollama chat)

**Purpose:** Stream chat completions from a cloud API through FastAPI to the user.

**Design:**
- New module: `services/api/llm_client.py`
- Supports OpenAI-compatible API (works with OpenAI, Anthropic via proxy, Ollama Cloud, etc.)
- API key stored in `.env` or `data/wizard.env`
- SSE proxy: cloud API streams tokens → FastAPI relays to user via existing SSE chat endpoint
- System prompt + retrieved context (top-N chunks) sent as prompt context

**Config (app_settings, hot-reloadable):**
- `llm_provider`: `openai` | `anthropic` | `ollama_cloud` | `custom`
- `llm_model`: model name (e.g. `gpt-4o-mini`, `claude-sonnet-4-20250514`)
- `llm_api_base`: base URL (default per provider)
- `llm_api_key`: stored in `.env`, not SQLite
- `llm_temperature`: 0.0–1.0
- `llm_max_tokens`: max response length

**Bottleneck:** Network latency to cloud API. First-token latency ~500-2000ms depending on provider. Streaming mitigates perceived latency.

**Decision needed:** Which cloud LLM provider? Options:
- OpenAI (gpt-4o-mini — cheap, fast, good quality)
- Anthropic (Claude Haiku — cheap, fast)
- Ollama Cloud (if it supports external API calls)
- Gemini (free tier generous)

### 2. Batch embedding service (HF Space)

**Purpose:** Embed thousands of document chunks using bge-m3. Runs on HF Spaces free tier.

**Design:**
- Custom HF Space: Docker SDK, FastAPI endpoint
- Endpoint: `POST /embed` — accepts list of text chunks, returns list of vectors (dim 1024)
- Uses `sentence-transformers` or direct `FlagEmbedding` to load bge-m3
- Resumable: accepts `batch_id` + `offset` → processes N chunks → returns vectors + next offset
- If Space dies mid-batch, VPS orchestrator retries from last checkpoint

**Orchestration (VPS side):**
- New module: `services/indexer/embed_pipeline.py`
- Flow: chunk all docs → upload chunks in batches to HF Space → receive vectors → write to LanceDB
- Checkpoint after every batch (store offset in SQLite)
- If HF Space is cold (sleeping), wake it first (HTTP ping), wait for ready, then start

**Bottleneck:** HF Spaces free tier:
- Spaces sleep after 48h inactivity → 30-60s cold start
- Rate limits on free tier
- Space can be killed by HF at any time
- bge-m3 on CPU (2 vCPU free tier) ~ slow for large corpora

**Mitigation:**
- Checkpoint after every batch of ~50-100 chunks
- Retry logic with exponential backoff
- Optional: pin the Space with a cron heartbeat (debated — may violate HF ToS)

**Alternative:** Use HF Inference API (serverless) for batch embedding instead of a custom Space. No cold starts, but rate-limited and costs credits above free tier.

**Decision needed:** Custom HF Space vs HF Inference API for batch embedding?

### 3. Query-time embedding service (VPS, local)

**Purpose:** Embed the user's query in real-time for vector search. Must use same model as batch embedding (bge-m3, dim 1024).

**Design:**
- New module: `services/api/query_embedder.py`
- Loads bge-m3 on first query, keeps in memory if RAM allows, unloads after idle timeout
- On 2 cores: single query embedding ~200-500ms (short text, one forward pass)
- If RAM pressured: use `bge-small-en-v1.5` (~130MB, dim 384) — but corpus must also use same model. Can't mix.

**RAM budget on VPS (8GB total):**

| Component | Est. RAM |
|---|---|
| Hermes + existing services | ~2-3GB |
| FastAPI + indexer | ~200-500MB |
| LanceDB (in-process) | ~100-300MB |
| SQLite + FTS5 | ~50MB |
| bge-m3 loaded | ~2.2GB |
| **Total** | **~5-6GB** |

Tight but workable. bge-m3 loaded on demand (first query), kept for subsequent queries, unloaded after 10min idle.

**Bottleneck:** 2-core CPU. First query after idle → model load ~3-5s. Subsequent queries ~300ms. If Hermes is under heavy load, contention.

**Fallback:** If bge-m3 can't fit in RAM alongside everything else, use `bge-small-en-v1.5` (130MB, dim 384). Trade-off: lower quality embeddings, but fits comfortably. Corpus must be re-embedded with same model.

**Decision needed:** bge-m3 (2.2GB, best quality) vs bge-small (130MB, lower quality, comfortable RAM)?

### 4. Cross-encoder reranker (GPU server, future)

**Purpose:** Re-rank top-K results from vector+sparse search using a cross-encoder model for better relevance.

**Design:**
- GPU server runs a lightweight HTTP service: `POST /rerank` — accepts query + list of (doc_id, text) pairs → returns re-ranked list with scores
- Uses `cross-encoder/ms-marco-MiniLM-L-6-v2` or similar
- VPS calls this endpoint after LanceDB retrieval, before LLM generation
- If GPU server is down: skip reranking, use LanceDB top-K as-is (graceful fallback)

**Config (app_settings):**
- `reranker_enabled`: bool (auto-disabled if server unreachable)
- `reranker_url`: GPU server endpoint
- `reranker_model`: model name
- `reranker_timeout`: seconds (default 5, skip on timeout)

**Bottleneck:** GPU server availability. If it's not always on, every query needs a health check + fallback. Network latency ~200-500ms for the rerank call.

**Fallback strategy:**
- Health check with 500ms timeout before each rerank call
- If unreachable: skip rerank, log warning, use raw LanceDB top-K
- Auto-retry reranker every 5min to detect when it comes back online

**Not blocking for v1.** Reranker is optional quality improvement. Ship without it first, add GPU server when available.

### 5. Embedding pipeline orchestrator (VPS)

**Purpose:** Coordinate batch indexing across VPS → HF Space → VPS.

**Design:**
- New module: `services/indexer/embed_pipeline.py`
- Flow:
  1. Parse + chunk all docs (local on VPS)
  2. Check if HF Space is warm (HTTP health check)
  3. If cold, ping to wake, poll until ready (max 120s)
  4. Send chunks in batches of 50-100 to `POST /embed`
  5. Receive vectors, write to LanceDB immediately
  6. Checkpoint: store `batch_id` + `offset` in SQLite after each batch
  7. If Space dies mid-batch: retry from last checkpoint (exponential backoff)
  8. After all chunks embedded: update FTS5 index, mark indexing complete
- CLI: `chitragupta-index embed --vault /path --remote https://hf-space-url`
- Can run overnight via cron or manual trigger

**Checkpoint schema (SQLite):**
```sql
CREATE TABLE embed_checkpoints (
  batch_id TEXT PRIMARY KEY,
  source_path TEXT,
  chunk_offset INTEGER,
  total_chunks INTEGER,
  status TEXT,  -- pending | in_progress | complete | failed
  created_at TEXT,
  updated_at TEXT
);
```

---

## Implementation phases

### Phase 1: Cloud LLM integration (replace Ollama chat)
**Goal:** Get chat working with cloud LLM API, no local LLM needed.

**Tasks:**
1. Create `services/api/llm_client.py` — cloud LLM API client (OpenAI-compatible)
2. Add LLM config to `app_settings` (provider, model, api_base, temperature, max_tokens)
3. Modify `services/api/chat.py` — replace Ollama chat call with `llm_client.generate()`
4. SSE proxy: stream cloud API tokens through FastAPI to user
5. Add LLM provider settings to setup wizard (step 3: instead of Ollama model picker, enter cloud API details)
6. Update config test: replace `chat_completion_roundtrip` check to use cloud API
7. Test end-to-end with a real cloud LLM (e.g. OpenAI gpt-4o-mini)

**Files changed:** `chat.py`, `settings_store.py`, `setup.py`, new `llm_client.py`, wizard UI
**Removes:** Ollama dependency for chat model

### Phase 2: Query-time embedding on VPS (replace Ollama embeddings)
**Goal:** Embed queries locally without Ollama.

**Tasks:**
1. Create `services/api/query_embedder.py` — load bge-m3 via `sentence-transformers`, embed single query
2. Modify `services/api/retriever.py` — replace Ollama embedding call with `query_embedder.embed()`
3. RAM management: lazy-load model, unload after idle timeout (10min)
4. Add embedding model config to `app_settings` (model name, dim — locked to 1024 for bge-m3)
5. Update config test: replace `embedding_roundtrip` check to use local embedder
6. Test: query → embed → LanceDB search → results

**Files changed:** `retriever.py`, `settings_store.py`, new `query_embedder.py`
**Removes:** Ollama dependency for query embedding

### Phase 3: Batch embedding on HF Space (corpus indexing)
**Goal:** Index large corpora without running embeddings on VPS.

**Tasks:**
1. Create HF Space: `hf-spaces/chitragupta-embedder/` — Dockerfile + FastAPI app
   - `POST /embed` — batch embed chunks, return vectors
   - `GET /health` — readiness check
   - bge-m3 loaded on startup
2. Create `services/indexer/embed_pipeline.py` — orchestrator
   - Chunk docs → batch send to HF Space → receive vectors → write LanceDB
   - Checkpoint/resume logic
   - Wake cold Space, retry on failure
3. Add CLI: `chitragupta-index embed --vault /path --remote <hf-space-url>`
4. Add admin UI: trigger batch embedding, show progress
5. Test: index 100 docs via HF Space → verify LanceDB has vectors → query returns correct results

**Files changed:** new `embed_pipeline.py`, new `hf-spaces/chitragupta-embedder/`, CLI `cli.py`, admin UI
**Removes:** Ollama dependency for batch embedding

### Phase 4: Remove Ollama container entirely
**Goal:** Clean cut — no Ollama anywhere.

**Tasks:**
1. Remove `ollama` service from `docker-compose.yml` and `docker-compose.gpu.yml`
2. Remove Ollama health checks from setup wizard + config test
3. Update `install.sh` — no Ollama data path, no model pull step
4. Update README + SETUP.md — architecture changed, no Ollama container
5. Update `pyproject.toml` — add `sentence-transformers`, `httpx` deps; remove Ollama-related deps
6. Single-container deployment: only `api` container (or even no Docker — direct Python)

**Files changed:** `docker-compose*.yml`, `install.sh`, `README.md`, `SETUP.md`, `pyproject.toml`

### Phase 5: Reranker on GPU server (future, when GPU available)
**Goal:** Add cross-encoder reranking as optional quality boost.

**Tasks:**
1. Create GPU server service: `gpu-server/reranker/` — FastAPI + cross-encoder model
   - `POST /rerank` — query + docs → re-ranked docs with scores
   - `GET /health` — readiness check
2. Create `services/api/reranker_client.py` — HTTP client with health check + fallback
3. Modify `services/api/retriever.py` — after LanceDB top-K, call reranker if enabled
4. Add reranker config to `app_settings` (enabled, url, model, timeout)
5. Fallback: if reranker unreachable, use raw LanceDB top-K (log warning)
6. Auto-retry: background thread pings reranker every 5min, re-enables when back
7. Test: query with reranker → compare results quality vs without

**Files changed:** `retriever.py`, `settings_store.py`, new `reranker_client.py`, new `gpu-server/reranker/`

---

## Bottlenecks and risks

### 1. Query-time embedding latency (MEDIUM)
- bge-m3 on 2 cores: ~200-500ms per query
- First query after idle: +3-5s model load
- **Mitigation:** Keep model loaded if RAM allows; use smaller model if not

### 2. VPS RAM pressure (HIGH)
- 8GB total, ~2-3GB for Hermes + existing, ~2.2GB for bge-m3
- Leaves ~3GB for everything else — tight
- **Mitigation:** Idle-unload bge-m3 after 10min. Or use bge-small (130MB). Monitor with `free -h`.

### 3. HF Space reliability for batch indexing (MEDIUM)
- Free Spaces can be killed, sleep after 48h, rate-limited
- Large corpus = long batch job = higher chance of interruption
- **Mitigation:** Checkpoint every 50-100 chunks. Retry with backoff. Resumable from last checkpoint.

### 4. Network latency stack (MEDIUM)
- Query path: embed (local ~300ms) → LanceDB (local ~50ms) → rerank (remote ~300ms) → cloud LLM (~500-2000ms)
- Total: ~1-3s before first token
- **Mitigation:** Streaming from cloud LLM. Skip reranker if unavailable. Cache common queries.

### 5. Embedding model consistency (CRITICAL)
- Corpus and queries must use same embedding model + dim
- If we switch models, entire corpus must be re-embedded
- **Mitigation:** Lock model in config. Version the index. If model changes, trigger full re-embed.

### 6. Cloud LLM API dependency (LOW)
- If API is down, chat is down. No local fallback.
- **Mitigation:** Optional: keep a tiny local model (qwen2.5:0.5b) as emergency fallback. Or just accept downtime.

### 7. Cold start for HF Space (LOW)
- 30-60s to wake a sleeping Space
- **Mitigation:** Wake before batch job. Not relevant for query path (batch only).

---

## Open decisions

1. **Cloud LLM provider** — OpenAI, Anthropic, Gemini, Ollama Cloud, or other?
2. **Embedding model** — bge-m3 (2.2GB, best quality, tight RAM) vs bge-small (130MB, lower quality, comfortable)?
3. **Batch embedding** — Custom HF Space vs HF Inference API (serverless)?
4. **Reranker timeline** — Phase 5 deferred until GPU server available. Which reranker model?
5. **Single container vs no Docker** — After removing Ollama, is Docker still needed? Could run FastAPI directly on VPS with systemd.
6. **Emergency LLM fallback** — Keep tiny local model for when cloud API is down, or accept downtime?

---

## Success criteria

- [ ] Chat works end-to-end with cloud LLM, no Ollama running
- [ ] Query embedding runs locally on VPS within 500ms
- [ ] Batch corpus indexing via HF Space completes for 100+ docs with checkpoint/resume
- [ ] VPS RAM stays under 6GB with bge-m3 loaded
- [ ] Reranker gracefully skips when GPU server unavailable
- [ ] Total query latency (embed → search → rerank → LLM first token) under 3s
- [ ] No data leaves VPS except: chunks sent to HF Space (batch), query+context sent to cloud LLM