# SmokeSVD: Smoke Reconstruction from A Single View via Progressive Novel View Synthesis and Refinement with Diffusion Models

**Authors:** Chen Li ⋅ Shanshan Dong ⋅ Sheng Qiu ⋅ Jianmin Han ⋅ Yibo Zhao ⋅ Zan Gao ⋅ Taku Komura ⋅ Kemeng Huang

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Reconstructing dynamic fluids from sparse views is a long-standing and challenging problem, due to the severe lack of 3D information from insufficient view coverage. While several pioneering approaches have attempted to address this issue using differentiable rendering or novel view synthesis, they are often limited by time-consuming optimization under ill-posed conditions. We propose SmokeSVD, an efficient and effective framework to progressively reconstruct dynamic smoke from a single video by integrating the generative capabilities of diffusion models with physically guided consistency optimization. Specifically, we first propose a physically guided side-view synthesizer based on diffusion models, which explicitly incorporates velocity field constraints to generate spatio-temporally consistent side-view images frame by frame, significantly alleviating the ill-posedness of single-view reconstruction. Subsequently, we iteratively refine novel-view images and reconstruct 3D density fields through a progressive multi-stage process that renders and enhances images from increasing viewing angles, generating high-quality multi-view sequences. Finally, we estimate fine-grained density and velocity fields via differentiable advection by leveraging the Navier-Stokes equations. Our approach supports re-simulation and downstream applications while achieving superior reconstruction quality and computational efficiency compared to state-of-the-art methods. View full details
