import Link from "next/link";

export default function TrackPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-2 block">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">🎯 Track</h1>
          <p className="text-gray-400 text-sm mt-1">Tasks, focus & analytics</p>
        </div>
        <a
          href="/tasks.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
        >
          Open fullscreen ↗
        </a>
      </header>

      <div className="rounded-2xl overflow-hidden border border-gray-800" style={{ height: "calc(100vh - 180px)" }}>
        <iframe
          src="/tasks.html"
          className="w-full h-full"
          style={{ border: "none" }}
          title="Tasks Dashboard"
        />
      </div>
    </main>
  );
}