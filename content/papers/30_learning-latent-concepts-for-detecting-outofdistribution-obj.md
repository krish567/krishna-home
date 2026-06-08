# Learning Latent Concepts for Detecting Out-of-Distribution Objects

**Authors:** Ting Peng ⋅ Junhao Dong ⋅ Yew-Soon Ong

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Detecting out-of-distribution (OOD) objects is indispensable for safely deploying object detectors in the wild. Current approaches enable the unknown-aware ability by regularizing the instance-level feature space, such as outlier synthesis. Despite the general efficacy, it is challenging to truly learn the concept of `unknown' under the absence of real unknown data. In this paper, we propose UNO-Adapter, a simple yet highly effective framework tailored for OOD object detection. Our key insight is that in object detection, where in-distribution~(ID) and OOD objects may coexist within the same context, we need global abstraction and reasoning to help the detector learn their differences, i.e., unknown injection. UNO-Adapter consists of two key steps: unsupervised concept discovery and neural concept binder. The former introduces an object-centric learning paradigm to abstract and model the holistic image, including both ID and OOD, obtaining sparse and compressed slot-based representations with relational constraints. The latter dynamically combines slots with object candidates extracted by the detector, binding the concept of unknown to the de facto detector. During inference, we introduce an image-guided OOD object score to reinforce the distinction between ID and OOD. Experiments on standard benchmarks demonstrate the superiority of the proposed method. In particular, UNO-Adapter reduces the FPR95 by up to 11.96% compared to the previous best OOD object detection method. View full details
