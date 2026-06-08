// lib/papers.ts
// Loads paper metadata + abstract from the .md source files in
// ~/cvpr2026_award_candidates/. Falls back to the JSON if needed.

import fs from "fs";
import path from "path";

export type PaperData = {
  slug: string;
  title: string;
  authors: string;
  date: string;
  location: string;
  type: string;
  abstract: string;
  sourceUrl?: string;
  tags: string[];
};

const MD_DIR =
  process.env.PAPERS_MD_DIR || path.join(process.cwd(), "content/papers");

function parseMd(text: string): Omit<PaperData, "slug" | "sourceUrl" | "tags"> | null {
  const titleMatch = text.match(/^#\s+(.+?)$/m);
  if (!titleMatch) return null;

  const authorsMatch = text.match(/\*\*Authors:\*\*\s*(.+?)(?:\n|$)/);
  const dateMatch = text.match(/\*\*Date\/Time:\*\*\s*(.+?)(?:\n|$)/);
  const locMatch = text.match(/\*\*Location:\*\*\s*(.+?)(?:\n|$)/);
  const typeMatch = text.match(/\*\*Type:\*\*\s*(.+?)(?:\n|$)/);

  // Abstract = everything after "## Abstract" until next "##" or EOF
  const absMatch = text.match(
    /##\s*Abstract\s*\n+([\s\S]*?)(?=\n##|\nView full details|$)/i
  );
  let abstract = (absMatch?.[1] || "").trim();
  abstract = abstract.replace(/\s*View full details\s*$/i, "").trim();
  // Collapse whitespace
  abstract = abstract.replace(/\s+/g, " ").trim();

  return {
    title: titleMatch[1].trim(),
    authors: authorsMatch?.[1].trim() || "",
    date: dateMatch?.[1].trim() || "",
    location: locMatch?.[1].trim() || "",
    type: typeMatch?.[1].trim() || "",
    abstract,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(MD_DIR)) return [];
  return fs
    .readdirSync(MD_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export function readPaperData(slug: string): PaperData | null {
  const mdPath = path.join(MD_DIR, `${slug}.md`);
  if (!fs.existsSync(mdPath)) return null;
  const text = fs.readFileSync(mdPath, "utf8");
  const parsed = parseMd(text);
  if (!parsed) return null;
  return {
    slug,
    sourceUrl: `https://cvpr.thecvf.com/virtual/2026/events/AwardCandidates2026`,
    tags: ["CVPR 2026"],
    ...parsed,
  };
}

export function getAllPapers(): PaperData[] {
  return getAllSlugs()
    .map((slug) => readPaperData(slug))
    .filter((p): p is PaperData => p !== null);
}
