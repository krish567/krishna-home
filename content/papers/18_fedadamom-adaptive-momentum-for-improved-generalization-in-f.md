# FedAdamom: Adaptive Momentum for Improved Generalization in Federated Optimization

**Authors:** Wenjie Hou ⋅ Tianxiang Chen ⋅ Feng Wang ⋅ Tiantong Wu ⋅ Zhiming Zheng ⋅ Shaoting Tang ⋅ Wei Yang Bryan Lim

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Federated learning (FL) has emerged as a widely adopted training paradigm for privacy-preserving machine learning. Despite the past success of SGD-based methods, they still suffer from severe data heterogeneity and the lack of adaptivity in practical applications. While several adaptive federated optimization methods (such as FedAdam) have been proposed and demonstrated to achieve faster convergence, they fail to show significant improvements in generalization performance under highly heterogeneous data distributions, and their optimization and generalization mechanisms remain insufficiently understood. To fill this gap, we introduce diffusion theory into the adaptive federated optimization framework and analyze the distinct effects of adaptive learning rate and global momentum from the perspectives of saddle-point escaping and flat-minima selection. Theoretical results show that although FedAdam outperforms FedAvg/FedAvgM in escaping saddle points, the latter escapes sharp minima more efficiently. The root cause lies in that adaptive learning rates, while enhancing saddle-point escape, weaken the preference for flat minima. Motivated by these insights, we propose FedAdamom, a new adaptive federated optimization algorithm that adapts the momentum hyperparameter rather than the learning rate. FedAdamom maintains strong saddle-point escaping capability while enhancing flat-minima selection. We further establish its convergence guarantees under non-convex objectives. Extensive experiments demonstrate that FedAdamom significantly outperforms existing adaptive federated optimization methods in terms of convergence speed, generalization performance, and preference for flat minima. View full details
