"use client";

import { useEffect, useState } from "react";

import PaperViz_01 from "./01_3dreflecnet-a-largescale-dataset-for-3d-reconstruction-of-re";
import PaperViz_02 from "./02_adversarial-style-optimization-enhancing-vlm-jailbreaks-by-g";
import PaperViz_03 from "./03_a-style-is-worth-one-code-unlocking-codetostyle-image-genera";
import PaperViz_04 from "./04_blackbox-membership-inference-attacks-on-the-pretraining-dat";
import PaperViz_05 from "./05_chordedit-onestep-lowenergy-transport-for-image-editing";
import PaperViz_06 from "./06_chorus-multiteacher-pretraining-for-holistic-3d-gaussian-sce";
import PaperViz_07 from "./07_cinebrain-a-largescale-multimodal-audiovisual-brain-dataset-";
import PaperViz_08 from "./08_compose-a-unified-completionpose-framework-for-robust-catego";
import PaperViz_09 from "./09_cosmo3d-openworld-promptable-3d-semantic-segmentation-throug";
import PaperViz_10 from "./10_customized-fusion-a-closedloop-dynamic-network-for-adaptive-";
import PaperViz_11 from "./11_data-leakage-detection-and-deduplication-in-large-scale-geos";
import PaperViz_12 from "./12_differentiable-vector-quantization-for-ratedistortion-optimi";
import PaperViz_13 from "./13_dual-band-thermal-videography-separating-timevarying-reflect";
import PaperViz_14 from "./14_duallevel-adapter-boosting-promptfree-curvilinear-structure-";
import PaperViz_15 from "./15_efficiently-reconstructing-dynamic-scenes-one-d4rt-at-a-time";
import PaperViz_16 from "./16_efficient-unrolled-networks-for-largescale-3d-inverse-proble";
import PaperViz_17 from "./17_evidential-neural-radiance-fields";
import PaperViz_18 from "./18_fedadamom-adaptive-momentum-for-improved-generalization-in-f";
import PaperViz_19 from "./19_finer-mllms-hallucinate-under-finegrained-negative-queries";
import PaperViz_20 from "./20_fuser-feedforward-multiview-3d-registration-transformer-and-";
import PaperViz_21 from "./21_gaussianfluent-gaussian-simulation-for-dynamic-scenes-with-m";
import PaperViz_22 from "./22_geovis-geospatially-rewarded-visual-search-for-remote-sensin";
import PaperViz_23 from "./23_glint-modeling-scenescale-transparency-via-gaussian-radiance";
import PaperViz_24 from "./24_globalaware-edge-prioritization-for-pose-graph-initializatio";
import PaperViz_25 from "./25_hearing-the-room-through-the-shape-of-the-drum-modalguided-s";
import PaperViz_26 from "./26_immeriris-a-largescale-dataset-and-benchmark-for-offaxis-and";
import PaperViz_27 from "./27_ldpslicing-local-differential-privacy-for-images-via-randomi";
import PaperViz_28 from "./28_learning-diffeomorphism-for-medical-image-registration-with-";
import PaperViz_29 from "./29_learning-eigenstructures-of-unstructured-data-manifolds";
import PaperViz_30 from "./30_learning-latent-concepts-for-detecting-outofdistribution-obj";
import PaperViz_31 from "./31_linear-fundamental-matrix-estimation-from-7-or-5-points";
import PaperViz_32 from "./32_mamma-markerless-accurate-multiperson-motion-acquisition";
import PaperViz_33 from "./33_mapping-networks";
import PaperViz_34 from "./34_medicad-towards-medical-visionlanguage-models-clinical-intel";
import PaperViz_35 from "./35_memoryaugmented-scene-understanding-and-exploration-for-open";
import PaperViz_36 from "./36_metaspectra-a-compact-broadband-metasurface-camera-for-snaps";
import PaperViz_37 from "./37_molmo2-open-weights-and-data-for-visionlanguage-models-with-";
import PaperViz_38 from "./38_monocular-open-vocabulary-occupancy-prediction-for-indoor-sc";
import PaperViz_39 from "./39_native-and-compact-structured-latents-for-3d-generation";
import PaperViz_40 from "./40_natural-human-motion-recovery-by-aligning-highorder-temporal";
import PaperViz_41 from "./41_nitrogen-an-open-foundation-model-for-generalist-gaming-agen";
import PaperViz_42 from "./42_nuwa-deriving-lightweight-classspecific-vision-transformers-";
import PaperViz_43 from "./43_olatverse-a-largescale-realworld-object-dataset-with-precise";
import PaperViz_44 from "./44_opendance-multimodal-controllable-3d-dance-generation-with-l";
import PaperViz_45 from "./45_paibench-a-comprehensive-benchmark-for-physical-ai";
import PaperViz_46 from "./46_phygap-physicallygrounded-gaussians-with-polarization-cues";
import PaperViz_47 from "./47_pixeldit-pixel-diffusion-transformers-for-image-generation";
import PaperViz_48 from "./48_plant-taxonomy-meets-plant-counting-a-finegrained-taxonomic-";
import PaperViz_49 from "./49_prophy-progressive-physical-alignment-for-dynamic-world-simu";
import PaperViz_50 from "./50_proxygs-unified-occlusion-priors-for-training-and-inference-";
import PaperViz_51 from "./51_quadsync-quadrifocal-tensor-synchronization-via-tucker-decom";
import PaperViz_52 from "./52_r2seg-trainingfree-ood-medical-tumor-segmentation-via-anatom";
import PaperViz_53 from "./53_refav-towards-planningcentric-scenario-mining";
import PaperViz_54 from "./54_relightable-holoported-characters-capturing-and-relighting-d";
import PaperViz_55 from "./55_residual-primitive-fitting-of-3d-shapes-with-superfrusta";
import PaperViz_56 from "./56_rethinking-dataset-distillation-hard-truths-about-soft-label";
import PaperViz_57 from "./57_revisiting-geometric-obfuscation-with-dual-convergent-lines-";
import PaperViz_58 from "./58_sam-3d-3dfy-anything-in-images";
import PaperViz_59 from "./59_sam-3d-body-robust-fullbody-human-mesh-recovery";
import PaperViz_60 from "./60_seacache-spectralevolutionaware-cache-for-accelerating-diffu";
import PaperViz_61 from "./61_seegroup-multilayer-depth-estimation-of-transparent-surfaces";
import PaperViz_62 from "./62_smokesvd-smoke-reconstruction-from-a-single-view-via-progres";
import PaperViz_63 from "./63_soccermaster-a-vision-foundation-model-for-soccer-understand";
import PaperViz_64 from "./64_socialnav-training-humaninspired-foundation-model-for-social";
import PaperViz_65 from "./65_sparseworldtc-trajectoryconditioned-sparse-occupancy-world-m";
import PaperViz_66 from "./66_texvent-asynchronous-event-data-simulation-via-text-prompt";
import PaperViz_67 from "./67_the-safari-dataset-segment-anything-in-footage-of-animals-fo";
import PaperViz_68 from "./68_thinking-with-drafts-speculative-temporal-reasoning-for-effi";
import PaperViz_69 from "./69_towards-photorealistic-and-efficient-bokeh-rendering-via-dif";
import PaperViz_70 from "./70_u2flow-uncertaintyaware-unsupervised-optical-flow-estimation";
import PaperViz_71 from "./71_unreflectanything-rgbonly-highlight-removal-by-rendering-syn";
import PaperViz_72 from "./72_vggtsegmentor-geometryenhanced-crossview-segmentation";
import PaperViz_73 from "./73_vit3-unlocking-testtime-training-in-vision";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vizMap: Record<number, React.ComponentType<any>> = {
  1: PaperViz_01, 2: PaperViz_02, 3: PaperViz_03, 4: PaperViz_04,
  5: PaperViz_05, 6: PaperViz_06, 7: PaperViz_07, 8: PaperViz_08,
  9: PaperViz_09, 10: PaperViz_10, 11: PaperViz_11, 12: PaperViz_12,
  13: PaperViz_13, 14: PaperViz_14, 15: PaperViz_15, 16: PaperViz_16,
  17: PaperViz_17, 18: PaperViz_18, 19: PaperViz_19, 20: PaperViz_20,
  21: PaperViz_21, 22: PaperViz_22, 23: PaperViz_23, 24: PaperViz_24,
  25: PaperViz_25, 26: PaperViz_26, 27: PaperViz_27, 28: PaperViz_28,
  29: PaperViz_29, 30: PaperViz_30, 31: PaperViz_31, 32: PaperViz_32,
  33: PaperViz_33, 34: PaperViz_34, 35: PaperViz_35, 36: PaperViz_36,
  37: PaperViz_37, 38: PaperViz_38, 39: PaperViz_39, 40: PaperViz_40,
  41: PaperViz_41, 42: PaperViz_42, 43: PaperViz_43, 44: PaperViz_44,
  45: PaperViz_45, 46: PaperViz_46, 47: PaperViz_47, 48: PaperViz_48,
  49: PaperViz_49, 50: PaperViz_50, 51: PaperViz_51, 52: PaperViz_52,
  53: PaperViz_53, 54: PaperViz_54, 55: PaperViz_55, 56: PaperViz_56,
  57: PaperViz_57, 58: PaperViz_58, 59: PaperViz_59, 60: PaperViz_60,
  61: PaperViz_61, 62: PaperViz_62, 63: PaperViz_63, 64: PaperViz_64,
  65: PaperViz_65, 66: PaperViz_66, 67: PaperViz_67, 68: PaperViz_68,
  69: PaperViz_69, 70: PaperViz_70, 71: PaperViz_71, 72: PaperViz_72,
  73: PaperViz_73,
};

export default function VizClient() {
  const [paperNum, setPaperNum] = useState<number | null>(null);

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const id = parts[parts.length - 1];
    setPaperNum(parseInt(id, 10));
  }, []);

  if (!paperNum) {
    return (
      <div className="text-center text-slate-400 py-12">
        <div className="animate-pulse">
          <div className="w-64 h-64 mx-auto bg-slate-800 rounded-2xl mb-4" />
          <div className="w-48 h-4 bg-slate-800 rounded mx-auto mb-2" />
        </div>
      </div>
    );
  }

  const VizComponent = vizMap[paperNum];

  if (!VizComponent) {
    return (
      <div className="text-center text-slate-400 py-12">
        <p className="text-2xl mb-2">🎨</p>
        <p>Visualization #{paperNum} not found</p>
      </div>
    );
  }

  return (
    <VizComponent
      title="CVPR 2026 Award Candidate"
      authors="Various Authors"
      type="ORAL"
    />
  );
}