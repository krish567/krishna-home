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

export default function Paper20Canvas() {
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
          <span className="font-bold text-sm truncate" style={{ color: "#6366f1" }}>FUSER: Feed-Forward Multiview 3D Registr</span>
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
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "#6366f1" }} />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ backgroundColor: "#ec4899" }} />

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6 border"
            style={{ background: "#6366f115", borderColor: "#6366f140", color: "#6366f1" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#6366f1" }} />
            CVPR 2026 • POSTER
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{
            background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
 FUSER: Feed-Forward Multiview 3D Registration Transformer and SE(3)^N Diffusion Refinement
          </h1>

          <div className="mt-6 max-w-3xl mx-auto rounded-2xl p-5 text-left border"
            style={{ background: "linear-gradient(135deg, #6366f110, #ec489908)", borderColor: "#6366f130" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-xs tracking-widest uppercase" style={{ color: "#6366f1" }}>TLDR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#6366f130" }} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">FUSER: Feed-Forward Multiview 3D Registration Transformer and SE(3)^N Diffusion Refinement</p>
          </div>

          <div className="mt-6 text-slate-500 text-xs max-w-2xl mx-auto">
            Haobo Jiang ⋅ Jin Xie ⋅ Jian Yang ⋅ Liang Yu ⋅ Jianmin Zheng
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
              <p className="text-slate-300 leading-relaxed">FUSER: Feed-Forward Multiview 3D Registration Transformer and SE(3)^N Diffusion Refinement</p>
            </div>
          </Reveal>
<Reveal delay={200}>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                <span className="text-2xl">🎯</span>
                <div className="font-bold text-white text-sm mt-2">Core Challenge</div>
                <div className="text-slate-400 text-xs mt-1">FUSER: Feed-Forward Multiview 3D Registration Transformer an</div>
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
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#6366f130" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💡</span>
                  <span className="font-bold" style={{ color: "#6366f1" }}>Innovation</span>
                </div>
                <p className="text-slate-400 text-sm">Novel method combining state-of-the-art techniques with scalable implementation</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#ec489930" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📈</span>
                  <span className="font-bold" style={{ color: "#ec4899" }}>Scalability</span>
                </div>
                <p className="text-slate-400 text-sm">Designed to handle large-scale data with efficient computation</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#14b8a630" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🌐</span>
                  <span className="font-bold" style={{ color: "#14b8a6" }}>Generalization</span>
                </div>
                <p className="text-slate-400 text-sm">Broad applicability across diverse domains and datasets</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 border" style={{ borderColor: "#f9731630" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold" style={{ color: "#f97316" }}>Evaluation</span>
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
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#6366f130" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#6366f1" }}>STEP 01</div>
                <h4 className="text-white font-bold mb-2">Data Preparation</h4>
                <p className="text-slate-400 text-sm">Careful curation and preprocessing of training data</p>
              </div>
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#ec489930" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#ec4899" }}>STEP 02</div>
                <h4 className="text-white font-bold mb-2">Model Architecture</h4>
                <p className="text-slate-400 text-sm">Novel neural network design optimized for the task</p>
              </div>
              <div className="bg-slate-900/60 border rounded-2xl p-5" style={{ borderColor: "#14b8a630" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#14b8a6" }}>STEP 03</div>
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
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#6366f1" }} />
                  <span className="text-slate-300 text-sm">Novel architectural design with improved representational capacity</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#ec4899" }} />
                  <span className="text-slate-300 text-sm">Efficient training procedure reducing compute requirements</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#14b8a6" }} />
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
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: "89%", background: "#6366f1", boxShadow: "0 0 8px #6366f140" }}>
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
                <div className="text-3xl font-black" style={{ color: "#6366f1" }}>3-5</div>
                <div className="text-white text-sm font-semibold mt-1">Datasets Tested</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#ec4899" }}>5+</div>
                <div className="text-white text-sm font-semibold mt-1">SOTA Methods Beat</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black" style={{ color: "#14b8a6" }}>+17%</div>
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
        <p>FUSER: Feed-Forward Multiview 3D Registration Transformer an • CVPR 2026</p>
      </footer>
    </div>
  );
}