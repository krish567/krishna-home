import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPlanSlugs,
  readPlan,
  lastReview,
  renderPlanBody,
  type PlanStatus,
} from "@/lib/plans";

export const revalidate = 3600;

const STATUS_STYLE: Record<PlanStatus, string> = {
  draft: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  review: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  approved: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  shipped: "border-blue-400/40 bg-blue-500/10 text-blue-300",
};

export function generateStaticParams() {
  return getAllPlanSlugs().map((id) => ({ slug: id }));
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const planOrNull = readPlan(slug);
  if (!planOrNull) notFound();
  const plan = planOrNull;

  const isShipped = plan.status === "shipped";
  const reviewsToShow = isShipped ? [] : plan.reviews;
  const last = lastReview(plan);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link
          href="/plans"
          className="text-slate-500 hover:text-slate-300 text-sm mb-2 block"
        >
          ← All plans
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${STATUS_STYLE[plan.status]}`}
          >
            {plan.status}
          </span>
          {plan.created && (
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              {plan.created}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">
          {plan.title}
        </h1>
      </header>

      {isShipped && last ? (
        <section className="mb-8 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">
            Final review · {last.date}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed italic">
            “{last.note}”
          </p>
        </section>
      ) : reviewsToShow.length > 0 ? (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
            Reviews ({reviewsToShow.length})
          </h2>
          <ul className="space-y-3">
            {reviewsToShow.map((r, i) => (
              <li
                key={`${r.date}-${i}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                  {r.date}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {r.note}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <article
        className="prose prose-invert max-w-none text-slate-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderPlanBody(plan.body) }}
      />

      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
        <Link
          href={`/admin/dashboard/plans?id=${plan.id}`}
          className="hover:text-gray-300"
        >
          Edit in dashboard
        </Link>
      </footer>
    </main>
  );
}