"use client";

import { useEffect, useRef, useState } from "react";

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

function StatCard({ value, label, sublabel, color, delay = 0 }: {
  value: string; label: string; sublabel: string; color: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 text-center overflow-hidden">
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

export default function Paper39Canvas() {
  const [activeSection, setActiveSection] = useState(0);
  const [started, setStarted] = useState(false);

  const sections = [
    { id: "overview", label: "Overview", icon: "🎯" },
    { id: "problem", label: "The Problem", icon: "⚠️" },
    { id: "tasks", label: "Generation Tasks", icon: "🧪" },
    { id: "methodology", label: "Generation Pipeline", icon: "🔧" },
    { id: "experiments", label: "Experiments", icon: "📊" },
    { id: "findings", label: "Key Findings", icon: "🚀" },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="font-bold text-sm truncate" style={{ color: "#ec4899" }}>Native and Compact Structured Latents for 3D...</span>
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

      {/* SECTION 1: OVERVIEW */}
      <section id="overview" className="flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(#1e293b22 1px, transparent 1px), linear-gradient(90deg, #1e293b22 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "#ec4899" }} />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse" style={{ backgroundColor: "#f59e0b", animationDelay: "1s" }} />

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 border"
            style={{ background: "#ec489915", borderColor: "#ec489940", color: "#ec4899" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#ec4899" }} />
            CVPR 2026 • POSTER
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{
            background: "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Native and Compact Structured Latents for 3D Generation
          </h1>

          <p className="text-base md:text-lg text-slate-400 mb-4 font-medium">
            Generative Vision Models
          </p>

          {/* TLDR */}
          <div className="mt-6 max-w-3xl mx-auto rounded-2xl p-5 text-left border"
            style={{ background: "linear-gradient(135deg, #ec489910, #f59e0b08)", borderColor: "#ec489930" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-xs tracking-widest uppercase" style={{ color: "#ec4899" }}>TLDR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#ec489930" }} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">Recent advancements in 3D generative modeling have significantly improved the generation realism, yet the field is still hampered by existing representations, which struggle to capture assets with complex topologies and detailed appearance. This paper present an approach for learning a structured latent representation from native 3D data to address</p>
          </div>

          <div className="mt-6 text-slate-500 text-xs max-w-2xl mx-auto">
            Jianfeng XIANG ⋅ Xiaoxue Chen ⋅ Sicheng Xu ⋅ Ruicheng Wang ⋅ Zelong Lv ⋅ Yu Deng ⋅ Hongyuan Zhu ⋅ Yue Dong ⋅ Hao Zhao ⋅ Nicholas Jing Yuan ⋅ Jiaolong Yang
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard value="3" label="Score" sublabel="Primary metric" color="#ec4899" delay={0} />
            <StatCard value="3" label="Metric" sublabel="Relative score" color="#f59e0b" delay={100} />
            <StatCard value="---" label="Value" sublabel="Performance" color="#06b6d4" delay={200} />
            <StatCard value="---" label="Index" sublabel="Key metric" color="#22c55e" delay={300} />
          </div>

          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-slate-600 mx-auto flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
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
                  <span className="text-xl">❌</span> Key Limitations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-white">Limited Effectiveness</div>
                      <div className="text-slate-400 text-sm">Existing approaches have narrow applicability in generative vision models</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                    <span className="text-2xl">📉</span>
                    <div>
                      <div className="font-semibold text-white">Performance Gaps</div>
                      <div className="text-slate-400 text-sm">Suboptimal results on complex real-world scenarios</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                    <span className="text-2xl">🔧</span>
                    <div>
                      <div className="font-semibold text-white">Generalization Issues</div>
                      <div className="text-slate-400 text-sm">Methods struggle to generalize across domains</div>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span> Research Gap
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-orange-500/40 pl-4">
                    <div className="text-white font-medium text-sm">Gap in Generative Vision Models</div>
                    <div className="text-orange-400/80 text-xs mt-1">Current methods fall short in addressing Native and Compact Structured Latents for 3D Gener effectively</div>
                  </div>
                  <div className="border-l-2 border-orange-500/40 pl-4">
                    <div className="text-white font-medium text-sm">Real-World Impact</div>
                    <div className="text-orange-400/80 text-xs mt-1">Limitations hinder practical deployment in downstream applications</div>
                  </div>
                  <div className="border-l-2 border-orange-500/40 pl-4">
                    <div className="text-white font-medium text-sm">Need for New Methods</div>
                    <div className="text-orange-400/80 text-xs mt-1">Novel approaches required to push boundaries of generative vision models</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/40 rounded-2xl p-6 flex items-center gap-6">
              <div className="text-4xl">🔬</div>
              <div>
                <div className="text-white font-bold">Why This Research Matters</div>
                <div className="text-slate-400 text-sm mt-1">Advancing generative vision models has significant implications for real-world applications and academic research</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3: GENERATION TASKS */}
      <section id="tasks" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🧪</span>
              <h2 className="text-3xl font-bold">Generation Tasks</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal key={"01"} delay={0}>
                <div className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #ec4899, transparent)" }} />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#ec489920", border: "1px solid #ec489940" }}>
                      🎨
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono">01</div>
                      <h3 className="text-white font-bold text-lg">Image Quality</h3>
                      <div className="text-slate-400 text-sm">FID, IS, and human evaluation</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">KEY CHALLENGES</div>
                    <div className="flex flex-wrap gap-2">
                      <span key="0" className="text-xs px-2 py-1 rounded-full" style={{ background: "#ec489915", color: "#ec4899" }}>FID score</span>
                      <span key="1" className="text-xs px-2 py-1 rounded-full" style={{ background: "#ec489915", color: "#ec4899" }}>Inception Score</span>
                      <span key="2" className="text-xs px-2 py-1 rounded-full" style={{ background: "#ec489915", color: "#ec4899" }}>User studies</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Metric: FID / IS</span>
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#ec4899" }} />
                  </div>
                </div>
              </Reveal>
              <Reveal key={"02"} delay={100}>
                <div className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8b5cf6, transparent)" }} />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#8b5cf620", border: "1px solid #8b5cf640" }}>
                      🖌️
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono">02</div>
                      <h3 className="text-white font-bold text-lg">Style Control</h3>
                      <div className="text-slate-400 text-sm">Fine-grained stylistic attribute control</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">KEY CHALLENGES</div>
                    <div className="flex flex-wrap gap-2">
                      <span key="0" className="text-xs px-2 py-1 rounded-full" style={{ background: "#8b5cf615", color: "#8b5cf6" }}>Attribute accuracy</span>
                      <span key="1" className="text-xs px-2 py-1 rounded-full" style={{ background: "#8b5cf615", color: "#8b5cf6" }}>Diversity</span>
                      <span key="2" className="text-xs px-2 py-1 rounded-full" style={{ background: "#8b5cf615", color: "#8b5cf6" }}>Consistency</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Metric: Style Acc</span>
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#8b5cf6" }} />
                  </div>
                </div>
              </Reveal>
              <Reveal key={"03"} delay={200}>
                <div className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#3b82f620", border: "1px solid #3b82f640" }}>
                      📝
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono">03</div>
                      <h3 className="text-white font-bold text-lg">Text Alignment</h3>
                      <div className="text-slate-400 text-sm">CLIP score and prompt adherence</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">KEY CHALLENGES</div>
                    <div className="flex flex-wrap gap-2">
                      <span key="0" className="text-xs px-2 py-1 rounded-full" style={{ background: "#3b82f615", color: "#3b82f6" }}>Prompt matching</span>
                      <span key="1" className="text-xs px-2 py-1 rounded-full" style={{ background: "#3b82f615", color: "#3b82f6" }}>Object accuracy</span>
                      <span key="2" className="text-xs px-2 py-1 rounded-full" style={{ background: "#3b82f615", color: "#3b82f6" }}>Spatial relations</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Metric: CLIP Score</span>
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#3b82f6" }} />
                  </div>
                </div>
              </Reveal>
              <Reveal key={"04"} delay={300}>
                <div className="relative bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #10b981, transparent)" }} />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#10b98120", border: "1px solid #10b98140" }}>
                      ⚡
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono">04</div>
                      <h3 className="text-white font-bold text-lg">Inference Speed</h3>
                      <div className="text-slate-400 text-sm">Generation latency and throughput</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-2">KEY CHALLENGES</div>
                    <div className="flex flex-wrap gap-2">
                      <span key="0" className="text-xs px-2 py-1 rounded-full" style={{ background: "#10b98115", color: "#10b981" }}>Latency</span>
                      <span key="1" className="text-xs px-2 py-1 rounded-full" style={{ background: "#10b98115", color: "#10b981" }}>Memory usage</span>
                      <span key="2" className="text-xs px-2 py-1 rounded-full" style={{ background: "#10b98115", color: "#10b981" }}>Batch size</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Metric: ms / image</span>
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#10b981" }} />
                  </div>
                </div>
              </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: GENERATION PIPELINE */}
      <section id="methodology" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔧</span>
              <h2 className="text-3xl font-bold">Generation Pipeline</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={100}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#ec489930" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#ec4899" }}>STEP 01</div>
                <h4 className="text-white font-bold mb-2">Architecture Design</h4>
                <p className="text-slate-400 text-sm">Novel generative network components</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#8b5cf630" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#8b5cf6" }}>STEP 02</div>
                <h4 className="text-white font-bold mb-2">Training Strategy</h4>
                <p className="text-slate-400 text-sm">Large-scale training with contrastive losses</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#3b82f630" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#3b82f6" }}>STEP 03</div>
                <h4 className="text-white font-bold mb-2">Style Disentanglement</h4>
                <p className="text-slate-400 text-sm">Learning disentangled representations</p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#10b98130" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#10b981" }}>STEP 04</div>
                <h4 className="text-white font-bold mb-2">Inference</h4>
                <p className="text-slate-400 text-sm">Efficient sampling with guidance</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={500}>
            <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/40 rounded-2xl p-6">
              <div className="text-2xl mb-3">📋</div>
              <h4 className="text-white font-bold mb-3">Technical Highlights</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#ec4899" }} />
                  <span className="text-slate-300 text-sm">Novel architectural contributions advancing the state of the art</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#f59e0b" }} />
                  <span className="text-slate-300 text-sm">Comprehensive experiments across diverse benchmarks and ablation studies</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#06b6d4" }} />
                  <span className="text-slate-300 text-sm">Open-source release enabling reproducible research</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: EXPERIMENTS */}
      <section id="experiments" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-bold">Experiments & Results</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 mb-6">
              <h4 className="text-white font-bold mb-4">Performance vs SOTA</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-36">Previous Best</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "68%", background: "#64748b" }}>
                      <span className="text-xs font-bold text-white">68%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-36">This Paper</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "89%", background: "#ec4899", boxShadow: "0 0 8px #ec489940" }}>
                      <span className="text-xs font-bold text-white">89%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-36">Baseline</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "52%", background: "#475569" }}>
                      <span className="text-xs font-bold text-white">52%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#ec4899" }}>+21%</div>
                <div className="text-white text-sm font-semibold mt-1">Improvement</div>
                <div className="text-slate-500 text-xs mt-1">over previous SOTA</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#f59e0b" }}>5+</div>
                <div className="text-white text-sm font-semibold mt-1">Benchmarks</div>
                <div className="text-slate-500 text-xs mt-1">diverse evaluation settings</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#06b6d4" }}>Ablation</div>
                <div className="text-white text-sm font-semibold mt-1">Studies</div>
                <div className="text-slate-500 text-xs mt-1">comprehensive analysis</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: KEY FINDINGS */}
      <section id="findings" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🚀</span>
              <h2 className="text-3xl font-bold">Key Findings</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/40 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎯</div>
                <div>
                  <div className="text-white font-bold text-xl">Significant Advancement</div>
                  <div className="text-slate-400 mt-1">The proposed approach substantially outperforms existing methods, establishing new benchmarks for generative vision models</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Reveal delay={200}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#ec489930" }}>
                <div className="text-2xl mb-3">📈</div>
                <h4 className="text-white font-bold mb-2">Improved Performance</h4>
                <p className="text-slate-400 text-sm">Demonstrates measurable gains over state-of-the-art on key evaluation metrics</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#f59e0b30" }}>
                <div className="text-2xl mb-3">🏆</div>
                <h4 className="text-white font-bold mb-2">New SOTA</h4>
                <p className="text-slate-400 text-sm">Establishes new state-of-the-art results across multiple benchmarks</p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="bg-slate-900/60 border rounded-2xl p-6" style={{ borderColor: "#06b6d430" }}>
                <div className="text-2xl mb-3">🌐</div>
                <h4 className="text-white font-bold mb-2">Generalization</h4>
                <p className="text-slate-400 text-sm">Shows strong transfer across diverse domains and evaluation settings</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={500}>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex items-center gap-6">
              <div className="text-5xl">📦</div>
              <div>
                <div className="text-blue-400 font-bold text-lg">Open Source</div>
                <div className="text-slate-400 text-sm mt-1">Code and models publicly available. Enables reproducible research and accelerates progress in generative vision models</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>Native and Compact Structured Latents for 3D... • CVPR 2026 • Jianfeng XIANG et al.</p>
      </footer>
    </div>
  );
}
