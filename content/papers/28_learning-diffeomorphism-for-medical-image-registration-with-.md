# Learning Diffeomorphism for Medical Image Registration with Time-Embedded Architectures Using Semigroup Regularization

**Authors:** Mohammadjavad Matinkia ⋅ Nilanjan Ray

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Diffeomorphic image registration (DIR) seeks topology-preserving transformations and is fundamental in medical imaging. Existing DIR methods rely on integration schemes (e.g., scaling-and-squaring) and multiple regularizers to enforce invertibility. We introduce **SGDIR**, a continuous-time registration framework, parameterized by known time-embedded backbones, that models diffeomorphisms using only a single semigroup-based regularization, eliminating explicit integration and auxiliary constraints. We mathematically prove that this formulation directly learns the flow of an underlying ODE, inherently enforcing inverse and cycle consistencies. We evaluate on eight 2D and 3D MR and CT datasets. Under strict semigroup enforcement, our model achieves near-perfect diffeomorphism (near-zero folding) and significantly outperforms existing diffeomorphic methods, while remaining competitive with leading non-diffeomorphic deformable models. When the regularization is relaxed, the same architecture functions as a deformable method and substantially surpasses state-of-the-art non-diffeomorphic approaches in registration accuracy. These results demonstrate that continuous-time deformation modeling, guided solely by our semigroup-based regularization, yields a unified framework capable of both rigorously diffeomorphic mapping and state-of-the-art deformable registration. View full details
