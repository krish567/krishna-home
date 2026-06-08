import Link from "next/link";

export default function TrackPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-2 block">
          ← Home
        </Link>
        <h1 className="text-2xl font-bold">🎯 Track</h1>
        <p className="text-gray-400 text-sm mt-1">Todos, goals, habits</p>
      </header>

      <div className="card text-center py-16">
        <p className="text-4xl mb-4">🚧</p>
        <h2 className="font-semibold text-lg mb-2">Coming soon</h2>
        <p className="text-gray-400 text-sm">
          Tell me what you want to track and I'll build it.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Options: habit tracker, goal tracker, project todos, daily journal
        </p>
      </div>
    </main>
  );
}