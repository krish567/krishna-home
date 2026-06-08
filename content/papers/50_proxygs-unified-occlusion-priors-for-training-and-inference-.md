# Proxy-GS: Unified Occlusion Priors for Training and Inference in Structured 3D Gaussian Splatting

**Authors:** Yuanyuan Gao ⋅ YUNING GONG ⋅ Yifei Liu ⋅ Jingfeng Li ⋅ Dan Xu ⋅ Yanci Zhang ⋅ Dingwen Zhang ⋅ Xiao Sun ⋅ Zhihang Zhong

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

3D Gaussian Splatting (3DGS) has emerged as an efficient approach for achieving photorealistic rendering. Recent MLP-based variants further improve visual fidelity but introduce substantial decoding overhead during rendering. To alleviate computation cost, several pruning strategies and level-of-detail (LOD) techniques have been introduced, aiming to effectively reduce the number of Gaussian primitives in large-scale scenes. However, our analysis reveals that significant redundancy still remains due to the lack of occlusion awareness. In this work, we propose Proxy-GS, a novel pipeline that exploits a proxy to introduce Gaussian occlusion awareness from any view.At the core of our approach is a fast proxy system capable of producing precise occlusion depth maps at resolution 1000 × 1000 under 1 ms. This proxy serves two roles: first, it guides the culling of anchors and Gaussians to accelerate rendering speed. Second, it guides the densification towards surfaces during training, avoiding inconsistencies in occluded regions, and improving the rendering quality. In heavily occluded scenarios, such as the MatrixCity Streets dataset, Proxy-GS not only equips MLP-based Gaussian splatting with stronger rendering capability but also achieves faster rendering speed than the original 3DGS. Specifically, it achieves more than 2.5 × speedup over Octree-GS, and consistently delivers substantially higher rendering quality. View full details
