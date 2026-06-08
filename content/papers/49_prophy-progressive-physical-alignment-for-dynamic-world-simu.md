# ProPhy: Progressive Physical Alignment for Dynamic World Simulation

**Authors:** Zijun Wang ⋅ Panwen Hu ⋅ Jing Wang ⋅ Terry Jingchen Zhang ⋅ Yuhao Cheng ⋅ Long Chen ⋅ Yiqiang Yan ⋅ Zutao Jiang ⋅ Hanhui Li ⋅ Xiaodan Liang

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Recent advances in video generation have shown remarkable potential for constructing world simulators. However, current models still struggle to produce physically consistent results, particularly when handling large-scale or complex dynamics. This limitation arises primarily because existing approaches respond isotropically to physical prompts and neglect the fine-grained alignment between generated content and localized physical cues. To address these challenges, we propose ProPhy, a Progressive Physical Alignment Framework that enables explicit physics-aware conditioning and anisotropic generation. ProPhy employs a two-stage Mixture-of-Physics-Experts (MoPE) mechanism for discriminative physical prior extraction, where Semantic Experts infer semantic-level physical principles from textual descriptions, and Refinement Experts capture token-level physical dynamics. This mechanism allows the model to learn fine-grained, physics-aware video representations that better reflect underlying physical laws. Furthermore, we introduce a physical alignment strategy that transfers the physical reasoning capabilities of vision-language models (VLMs) into the Refinement Experts, facilitating a more accurate representation of dynamic physical phenomena. Extensive experiments on physics-aware video generation benchmarks demonstrate that ProPhy produces more realistic, dynamic, and physically coherent results than existing state-of-the-art methods. View full details
