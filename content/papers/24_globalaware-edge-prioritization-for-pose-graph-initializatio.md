# Global-Aware Edge Prioritization for Pose Graph Initialization

**Authors:** Tong Wei ⋅ Giorgos Tolias ⋅ Jiri Matas ⋅ Daniel Barath

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

The pose graph is a core component of Structure-from-Motion (SfM), where images act as nodes and edges encode relative poses. Since geometric verification is expensive, SfM pipelines restrict the pose graph to a sparse set of candidate edges, making initialization critical. Existing methods rely on image retrieval to connect each image to its 𝑘 nearest neighbors, treating pairs independently and ignoring global consistency. We address this limitation through the concept of edge prioritization, ranking candidate edges by their utility for SfM. Our approach has three components: (1) a GNN trained with SfM-derived supervision to predict globally consistent edge reliability; (2) multi-minimal-spanning-tree-based pose graph construction guided by these ranks; and (3) connectivity-aware score modulation that reinforces weak regions and reduces graph diameter. This globally informed initialization yields more reliable and compact pose graphs, improving reconstruction accuracy in sparse and high-speed settings and outperforming SOTA retrieval methods on ambiguous scenes. Code and models will be released. View full details
