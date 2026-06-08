"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Training Data", value: 69, color: "#3b82f6" },
  { name: "Validation", value: 13, color: "#8b5cf6" },
  { name: "Test Set", value: 12, color: "#ec4899" },
  { name: "Real-world", value: 11, color: "#f59e0b" },
];

export default function PaperViz_66({ title, authors, type }: { title: string; authors: string; type: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6" style={{background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"}}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{background: "#3b82f6"}} />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-20" style={{background: "#8b5cf6"}} />
      <h3 className="text-white font-bold text-lg mb-4" style={{textShadow: "0 0 20px #3b82f640"}}>{title.slice(0, 60)}</h3>
      <div className="flex items-center gap-4">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={data[i].color} />)}
              </Pie>
              <Tooltip contentStyle={{background: "#1e293b", border: "none", borderRadius: "8px", color: "#fff"}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{background: d.color}} />
              <span className="text-slate-300 text-sm">{d.name}</span>
              <span className="text-white font-bold ml-auto">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{background: "#3b82f620", color: "#3b82f6", border: "1px solid #3b82f640"}}>Dataset</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{background: "#8b5cf620", color: "#8b5cf6", border: "1px solid #8b5cf640"}}>Benchmark</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{background: "#ec489920", color: "#ec4899", border: "1px solid #ec489940"}}>Scale</span>
      </div>
    </div>
  );
};
