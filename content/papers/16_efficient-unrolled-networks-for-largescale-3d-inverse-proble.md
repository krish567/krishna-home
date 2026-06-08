# Efficient Unrolled Networks for Large-Scale 3D Inverse Problems

**Authors:** Romain Vo ⋅ Julián Tachella

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Deep learning-based methods have revolutionized the field of imaging inverse problems, yielding state-of-the-art performance across various imaging domains. The best performing networks incorporate the imaging operator within the network architecture, typically in the form of deep unrolling. However, in large-scale problems, such as 3D imaging, most existing methods fail to incorporate the operator in the architecture due to the prohibitive amount of memory required by global forward operators, which hinder typical patching strategies. In this work, we present a domain partitioning strategy and normal operator approximations that enable the training of end-to-end reconstruction models incorporating forward operators of arbitrarily large problems into their architecture. The proposed method achieves state-of-the-art performance on 3D X-ray cone-beam tomography and 3D multi-coil accelerated MRI, while requiring only a single GPU for both training and inference. View full details
