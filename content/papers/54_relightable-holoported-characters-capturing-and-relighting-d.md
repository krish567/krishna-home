# Relightable Holoported Characters: Capturing and Relighting Dynamic Human Performance from Sparse Views

**Authors:** Kunwar Maheep Singh ⋅ Jianchun Chen ⋅ Vladislav Golyanik ⋅ Stephan Garbin ⋅ Thabo Beeler ⋅ Rishabh Dabral ⋅ Marc Habermann ⋅ Christian Theobalt

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

We present _Relightable Holoported Characters_ (RHC), a novel person-specific method for free-view rendering and relighting of full-body and highly dynamic humans solely observed from sparse-view RGB videos at inference. In contrast to classical one-light-at-a-time (OLAT)-based human relighting, our transformer-based RelightNet predicts relit appearance within a single network pass, avoiding costly OLAT-basis capture and generation. For training such a model, we introduce a new capture strategy and dataset recorded in a multi-view lightstage, where we alternate frames lit by random environment maps with uniformly lit tracking frames, simultaneously enabling accurate motion tracking and diverse illumination as well as dynamics coverage. Inspired by the rendering equation, we derive physics-informed features that encode geometry, albedo, shading, and the virtual camera view from a coarse human mesh proxy and the input views. Our RelightNet then takes these features as input and cross-attends them with a novel lighting condition, and regresses the relit appearance in the form of texel-aligned 3D Gaussian splats attached to the coarse mesh proxy. Consequently, our RelightNet implicitly learns to efficiently compute the rendering equation for novel lighting conditions within a single feed-forward pass. Experiments demonstrate our method’s superior visual fidelity and lighting reproduction compared to state-of-the-art approaches. View full details
