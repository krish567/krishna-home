# GLINT: Modeling Scene-Scale Transparency via Gaussian Radiance Transport

**Authors:** Youngju Na ⋅ Jaeseong Yun ⋅ Soohyun Ryu ⋅ Hyunsu Kim ⋅ Sung-Eui Yoon ⋅ Suyong Yeon

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

While 3D Gaussian splatting has emerged as a powerful paradigm, it fundamentally fails to model transparency such as glass panels, which are prevalent in everyday environments. The core challenge lies in decoupling the intertwined radiance contributions from transparent interfaces and the transmitted geometry observed through the glass. We present GLINT, a framework that models scene-scale transparency through explicit decomposed Gaussian representation. GLINT reconstructs the primary interface and separates outgoing radiance into reflection and transmission components according to its optical properties, enabling coherent Gaussian radiance transport. During the optimization, GLINT bootstraps transparency localization by utilizing geometry separation cues that emerge from our decomposition with the geometry and material priors from a pre-trained video relighting model. Extensive experiments demonstrate that GLINT achieves state-of-the-art performance in 3D reconstruction of complex transparent scenes.Our code will be released publicly. View full details
