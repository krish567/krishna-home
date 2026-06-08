# Molmo2: Open Weights and Data for Vision-Language Models with Video Understanding and Grounding

**Authors:** Christopher Clark ⋅ Jieyu Zhang ⋅ Zixian Ma ⋅ Jae Sung Park ⋅ Rohun Tripathi ⋅ Sangho Lee ⋅ Reza Salehi ⋅ Jason Ren ⋅ Chris Dongjoo Kim ⋅ Yinuo Yang ⋅ Vincent Shao ⋅ Yue Yang ⋅ Weikai Huang ⋅ Ziqi Gao ⋅ Taira Anderson ⋅ Jianrui Zhang ⋅ Jitesh Jain ⋅ George Stoica ⋅ Ali Farhadi ⋅ Ranjay Krishna

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Today’s strongest video-language models (VLMs) remain proprietary.The strongest open-weight models either rely on synthetic data from proprietary VLMs, effectively distilling from them, or do not disclose their training data or recipe.As a result, the open-source community lacks the foundations needed to improve on the state-of-the-art video (and image) language models.Crucially, many downstream applications require more than just high-level video understanding; they require grounding—either by pointing or by tracking in pixels. Even proprietary models lack this capability.We present Molmo2, a new family of VLMs that are state-of-the-art amongst open-source models and demonstrate exceptional new capabilities in point-driven grounding in single image, multi-image, and video tasks.Our key contribution is a collection of 7 new video datasets and 2 multi-image datasets, including a dataset of highly detailed video captions for pre-training, a free-form video Q&A dataset for fine-tuning, a new object tracking dataset with complex queries, and an innovative new video pointing dataset, all collected without the use of closed VLMs.We also present a training recipe for this data utilizing an efficient packing and message-tree encoding scheme and show bi-directional attention on vision tokens and a novel token-weight strategy improve performance. Our best-in-class 8B model outperforms others in the class of open weight and data models on short videos, counting, and captioning, and is competitive on long-videos. On video-grounding Molmo2 outperforms larger proprietary models, including 32.9% (Molmo2) vs 17% (Gemini 2.5 Pro) on video pointing. View full details
