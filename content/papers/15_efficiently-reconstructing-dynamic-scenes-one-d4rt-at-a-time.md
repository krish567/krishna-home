# Efficiently Reconstructing Dynamic Scenes One D4RT at a Time

**Authors:** Chuhan Zhang ⋅ Guillaume Le Moing ⋅ Skanda Koppula ⋅ Ignacio Rocco ⋅ Liliane Momeni ⋅ Junyu Xie ⋅ Shuyang Sun ⋅ Rahul Sukthankar ⋅ Joëlle K. Barral ⋅ Raia Hadsell ⋅ Zoubin Ghahramani ⋅ Andrew Zisserman ⋅ Junlin Zhang ⋅ Mehdi S. M. Sajjadi

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Understanding and reconstructing the complex geometry and motion of dynamic 4D scenes from video remains a formidable challenge in computer vision. This paper introduces D4RT, a simple yet powerful feedforward network designed to efficiently solve this task. D4RT utilizes a unified transformer architecture to jointly infer depth, spatio-temporal correspondence, and full camera parameters from a single video. Its core innovation is a novel mechanism that sidesteps the heavy computation of dense, per-frame decoding and the complexity of managing multiple, task-specific decoders. Our unified decoding interface allows the model to independently and efficiently probe the 3D position of any point in space and time. The result is a lightweight and highly scalable method that enables remarkably efficient training and inference. We demonstrate that our approach sets a new state-of-the-art, outperforming previous methods across a wide spectrum of 4D reconstruction tasks. View full details
