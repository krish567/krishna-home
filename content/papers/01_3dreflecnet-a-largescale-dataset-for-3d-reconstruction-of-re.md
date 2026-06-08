# 3DReflecNet: A Large-Scale Dataset for 3D Reconstruction of Reflective, Transparent, and Low-Texture Objects

**Authors:** Zhicheng Liang ⋅ Haoyi Yu ⋅ Boyan Li ⋅ Dayou Zhang ⋅ Zijian Cao ⋅ Tianyi Gong ⋅ Junhua Liu ⋅ Shuguang Cui ⋅ Fangxin Wang

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Accurate 3D reconstruction of objects with reflective, transparent, or low-texture surfaces remains a significant challenge. Such materials often violate key assumptions in multi-view reconstruction pipelines, such as photometric consistency and the reliance on distinct geometric texture cues. Existing datasets primarily focus on diffuse, textured objects, thereby offering limited insight into performance under real-world material complexities. In this paper, we introduce 3DReflecNet, a large-scale hybrid dataset exceeding 22 TB that is specifically designed to benchmark and advance 3D vision methods for these challenging materials. 3DReflecNet combines two types of data: over 100,000 synthetic instances generated via physically-based rendering of more than 10,000 shapes, and over 1,000 real-world objects scanned using consumer RGB-D devices. Together, these data consist of more than 7 million multi-view frames. It encompasses diverse materials, complex lighting conditions, and a wide range of geometric forms—including shapes generated from both real and LLM-synthesized 2D images using diffusion-based methods. To support robust evaluation, we design benchmarks for four core tasks: image matching, reflection removal, structure-from-motion, and novel view synthesis. Through extensive experiments, we show that state-of-the-art methods struggle to maintain accuracy across these settings, highlighting the need for more resilient 3D vision models. We release the dataset, baselines, and evaluation suite to facilitate progress in this direction, which can be accessed at supplementary materials. View full details
