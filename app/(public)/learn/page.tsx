import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

type LearningPage = {
  slug: string;
  title: string;
  sourceUrl: string;
  authors?: string;
  date: string;
  type: "paper" | "article" | "blog" | "video";
  sections: { heading: string; gist: string; content: string; type: string }[];
  createdAt: string;
};

export const revalidate = 3600;

async function getManifest(): Promise<LearningPage[]> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "content/learn/manifest.json"),
      "utf8"
    );
    return JSON.parse(file);
  } catch {
    return [];
  }
}

const typeColors: Record<string, string> = {
  paper: "badge-blue",
  article: "badge-green",
  blog: "badge-amber",
  video: "badge",
};

export default async function LearnPage() {
  const pages = await getManifest();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-2 block">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">📚 Learn</h1>
          <p className="text-gray-400 text-sm mt-1">
            Paper & article breakdowns
          </p>
        </div>
        <Link href="/admin" className="btn btn-outline text-sm">
          + Add
        </Link>
      </header>

      {pages.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">📭</p>
          <p>No pages yet.</p>
          <p className="text-sm mt-1">
            <Link href="/admin" className="text-blue-400 hover:underline">
              Add the first one
            </Link>{" "}
            via admin.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/learn/${page.slug}`}
              className="card block hover:border-blue-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${typeColors[page.type] || "badge"}`}>
                      {page.type}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {page.date}
                    </span>
                  </div>
                  <h2 className="font-semibold text-base leading-snug">
                    {page.title}
                  </h2>
                  {page.authors && (
                    <p className="text-gray-400 text-xs mt-1 truncate">
                      {page.authors}
                    </p>
                  )}
                </div>
                <span className="text-gray-600 text-sm flex-shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}