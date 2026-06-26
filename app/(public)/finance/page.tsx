import Link from "next/link";

export default function FinancePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-2 block">
          ← Home
        </Link>
        <h1 className="text-2xl font-bold">💰 Finance</h1>
        <p className="text-gray-400 text-sm mt-1">Financial tracking & projections</p>
      </header>

      <a
        href="https://kcfin.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="card flex items-start gap-4 border-l-4 border-amber-500 hover:border-l-6 transition-all block"
      >
        <span className="text-2xl">💸</span>
        <div className="flex-1">
          <div className="font-semibold text-lg">kcfin.vercel.app</div>
          <p className="text-gray-400 text-sm mt-1">
            Live dashboard — trends, slots, accounts, transactions.
          </p>
        </div>
        <span className="text-gray-500 text-sm self-center">↗</span>
      </a>
    </main>
  );
}
