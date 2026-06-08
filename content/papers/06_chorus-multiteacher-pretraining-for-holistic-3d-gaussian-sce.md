# Chorus: Multi-Teacher Pretraining for Holistic 3D Gaussian Scene Encoding

**Authors:** Yue Li ⋅ Qi Ma ⋅ Runyi Yang ⋅ Mengjiao Ma ⋅ Bin Ren ⋅ Nikola Popovic ⋅ Nicu Sebe ⋅ Theo Gevers ⋅ Luc Van Gool ⋅ Danda Paudel ⋅ Martin R. Oswald

**Date/Time:** Jun 6, 4:45 PM - 6:45 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

While 3DGS has emerged as a high-fidelity scene representation, encoding rich, general-purpose features directly from its primitives remains under-explored. We address this gap by introducing Chorus, a multi-teacher pretraining framework that learns a holistic feed-forward 3D Gaussian Splatting (3DGS) scene encoder by distilling complementary signals from 2D foundation models. Chorus employs a shared 3D encoder and teacher-specific projectors to learn from language-aligned, generalist, and object-aware teachers, encouraging a shared embedding space that captures signals from high-level semantics to fine-grained structure.We evaluate Chorus on a wide range of tasks: open-vocabulary semantic and instance segmentation, linear and decoder probing, as well as data-efficient supervision. Besides 3DGS, we also test Chorus on several benchmarks that only support point clouds by pretraining a variant using only Gaussians’ centers, colors, estimated normals as inputs. Interestingly, this encoder shows strong transfer and outperforms the point clouds baseline while using 39.9 × fewer training scenes. Finally, we propose a render-and-distill adaptation that facilitates out-of-domain finetuning. Our code and model will be released upon publication. View full details
