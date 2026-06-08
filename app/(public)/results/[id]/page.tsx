import Link from "next/link";
import AbstractCanvas from "@/components/visualizations/AbstractCanvas";
import { readPaperData, getAllSlugs } from "@/lib/papers";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    id: slug,
  }));
}

export default async function ResultIdPage({ params }: PageProps) {
  const { id } = await params;
  const data = readPaperData(id);
  if (!data) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400">
        Paper not found.
      </main>
    );
  }
  return (
    <>
      <Link
        href="/results"
        className="fixed left-4 top-20 z-50 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 backdrop-blur hover:border-white/30 hover:text-white"
      >
        ← Results
      </Link>
      <AbstractCanvas data={data} />
    </>
  );
}
