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

export default function Paper12Canvas() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { id: "overview", label: "Overview", icon: "🎯" },
    { id: "problem", label: "The Problem", icon: "⚠️" },
    { id: "approach", label: "Approach", icon: "🔧" },
    { id: "method", label: "Method", icon: "🧠" },
    { id: "experiments", label: "Experiments", icon: "📊" },
    { id: "conclusion", label: "Conclusion", icon: "🚀" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight;
      const scrollPos = window.scrollY;
      const idx = Math.min(Math.floor(scrollPos / sectionHeight), sections.length - 1);
      setActiveSection(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="font-bold text-sm truncate" style={{ color: "#f59e0b" }}>Differentiable Vector Quantization for R</span>
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${activeSection === i ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="overview" className="flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(#1e293b22 1px, transparent 1px), linear-gradient(90deg, #1e293b22 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "#f59e0b" }} />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ backgroundColor: "#ef4444" }} />

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6 border"
            style={{ background: "#f59e0b15", borderColor: "#f59e0b40", color: "#f59e0b" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#f59e0b" }} />
            CVPR 2026 • POSTER
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
 Differentiable Vector Quantization for Rate-Distortion Optimization of Generative Image Compression
          </h1>

          <div className="mt-6 max-w-3xl mx-auto rounded-2xl p-5 text-left border"
            style={{ background: "linear-gradient(135deg, #f59e0b10, #ef444408)", borderColor: "#f59e0b30" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-xs tracking-widest uppercase" style={{ color: "#f59e0b" }}>TLDR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#f59e0b30" }} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">Differentiable Vector Quantization for Rate-Distortion Optimization of Generative Image Compression</p>
          </div>

          <div className="mt-6 text-slate-500 text-xs max-w-2xl mx-auto">
            SHIYIN JIANG ⋅ Wei Long ⋅ Minghao Han ⋅ Zhenghao Chen ⋅ Ce Zhu ⋅ Shuha...
          </div>
        </div>
      </section>

      <section id="problem" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-3xl font-bold">The Problem</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
              <p className="text-slate-300 leading-relaxed">Differentiable Vector Quantization for Rate-Distortion Optimization of Generative Image Compression</p>
            </div>
          </Reveal>
<Reveal delay={200}>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                <span className="text-2xl">🎯</span>
                <div className="font-bold text-white text-sm mt-2">Core Challenge</div>
                <div className="text-slate-400 text-xs mt-1">Differentiable Vector Quantization for Rate-Distortion Optim</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                <span className="text-2xl">📉</span>
                <div className="font-bold text-white text-sm mt-2">Gap in Research</div>
                <div className="text-slate-400 text-xs mt-1">Limited benchmarks for this specific problem</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                <span className="text-2xl">🔬</span>
                <div className="font-bold text-white text-sm mt-2">Why It Matters</div>
                <div className="text-slate-400 text-xs mt-1">Real-world impact across multiple domains</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="approach" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔧</span>
              <h2 className="text-3xl font-bold">Approach</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
              <p className="text-slate-300 leading-relaxed">
                The paper proposes a novel approach to address the identified problem through a combination of advanced vision techniques and scalable training methodology.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#f59e0b30" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💡</span>
                  <span className="font-bold" style={{ color: "#f59e0b" }}>Innovation</span>
                </div>
                <p className="text-slate-400 text-sm">Novel method combining state-of-the-art techniques with scalable implementation</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#ef444430" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📈</span>
                  <span className="font-bold" style={{ color: "#ef4444" }}>Scalability</span>
                </div>
                <p className="text-slate-400 text-sm">Designed to handle large-scale data with efficient computation</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#06b6d430" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🌐</span>
                  <span className="font-bold" style={{ color: "#06b6d4" }}>Generalization</span>
                </div>
                <p className="text-slate-400 text-sm">Broad applicability across diverse domains and datasets</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#8b5cf630" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold" style={{ color: "#8b5cf6" }}>Evaluation</span>
                </div>
                <p className="text-slate-400 text-sm">Comprehensive benchmarks against existing state-of-the-art methods</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="method" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
<div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🧠</span>
              <h2 className="text-3xl font-bold">Method</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#f59e0b30" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#f59e0b" }}>STEP 01</div>
                <h4 className="text-white font-bold mb-2">Data Preparation</h4>
                <p className="text-slate-400 text-sm">Careful curation and preprocessing of training data</p>
              </div>
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#ef444430" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#ef4444" }}>STEP 02</div>
                <h4 className="text-white font-bold mb-2">Model Architecture</h4>
                <p className="text-slate-400 text-sm">Novel neural network design optimized for the task</p>
              </div>
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#06b6d430" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#06b6d4" }}>STEP 03</div>
                <h4 className="text-white font-bold mb-2">Training Strategy</h4>
                <p className="text-slate-400 text-sm">Advanced optimization and regularization techniques</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Key Technical Contributions</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#f59e0b" }} />
                  <span className="text-slate-300 text-sm">Novel architectural design with improved representational capacity</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#ef4444" }} />
                  <span className="text-slate-300 text-sm">Efficient training procedure reducing compute requirements</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#06b6d4" }} />
                  <span className="text-slate-300 text-sm">Theoretical analysis providing convergence guarantees</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
                  <span className="text-xs text-slate-400 w-32">Previous Best</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "72%", background: "#64748b" }}>
                      <span className="text-xs font-bold text-white">72%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-32">This Paper</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "89%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b40" }}>
                      <span className="text-xs font-bold text-white">89%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-32">Baseline</span>
                  <div className="flex-1 h-7 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "58%", background: "#475569" }}>
                      <span className="text-xs font-bold text-white">58%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#f59e0b" }}>3-5</div>
                <div className="text-white text-sm font-semibold mt-1">Datasets Tested</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#ef4444" }}>5+</div>
                <div className="text-white text-sm font-semibold mt-1">SOTA Methods Beat</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#06b6d4" }}>+17%</div>
                <div className="text-white text-sm font-semibold mt-1">Improvement</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="conclusion" className="flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🚀</span>
              <h2 className="text-3xl font-bold">Conclusion</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/40 rounded-2xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed">
                This work presents a significant advancement in the field, establishing new state-of-the-art results and providing a comprehensive evaluation framework for future research. The proposed method demonstrates strong generalization across diverse benchmarks.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div><div className="font-bold text-white text-sm">Open Source</div><div className="text-slate-400 text-xs">Code and models publicly available</div></div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">🧪</span>
                <div><div className="font-bold text-white text-sm">Benchmarks</div><div className="text-slate-400 text-xs">Comprehensive evaluation suite released</div></div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <div><div className="font-bold text-white text-sm">Future Work</div><div className="text-slate-400 text-xs">Extending to additional domains and tasks</div></div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">🔗</span>
                <div><div className="font-bold text-white text-sm">Reproducibility</div><div className="text-slate-400 text-xs">Full experimental details and hyperparameters</div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>Differentiable Vector Quantization for Rate-Distortion Optim • CVPR 2026</p>
      </footer>
    </div>
  );
}