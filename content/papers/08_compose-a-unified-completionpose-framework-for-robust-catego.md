# ComPose: A Unified Completion-Pose Framework for Robust Category-Level Object Pose Estimation

**Authors:** Huan Ren ⋅ Yihan Chen ⋅ Chuxin Wang ⋅ Nailong Liu ⋅ Wenfei Yang ⋅ Tianzhu Zhang

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Category-level object pose estimation aims to predict the pose and size of arbitrary objects in specific categories. Existing methods struggle with the inherent incompleteness of observed point clouds, which limits their ability to capture complete object shapes for robust pose reasoning. While point cloud completion offers a promising solution, naively treating it as a separate preprocessing step for partial observations introduces compounding errors and additional computational overhead, ultimately hindering both accuracy and efficiency.To address these challenges, we propose ComPose, a novel unified framework that tightly integrates shape completion to provide complete geometric cues for enhanced pose estimation. At the core of ComPose is a keypoint-based progressive completion module, which recovers full shape representations by progressively predicting a sparse set of keypoints and their surrounding dense point sets, empowering the keypoints to capture holistic object geometries. A geometric relation encoding module further enriches keypoint features with both local and global geometric context. In addition, we introduce a novel geometric relation consistency loss to enforce structural alignment between observed keypoints and their predicted NOCS coordinates, ensuring globally coherent coordinate transformations.Extensive experiments on standard benchmarks demonstrate that our method outperforms state-of-the-art approaches without relying on category-level shape priors. Our method pioneers a new direction for future research by effectively and efficiently integrating shape completion into category-level object pose estimation. Code will be open. View full details
