# FUSER: Feed-Forward Multiview 3D Registration Transformer and SE(3)^N Diffusion Refinement

**Authors:** Haobo Jiang ⋅ Jin Xie ⋅ Jian Yang ⋅ Liang Yu ⋅ Jianmin Zheng

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Registration of multiview point clouds typically depends on extensive pairwise matching to build a pose graph for global synchronization, which is computationally expensive and ill-posed without holistic geometric constraints. In this paper, we propose FUSER, the first feed-forward multi-view registration transformer that processes all scans jointly in a unified, compact latent space to directly predict global poses without any pairwise estimation. To maintain tractability, FUSER employs a sparse 3D CNN to encode each scan into low-resolution superpoint features preserving absolute translation cues, followed by a Geometric Alternating Attention module for efficient intra- and inter-scan reasoning. Particularly, we transfer 2D attention priors from off-the-shelf foundation models (i.e., 𝜋 3 ) to enhance 3D feature attention. Building upon FUSER and its estimates, we further introduce FUSER-DF, an SE(3) diffusion refinement framework to correct FUSER's estimates through a denoising process over the joint SE(3) 𝑁 space. Here, FUSER serves as a surrogate multiview register to model the denoiser, and a prior-conditioned SE(3) 𝑁 variational lower bound is derived for denoising supervision. Extensive experiments on 3DMatch and ScanNet confirm the superior registration accuracy and efficiency of our method. View full details
