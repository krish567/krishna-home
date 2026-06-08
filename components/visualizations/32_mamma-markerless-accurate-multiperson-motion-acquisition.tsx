"use client";

export default function PaperViz_32({ title, authors, type }: { title: string; authors: string; type: string }) {
  const stages = ["Input", "Processing", "Enhancement", "Output"];
  const progress = 89;
  
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"}}>
      <h3 className="text-white font-bold text-lg mb-1">{title.slice(0, 50)}...</h3>
      <p className="text-slate-400 text-xs mb-6">{authors.slice(0, 50)}...</p>
      <div className="flex items-center justify-between mb-4">
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{
              background: i < Math.floor(progress / 25) ? "#06b6d4" : "#334155",
              color: i < Math.floor(progress / 25) ? "#fff" : "#64748b",
              boxShadow: i < Math.floor(progress / 25) ? "0 0 20px #06b6d460" : "none"
            }}>{i + 1}</div>
            <span className="text-xs" style={{color: i < Math.floor(progress / 25) ? "#06b6d4" : "#64748b"}}>{s}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{width: progress + "%", background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", boxShadow: "0 0 10px #06b6d460"}} />
      </div>
      <p className="text-right text-xs mt-1 text-slate-400">{progress}% complete</p>
    </div>
  );
};
