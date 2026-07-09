"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  async function logout() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/auth", { method: "DELETE" });
      // Force a hard refresh so middleware re-evaluates with no cookie.
      router.replace("/login");
      router.refresh();
    } finally {
      setLoading(false);
      setVisible(false);
    }
  }

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className={`text-xs text-slate-500 hover:text-slate-300 transition disabled:opacity-50 ${className}`}
      aria-label="Sign out"
    >
      {loading ? "..." : "Sign out"}
    </button>
  );
}
