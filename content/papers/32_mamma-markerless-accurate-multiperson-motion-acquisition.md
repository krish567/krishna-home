# MAMMA: Markerless Accurate Multi-person Motion Acquisition

**Authors:** Hanz Cuevas Velasquez ⋅ Anastasios Yiannakidis ⋅ Soyong Shin ⋅ Giorgio Becherini ⋅ Markus Höschle ⋅ Joachim Tesch ⋅ Taylor Obersat ⋅ Tsvetelina Alexiadis ⋅ Eni Halilaj ⋅ Michael J. Black

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

We present MAMMA, a markerless motion-capture pipeline that accurately recovers SMPL-X parameters from multi-view video.Traditional motion-capture systems rely on physical markers. Although they offer high accuracy, their requirements of specialised hardware, manual marker placement, and extensive post-processing make them costly and time-consuming. Recent learning-based methods attempt to overcome these limitations, but most are designed for single-person capture, rely on sparse keypoints, or struggle with occlusions and physical interactions. In this work, we introduce a method that predicts dense 2D surface landmarks conditioned on segmentation masks, enabling person-specific correspondence estimation even under heavy occlusion. We employ a novel architecture that exploits learnable queries for each landmark. We demonstrate that our approach can handle complex person--person interaction and offers greater accuracy than existing methods. To train our network, we construct a large, synthetic multi-view dataset combining human motions from diverse sources, including extreme poses, hand motions, and close interactions. Our dataset yields high-variability synthetic sequences with rich body contact and occlusion, and includes SMPL-X ground-truth annotations with dense 2D landmarks.The result is a system capable of accurately capturing human motion without the need for markers. Our approach offers competitive reconstruction quality compared to commercial marker-based motion-capture solutions, without the extensive manual cleanup. Finally, we address the absence of common benchmarks for dense-landmark prediction and markerless motion capture by introducing two evaluation settings built from real multi-view sequences. We will release our dataset, method, code, and model weights for research purposes. View full details
