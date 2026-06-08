"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────
export type AbstractPaper = {
  slug: string;
  title: string;
  authors: string;
  date: string;
  location?: string;
  type?: string;
  abstract: string; // raw abstract text (one or more sentences)
  sourceUrl?: string;
};

type Sentence = { idx: number; text: string; tag: SentenceTag };
type SentenceTag =
  | "problem"
  | "context"
  | "gap"
  | "method"
  | "contribution"
  | "result"
  | "release"
  | "neutral";

const TAG_META: Record<
  SentenceTag,
  { label: string; color: string; icon: string }
> = {
  problem:   { label: "Problem",     color: "#f87171", icon: "⚠" },
  context:   { label: "Context",     color: "#60a5fa", icon: "◉" },
  gap:       { label: "Gap",         color: "#fbbf24", icon: "△" },
  method:    { label: "Method",      color: "#a78bfa", icon: "⚙" },
  contribution: { label: "Contribution", color: "#34d399", icon: "✦" },
  result:    { label: "Result",      color: "#22d3ee", icon: "∑" },
  release:   { label: "Release",     color: "#f472b6", icon: "↗" },
  neutral:   { label: "Note",        color: "#94a3b8", icon: "•" },
};

// ─── Abstract → sentence classifier (heuristic, extractive) ─────────────
function splitSentences(abstract: string): string[] {
  return abstract
    .replace(/\s+/g, " ")
    .replace(/View full details\s*$/i, "")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .filter((s) => s.length > 0);
}

function classifySentence(s: string): SentenceTag {
  const lower = s.toLowerCase();
  if (/\b(we release|publicly available|code is available|dataset is available|will be released|github\.com)\b/.test(lower)) return "release";
  if (/\b(experiments show|demonstrate|achieve|outperform|state-of-the-art|state of the art|results show|we show|we find|highlighting)\b/.test(lower)) return "result";
  if (/\b(we propose|we introduce|we present|we develop|we design|we build|novel|our approach|our method|our framework|our model|our system|adopt|utilize|leverage|fine-?tune)\b/.test(lower)) return "method";
  if (/\b(we contribute|our contribution|main contribution|first|we release|dataset .* exceeding|introducing|introduce)\b/.test(lower)) return "contribution";
  if (/\b(however|unlike|existing|prior work|previous|fail to|struggle|gap|limitation|limited|missing|lack of)\b/.test(lower)) return "gap";
  if (/\b(challenge|problem|difficult|remains|hard to|vulnerable|fails?|violate|break)\b/.test(lower)) return "problem";
  if (/\b(recent|have achieved|has become|play a key role|wide range|widespread)\b/.test(lower)) return "context";
  return "neutral";
}

// Pull out a few notable numbers / proper nouns from a sentence
function extractHighlights(s: string): string[] {
  const out: string[] = [];
  // Big numbers: "22 TB", "100,000", "7 million", "10,000+"
  const nums = s.match(/\b[\d.,]+\s*(?:TB|GB|MB|K|M|B|tb|gb|mb|million|billion|thousand|%)?\+?\b/g) || [];
  for (const n of nums.slice(0, 3)) {
    if (n.length > 1) out.push(n.trim());
  }
  // Quoted or bracketed terms
  const quoted = s.match(/"([^"]{2,30})"|'([^']{2,30})'/g) || [];
  for (const q of quoted.slice(0, 2)) out.push(q.replace(/['"]/g, ""));
  return Array.from(new Set(out)).slice(0, 4);
}

function analyzeAbstract(abstract: string): Sentence[] {
  const sents = splitSentences(abstract);
  return sents.map((text, idx) => ({
    idx,
    text,
    tag: classifySentence(text),
  }));
}

// ─── Animation primitives ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────
function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center backdrop-blur">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}

function SentenceCard({ s, accent }: { s: Sentence; accent: string }) {
  const meta = TAG_META[s.tag];
  const highlights = extractHighlights(s.text);
  return (
    <Reveal delay={s.idx * 60}>
      <div
        className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur transition hover:border-white/30 hover:bg-slate-900/80"
        style={{
          boxShadow: `inset 0 0 0 1px ${meta.color}10`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-black"
            style={{ background: `${meta.color}25`, color: meta.color }}
          >
            {meta.icon}
          </span>
          <span
            className="text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ color: meta.color }}
          >
            {meta.label} · sentence {s.idx + 1}
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-100">
          {highlightSentence(s.text, highlights, meta.color)}
        </p>
        {highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {highlights.map((h, i) => (
              <span
                key={i}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-mono"
                style={{
                  background: `${accent}15`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function highlightSentence(text: string, highlights: string[], color: string) {
  if (highlights.length === 0) return text;
  const pattern = new RegExp(
    `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);
  return parts.map((p, i) =>
    highlights.includes(p) ? (
      <span
        key={i}
        className="font-semibold"
        style={{ color, textShadow: `0 0 12px ${color}60` }}
      >
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function TagLegend({ counts }: { counts: Record<SentenceTag, number> }) {
  const present = (Object.keys(TAG_META) as SentenceTag[]).filter(
    (k) => counts[k] > 0
  );
  return (
    <div className="flex flex-wrap gap-2">
      {present.map((k) => {
        const m = TAG_META[k];
        return (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium"
            style={{
              borderColor: `${m.color}50`,
              color: m.color,
              background: `${m.color}10`,
            }}
          >
            <span>{m.icon}</span>
            {m.label}
            <span className="text-slate-500">·{counts[k]}</span>
          </span>
        );
      })}
    </div>
  );
}

// ─── Main canvas ────────────────────────────────────────────────────────
export default function AbstractCanvas({ data }: { data: AbstractPaper }) {
  const sentences = useMemo(() => analyzeAbstract(data.abstract), [data.abstract]);
  const counts = useMemo(() => {
    const c: Record<SentenceTag, number> = {
      problem: 0, context: 0, gap: 0, method: 0,
      contribution: 0, result: 0, release: 0, neutral: 0,
    };
    for (const s of sentences) c[s.tag]++;
    return c;
  }, [sentences]);

  const accent = pickAccent(sentences, data.title);
  const wordCount = data.abstract.split(/\s+/).filter(Boolean).length;
  const firstSentence = sentences[0]?.text ?? data.abstract;
  const lastSentence = sentences[sentences.length - 1]?.text ?? "";

  // Sticky nav
  const sections = [
    { id: "hero", label: "Overview" },
    { id: "abstract", label: "Abstract Flow" },
    { id: "entities", label: "Entities" },
    { id: "full", label: "Full Text" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) idx = i;
      }
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* Ambient bg */}
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(60% 50% at 20% 10%, ${accent}22 0%, transparent 60%),
            radial-gradient(50% 40% at 80% 30%, #8b5cf622 0%, transparent 60%),
            radial-gradient(40% 30% at 50% 80%, #ec489918 0%, transparent 60%)
          `,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Sticky nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <span
            className="text-[11px] font-black tracking-widest"
            style={{ color: accent }}
          >
            ABSTRACT · CANVAS
          </span>
          <span className="text-slate-600">/</span>
          <div className="flex flex-1 gap-1 overflow-x-auto">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() =>
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="whitespace-nowrap rounded-full px-3 py-1 text-xs transition"
                style={{
                  background: active === i ? accent : "transparent",
                  color: active === i ? "#0b1020" : "#94a3b8",
                  fontWeight: active === i ? 700 : 500,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative flex min-h-[88vh] flex-col justify-center px-4 pt-24 pb-16"
      >
        <div className="relative z-10 mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {data.type && (
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest"
                  style={{ borderColor: `${accent}50`, color: accent }}
                >
                  {data.type}
                </span>
              )}
              {data.date && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-300">
                  {data.date}
                </span>
              )}
              {data.location && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-300">
                  {data.location}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="text-3xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${accent} 60%, #ffffff 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.title}
            </h1>
          </Reveal>

          {data.authors && (
            <Reveal delay={140}>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
                {data.authors}
              </p>
            </Reveal>
          )}

          <Reveal delay={220}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <HeroStat value={`${sentences.length}`} label="Sentences" />
              <HeroStat value={`${wordCount}`} label="Words" />
              <HeroStat value={`${counts.problem + counts.gap}`} label="Problem/Gap" />
              <HeroStat value={`${counts.method + counts.contribution}`} label="Method" />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div
                className="text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                First sentence
              </div>
              <p className="mt-2 text-base leading-relaxed text-slate-100">
                {firstSentence}
              </p>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-12 flex items-center gap-2 text-slate-500">
              <span className="text-xs">scroll to explore the abstract</span>
              <span className="inline-block animate-bounce">↓</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ABSTRACT FLOW ─── */}
      <section
        id="abstract"
        className="relative z-10 mx-auto max-w-5xl px-4 py-20"
      >
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="inline-block h-8 w-1 rounded-full"
              style={{ background: accent }}
            />
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              Abstract, sentence by sentence
            </h2>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-slate-400">
            Each sentence from the abstract, classified by its rhetorical role.
            Colors and icons are heuristic — read the sentence for the actual claim.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-8">
            <TagLegend counts={counts} />
          </div>
        </Reveal>

        <div className="space-y-4">
          {sentences.map((s) => (
            <SentenceCard key={s.idx} s={s} accent={accent} />
          ))}
        </div>

        {lastSentence && lastSentence !== firstSentence && (
          <Reveal delay={200}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div
                className="text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Last sentence
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                {lastSentence}
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ─── ENTITIES ─── */}
      <section
        id="entities"
        className="relative z-10 mx-auto max-w-5xl px-4 py-20"
      >
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="inline-block h-8 w-1 rounded-full"
              style={{ background: accent }}
            />
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              What the abstract mentions
            </h2>
          </div>
          <p className="mb-10 max-w-2xl text-sm text-slate-400">
            Numbers, dataset sizes, and named entities lifted directly from the
            abstract text. Nothing here is invented.
          </p>
        </Reveal>

        <EntityGrid abstract={data.abstract} accent={accent} />
      </section>

      {/* ─── FULL TEXT ─── */}
      <section
        id="full"
        className="relative z-10 mx-auto max-w-3xl px-4 py-20"
      >
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="inline-block h-8 w-1 rounded-full"
              style={{ background: accent }}
            />
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              Full abstract
            </h2>
          </div>
          <p className="mb-6 text-sm text-slate-400">
            Verbatim from the source markdown. Read the paper for the real
            methodology and experiments — this canvas only visualizes what is
            in the abstract.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 font-serif text-[15px] leading-[1.85] text-slate-200"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {data.abstract.replace(/View full details\s*$/i, "").trim()}
          </div>
        </Reveal>

        {data.sourceUrl && (
          <Reveal delay={160}>
            <div className="mt-6 text-center">
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200 transition hover:border-white/30"
              >
                Source ↗
              </a>
            </div>
          </Reveal>
        )}
      </section>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-[11px] text-slate-500">
        <p>
          Built from the abstract only. No paper body, methodology, or results
          have been inferred.
        </p>
        <p className="mt-1">
          {data.title} · {data.authors?.split(" ⋅ ")[0] ?? ""} et al.
        </p>
      </footer>
    </div>
  );
}

// ─── Entity extraction (numbers + capitalized phrases) ──────────────────
function EntityGrid({ abstract, accent }: { abstract: string; accent: string }) {
  // Pull numeric/quantitative entities
  const NUM_RE =
    /\b(\d[\d,]*(?:\.\d+)?\s*(?:TB|GB|MB|KB|MB|M\b|million|billion|thousand|x|\+)?)\b/gi;
  const numbers = Array.from(new Set((abstract.match(NUM_RE) || []).map((n) => n.trim()))).slice(0, 12);

  // Pull capitalized multi-word phrases (likely proper nouns / methods / datasets)
  const CAP_RE = /\b([A-Z][A-Za-z0-9-]{2,}(?:\s+[A-Z][A-Za-z0-9-]{2,}){0,3})\b/g;
  const candidates = (abstract.match(CAP_RE) || [])
    .filter((p) => !/^(The|This|That|These|Those|We|In|On|For|From|To|Of|And|Or|But|Through|With|Our|Its|It|They|Their|There|Here|However|Unlike|Existing|Recent|Extensive|State-of-the-art|SOTA)\b/.test(p))
    .filter((p) => p.length < 60);
  const capCounts = new Map<string, number>();
  for (const c of candidates) capCounts.set(c, (capCounts.get(c) || 0) + 1);
  const properNouns = Array.from(capCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([k]) => k);

  const hasAny = numbers.length > 0 || properNouns.length > 0;

  if (!hasAny) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-400">
          The abstract doesn&apos;t contain any explicit numbers or proper
          nouns to extract.
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {numbers.length > 0 && (
        <Reveal>
          <div
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: `${accent}08` }}
          >
            <div
              className="mb-3 text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Numbers & quantities
            </div>
            <div className="flex flex-wrap gap-2">
              {numbers.map((n, i) => (
                <span
                  key={i}
                  className="rounded-md border border-white/10 bg-slate-900/60 px-3 py-1.5 font-mono text-sm text-white"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {properNouns.length > 0 && (
        <Reveal delay={80}>
          <div
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: `${accent}08` }}
          >
            <div
              className="mb-3 text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Named entities
            </div>
            <div className="flex flex-wrap gap-2">
              {properNouns.map((p, i) => (
                <span
                  key={i}
                  className="rounded-md border border-white/10 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-100"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}

// ─── Accent picker from title keywords ──────────────────────────────────
function pickAccent(sentences: Sentence[], title: string): string {
  const t = title.toLowerCase();
  if (/security|adversar|jailbreak|attack|privacy|defense|robust/.test(t)) return "#f87171";
  if (/3d|reconstruction|gaussian|nerf|depth|pose|geometry/.test(t)) return "#60a5fa";
  if (/video|motion|action|temporal|scene|tracking/.test(t)) return "#a78bfa";
  if (/segment|detect|segmentation|grounding|open.?vocab/.test(t)) return "#34d399";
  if (/language|llm|vlm|vision.?language|caption|reasoning|knowledge/.test(t)) return "#22d3ee";
  if (/image|generation|diffusion|style|synthesis|editing/.test(t)) return "#f472b6";
  if (/dataset|benchmark|survey|evaluation|metric/.test(t)) return "#fbbf24";
  if (/medical|clinical|health|biology|cell|tissue/.test(t)) return "#10b981";
  if (/autonomous|driving|robot|navigation|policy|agent|reinforce/.test(t)) return "#fb923c";
  if (/audio|speech|sound|music/.test(t)) return "#c084fc";
  // Fallback: from tag distribution
  const c: Record<string, number> = {};
  for (const s of sentences) c[s.tag] = (c[s.tag] || 0) + 1;
  const top = Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (top && top in TAG_META) return TAG_META[top as SentenceTag].color;
  return "#60a5fa";
}
