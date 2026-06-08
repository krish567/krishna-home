# Residual Primitive Fitting of 3D Shapes with SuperFrusta

**Authors:** Aditya Ganeshan ⋅ Matheus Gadelha ⋅ Thibault Groueix ⋅ Zhiqin Chen ⋅ Siddhartha Chaudhuri ⋅ Vladimir G. Kim ⋅ Wang Yifan ⋅ Daniel Ritchie

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

We introduce a framework for converting 3D shapes into compact and editable assemblies of analytic primitives, directly addressing the persistent trade-off between reconstruction fidelity and parsimony. Our approach combines two key contributions: a novel primitive, termed SuperFrustum, and an iterative inference algorithm, Residual Primitive Fitting (ResFit). SuperFrustum is a analytical primitive that is simultaneously (1) expressive, being able to express various common solids such as cylinders, spheres, cones & their tapered and bent forms, (2) editable, being compactly parameterized with 8 parameters, and (3) optimizable, with a sign distance field differentiable w.r.t. its parameters almost everywhere. ResFit is an unsupervised procedure that interleaves global shape analysis with local optimization, iteratively fitting primitives to the unexplained residual of a shape to discover a parsimonious yet accurate decompositions for each input shape. On diverse 3D benchmarks, our method achieves state-of-the-art results, improving IoU by over 9 points while using nearly half as many primitives as prior work. The resulting assemblies bridge the gap between dense 3D data and human-controllable design, producing high-fidelity and editable shape programs. View full details
