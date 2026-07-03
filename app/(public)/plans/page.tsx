import Link from "next/link";
import { getAllPlans, PLAN_STATUSES, type PlanStatus, type PlanData } from "@/lib/plans";

export const revalidate = 3600;

const STATUS_STYLE: Record<PlanStatus, string> = {
  draft: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  review: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  approved: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  shipped: "border-blue-400/40 bg-blue-500/10 text-blue-300",
};

function StatusChip({ status }: { status: PlanStatus }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

function PlanCard({ p }: { p: PlanData }) {
  const lastReview = p.reviews[p.reviews.length - 1];
  const wordCount = p.body.split(/\s+/).filter(Boolean).length;
  return (
    <li>
      <Link
        href={`/plans/${p.id}`}
        className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.06]"
      >
        <div className="flex items-center gap-2 mb-2">
          <StatusChip status={p.status} />
          {p.created && (
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              {p.created}
            </span>
          )}
        </div>
        <h2 className="font-semibold text-[15px] leading-snug text-white group-hover:text-blue-300 transition">
          {p.title}
        </h2>
        {lastReview && p.status !== "shipped" && (
          <p className="mt-2 text-[12px] text-slate-400 line-clamp-2 italic">
            “{lastReview.note}” <span className="text-slate-600">— {lastReview.date}</span>
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {p.reviews.length} review{p.reviews.length === 1 ? "" : "s"} · {wordCount} words
          </span>
          <span className="text-blue-400 group-hover:translate-x-0.5 transition">
            Open →
          </span>
        </div>
      </Link>
    </li>
  );
}

type SearchParams = Promise<{ shipped?: string }>;

export default async function PlansPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { shipped } = await searchParams;
  const showShipped = shipped === "1";

  const all = getAllPlans();

  // Group by status for visual ordering
  const grouped: Record<PlanStatus, PlanData[]> = {
    draft: [],
    review: [],
    approved: [],
    shipped: [],
  };
  for (const p of all) grouped[p.status].push(p);

  const active: PlanData[] = [];
  for (const s of PLAN_STATUSES) {
    if (s !== "shipped") active.push(...grouped[s]);
  }
  const shippedPlans = grouped.shipped;

  // Newest first within each bucket (by created date desc, then id)
  const sortFn = (a: PlanData, b: PlanData) =>
    a.created < b.created ? 1 : a.created > b.created ? -1 : a.id.localeCompare(b.id);
  active.sort(sortFn);
  shippedPlans.sort(sortFn);

  const totalCount = all.length;

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
          <h1 className="text-3xl font-black tracking-tight">📋 Plans</h1>
          <p className="text-slate-400 text-sm mt-1">
            {totalCount} plan{totalCount === 1 ? "" : "s"} — review drafts, track
            decisions, ship without clutter
          </p>
        </div>
        <Link
          href={showShipped ? "/plans" : "/plans?shipped=1"}
          className="text-xs text-slate-500 hover:text-slate-300 border border-white/10 rounded-full px-3 py-1.5 transition"
          aria-pressed={showShipped}
        >
          {showShipped ? "✓ Showing shipped" : "Show shipped"}
        </Link>
      </header>

      {totalCount === 0 && (
        <div className="text-center py-16 text-slate-500">
          <p className="text-4xl mb-4">📭</p>
          <p>No plans yet.</p>
        </div>
      )}

      {active.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
            Active
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {active.map((p) => (
              <PlanCard key={p.id} p={p} />
            ))}
          </ul>
        </section>
      )}

      {showShipped && shippedPlans.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
            Shipped
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {shippedPlans.map((p) => (
              <PlanCard key={p.id} p={p} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}