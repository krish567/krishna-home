# Linear Fundamental Matrix Estimation from 7 or 5 Points

**Authors:** Taci Ata Kucukpinar ⋅ Juan Mogollon ⋅ Joshua Fraser ⋅ Timothy Duff ⋅ Kannappan Palaniappan

**Date/Time:** Jun 6, 4:45 PM - 6:45 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

We revisit the problem of estimating the fundamental matrix of a pair of perspective cameras, a cornerstone of geometric computer vision.As is well-known, linear solvers require at least 8 point correspondences, whereas nonlinear minimal solvers require just 7 in the uncalibrated case or 5 in the calibrated case.In this paper, we consider a special case of the 7-point problem where 5 of the points are configured to lie on two lines, which has previously been shown to have a unique solution.As a theoretical contribution, we offer an analysis of how this uniqueness manifests in the standard 7-point algorithm. On a practical level, we provide the first practical linear solver for the minimal problem associated to this special configuration.Additionally, we evaluate a heuristic 5-point fundamental matrix solver based on the construction of virtual midpoints.When combined with early non-minimal fitting, the runtime and accuracy of our solver is competitive with the state-of-the-art (SoTA) on multiple benchmarks. View full details
