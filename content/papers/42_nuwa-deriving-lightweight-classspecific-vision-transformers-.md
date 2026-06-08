# NuWa: Deriving Lightweight Class-Specific Vision Transformers for Edge Devices

**Authors:** Ziteng Wei ⋅ Qiang He ⋅ Bing Li ⋅ Feifei Chen ⋅ Hai Jin ⋅ Yun Yang

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

Vision Transformers (ViTs) often need to be compressed for deployment on resource-constrained edge devices like drones and smart vehicles. However, existing model compression methods ignore that many edge devices only require the knowledge of specific classes for their applications. As a result, the derived all-class ViTs retain redundant knowledge and perform suboptimally on these classes. We discovered that simply replacing the calibration dataset with class-specific data does not suffice to address this issue, as these methods face two fundamental limitations. First, they overlook the existence of class-detrimental weights, which interfere with specialization, while removing them can improve class-specific performance. Second, the diversity of target classes and resource constraints on edge devices demand numerous customized models. Existing methods are time-consuming and computationally expensive, thus unscalable. In this work, we present NuWa, a cost-efficient method that addresses these challenges by deriving small ViTs from base ViTs for edge devices with specific class requirements. NuWa performs self-knowledge purification to prune class-detrimental weights and efficiently derives compact ViTs through closed-form optimization. Without post-pruning retraining, the derived edge ViTs surpass the base ViT in class-specific accuracy and accelerate inference. Comprehensive experiments demonstrate that NuWa outperforms state-of-the-art training-free pruning methods on class-specific tasks by up to 29.00\% in accuracy. Compared with the best-performing training-dependent pruning method, NuWa achieves a 33.69× pruning speedup and reduces pruning cost by up to 99.83\%, with only a 0.61\% average accuracy loss. View full details
