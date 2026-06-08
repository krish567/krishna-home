"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 20 }, (_, i) => ({
  step: i,
  quality: 73 + i * 2,
  speed: 58 + i * 1,
}));

export default function PaperViz_10({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(135deg, #0c1425 0%, #1a0a2e 100%)"}}>
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full blur-xl" style={{background: "#8b5cf6", opacity: 0.3}} />
      <h3 className="text-white font-bold text-lg mb-1">{title.slice(0, 55)}...</h3>
      <p className="text-slate-500 text-xs mb-4">{type}</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ec489920" />
            <XAxis dataKey="step" tick={{fill: "#64748b", fontSize: 10}} />
            <YAxis tick={{fill: "#64748b", fontSize: 10}} />
            <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff"}} />
            <Line type="monotone" dataKey="quality" stroke="#ec4899" strokeWidth={3} dot={{r: 2}} />
            <Line type="monotone" dataKey="speed" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded" style={{background: "#ec4899"}} />
          <span className="text-slate-400 text-xs">Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5" style={{borderTop: "2px dashed #8b5cf6"}} />
          <span className="text-slate-400 text-xs">Speed</span>
        </div>
      </div>
    </div>
  );
};
