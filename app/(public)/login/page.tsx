"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/plans";

  // Disallow open-redirect: redirect must be a same-site path-only string.
  const safeRedirect =
    redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/plans";

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already authenticated, fast-forward.
    fetch("/api/auth-check")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) window.location.href = safeRedirect;
      })
      .catch(() => {});
  }, [safeRedirect]);

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
      // Hard navigation (not router.replace) so middleware re-evaluates
      // the freshly-set cookie without any client-router cache getting
      // in the way. router.replace alone leaves the browser on /login
      // until the user manually refreshes, because the App Router's
      // client cache can hold the "not authenticated" state from the
      // initial render. window.location.href guarantees a fresh round
      // trip through the proxy/middleware.
      window.location.href = safeRedirect;
    } else {
      setError(true);
      setLoading(false);
      setPassword("");
    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <p className="text-4xl mb-3">🔒</p>
        <h1 className="text-xl font-bold">Locked</h1>
        <p className="text-gray-400 text-sm mt-2">
          Enter the password Krishna set. You stay signed in for 7 days.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input text-center text-lg"
            autoFocus
            autoComplete="current-password"
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
          {loading ? "..." : "Unlock"}
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-sm mx-auto px-4 py-20 text-center text-gray-500">
          Loading...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
