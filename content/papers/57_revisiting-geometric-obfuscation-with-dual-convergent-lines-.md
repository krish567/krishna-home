# Revisiting Geometric Obfuscation with Dual Convergent Lines for Privacy-Preserving Image Queries in Visual Localization

**Authors:** Jeonggon Kim ⋅ Heejoon Moon ⋅ Je Hyeong Hong

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

Privacy-Preserving Image Queries (PPIQ) are an emerging mechanism for cloud-based visual localization, enabling pose estimation from obfuscated features instead of private images or raw keypoints.However, the main approaches for PPIQ, primarily geometry-based and segmentation-based obfuscation, both suffer from vulnerabilities to recent privacy attacks.In particular, a fundamental limitation of geometry-based obfuscation is that the spatial distribution of obfuscated neighboring lines still effectively surrounds the original keypoint location, providing exploitable cues for recovering the original points.We revisit this geometric paradigm and introduce Dual Convergent Lines (DCL), a novel keypoint obfuscation method demonstrating strong resilience against such attack.DCL places two fixed anchors on a central partition line and lifts each keypoint to a line originating from one of them, with the active anchor determined by the keypoint's location.This arrangement invalidates the geometry-recovery attack by making its optimization ill-posed:Neighboring lines either misleadingly converge to one anchor, yielding a trivial solution, or become near-parallel at the partition boundary, yielding an unstable high-variance solution. Both outcomes thwart point recovery.DCL is also compatible with an existing line-based solver, enabling deployment in traditional localization pipelines.Experiments on both indoor and large-scale outdoor datasets demonstrate DCL's robustness against privacy attacks, efficiency, and scalability, while achieving practical localization performance. View full details
