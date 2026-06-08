# ViT^3: Unlocking Test-Time Training in Vision

**Authors:** Dongchen Han ⋅ Yining Li ⋅ Tianyu Li ⋅ Zixuan Cao ⋅ Ziming Wang ⋅ Jun Song ⋅ Cheng Yu ⋅ Bo Zheng ⋅ Gao Huang

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

Test-Time Training (TTT) has recently emerged as a promising direction for efficient sequence modeling. TTT reformulates attention operation as an online learning problem, constructing a compact inner model from key–value pairs at test time. This reformulation opens a rich and flexible design space while achieving linear computational complexity. However, crafting a powerful visual TTT design remains challenging: fundamental choices for the inner module and inner training lack comprehensive understanding and practical guidelines. To bridge this critical gap, in this paper, we present a systematic empirical study of TTT designs for visual sequence modeling. From a series of experiments and analyses, we distill six practical insights that establish design principles for effective visual TTT and illuminate paths for future improvement. These findings culminate in the Vision Test-Time Training (ViT 3 ) model, a pure TTT architecture that achieves linear complexity and parallelizable computation. We evaluate ViT 3 across diverse visual tasks, including image classification, image generation, object detection, and semantic segmentation. Results show that ViT 3 consistently matches or outperforms advanced linear-complexity models (e.g., Mamba and linear attention variants) and effectively narrows the gap to highly optimized vision Transformers. We hope this study and the ViT 3 baseline can facilitate future work on visual TTT models. Code will be released. View full details
