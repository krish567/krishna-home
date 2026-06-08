"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth-check")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) router.replace(redirect);
      })
      .catch(() => {});
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace(redirect);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <p className="text-4xl mb-3">🔐</p>
        <h1 className="text-xl font-bold">Admin Login</h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="input text-center text-lg"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-400 text-sm text-center">
            Wrong password. Try again.
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="btn w-full"
        >
          {loading ? "..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300">
          ← Back home
        </Link>
      </p>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <main className="max-w-sm mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </main>
    }>
      <LoginForm />
    </Suspense>
  );
}