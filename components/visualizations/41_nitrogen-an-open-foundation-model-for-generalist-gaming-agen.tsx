"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Method A", value: 88, color: "#8b5cf6" },
  { name: "Method B", value: 76, color: "#8b5cf6" },
  { name: "Method C", value: 73, color: "#8b5cf6" },
  { name: "Ours", value: 97, color: "#3b82f6" },
  { name: "Baseline", value: 66, color: "#8b5cf6" },
];

export default function PaperViz_41({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)"}}>
      <div className="absolute top-0 left-0 w-full h-1" style={{background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)"}} />
      <h3 className="text-white font-bold text-lg mb-2">{title.slice(0, 55)}...</h3>
      <p className="text-slate-400 text-xs mb-4">{type}</p>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} tick={{fill: "#64748b", fontSize: 10}} />
            <YAxis type="category" dataKey="name" tick={{fill: "#94a3b8", fontSize: 10}} width={60} />
            <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff"}} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
