import Link from "next/link";

const sections = [
  {
    href: "/learn",
    label: "Learn",
    emoji: "📚",
    description: "Paper & article breakdowns — TLDR, sections, key insights",
    color: "border-blue-500",
  },
  {
    href: "/plans",
    label: "Plans",
    emoji: "📋",
    description: "Plans & reviews — drafts, decisions, shipped",
    color: "border-violet-500",
  },
  {
    href: "/track",
    label: "Track",
    emoji: "🎯",
    description: "Todos, goals, habits — iterative personal projects",
    color: "border-green-500",
  },
  {
    href: "https://kcfin.vercel.app",
    label: "Finance",
    emoji: "💰",
    description: "Financial tracking & projections",
    color: "border-amber-500",
    external: true,
  },
];

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-1">KrishnaHome</h1>
        <p className="text-gray-400">Personal learning & tracking hub</p>
      </header>

      <section>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Sections
        </h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              className={`card flex items-start gap-4 block border-l-4 ${s.color} hover:border-l-6 transition-all`}
            >
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <div className="font-semibold text-lg">{s.label}</div>
                <div className="text-gray-400 text-sm">{s.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <Link href="/admin" className="hover:text-gray-300">
          Admin
        </Link>
      </footer>
    </main>
  );
}