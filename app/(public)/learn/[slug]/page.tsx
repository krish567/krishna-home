import Link from "next/link";
import AbstractCanvas from "@/components/visualizations/AbstractCanvas";
import { readPaperData } from "@/lib/papers";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LearnSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const data = readPaperData(slug);
  if (!data) notFound();

  return (
    <>
      <Link
        href="/learn"
        className="fixed left-4 top-20 z-50 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 backdrop-blur hover:border-white/30 hover:text-white"
      >
        ← Learn hub
      </Link>
      <AbstractCanvas data={data} />
    </>
  );
}
