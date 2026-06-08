# Thinking with Drafts: Speculative Temporal Reasoning for Efficient Long Video Understanding

**Authors:** Pengfei Hu ⋅ Meng Cao ⋅ Yingyao Wang ⋅ Yi Wang ⋅ Jiahua Dong ⋅ Jun Song ⋅ Cheng Yu ⋅ Bo Zheng ⋅ Xiaodan Liang

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Long video understanding is essential for human-like intelligence, enabling coherent perception and reasoning over extended temporal contexts. While the emerging thinking-with-frames paradigm—which alternates between global temporal reasoning and local frame examination—has advanced the reasoning capabilities of video multi-modal large language models (MLLMs), it suffers from a significant efficiency bottleneck due to the progressively growing and redundant multi-modal context. To address this, we propose SpecTemp, a reinforcement learning-based Speculative Temporal reasoning framework that decouples temporal perception from reasoning via a cooperative dual-model design. In SpecTemp, a lightweight draft MLLM rapidly explores and proposes salient frames from densely sampled temporal regions, while a powerful target MLLM focuses on temporal reasoning and verifies the draft’s proposals, iteratively refining its attention until convergence. This design mirrors the collaborative pathways of the human brain, balancing efficiency with accuracy. To support training, we construct the SpecTemp-80K dataset, featuring synchronized dual-level annotations for coarse evidence spans and fine-grained frame-level evidence. Experiments across multiple video understanding benchmarks demonstrate that SpecTemp not only maintains competitive accuracy but also significantly accelerates inference compared with existing thinking-with-frames methods. View full details
