import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold text-white">Results & Visualizations</h1>
        <p className="text-slate-400 mt-2">Interactive breakdowns of CVPR 2026 award candidates</p>
      </header>

      <div className="text-slate-300 text-center py-16">
        <p className="text-lg">Visualizations are being generated...</p>
        <p className="text-slate-500 text-sm mt-2">Check back soon — each paper will have a unique visual analysis.</p>
      </div>
    </main>
  );
}