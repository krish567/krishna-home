"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PageMeta = {
  slug: string;
  title: string;
  sourceUrl: string;
  date: string;
  type: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [tab, setTab] = useState<"learn" | "plans" | "track" | "finance">("learn");

  // Learn form state
  const [url, setUrl] = useState("");
  const [type, setType] = useState("paper");
  const [generating, setGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    fetch("/api/auth-check")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/admin");
        else {
          setAuthenticated(true);
          loadPages();
        }
      })
      .catch(() => router.replace("/admin"))
      .finally(() => setChecking(false));
  }, []);

  async function loadPages() {
    try {
      const res = await fetch("/api/manifest");
      const data = await res.json();
      setPages(data.pages || []);
    } catch {}
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setGenerating(true);
    setStatusMsg("Fetching content...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMsg(`✅ Done! → /learn/${data.slug}`);
        setUrl("");
        loadPages();
        setTimeout(() => setStatusMsg(""), 4000);
      } else {
        setStatusMsg(`❌ ${data.error || "Failed"}`);
      }
    } catch (err: any) {
      setStatusMsg(`❌ ${err.message}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/admin");
  }

  if (checking) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-1 block">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">⚙️ Admin Panel</h1>
        </div>
        <button onClick={handleLogout} className="btn-outline btn text-sm">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-800">
        {(["learn", "plans", "track", "finance"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Learn Section */}
      {tab === "learn" && (
        <div className="space-y-6">
          <section className="card">
            <h2 className="font-semibold mb-4">📚 Add Learning Page</h2>
            <p className="text-gray-400 text-sm mb-4">
              Paste a URL (paper, article, blog) — I'll generate the breakdown
              page. Content is processed and committed automatically.
            </p>
            <form onSubmit={handleGenerate} className="space-y-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="input"
                required
              />
              <div className="flex gap-3 items-center">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input w-auto"
                >
                  <option value="paper">Paper</option>
                  <option value="article">Article</option>
                  <option value="blog">Blog</option>
                  <option value="video">Video</option>
                </select>
                <button
                  type="submit"
                  disabled={generating || !url.trim()}
                  className="btn"
                >
                  {generating ? "Processing..." : "Generate →"}
                </button>
              </div>
              {statusMsg && (
                <p
                  className={`text-sm ${
                    statusMsg.includes("✅") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {statusMsg}
                </p>
              )}
            </form>
          </section>

          <section>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Existing Pages ({pages.length})
            </h2>
            {pages.length === 0 ? (
              <p className="text-gray-600 text-sm">No pages yet.</p>
            ) : (
              <div className="space-y-2">
                {pages.map((p) => (
                  <div
                    key={p.slug}
                    className="card flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{p.title}</div>
                      <div className="text-gray-500 text-xs truncate">
                        {p.sourceUrl}
                      </div>
                    </div>
                    <Link
                      href={`/learn/${p.slug}`}
                      target="_blank"
                      className="text-blue-400 text-sm flex-shrink-0 ml-4"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Track Section */}
      {tab === "track" && (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🚧</p>
          <p className="text-gray-400">Tracker section coming soon.</p>
          <p className="text-gray-600 text-sm mt-1">
            Add a URL or tell me what you want to track.
          </p>
        </div>
      )}

      {/* Plans Section */}
      {tab === "plans" && (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">
            Manage plans stored in <code className="text-gray-300">content/plans/*.md</code>.
          </p>
          <Link
            href="/admin/dashboard/plans"
            className="btn inline-block"
          >
            Open plans dashboard →
          </Link>
        </div>
      )}

      {/* Finance Section */}
      {tab === "finance" && (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🚧</p>
          <p className="text-gray-400">Finance section coming soon.</p>
          <p className="text-gray-600 text-sm mt-1">
            Add a URL or tell me what you want to track.
          </p>
        </div>
      )}
    </main>
  );
}