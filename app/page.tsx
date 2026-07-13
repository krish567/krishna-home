"use client";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { timelineData } from "@/lib/timeline-data";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Link href="/admin" className="text-white/40 hover:text-white/80 text-sm transition-colors">
          Admin
        </Link>
      </div>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}