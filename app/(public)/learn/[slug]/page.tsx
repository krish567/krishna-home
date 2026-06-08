import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

type Section = {
  heading: string;
  gist: string;
  content: string;
  type: string;
};

type LearningPage = {
  slug: string;
  title: string;
  sourceUrl: string;
  authors?: string;
  date: string;
  type: "paper" | "article" | "blog" | "video";
  sections: Section[];
  createdAt: string;
};

export const revalidate = 3600;

async function getPage(slug: string): Promise<LearningPage | null> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), `content/learn/${slug}.json`),
      "utf8"
    );
    return JSON.parse(file);
  } catch {
    return null;
  }
}

const typeLabel: Record<string, string> = {
  tldr: "📌 TLDR",
  section: "📖 Section",
  "key-insight": "💡 Key Insight",
  method: "🔧 Method",
  results: "📊 Results",
  conclusion: "🏁 Conclusion",
};

function SectionBadge({ type }: { type: string }) {
  const label = typeLabel[type] || type;
  const color =
    type === "tldr"
      ? "text-blue-400"
      : type === "key-insight"
      ? "text-amber-400"
      : type === "method"
      ? "text-green-400"
      : "text-gray-400";
  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}

export default async function LearnSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/learn"
        className="text-gray-500 hover:text-gray-300 text-sm mb-6 block"
      >
        ← Learn hub
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-blue">{page.type}</span>
          <span className="text-gray-500 text-xs">{page.date}</span>
        </div>
        <h1 className="text-2xl font-bold leading-snug mb-2">{page.title}</h1>
        {page.authors && (
          <p className="text-gray-400 text-sm mb-3">{page.authors}</p>
        )}
        <a
          href={page.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          Source: {page.sourceUrl}
        </a>
      </header>

      <div className="space-y-6">
        {page.sections.map((section, i) => (
          <section key={i}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="section-heading mb-0">{section.heading}</h2>
              <SectionBadge type={section.type} />
            </div>

            {section.gist && (
              <div className="gist-callout">
                <div className="text-xs font-medium text-blue-400 mb-1">GIST</div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {section.gist}
                </p>
              </div>
            )}

            <div
              className="text-gray-300 text-sm leading-relaxed prose"
              dangerouslySetInnerHTML={{
                __html: section.content
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/\n/g, "<br/>"),
              }}
            />
          </section>
        ))}
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
        Generated {page.createdAt} ·{" "}
        <a
          href={page.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          Original source ↗
        </a>
      </footer>
    </main>
  );
}