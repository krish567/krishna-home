# SocialNav: Training Human-Inspired Foundation Model for Socially-Aware Embodied Navigation

**Authors:** Ziyi Chen ⋅ Yingnan Guo ⋅ Zedong Chu ⋅ Minghua Luo ⋅ Yanfen Shen ⋅ Mingchao Sun ⋅ Junjun Hu ⋅ Shichao Xie ⋅ Yang Kuan ⋅ Pei Shi ⋅ Zhining Gu ⋅ Lu Liu ⋅ Honglin Han ⋅ Xiaolong Wu ⋅ Mu Xu ⋅ Yu Zhang

**Date/Time:** Jun 7, 11:45 AM - 1:45 PM

**Location:** ExHall F

**Type:** POSTER

## Abstract

Embodied navigation that adheres to social norms remains an open research challenge. Our SocialNav is a foundational model for socially-aware navigation with a hierarchical "brain-action" architecture, capable of understanding high-level social norms and generating low-level, socially compliant trajectories. To enable such dual capabilities, we construct the SocNav Dataset, a large-scale collection of 7 million samples, comprising (1) a Cognitive Activation Dataset providing social reasoning signals such as chain-of-thought explanations and social traversability prediction, and (2) an Expert Trajectories Pyramid aggregating diverse navigation demonstrations from internet videos, simulated environments, and real-world robots. A multi-stage training pipeline is proposed to gradually inject and refine navigation intelligence: we first inject general navigation skills and social norms understanding into the model via imitation learning, and then refine such skills through a deliberately designed Socially-Aware FlowExploration GRPO (SAFE-GRPO), the first flow-based reinforcement learning framework for embodied navigation that explicitly rewards socially compliant behaviors. SocialNav achieves +38% success rate and +46% social compliance rate compared to the state-of-the-art method, demonstrating strong gains in both navigation performance and social compliance. Data and code will be made publicly available. View full details
