"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: "Accuracy", A: 86, fullMark: 100 },
  { subject: "Speed", A: 71, fullMark: 100 },
  { subject: "Robustness", A: 75, fullMark: 100 },
  { subject: "Generalization", A: 60, fullMark: 100 },
  { subject: "Efficiency", A: 83, fullMark: 100 },
  { subject: "Scalability", A: 86, fullMark: 100 },
];

export default function PaperViz_09({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(180deg, #0f172a 0%, #0c1425 100%)"}}>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, #10b98140 0%, transparent 50%), radial-gradient(circle at 80% 50%, #06b6d440 0%, transparent 50%)"}} />
      <h3 className="text-white font-bold text-lg mb-2" style={{textShadow: "0 0 20px #06b6d460"}}>{title.slice(0, 50)}...</h3>
      <p className="text-slate-400 text-xs mb-4">{authors.slice(0, 60)}...</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#3b82f640" />
            <PolarAngleAxis dataKey="subject" tick={{fill: "#94a3b8", fontSize: 11}} />
            <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px"}} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="text-xs px-2 py-1 rounded" style={{background: "#10b98115", color: "#10b981"}}>Performance</span>
        <span className="text-xs px-2 py-1 rounded" style={{background: "#06b6d415", color: "#06b6d4"}}>Capability</span>
        <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">{type}</span>
      </div>
    </div>
  );
};
