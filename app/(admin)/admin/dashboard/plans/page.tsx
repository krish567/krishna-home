import Link from "next/link";
import { getAllPlans, PLAN_STATUSES, type PlanStatus } from "@/lib/plans";

export const revalidate = 0;

const STATUS_STYLE: Record<PlanStatus, string> = {
  draft: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  review: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  approved: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  shipped: "border-blue-400/40 bg-blue-500/10 text-blue-300",
};

export default async function PlansAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const all = getAllPlans();
  const editing = id ? all.find((p) => p.id === id) : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <Link href="/admin/dashboard" className="text-slate-500 hover:text-slate-300 text-sm mb-2 block">
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold">📋 Plans</h1>
          <p className="text-slate-400 text-sm mt-1">
            {all.length} plan{all.length === 1 ? "" : "s"} · draft → review → approved → shipped
          </p>
        </div>
        <Link
          href="/plans"
          target="_blank"
          className="text-xs text-slate-500 hover:text-slate-300 border border-white/10 rounded-full px-3 py-1.5"
        >
          View public →
        </Link>
      </header>

      {/* Status legend */}
      <div className="flex flex-wrap gap-2 mb-6 text-[10px] uppercase tracking-widest">
        {PLAN_STATUSES.map((s) => (
          <span
            key={s}
            className={`rounded-full border px-2 py-0.5 font-black ${STATUS_STYLE[s]}`}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Plans list */}
      {all.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-400 text-sm">No plans yet.</p>
          <p className="text-slate-600 text-xs mt-2">
            Create <code className="text-slate-400">content/plans/&lt;id&gt;.md</code> with frontmatter to get started.
          </p>
        </div>
      ) : (
        <ul className="space-y-2 mb-8">
          {all.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/dashboard/plans?id=${p.id}`}
                className={`card flex items-center justify-between gap-3 block transition ${
                  editing?.id === p.id
                    ? "border-blue-400/40 bg-blue-500/5"
                    : "hover:border-white/20"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${STATUS_STYLE[p.status]}`}
                    >
                      {p.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      {p.created}
                    </span>
                  </div>
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="text-slate-500 text-xs truncate">
                    {p.id}.md · {p.reviews.length} review{p.reviews.length === 1 ? "" : "s"}
                  </div>
                </div>
                <Link
                  href={`/plans/${p.id}`}
                  target="_blank"
                  className="text-blue-400 text-xs flex-shrink-0"
                >
                  View →
                </Link>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Edit panel */}
      {editing && (
        <section className="card">
          <h2 className="font-semibold mb-1">{editing.title}</h2>
          <p className="text-slate-500 text-xs mb-4">
            File: <code className="text-slate-400">content/plans/{editing.id}.md</code>
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">
                Status
              </span>
              <span
                className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${STATUS_STYLE[editing.status]}`}
              >
                {editing.status}
              </span>
            </div>

            <div>
              <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">
                Reviews ({editing.reviews.length})
              </span>
              {editing.reviews.length === 0 ? (
                <p className="text-slate-600 italic text-xs">No reviews yet.</p>
              ) : (
                <ul className="space-y-2">
                  {editing.reviews.map((r, i) => (
                    <li key={i} className="text-xs border border-white/10 rounded-lg p-2 bg-white/[0.02]">
                      <span className="text-slate-500 block mb-1">{r.date}</span>
                      <span className="text-slate-300">{r.note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-slate-500 leading-relaxed">
              <p className="mb-1">
                <strong className="text-slate-300">How to edit:</strong> open
                the file in your editor, change <code className="text-slate-400">status:</code> in frontmatter,
                and append new review entries to the <code className="text-slate-400">reviews:</code> list.
              </p>
              <p>
                Reviews are append-only. Once status=shipped, the public detail page
                collapses the timeline to the last review.
              </p>
            </div>
          </div>
        </section>
      )}

      {!editing && all.length > 0 && (
        <p className="text-center text-slate-600 text-xs">
          Select a plan above to inspect its frontmatter + reviews.
        </p>
      )}
    </main>
  );
}