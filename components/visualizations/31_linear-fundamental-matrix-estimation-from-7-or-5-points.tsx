"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: "Accuracy", A: 78, fullMark: 100 },
  { subject: "Speed", A: 71, fullMark: 100 },
  { subject: "Robustness", A: 67, fullMark: 100 },
  { subject: "Generalization", A: 64, fullMark: 100 },
  { subject: "Efficiency", A: 50, fullMark: 100 },
  { subject: "Scalability", A: 94, fullMark: 100 },
];

export default function PaperViz_31({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(180deg, #0f172a 0%, #0c1425 100%)"}}>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f640 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8b5cf640 0%, transparent 50%)"}} />
      <h3 className="text-white font-bold text-lg mb-2" style={{textShadow: "0 0 20px #8b5cf660"}}>{title.slice(0, 50)}...</h3>
      <p className="text-slate-400 text-xs mb-4">{authors.slice(0, 60)}...</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#ec489940" />
            <PolarAngleAxis dataKey="subject" tick={{fill: "#94a3b8", fontSize: 11}} />
            <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
            <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px"}} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="text-xs px-2 py-1 rounded" style={{background: "#3b82f615", color: "#3b82f6"}}>Performance</span>
        <span className="text-xs px-2 py-1 rounded" style={{background: "#8b5cf615", color: "#8b5cf6"}}>Capability</span>
        <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">{type}</span>
      </div>
    </div>
  );
};
