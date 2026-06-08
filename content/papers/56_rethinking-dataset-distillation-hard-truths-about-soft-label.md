# Rethinking Dataset Distillation: Hard Truths about Soft Labels

**Authors:** Priyam Dey ⋅ Aditya Sahdev ⋅ Sunny Bhati ⋅ Konda Reddy Mopuri ⋅ R. Venkatesh Babu

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

Despite the perceived success of large-scale dataset distillation (DD) methods, recent evidence \cite{qin2024a} finds that simple random image baselines perform on-par with state-of-the-art DD methods like SRe2L \cite{yin2024squeezerecoverrelabeldataset} due to the use of soft labels during downstream model training. This is in contrast with the findings in coreset literature, where high-quality coresets consistently outperform random subsets in the hard-label (HL) setting. To understand this discrepancy, we perform a detailed scalability analysis to examine the role of data quality under different label regimes, ranging from abundant soft labels (termed as SL+KD regime) to fixed soft labels (SL) and hard labels (HL). Our analysis reveals that high-quality coresets fail to convincingly outperform the random baseline in both SL and SL+KD regimes. In the SL+KD setting, performance further approaches near-optimal levels relative to the full dataset, regardless of subset size or quality, for a given compute budget. This performance saturation calls into question the widespread practice of using soft labels for model evaluation, where unlike the HL setting, subset quality has negligible influence. A subsequent systematic evaluation of five large-scale and four small-scale DD methods in the HL setting reveals that only RDED \cite{sun2024diversityrealismdistilleddataset} reliably outperforms random baselines on ImageNet-1K, but can still lag behind strong coreset methods due to its over-reliance on easy sample patches. Based on this, we introduce CAD-Prune, a compute-aware pruning metric that efficiently identifies samples of optimal difficulty for a given compute budget, and use it to develop CA2D, a compute-aligned DD method, outperforming current DD methods on ImageNet-1K at various IPC settings. Together, our findings uncover many insights into current DD research and establish useful tools to advance data-efficient learning for both coresets and DD. View full details
