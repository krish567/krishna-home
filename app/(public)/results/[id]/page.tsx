import Link from "next/link";
import VizClient from "@/components/visualizations/VizClient";

type ResultsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultIdPage({ params }: ResultsPageProps) {
  const { id } = await params;
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <Link href="/results" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Results
        </Link>
        <h1 className="text-2xl font-bold text-white capitalize">{id.replace(/-/g, " ")}</h1>
      </header>
      <VizClient />
    </main>
  );
}