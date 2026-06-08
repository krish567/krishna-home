# Learning Eigenstructures of Unstructured Data Manifolds

**Authors:** Roy Velich ⋅ Arkadi Piven ⋅ David Bensaid ⋅ Daniel Cremers ⋅ Thomas Dagès ⋅ Ron Kimmel

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

We introduce a novel framework that directly learns a spectral basis for shape and manifold analysis from unstructured data, eliminating the need for traditional operator selection, discretization, and eigensolvers.Grounded in optimal-approximation theory, we train a network to decompose an implicit approximation operator by minimizing the reconstruction error in the learned basis over a chosen distribution of probe functions. For suitable distributions, they can be seen as an approximation of the Laplacian operator and its eigendecomposition, which are fundamental in geometry processing. Furthermore, our method recovers in a unified manner not only the spectral basis, but also the implicit metric's sampling density and the eigenvalues of the underlying operator. Notably, our unsupervised method makes no assumption on the data manifold, such as meshing or manifold dimensionality, allowing it to scale to arbitrary datasets of any dimension.On point clouds lying on surfaces in 3D and high-dimensional image manifolds, our approach yields meaningful spectral bases, that can resemble those of the Laplacian, without explicit construction of an operator. By replacing the traditional operator selection, construction, and eigendecomposition with a learning-based approach, our framework offers a principled, data-driven alternative to conventional pipelines. This opens new possibilities in geometry processing for unstructured data, particularly in high-dimensional spaces. View full details
