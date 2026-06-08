# ChordEdit: One-Step Low-Energy Transport for Image Editing

**Authors:** Liangsi Lu ⋅ Xuhang Chen ⋅ Minzhe Guo ⋅ Shichu Li ⋅ Jingchao Wang ⋅ Yang Shi

**Date/Time:** Jun 6, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

The advent of one-step text-to-image (T2I) models offers unprecedented synthesis speed. However, their application to text-guided image editing remains severely hampered, as forcing existing training-free editors into a single inference step fails. This failure manifests as severe object distortion and a critical loss of consistency in non-edited regions, resulting from the high-energy, erratic trajectories produced by naive vector arithmetic on the models' structured fields. To address this problem, we introduce \textbf{ChordEdit}, a model agnostic, training-free, and inversion-free method that facilitates high-fidelity one-step editing. We recast editing as a transport problem between the source and target distributions defined by the source and target text prompts. Leveraging dynamic optimal transport theory, we derive a principled, low-energy control strategy. This strategy yields a smoothed, variance-reduced editing field that is inherently stable, facilitating the field to be traversed in a single, large integration step. A theoretically grounded and experimentally validated approach allows ChordEdit to deliver fast, lightweight and precise edits, finally achieving true real-time editing on these challenging models. View full details
