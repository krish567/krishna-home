import Link from "next/link";
import { getAllPapers } from "@/lib/papers";

export const revalidate = 3600;

export default async function LearnPage() {
  const papers = getAllPapers();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-300 text-sm mb-2 block"
          >
            ← Home
          </Link>
          <h1 className="text-3xl font-black tracking-tight">📚 Learn</h1>
          <p className="text-slate-400 text-sm mt-1">
            {papers.length} CVPR 2026 papers — interactive abstract canvas per paper
          </p>
        </div>
      </header>

      {papers.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-4xl mb-4">📭</p>
          <p>No papers found.</p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {papers.map((p) => {
            const slug = p.slug;
            const firstSentence = p.abstract.split(/(?<=[.!?])\s+/)[0] ?? "";
            return (
              <li key={slug}>
                <Link
                  href={`/learn/${slug}`}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {p.type && (
                      <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-blue-300">
                        {p.type}
                      </span>
                    )}
                    {p.date && (
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">
                        {p.date}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-[15px] leading-snug text-white group-hover:text-blue-300 transition line-clamp-2">
                    {p.title}
                  </h2>
                  {p.authors && (
                    <p className="mt-2 text-[12px] text-slate-500 line-clamp-1">
                      {p.authors}
                    </p>
                  )}
                  {firstSentence && (
                    <p className="mt-3 text-[12px] leading-relaxed text-slate-400 line-clamp-2">
                      {firstSentence}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      {p.abstract.split(/\s+/).filter(Boolean).length} words ·{" "}
                      {p.abstract.split(/(?<=[.!?])\s+/).length} sentences
                    </span>
                    <span className="text-blue-400 group-hover:translate-x-0.5 transition">
                      Open canvas →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
