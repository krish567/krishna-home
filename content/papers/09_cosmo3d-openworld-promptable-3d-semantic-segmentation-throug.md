# CoSMo3D: Open-World Promptable 3D Semantic Segmentation through LLM-Guided Canonical Spatial Modeling

**Authors:** Li Jin ⋅ Weikai Chen ⋅ Yujie Wang ⋅ Yingda Yin ⋅ Zeyu HU ⋅ Runze Zhang ⋅ Keyang Luo ⋅ Shengju Qian ⋅ Xin Wang ⋅ Xueying Qin

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Open-world promptable 3D semantic segmentation remains brittle as semantics are inferred in the input sensor coordinates. Yet, humans, in contrast, interpret parts via functional roles in a canonical space -- wings extend laterally, handles protrude to the side, and legs support from below. Psychophysical evidence shows that we mentally rotate objects into canonical frames to reveal these roles. To fill this gap, we propose CoSMo3D, which attains canonical space perception by inducing a latent canonical reference frame learned directly from data. By construction, we create a unified canonical dataset through LLM-guided intra- and cross-category alignment, exposing canonical spatial regularities across 200 categories. By induction, we realize canonicality inside the model through a dual-branch architecture with canonical map anchoring and canonical box calibration, collapsing pose variation and symmetry into a stable canonical embedding. This shift from input pose space to canonical representation yields far more stable and transferable part semantics. Experimental results show that CoSMo3D establishes new state of the art in open-world promptable 3D segmentation. View full details
