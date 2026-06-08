# Medic-AD: Towards Medical Vision-Language Model's Clinical Intelligence

**Authors:** Woohyeon Park ⋅ Jaeik Kim ⋅ Sunghwan Steve Cho ⋅ Pa Hong ⋅ Wookyoung Jeong ⋅ Yoojin Nam ⋅ Namjoon Kim ⋅ Ginny Y. Wong ⋅ Ka Chun Cheung ⋅ Jaeyoung Do

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Lesion detection, symptom tracking, and visual explainability are central to real-world medical image analysis, yet current medical Vision-Language Models (VLMs) still lack mechanisms that translate their broad knowledge into clinically actionable outputs. To bridge this gap, we present Medic-AD, a clinically oriented VLM that strengthens these three capabilities through a stage-wise framework. First, learnable anomaly-aware tokens (Ano) encourage the model to focus on abnormal regions and build more discriminative lesion centered representations. Second, inter-image difference tokens (Diff) explicitly encode temporal changes between studies, allowing the model to distinguish worsening, improvement, and stability in disease burden. Finally, a dedicated explainability stage trains the model to generate heatmaps that highlight lesion-related regions, offering clear visual evidence that is consistent with the model's reasoning. Through our staged design, Medic-AD steadily boosts performance across anomaly detection, symptom tracking, and anomaly segmentation, achieving state-of-the-art results compared with both closed source and medical-specialized baselines. Evaluations on real longitudinal clinical data collected from real hospital workflows further show that Medic-AD delivers stable predictions and clinically faithful explanations in practical patient-monitoring and decision-support workflows. View full details
