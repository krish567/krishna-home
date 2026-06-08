# PixelDiT: Pixel Diffusion Transformers for Image Generation

**Authors:** Yongsheng Yu ⋅ Wei Xiong ⋅ Weili Nie ⋅ Yichen Sheng ⋅ Shiqiu Liu ⋅ Jiebo Luo

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Latent-space modeling has been the standard for Diffusion Transformers (DiTs). However, it relies on a two-stage pipeline where the pretrained autoencoder introduces lossy reconstruction, leading to error accumulation while hindering joint optimization. To address these issues, we propose PixelDiT, a single-stage, end-to-end model that eliminates the need for the autoencoder and learns the diffusion process directly in the pixel space. PixelDiT adopts a fully transformer-based architecture shaped by a dual-level design: a patch-level DiT that captures global semantics and a pixel-level DiT that refines texture details, enabling efficient training of a pixel-space diffusion model while preserving fine details. PixelDiT achieves 1.61 FID on ImageNet 256 and 2.21 FID on ImageNet 512, surpassing existing pixel generative models by a large margin. We further extend PixelDiT to text-to-image generation and pretrain it at the 1024 2 resolution in pixel space. It achieves 0.74 on GenEval and 83.5 on DPG-bench, approaching the best latent diffusion models. View full details
