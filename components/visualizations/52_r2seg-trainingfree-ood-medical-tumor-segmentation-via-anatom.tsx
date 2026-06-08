"use client";

import { ScatterChart, Scatter, Tooltip, ResponsiveContainer, Cell } from "recharts";

const palette = ["#06b6d4", "#8b5cf6", "#f43f5e", "#a3e635", "#fb923c"];
const data = Array.from({ length: 30 }, (_, idx) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 50 + 10,
  c: palette[idx % 5],
}));

export default function PaperViz_52({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(135deg, #0f172a 0%, #0a1a0f 100%)"}}>
      <div className="absolute inset-0" style={{backgroundImage: "repeating-linear-gradient(0deg, #a3e63508 0px, #a3e63508 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #a3e63508 0px, #a3e63508 1px, transparent 1px, transparent 20px)"}} />
      <h3 className="text-white font-bold text-lg mb-2">{title.slice(0, 55)}...</h3>
      <p className="text-slate-500 text-xs mb-4">{type}</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff"}} />
            <Scatter data={data}>
              {data.map((d, i) => <Cell key={i} fill={d.c} fillOpacity={0.5 + Math.random() * 0.5} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="px-3 py-1 rounded-full text-xs" style={{background: "#a3e63520", color: "#a3e635"}}>Segmentation</span>
        <span className="px-3 py-1 rounded-full text-xs" style={{background: "#06b6d420", color: "#06b6d4"}}>Medical</span>
      </div>
    </div>
  );
};
