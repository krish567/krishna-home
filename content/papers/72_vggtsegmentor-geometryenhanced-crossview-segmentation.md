# VGGT-Segmentor: Geometry-Enhanced Cross-View Segmentation

**Authors:** Yulu Gao ⋅ Bohao Zhang ⋅ Zongheng Tang ⋅ Jitong Liao ⋅ wenjun wu ⋅ Si Liu

**Date/Time:** Jun 6, 4:45 PM - 6:45 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Instance-level object segmentation across disparate egocentric and exocentric views is a fundamental challenge in visual understanding, critical for applications in embodied AI and remote collaboration. This task is exceptionally difficult due to severe changes in scale, perspective, and occlusion, which destabilize direct pixel-level matching. While recent geometry-aware models like VGGT provide a strong foundation for feature alignment, we find they often fail at dense prediction tasks due to significant pixel-level projection drift, even when their internal object-level attention remains consistent. To bridge this gap, we introduce VGGT-Segmentor (VGGT-S), a framework that unifies robust geometric modeling with pixel-accurate semantic segmentation. VGGT-S leverages VGGT's powerful cross-view feature representation and introduces a novel Union Segmentation Head. This head operates in three stages: mask prompt fusion, coarse point-guided prediction, and iterative mask refinement, effectively translating high-level feature alignment into a precise segmentation mask. Furthermore, we propose a single-image self-supervised training strategy that eliminates the need for paired annotations and enables strong zero-shot generalization. On the challenging Ego–Exo4D benchmark, VGGT-S sets a new state-of-the-art, achieving 67.7% and 68.0% average IoU for Ego→Exo and Exo→Ego tasks, respectively, significantly outperforming prior methods. Notably, our zero-shot model surpasses most fully-supervised baselines, demonstrating the effectiveness and scalability of our approach. View full details
