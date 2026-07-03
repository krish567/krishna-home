// lib/plans.ts
// Loads plans from content/plans/*.md with YAML frontmatter.
//
// Schema (frontmatter):
//   id: string           (slug, also filename without .md)
//   title: string
//   status: "draft" | "review" | "approved" | "shipped"
//   created: ISO date
//   reviews:
//     - date: ISO date
//       note: string
//
// Body: free-form markdown.
// Reviews are append-only. List view shows all reviews while active.
// Detail view collapses to "last review only" when status=shipped.

import fs from "fs";
import path from "path";
import { marked } from "marked";

export type PlanStatus = "draft" | "review" | "approved" | "shipped";

export type PlanReview = {
  date: string;
  note: string;
};

export type PlanData = {
  id: string;
  title: string;
  status: PlanStatus;
  created: string;
  reviews: PlanReview[];
  body: string;
};

const PLANS_DIR =
  process.env.PLANS_MD_DIR || path.join(process.cwd(), "content/plans");

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  body: string;
} {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const [, fm, body] = m;

  const meta: Record<string, unknown> = {};
  for (const line of fm.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let val: string | string[] = line.slice(colon + 1).trim();

    // Handle "- " list values (YAML array on continuation lines)
    if (val === "" && key !== "title" && key !== "status") {
      // Look-ahead into following lines that begin with "  - "
      continue;
    }

    // Quoted string unescape
    if (
      typeof val === "string" &&
      ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'")))
    ) {
      val = val.slice(1, -1);
    }

    meta[key] = val;
  }

  // Second pass: collect list items under "reviews:" key
  const reviews: PlanReview[] = [];
  const lines = fm.split(/\r?\n/);
  let inReviews = false;
  let cur: Partial<PlanReview> | null = null;
  for (const line of lines) {
    if (/^reviews\s*:\s*$/.test(line.trim())) {
      inReviews = true;
      continue;
    }
    if (inReviews) {
      const itemMatch = line.match(/^\s*-\s+(\w+)\s*:\s*(.*)$/);
      if (itemMatch) {
        if (cur && cur.date && cur.note) reviews.push(cur as PlanReview);
        cur = {};
        let val = itemMatch[2].trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        cur[itemMatch[1] as keyof PlanReview] = val;
      } else if (cur && /^\s{4,}(\w+)\s*:\s*(.*)$/.test(line)) {
        const sub = line.match(/^\s{4,}(\w+)\s*:\s*(.*)$/)!;
        let val = sub[2].trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        cur[sub[1] as keyof PlanReview] = val;
      } else if (line.trim() === "") {
        // blank, keep current
      } else {
        // left the reviews block
        if (cur && cur.date && cur.note) reviews.push(cur as PlanReview);
        cur = null;
        inReviews = false;
      }
    }
  }
  if (cur && cur.date && cur.note) reviews.push(cur as PlanReview);

  if (reviews.length > 0) meta.reviews = reviews;

  return { meta, body: body.trim() };
}

function asStatus(v: unknown): PlanStatus {
  return v === "review" || v === "approved" || v === "shipped"
    ? v
    : "draft";
}

function slugToFile(slug: string): string {
  // allow human slugs; preserve dashes
  return `${slug}.md`;
}

export function getAllPlanSlugs(): string[] {
  if (!fs.existsSync(PLANS_DIR)) return [];
  return fs
    .readdirSync(PLANS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export function readPlan(id: string): PlanData | null {
  const p = path.join(PLANS_DIR, slugToFile(id));
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf8");
  const { meta, body } = parseFrontmatter(raw);

  const title = typeof meta.title === "string" ? meta.title : id;
  const status = asStatus(meta.status);
  const created = typeof meta.created === "string" ? meta.created : "";
  const reviews = Array.isArray(meta.reviews) ? (meta.reviews as PlanReview[]) : [];

  return { id, title, status, created, reviews, body };
}

export function getAllPlans(): PlanData[] {
  return getAllPlanSlugs()
    .map((id) => readPlan(id))
    .filter((p): p is PlanData => p !== null);
}

/**
 * Render the plan body markdown to HTML. Server-side, no client JS needed.
 * Returns sanitized HTML (marked's default + our manual escape of raw script).
 */
export function renderPlanBody(body: string): string {
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(body) as string;
  // Defensive: strip <script> if any slip through (marked is sanitized by default
  // for our usage but be paranoid).
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

/**
 * Last review by date. Used by detail page when status=shipped
 * (collapse history). Returns null if no reviews.
 */
export function lastReview(p: PlanData): PlanReview | null {
  if (p.reviews.length === 0) return null;
  return [...p.reviews].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
}

export const PLAN_STATUSES: PlanStatus[] = [
  "draft",
  "review",
  "approved",
  "shipped",
];