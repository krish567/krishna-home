# QuadSync: Quadrifocal Tensor Synchronization via Tucker Decomposition

**Authors:** Daniel Miao ⋅ Gilad Lerman ⋅ Joe Kileel

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

In structure from motion, quadrifocal tensors capture more information than their pairwise counterparts (essential matrices), yet they have often been thought of as impractical and only of theoretical interest. In this work, we challenge such beliefs by providing a new framework to recover 𝑛 cameras from the corresponding collection of quadrifocal tensors. We form the block quadrifocal tensor and show that it admits a Tucker decomposition whose factor matrices are the stacked camera matrices, and which thus has a multilinear rank of (4,4,4,4) independent of 𝑛 . We develop the first synchronization algorithm for quadrifocal tensors, using Tucker decomposition, alternating direction method of multipliers, and iteratively reweighted least squares. We further establish relationships between the block quadrifocal, trifocal, and bifocal tensors, and introduce an algorithm that jointly synchronizes these three entities. Numerical experiments demonstrate the effectiveness of our methods on modern datasets, indicating the potential and importance of using higher-order information in synchronization. View full details
