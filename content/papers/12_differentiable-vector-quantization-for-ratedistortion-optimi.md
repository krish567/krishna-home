# Differentiable Vector Quantization for Rate-Distortion Optimization of Generative Image Compression

**Authors:** SHIYIN JIANG ⋅ Wei Long ⋅ Minghao Han ⋅ Zhenghao Chen ⋅ Ce Zhu ⋅ Shuhang Gu

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

The proliferation of visual data under tight storage and bandwidth budgets makes extremely low–bitrate generative image compression increasingly important. Vector quantization (VQ) is compelling in this regime because codebooks encode cross-channel correlations and dataset-level semantics, enabling perceptually faithful reconstructions when bits are scarce. We propose RDVQ, a vector-quantization (VQ) based generative image compression method designed for extremely low bitrates. While end-to-end learned image codecs rely on a differentiable rate term for rate–distortion (RD) optimization, however, a key challenge is that naïvely integrating VQ introduces non-differentiability and is not directly compatible with entropy modeling, forcing prior work to regulate bitrate only indirectly. We resolve this by defining a distance-aware soft posterior over codebook indices and training a conditional autoregressive entropy model to predict it. Therefore the cross-entropy between the approximate and predicted posteriors yields a differentiable rate loss, restoring a gradient pathway from rate to the encoder via codeword distances. Such predicted codebook index distribution enables prefix-only transmission at inference, with the model imputing the rest of the indices, delivering retraining-free bitrate control over a practical range. Our end-to-end RD optimized RDVQ outperforms all baseline methods in terms of DISTS and CLIPIQA, which reflect superior structural restoration and better alignment with human visual perception on the Kodak, DIV2K and CLIC2020 datasets. View full details
