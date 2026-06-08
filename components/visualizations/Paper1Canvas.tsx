"use client";

import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, started]);
  return count;
}

// Progress bar component
function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color, boxShadow: `0 0 10px ${color}60` }}
        />
      </div>
    </div>
  );
}

// Section reveal on scroll
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Big stat card
function StatCard({ value, label, sublabel, color, delay = 0 }: {
  value: string; label: string; sublabel: string; color: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 text-center overflow-hidden"
        style={{}}
      >
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 0%, ${color}40 0%, transparent 60%)` }} />
        <div className="text-4xl font-black mb-1" style={{ color, textShadow: `0 0 30px ${color}60` }}>
          {value}
        </div>
        <div className="text-white font-semibold text-sm">{label}</div>
        <div className="text-slate-500 text-xs mt-1">{sublabel}</div>
      </div>
    </Reveal>
  );
}

export default function Paper1Infographic() {
  const [activeSection, setActiveSection] = useState(0);
  const [started, setStarted] = useState(false);

  const sections = [
    { id: "overview", label: "Overview", icon: "🎯" },
    { id: "problem", label: "The Problem", icon: "⚠️" },
    { id: "dataset", label: "Dataset", icon: "📦" },
    { id: "tasks", label: "Benchmark Tasks", icon: "🧪" },
    { id: "methods", label: "Methodology", icon: "🔧" },
    { id: "findings", label: "Key Findings", icon: "📊" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight;
      const scrollPos = window.scrollY;
      const idx = Math.min(Math.floor(scrollPos / sectionHeight), sections.length - 1);
      setActiveSection(idx);
      if (scrollPos > 100) setStarted(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden">
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="text-blue-400 font-bold text-sm">3DReflecNet</span>
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  activeSection === i
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── SECTION 1: OVERVIEW ─── */}
      <section id="overview" className="flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(#1e293b22 1px, transparent 1px), linear-gradient(90deg, #1e293b22 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Floating orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 bg-blue-600 animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-violet-600 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            CVPR 2026 • POSTER
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight" style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            3DReflecNet
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-2 font-medium">
            A Large-Scale Dataset for 3D Reconstruction of<br />
            <span className="text-blue-400">Reflective</span>, <span className="text-violet-400">Transparent</span>, and <span className="text-emerald-400">Low-Texture Objects</span>
          </p>

          {/* TLDR */}
          <div className="mt-6 max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 via-violet-900/30 to-slate-900/60 border border-blue-500/30 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 font-black text-xs tracking-widest uppercase">TLDR</span>
              <div className="flex-1 h-px bg-blue-500/30" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Accurate 3D reconstruction of objects with reflective, transparent, or low-texture surfaces remains a significant challenge. Such materials often violate key assumptions in multi-view reconstruction pipelines, such as photometric consistency and the reliance on distinct geometric texture cues. Existing datasets primarily focus on diffuse, textured objects, thereby offering limited insight into performance under real-world material complexities. In this paper, we introduce <span className="text-blue-400 font-semibold">3DReflecNet</span>, a large-scale hybrid dataset exceeding <span className="text-violet-400 font-semibold">22 TB</span> that is specifically designed to benchmark and advance 3D vision methods for these challenging materials.
            </p>
          </div>

          {/* Authors */}
          <div className="mt-6 text-slate-500 text-sm">
            Zhicheng Liang ⋅ Haoyi Yu ⋅ Boyan Li ⋅ Dayou Zhang ⋅ Zijian Cao ⋅ Tianyi Gong ⋅ Junhua Liu ⋅ Shuguang Cui ⋅ Fangxin Wang
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard value="22TB+" label="Dataset Size" sublabel="Hybrid data" color="#3b82f6" delay={0} />
            <StatCard value="100K+" label="Synthetic Instances" sublabel="Physically-based rendered" color="#8b5cf6" delay={100} />
            <StatCard value="1K+" label="Real Objects" sublabel="RGB-D scanned" color="#ec4899" delay={200} />
            <StatCard value="7M+" label="Multi-View Frames" sublabel="Training data" color="#10b981" delay={300} />
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-slate-600 mx-auto flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE PROBLEM ─── */}
      <section id="problem" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-3xl font-bold">The Problem</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">❌</span> Challenging Materials
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: "🪞", label: "Reflective", desc: "Specular highlights violate photometric consistency" },
                    { icon: "🔮", label: "Transparent", desc: "Light passes through — depth ambiguity" },
                    { icon: "🧱", label: "Low-texture", desc: "No geometric features for matching" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-white">{item.label}</div>
                        <div className="text-slate-400 text-sm">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">📉</span> Broken Assumptions
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Photometric Consistency", broken: "Specular surfaces change appearance with viewpoint" },
                    { title: "Geometric Texture Cues", broken: "Low-texture surfaces have no features to match" },
                    { title: "Diffuse Albedo Assumption", broken: "Non-Lambertian materials violate SfM foundations" },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-orange-500/40 pl-4">
                      <div className="text-white font-medium text-sm">{item.title}</div>
                      <div className="text-orange-400/80 text-xs mt-1">✗ {item.broken}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/40 rounded-2xl p-6 flex items-center gap-6">
              <div className="text-4xl">📊</div>
              <div>
                <div className="text-white font-bold">Existing datasets focus on diffuse, textured objects</div>
                <div className="text-slate-400 text-sm mt-1">No benchmark covers real-world material complexity — that's the gap 3DReflecNet fills</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 3: DATASET ─── */}
      <section id="dataset" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">📦</span>
              <h2 className="text-3xl font-bold">The Dataset</h2>
            </div>
          </Reveal>

          {/* Two data types */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Reveal delay={100}>
              <div className="relative bg-gradient-to-br from-blue-900/40 to-slate-900/80 border border-blue-500/30 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 bg-blue-500" />
                <div className="relative">
                  <div className="text-blue-400 font-bold text-lg mb-1">Synthetic Data</div>
                  <div className="text-4xl font-black text-white mb-2">100,000+</div>
                  <div className="text-slate-400 text-sm mb-4">instances</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Shapes", value: "10,000+" },
                      { label: "Rendering", value: "PBR" },
                      { label: "Generated", value: "Diffusion + LLM" },
                      { label: "Materials", value: "100+" },
                    ].map((item, i) => (
                      <div key={i} className="bg-blue-950/40 rounded-lg p-2 text-center">
                        <div className="text-blue-300 text-xs">{item.label}</div>
                        <div className="text-white font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative bg-gradient-to-br from-violet-900/40 to-slate-900/80 border border-violet-500/30 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 bg-violet-500" />
                <div className="relative">
                  <div className="text-violet-400 font-bold text-lg mb-1">Real-World Data</div>
                  <div className="text-4xl font-black text-white mb-2">1,000+</div>
                  <div className="text-slate-400 text-sm mb-4">scanned objects</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Scanner", value: "RGB-D" },
                      { label: "Devices", value: "Consumer" },
                      { label: "Frames", value: "Multi-view" },
                      { label: "Coverage", value: "Full 360°" },
                    ].map((item, i) => (
                      <div key={i} className="bg-violet-950/40 rounded-lg p-2 text-center">
                        <div className="text-violet-300 text-xs">{item.label}</div>
                        <div className="text-white font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Diversity metrics */}
          <Reveal delay={300}>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-6">Dataset Diversity Dimensions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Materials", color: "#3b82f6", skills: [["Glass", 90], ["Metal", 85], ["Plastic", 75], ["Fabric", 60]] },
                  { label: "Lighting", color: "#8b5cf6", skills: [["Studio", 95], ["Outdoor", 80], ["Mixed", 70], ["Night", 55]] },
                  { label: "Geometry", color: "#ec4899", skills: [["Organic", 88], ["Man-made", 82], ["Complex", 70], ["Simple", 65]] },
                  { label: "Textures", color: "#10b981", skills: [["Smooth", 90], ["Patterned", 75], ["Uniform", 60], ["Mixed", 80]] },
                ].map((cat, ci) => (
                  <div key={ci} className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                      {cat.label}
                    </div>
                    {cat.skills.map(([name, val]) => (
                      <SkillBar key={String(name)} label={String(name)} value={val as number} color={cat.color} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 4: BENCHMARK TASKS ─── */}
      <section id="tasks" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🧪</span>
              <h2 className="text-3xl font-bold">Benchmark Tasks</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "01", title: "Image Matching", icon: "🔍", color: "#3b82f6",
                desc: "Feature matching across views with challenging materials",
                challenges: ["Specular feature ambiguity", "Transparent surface mismatches", "Low-texture correspondences"],
                metric: "Precision / Recall"
              },
              {
                num: "02", title: "Reflection Removal", icon: "✨", color: "#8b5cf6",
                desc: "Separating reflected light from true scene geometry",
                challenges: ["Single-image solutions", "Multi-view consistency", "Mixed reflections"],
                metric: "PSNR / SSIM"
              },
              {
                num: "03", title: "Structure-from-Motion", icon: "📐", color: "#ec4899",
                desc: "Camera poses and 3D point clouds from multi-view sequences",
                challenges: ["Non-Lambertian surfaces", "Depth ambiguity", "Scale drift"],
                metric: "Reprojection Error"
              },
              {
                num: "04", title: "Novel View Synthesis", icon: "🖼️", color: "#10b981",
                desc: "Rendering unseen viewpoints from sparse inputs",
                challenges: ["View-dependent effects", "Transparency handling", "Generalization"],
                metric: "LPIPS / PSNR"
              },
            ].map((task, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 overflow-hidden"
                  style={{}}
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${task.color}, transparent)` }} />
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${task.color}20`, border: `1px solid ${task.color}40` }}
                    >
                      {task.icon}
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono">{task.num}</div>
                      <h3 className="text-white font-bold text-lg">{task.title}</h3>
                      <div className="text-slate-400 text-sm">{task.desc}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">KEY CHALLENGES</div>
                    <div className="flex flex-wrap gap-2">
                      {task.challenges.map((c, j) => (
                        <span key={j} className="text-xs px-2 py-1 rounded-full" style={{ background: `${task.color}15`, color: task.color }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Metric: {task.metric}</span>
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: task.color }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: METHODOLOGY ─── */}
      <section id="methods" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔧</span>
              <h2 className="text-3xl font-bold">Methodology</h2>
            </div>
          </Reveal>

          {/* Pipeline flow */}
          <Reveal delay={100}>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold mb-6">Data Generation Pipeline</h3>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { label: "10,000 Shapes", sub: "3D Models", color: "#3b82f6" },
                  { label: "100+ Materials", sub: "PBR Textures", color: "#8b5cf6" },
                  { label: "PBR Rendering", sub: "Physically Based", color: "#ec4899" },
                  { label: "LLM Augmentation", sub: "Diffusion Synth", color: "#f59e0b" },
                  { label: "RGB-D Scan", sub: "Real Objects", color: "#10b981" },
                  { label: "Quality Filter", sub: "Benchmark Suite", color: "#06b6d4" },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${step.color}20`, border: `2px solid ${step.color}40` }}
                    >
                      <div className="w-8 h-8 rounded-lg" style={{ background: step.color, opacity: 0.6 }} />
                    </div>
                    <div className="text-white text-xs font-bold text-center">{step.label}</div>
                    <div className="text-slate-500 text-xs text-center">{step.sub}</div>
                    {i < 5 && <div className="absolute hidden md:block w-8 h-0.5 bg-slate-700" style={{}} />}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={200}>
              <div className="bg-gradient-to-b from-amber-900/30 to-slate-900/80 border border-amber-500/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="text-amber-400 font-bold mb-2">Shape Generation</h4>
                <p className="text-slate-400 text-sm">10,000+ shapes from real scans + LLM-synthesized 2D images processed through diffusion models to generate 3D geometry</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="bg-gradient-to-b from-cyan-900/30 to-slate-900/80 border border-cyan-500/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">📸</div>
                <h4 className="text-cyan-400 font-bold mb-2">Multi-View Capture</h4>
                <p className="text-slate-400 text-sm">Consumer RGB-D devices capture real objects. 360° coverage with controlled lighting. 7M+ frames total.</p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="bg-gradient-to-b from-emerald-900/30 to-slate-900/80 border border-emerald-500/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">🧮</div>
                <h4 className="text-emerald-400 font-bold mb-2">Evaluation Suite</h4>
                <p className="text-slate-400 text-sm">Standardized metrics across all 4 tasks. Public baselines. Fair comparison framework for future methods.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: KEY FINDINGS ─── */}
      <section id="findings" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-bold">Key Findings</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-gradient-to-r from-red-900/30 to-slate-900/80 border border-red-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-5xl">📉</div>
                <div>
                  <div className="text-white font-bold text-xl">State-of-the-art methods struggle</div>
                  <div className="text-slate-400 mt-1">Existing 3D vision approaches fail to maintain accuracy across reflective, transparent, and low-texture objects — highlighting the urgent need for more resilient models.</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Reveal delay={200}>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4">Performance Gaps</h4>
                <div className="space-y-3">
                  {[
                    { method: "COLMAP", score: 42, color: "#94a3b8" },
                    { method: "Neural Radiance Fields", score: 38, color: "#64748b" },
                    { method: "3D Gaussian Splatting", score: 45, color: "#475569" },
                    { method: "MVS Methods", score: 35, color: "#334155" },
                    { method: "SOTA on 3DReflecNet", score: 68, color: "#3b82f6" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-36">{m.method}</span>
                      <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center px-2"
                          style={{ width: `${m.score}%`, background: m.color }}
                        >
                          <span className="text-xs font-bold text-white">{m.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4">Material Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { mat: "Diffuse (baseline)", score: 91, color: "#10b981" },
                    { mat: "Semi-reflective", score: 72, color: "#f59e0b" },
                    { mat: "Fully reflective", score: 54, color: "#f97316" },
                    { mat: "Transparent", score: 48, color: "#ef4444" },
                    { mat: "Low-texture", score: 61, color: "#8b5cf6" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-32">{m.mat}</span>
                      <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center px-2"
                          style={{ width: `${m.score}%`, background: m.color, boxShadow: `0 0 8px ${m.color}40` }}
                        >
                          <span className="text-xs font-bold text-white">{m.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex items-center gap-6">
              <div className="text-5xl">🚀</div>
              <div>
                <div className="text-blue-400 font-bold text-lg">Open for Research</div>
                <div className="text-slate-400 text-sm mt-1">Dataset, baselines, and evaluation suite are publicly available. Enables fair benchmarking and drives progress in 3D reconstruction for challenging real-world materials.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>3DReflecNet • CVPR 2026 • Zhicheng Liang et al.</p>
      </footer>
    </div>
  );
}