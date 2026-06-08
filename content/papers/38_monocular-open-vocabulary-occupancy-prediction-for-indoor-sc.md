# Monocular Open Vocabulary Occupancy Prediction for Indoor Scenes

**Authors:** Changqing Zhou ⋅ Yueru Luo ⋅ Han Zhang ⋅ Zeyu Jiang ⋅ Changhao Chen

**Date/Time:** Jun 6, 4:45 PM - 6:45 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Open-vocabulary 3D occupancy is vital for embodied agents, which need to understand complex indoor environments where semantic categories are abundant and evolve beyond fixed taxonomies. While recent work has explored open-vocabulary occupancy in outdoor driving scenarios, such methods transfer poorly indoors, where geometry is denser, layouts are more intricate, and semantics are far more fine-grained. To address these challenges, we adopt a geometry-only supervision paradigm that uses only binary occupancy labels (occupied vs. free). Our framework builds upon 3D Language-Embedded Gaussians, which serve as a unified intermediate representation coupling fine-grained 3D geometry with a language-aligned semantic embedding. On the geometry side, we find that existing Gaussian-to-Occupancy operators fail to converge under such weak supervision, and we introduce an opacity-aware, Poisson-based approach that stabilizes volumetric aggregation. On the semantic side, direct alignment between rendered features and open-vocabulary segmentation features suffers from feature mixing; we therefore propose a Progressive Temperature Decay schedule that gradually sharpens opacities during splatting, strengthening Gaussian–language alignment. On Occ-ScanNet, our framework achieves 59.50 IoU and 21.05 mIoU in the open-vocabulary setting, surpassing all existing occupancy methods in IoU and outperforming prior open-vocabulary approaches by a large margin in mIoU. Code will be released. View full details
