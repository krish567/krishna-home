import Link from "next/link";

const papers = [
  { num: 1, title: "3DReflecNet: A Large-Scale Dataset for 3D Reconstruction", type: "ORAL" },
  { num: 2, title: "Adversarial Style Optimization Enhancing VLM Jailbreaks", type: "ORAL" },
  { num: 3, title: "A Style Is Worth One Code: Unlocking Code-to-Image Generation", type: "SPOTLIGHT" },
  { num: 4, title: "Blackbox Membership Inference Attacks on Pretraining Data", type: "POSTER" },
  { num: 5, title: "ChordEdit: One-Step Low-Energy Transport for Image Editing", type: "POSTER" },
  { num: 6, title: "Chorus: Multi-Teacher Pretraining for Holistic 3D Gaussian Scenes", type: "ORAL" },
  { num: 7, title: "CineBrain: A Large-Scale Multimodal Audiovisual Brain Dataset", type: "ORAL" },
  { num: 8, title: "Compose: Unified CompletionPose Framework for Robust Categorical Pose", type: "SPOTLIGHT" },
  { num: 9, title: "Cosmo3D: Open-World Promptable 3D Semantic Segmentation", type: "SPOTLIGHT" },
  { num: 10, title: "Customized Fusion: Closed-Loop Dynamic Network for Adaptive Fusion", type: "POSTER" },
  { num: 11, title: "Data Leakage Detection and Deduplication in Large-Scale Geos", type: "POSTER" },
  { num: 12, title: "Differentiable Vector Quantization for Rate-Distortion Optimization", type: "SPOTLIGHT" },
  { num: 13, title: "Dual-Band Thermal Videography Separating Time-Varying Reflect", type: "POSTER" },
  { num: 14, title: "DualLevel Adapter Boosting Prompt-Free Curvilinear Structure", type: "POSTER" },
  { num: 15, title: "Efficiently Reconstructing Dynamic Scenes One D4RT at a Time", type: "POSTER" },
  { num: 16, title: "Efficient Unrolled Networks for Large-Scale 3D Inverse Problems", type: "POSTER" },
  { num: 17, title: "Evidential Neural Radiance Fields", type: "POSTER" },
  { num: 18, title: "FedAdamom: Adaptive Momentum for Improved Generalization in FL", type: "POSTER" },
  { num: 19, title: "Finer MLLMs Hallucinate Under Fine-Grained Negative Queries", type: "SPOTLIGHT" },
  { num: 20, title: "Fuser: Feedforward Multiview 3D Registration Transformer", type: "POSTER" },
  { num: 21, title: "GaussianFluent: Gaussian Simulation for Dynamic Scenes", type: "ORAL" },
  { num: 22, title: "GeoVis: Geospatially Rewarded Visual Search for Remote Sensing", type: "POSTER" },
  { num: 23, title: "Glint: Modeling Scene-Scale Transparency via Gaussian Radiance", type: "ORAL" },
  { num: 24, title: "Global-Aware Edge Prioritization for Pose Graph Initialization", type: "POSTER" },
  { num: 25, title: "Hearing the Room Through the Shape of the Drum", type: "SPOTLIGHT" },
  { num: 26, title: "ImmerIris: Large-Scale Dataset for Off-Axis and Cross-Session Iris", type: "POSTER" },
  { num: 27, title: "LDP-Slicing: Local Differential Privacy for Images", type: "POSTER" },
  { num: 28, title: "Learning Diffeomorphism for Medical Image Registration", type: "POSTER" },
  { num: 29, title: "Learning Eigenstructures of Unstructured Data Manifolds", type: "POSTER" },
  { num: 30, title: "Learning Latent Concepts for Detecting Out-of-Distribution Objects", type: "SPOTLIGHT" },
  { num: 31, title: "Linear Fundamental Matrix Estimation from 7 or 5 Points", type: "POSTER" },
  { num: 32, title: "MAMMA: Markerless Accurate Multiperson Motion Acquisition", type: "SPOTLIGHT" },
  { num: 33, title: "Mapping Networks", type: "ORAL" },
  { num: 34, title: "MediCAD: Towards Medical Vision-Language Models Clinical Intelligence", type: "SPOTLIGHT" },
  { num: 35, title: "Memory-Augmented Scene Understanding and Exploration", type: "POSTER" },
  { num: 36, title: "MetaSpectra: Compact Broadband Metasurface Camera", type: "POSTER" },
  { num: 37, title: "Molmo2: Open Weights and Data for Vision-Language Models", type: "ORAL" },
  { num: 38, title: "Monocular Open-Vocabulary Occupancy Prediction for Indoor Scenes", type: "SPOTLIGHT" },
  { num: 39, title: "Native and Compact Structured Latents for 3D Generation", type: "POSTER" },
  { num: 40, title: "Natural Human Motion Recovery by Aligning High-Order Temporal", type: "SPOTLIGHT" },
  { num: 41, title: "NITROGEN: An Open Foundation Model for Generalist Gaming Agents", type: "ORAL" },
  { num: 42, title: "NUWA: Deriving Lightweight Class-Specific Vision Transformers", type: "POSTER" },
  { num: 43, title: "OLATVerse: Large-Scale Real-World Object Dataset with Precise Annotations", type: "POSTER" },
  { num: 44, title: "OpenDance: Multimodal Controllable 3D Dance Generation", type: "ORAL" },
  { num: 45, title: "PAI-Bench: Comprehensive Benchmark for Physical AI", type: "ORAL" },
  { num: 46, title: "PhyGAP: Physically-Grounded Gaussians with Polarization Cues", type: "ORAL" },
  { num: 47, title: "PixelDit: Pixel Diffusion Transformers for Image Generation", type: "ORAL" },
  { num: 48, title: "Plant Taxonomy Meets Plant Counting", type: "POSTER" },
  { num: 49, title: "Prophy: Progressive Physical Alignment for Dynamic World Simulation", type: "POSTER" },
  { num: 50, title: "ProxyGS: Unified Occlusion Priors for Training and Inference", type: "SPOTLIGHT" },
  { num: 51, title: "QuadSync: Quadrifocal Tensor Synchronization via Tucker Decomposition", type: "POSTER" },
  { num: 52, title: "R2Seg: Training-Free OOD Medical Tumor Segmentation", type: "POSTER" },
  { num: 53, title: "RefAV: Towards Planning-Centric Scenario Mining", type: "POSTER" },
  { num: 54, title: "Relightable HoloPorted Characters: Capturing and Relighting", type: "ORAL" },
  { num: 55, title: "Residual Primitive Fitting of 3D Shapes with SuperFrusta", type: "POSTER" },
  { num: 56, title: "Rethinking Dataset Distillation: Hard Truths About Soft Labels", type: "ORAL" },
  { num: 57, title: "Revisiting Geometric Obfuscation with Dual Convergent Lines", type: "POSTER" },
  { num: 58, title: "SAM-3D: 3DFY Anything in Images", type: "ORAL" },
  { num: 59, title: "SAM-3D Body: Robust Full-Body Human Mesh Recovery", type: "ORAL" },
  { num: 60, title: "SeaCache: Spectral-Evolution-Aware Cache for Accelerating Diffusion", type: "SPOTLIGHT" },
  { num: 61, title: "SeeGroup: Multilayer Depth Estimation of Transparent Surfaces", type: "POSTER" },
  { num: 62, title: "SmokeSVD: Smoke Reconstruction from a Single View", type: "POSTER" },
  { num: 63, title: "SoccerMaster: Vision Foundation Model for Soccer Understanding", type: "ORAL" },
  { num: 64, title: "SocialNav: Training Human-Inspired Foundation Model for Social Navigation", type: "POSTER" },
  { num: 65, title: "SparseWorldTC: Trajectory-Conditioned Sparse Occupancy World Model", type: "POSTER" },
  { num: 66, title: "TexVent: Asynchronous Event Data Simulation via Text Prompt", type: "POSTER" },
  { num: 67, title: "The Safari Dataset: Segment Anything in Footage of Animals", type: "ORAL" },
  { num: 68, title: "Thinking with Drafts: Speculative Temporal Reasoning", type: "SPOTLIGHT" },
  { num: 69, title: "Towards Photorealistic and Efficient Bokeh Rendering", type: "POSTER" },
  { num: 70, title: "U2Flow: Uncertainty-Aware Unsupervised Optical Flow Estimation", type: "POSTER" },
  { num: 71, title: "UnreflectAnything: RGB-Only Highlight Removal", type: "SPOTLIGHT" },
  { num: 72, title: "VGGT-Segmentor: Geometry-Enhanced Cross-View Segmentation", type: "ORAL" },
  { num: 73, title: "ViT3: Unlocking Test-Time Training in Vision", type: "ORAL" },
];

const typeColors: Record<string, string> = {
  ORAL: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  SPOTLIGHT: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  POSTER: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

export default function ResultsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">CVPR 2026 Award Candidates</h1>
        <p className="text-slate-400">73 papers • Interactive visualizations</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map((paper) => (
          <Link
            key={paper.num}
            href={`/results/${paper.num}`}
            className="group relative bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-slate-600 group-hover:text-blue-400 transition-colors">
                {String(paper.num).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm leading-snug line-clamp-3 group-hover:text-blue-200 transition-colors">
                  {paper.title}
                </h3>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${typeColors[paper.type]}`}>
                  {paper.type}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 group-hover:text-blue-400 transition-colors">
              <span>🎨 View visualization</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}