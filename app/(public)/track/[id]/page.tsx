import Link from "next/link";

export default function TrackIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/track" className="text-gray-500 hover:text-gray-300 text-sm mb-6 block">
        ← Track hub
      </Link>
      <h1 className="text-2xl font-bold">🚧</h1>
      <p className="text-gray-400 mt-2">Project not found.</p>
    </main>
  );
}