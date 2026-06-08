# Natural Human Motion Recovery by Aligning High-Order Temporal Dynamics from Monocular Videos

**Authors:** Dingkun Wei ⋅ Zehong Shen ⋅ Yan Xia ⋅ Yujun Shen ⋅ Georgios Pavlakos ⋅ Xiaowei Zhou

**Date/Time:** Jun 5, 4:00 PM - 6:00 PM

**Location:** ExHall A & F

**Type:** POSTER

## Abstract

Human motion recovered from monocular videos often appears overly smooth or dynamically inconsistent, even when joint positions are numerically accurate. We observe that this limitation stems from the absence of reliable high-order temporal cues—velocity and acceleration—which are essential for reconstructing motion that exhibits realistic momentum, timing, and high-frequency detail.We introduce HTD-Refine, a post-processing framework that augments existing Human Motion Recovery (HMR) pipelines using explicitly estimated high-order temporal dynamics. At the core of our system is PVA-Net, a temporal transformer that infers per-joint 2D positions, velocities, and accelerations directly from a monocular video. These predicted dynamics serve as soft yet informative constraints in a global optimization procedure that refines camera-space and world-space trajectories, significantly reducing jitter, suppressing oversmoothing, and restoring physically plausible motion profiles.Extensive experiments on challenging in-the-wild benchmarks show that HTD-Refine consistently improves state-of-the-art HMR methods, yielding more accurate global trajectories and substantially more natural motion dynamics. Our results highlight the critical role of high-order temporal modeling in advancing monocular human motion recovery. View full details
