# Adversarial Style Optimization: Enhancing VLM Jailbreaks by GRPO-based Stylistic Triggers Optimization

**Authors:** Bingjun Luo ⋅ Jialin Guo ⋅ Yue Yao ⋅ Xinpeng Ding

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

Multimodal Large Language Models (MLLMs) have achieved impressive performance, but their safety alignment remains vulnerable to jailbreak attacks. Existing content-based jailbreaks are often inconsistent and show low attack success rates (ASR) against commercial closed-source MLLMs, failing to exploit non-content-based vulnerabilities. Unlike previous research, we empirically find that MLLMs exhibit a Stylistic Inconsistency between their comprehension ability and safety ability. That is, from the perspective of comprehension, MLLMs can robustly understand content regardless of visual style (e.g., "pencil sketch"). However, from the perspective of safety ability, their defense mechanisms can be easily bypassed by these specific stylistic triggers, leading to harmful responses. Based on this finding, we propose Adversarial Style Optimization (ASO), a plug-and-play enhancement module to amplify existing visual jailbreaks. ASO fine-tunes an image-editing model to superimpose an optimized stylistic modification onto a given adversarial image. We apply a Group Relative Policy Optimization (GRPO) agent, guided by a Structurally-Tiered Reward Function. This function uniquely combines a logit-based signal for detecting explicit refusals with a high-fidelity semantic evaluation from a powerful judge model, mapping outcomes to distinct, non-overlapping reward tiers to select the most potent stylistic parameters. Extensive experiments show that ASO significantly enhances the ASR of SOTA attacks. The GRPO agent automatically discovers optimal, non-intuitive parameters, demonstrating that stylistic biases are a scalable and modular vector for red-teaming MLLMs. View full details
