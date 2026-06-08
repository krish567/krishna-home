# FINER: MLLMs Hallucinate under Fine-grained Negative Queries

**Authors:** Rui Xiao ⋅ Sanghwan Kim ⋅ Yongqin Xian ⋅ Zeynep Akata ⋅ Stephan Alaniz

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Multimodal large language models (MLLMs) struggle with hallucinations, particularly with fine-grained queries, a challenge underrepresented by existing benchmarks that focus on coarse image-related questions. We introduce **FI**ne-grained **NE**gative que**R**ies (**FINER**), alongside two benchmarks: **FINER-CompreCap** and **FINER-DOCCI**. Using FINER, we analyze hallucinations across four settings: multi-object, multi-attribute, multi-relation, and “what” questions. Our benchmarks reveal that MLLMs hallucinate when fine-grained mismatches co-occur with genuinely present elements in the image. To address this, we propose **FINER-Tuning**, leveraging Direct Preference Optimization (DPO) on FINER-inspired data. Finetuning four frontier MLLMs with FINER-Tuning yields up to 24.2% gains (InternVL3.5-14B) on hallucinations from our benchmarks, while simultaneously improving performance on eight existing hallucination suites, and enhancing general multimodal capabilities across six benchmarks. Benchmarks, training data, code and model checkpoints will be released. View full details
