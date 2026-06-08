# Data Leakage Detection and De-duplication in Large Scale Geospatial Image Datasets

**Authors:** Yeshwanth Kumar Adimoolam ⋅ Charalambos Poullis ⋅ Melinos Averkiou

**Date/Time:** Jun 5, 10:45 AM - 12:45 PM

**Location:** ExHall A-F

**Type:** POSTER

## Abstract

In our study, we conducted a comprehensive analysis of three widely used datasets in the domain of building footprint extraction using deep neural networks: the INRIA Aerial Image Labelling dataset, SpaceNet 2: Building Detection v2, and the AICrowd Mapping Challenge datasets. Our experiments revealed several issues in the AICrowd Mapping Challenge dataset, where nearly 90% (about 250k) of the training split images had identical copies, indicating a high level of duplicate data. Additionally, we found that approximately 56k of the 60k images in the validation split were also present in the training split, amounting to a 93% data leakage.Furthermore, we present a data validation pipeline to address these issues of duplication and data leakage, which hinder the performance of models trained on such datasets. Employing perceptual hashing techniques, this pipeline is designed for efficient de-duplication and leakage identification. It aims to thoroughly evaluate the quality of datasets before their use, thereby ensuring the reliability and robustness of the trained models. View full details
