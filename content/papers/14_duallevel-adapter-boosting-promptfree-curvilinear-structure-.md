# Dual-level Adapter Boosting Prompt-free Curvilinear Structure Segmentation

**Authors:** Kai Zhu ⋅ Li Chen ⋅ Jun Cheng

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Curvilinear structure segmentation is essential in domains such as medical imaging, remote sensing, and materials science. Existing methods often require extensive domain-specific training and lack generalization to novel domains. To overcome these limitations, we propose the Segment Anything Curve Model (SACM) — a universal, curvilinear segmentation framework built upon the pretrained Segment Anything Model (SAM). SACM introduces a dual-level adapter architecture that enables both fine-grained and domain-adaptive enhancement: block-level internal adapters refine local structural representations, while external adapters facilitate cross-domain feature alignment. Specifically, the internal adapters are embedded within each Transformer block to locally adapt and refine features for thin and intricate curvilinear patterns, while the external adapters operate across blocks to capture global, multi-layer contextual information and facilitate domain adaptation. Furthermore, SACM introduces a feature fusion mechanism that aggregates multi-layer features from all external adapters and fuses them via a Feed-Forward Network (FFN) module, and a dual-stage refinement process in the mask decoder to enhance topology and connectivity. This design enables prompt-free, data-efficient fine-tuning and achieves robust cross-domain generalization when trained with only 18 annotated images. Extensive experiments across twelve diverse curvilinear datasets validate that SACM achieves state-of-the-art performance. View full details
