"use client";

import { useEffect, useRef } from "react";

interface VizConfig {
  type: "bar" | "radar" | "line" | "scatter" | "pie" | "heatmap" | "flow" | "comparison";
  title: string;
  data: unknown;
  options?: Record<string, unknown>;
}

// Dynamic import of recharts — only loaded client-side
export default function PaperVisualization({
  config,
  height = 400,
}: {
  config: VizConfig;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadAndRender = async () => {
      try {
        const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell } = await import("recharts");

        const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444", "#06b6d4"];

        const renderChart = () => {
          const el = containerRef.current!;
          el.innerHTML = `<div style="color:#94a3b8;text-align:center;padding:2rem;">Loading visualization...</div>`;

          switch (config.type) {
            case "bar":
              el.innerHTML = `<div id="bar-viz" style="width:100%;height:${height}px"></div>`;
              // Render with recharts via DOM
              break;
            case "radar":
              el.innerHTML = `<div id="radar-viz" style="width:100%;height:${height}px"></div>`;
              break;
            default:
              el.innerHTML = `<div style="color:#94a3b8;text-align:center;padding:2rem;">${config.title}</div>`;
          }
        };

        renderChart();
      } catch (e) {
        console.error("Viz render error:", e);
      }
    };

    loadAndRender();
  }, [config, height]);

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}