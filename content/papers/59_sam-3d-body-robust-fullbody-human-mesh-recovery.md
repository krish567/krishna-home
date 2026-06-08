# SAM 3D Body: Robust Full-Body Human Mesh Recovery

**Authors:** Xitong Yang ⋅ Devansh Kukreja ⋅ Don Pinkus ⋅ Taosha Fan ⋅ Jinhyung Park ⋅ Soyong Shin ⋅ Jinkun Cao ⋅ Jia-Wei Liu ⋅ Nicolás Ugrinovic ⋅ Anushka Sagar ⋅ Jitendra Malik ⋅ Matt Feiszli ⋅ Piotr Dollár ⋅ Kris Kitani

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

We introduce SAM 3D Body (3DB), a promptable model for single-image full-body 3D human mesh recovery (HMR) that demonstrates state-of-the-art performance, with strong generalization and consistent accuracy in diverse in-the-wild conditions. 3DB estimates the human pose of the body, feet, and hands. It is the first model to use a new parametric mesh representation, Momentum Human Rig (MHR), which decouples skeletal pose and body shape. 3DB employs an encoder–decoder architecture and supports auxiliary prompts, including 2D keypoints and masks, enabling user-guided inference similar to the SAM family of models. We derive high-quality annotations from a multi-stage annotation pipeline that uses various combinations of manual keypoint annotation, differentiable optimization, multi-view geometry, and dense keypoint detection. Our data engine efficiently selects and processes data to ensure data diversity, collecting unusual poses and rare imaging conditions. We present a new evaluation dataset organized by pose and appearance categories, enabling nuanced analysis of model behavior. Our experiments demonstrate superior generalization and substantial improvements over prior methods in both qualitative user preference studies and traditional quantitative analysis. Both 3DB and MHR are open-source. View full details
