"use client";

import { useEffect, useState } from "react";

import Paper01Canvas from "./Paper01Canvas";
import Paper02Canvas from "./Paper02Canvas";
import Paper03Canvas from "./Paper03Canvas";
import Paper04Canvas from "./Paper04Canvas";
import Paper05Canvas from "./Paper05Canvas";
import Paper06Canvas from "./Paper06Canvas";
import Paper07Canvas from "./Paper07Canvas";
import Paper08Canvas from "./Paper08Canvas";
import Paper09Canvas from "./Paper09Canvas";
import Paper10Canvas from "./Paper10Canvas";
import Paper11Canvas from "./Paper11Canvas";
import Paper12Canvas from "./Paper12Canvas";
import Paper13Canvas from "./Paper13Canvas";
import Paper14Canvas from "./Paper14Canvas";
import Paper15Canvas from "./Paper15Canvas";
import Paper16Canvas from "./Paper16Canvas";
import Paper17Canvas from "./Paper17Canvas";
import Paper18Canvas from "./Paper18Canvas";
import Paper19Canvas from "./Paper19Canvas";
import Paper20Canvas from "./Paper20Canvas";
import Paper21Canvas from "./Paper21Canvas";
import Paper22Canvas from "./Paper22Canvas";
import Paper23Canvas from "./Paper23Canvas";
import Paper24Canvas from "./Paper24Canvas";
import Paper25Canvas from "./Paper25Canvas";
import Paper26Canvas from "./Paper26Canvas";
import Paper27Canvas from "./Paper27Canvas";
import Paper28Canvas from "./Paper28Canvas";
import Paper29Canvas from "./Paper29Canvas";
import Paper30Canvas from "./Paper30Canvas";
import Paper31Canvas from "./Paper31Canvas";
import Paper32Canvas from "./Paper32Canvas";
import Paper33Canvas from "./Paper33Canvas";
import Paper34Canvas from "./Paper34Canvas";
import Paper35Canvas from "./Paper35Canvas";
import Paper36Canvas from "./Paper36Canvas";
import Paper37Canvas from "./Paper37Canvas";
import Paper38Canvas from "./Paper38Canvas";
import Paper39Canvas from "./Paper39Canvas";
import Paper40Canvas from "./Paper40Canvas";
import Paper41Canvas from "./Paper41Canvas";
import Paper42Canvas from "./Paper42Canvas";
import Paper43Canvas from "./Paper43Canvas";
import Paper44Canvas from "./Paper44Canvas";
import Paper45Canvas from "./Paper45Canvas";
import Paper46Canvas from "./Paper46Canvas";
import Paper47Canvas from "./Paper47Canvas";
import Paper48Canvas from "./Paper48Canvas";
import Paper49Canvas from "./Paper49Canvas";
import Paper50Canvas from "./Paper50Canvas";
import Paper51Canvas from "./Paper51Canvas";
import Paper52Canvas from "./Paper52Canvas";
import Paper53Canvas from "./Paper53Canvas";
import Paper54Canvas from "./Paper54Canvas";
import Paper55Canvas from "./Paper55Canvas";
import Paper56Canvas from "./Paper56Canvas";
import Paper57Canvas from "./Paper57Canvas";
import Paper58Canvas from "./Paper58Canvas";
import Paper59Canvas from "./Paper59Canvas";
import Paper60Canvas from "./Paper60Canvas";
import Paper61Canvas from "./Paper61Canvas";
import Paper62Canvas from "./Paper62Canvas";
import Paper63Canvas from "./Paper63Canvas";
import Paper64Canvas from "./Paper64Canvas";
import Paper65Canvas from "./Paper65Canvas";
import Paper66Canvas from "./Paper66Canvas";
import Paper67Canvas from "./Paper67Canvas";
import Paper68Canvas from "./Paper68Canvas";
import Paper69Canvas from "./Paper69Canvas";
import Paper70Canvas from "./Paper70Canvas";
import Paper71Canvas from "./Paper71Canvas";
import Paper72Canvas from "./Paper72Canvas";
import Paper73Canvas from "./Paper73Canvas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const canvasMap: Record<number, React.ComponentType<any>> = {
  1: Paper01Canvas, 2: Paper02Canvas, 3: Paper03Canvas, 4: Paper04Canvas,
  5: Paper05Canvas, 6: Paper06Canvas, 7: Paper07Canvas, 8: Paper08Canvas,
  9: Paper09Canvas, 10: Paper10Canvas, 11: Paper11Canvas, 12: Paper12Canvas,
  13: Paper13Canvas, 14: Paper14Canvas, 15: Paper15Canvas, 16: Paper16Canvas,
  17: Paper17Canvas, 18: Paper18Canvas, 19: Paper19Canvas, 20: Paper20Canvas,
  21: Paper21Canvas, 22: Paper22Canvas, 23: Paper23Canvas, 24: Paper24Canvas,
  25: Paper25Canvas, 26: Paper26Canvas, 27: Paper27Canvas, 28: Paper28Canvas,
  29: Paper29Canvas, 30: Paper30Canvas, 31: Paper31Canvas, 32: Paper32Canvas,
  33: Paper33Canvas, 34: Paper34Canvas, 35: Paper35Canvas, 36: Paper36Canvas,
  37: Paper37Canvas, 38: Paper38Canvas, 39: Paper39Canvas, 40: Paper40Canvas,
  41: Paper41Canvas, 42: Paper42Canvas, 43: Paper43Canvas, 44: Paper44Canvas,
  45: Paper45Canvas, 46: Paper46Canvas, 47: Paper47Canvas, 48: Paper48Canvas,
  49: Paper49Canvas, 50: Paper50Canvas, 51: Paper51Canvas, 52: Paper52Canvas,
  53: Paper53Canvas, 54: Paper54Canvas, 55: Paper55Canvas, 56: Paper56Canvas,
  57: Paper57Canvas, 58: Paper58Canvas, 59: Paper59Canvas, 60: Paper60Canvas,
  61: Paper61Canvas, 62: Paper62Canvas, 63: Paper63Canvas, 64: Paper64Canvas,
  65: Paper65Canvas, 66: Paper66Canvas, 67: Paper67Canvas, 68: Paper68Canvas,
  69: Paper69Canvas, 70: Paper70Canvas, 71: Paper71Canvas, 72: Paper72Canvas,
  73: Paper73Canvas,
};

export default function VizClient() {
  const [paperNum, setPaperNum] = useState<number | null>(null);

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const slug = parts[parts.length - 1];
    // slug format: "01_foo-bar" -> 1
    const num = parseInt(slug.split("_")[0], 10);
    setPaperNum(num);
  }, []);

  if (!paperNum) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="animate-pulse">
          <div className="w-64 h-64 mx-auto bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const CanvasComponent = canvasMap[paperNum];

  if (!CanvasComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        <p>Canvas #{paperNum} not found</p>
      </div>
    );
  }

  return <CanvasComponent />;
}
