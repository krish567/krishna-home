import Link from "next/link";

export default function FinanceIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/finance" className="text-gray-500 hover:text-gray-300 text-sm mb-6 block">
        ← Finance hub
      </Link>
      <h1 className="text-2xl font-bold">🚧</h1>
      <p className="text-gray-400 mt-2">Project not found.</p>
    </main>
  );
}