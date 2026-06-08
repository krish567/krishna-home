# Black-box Membership Inference Attacks on the Pre-training Data of Image-generation Models

**Authors:** Tao Qi ⋅ Huili Wang ⋅ Yuanhong Huang ⋅ Wendan Wang ⋅ Lianchao Zhao ⋅ Jinrui Wang ⋅ Zichen Qin ⋅ Shangguang Wang ⋅ Yongfeng Huang

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

The rapid advancement of diffusion-based image generation models has raised serious concerns regarding potential copyright and privacy infringements involving human-created data.Membership inference attacks (MIAs) have emerged as a promising tool for identifying unauthorized data usage during model training.Existing methods typically assess the ability of model to denoise perturbed suspect images as an indicator of membership status.However, the discriminative power of such features is highly dependent on the degree of model memorization and deteriorates significantly when applied to less exposed data (e.g., pre-training data).Although several methods attempt to enhance detection by leveraging internal model features, these features are generally inaccessible in mainstream closed-source image generation platforms, limiting their practicality.In this paper, we demonstrate that analyzing how a black-box diffusion model denoises a target image and corresponding perturbed textual instructions can reveal more distinctive membership cues. Based on this insight, we propose a black-box membership inference attack framework (named SD-MIA) that leverages a cross-modal data perturbation mechanism to detect pre-training data in diffusion models.We conduct extensive experiments on both a public benchmark dataset and a newly constructed dataset, each comprising pre-training membership and non-membership samples with identical distributions. Experimental results demonstrate that SD-MIA achieves superior performance compared to existing baselines, including those with the unfair advantage of accessing internal model features. View full details
