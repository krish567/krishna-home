import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionEdge } from "@/lib/auth";

/**
 * Edge middleware: gates the password-protected sections.
 *
 * Public: `/`, `/learn/*`, `/results/*`, `/track/*`, `/finance/*`, `/login`, `/admin`, `/api/auth*`.
 * Protected: `/plans/*`, `/admin/*` (everything except `/admin` itself which is the admin login page).
 *
 * Sessions are signed tokens (HMAC-SHA256). The cookie carries no password,
 * only an opaque signed token; even with the cookie in hand, an attacker
 * cannot recover the user's password.
 *
 * Why Edge-only Web Crypto:
 *   - middleware runs on Next.js Edge Runtime (Web Crypto / SubtleCrypto only).
 *   - We mirror the Node-side helpers in `lib/auth.ts` under `verifySessionEdge`.
 *   - Both must use the same domain-separated secret derivation or signatures diverge.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hard-list public routes inside the protected namespaces — these are
  // entry points that must remain reachable unauthenticated.
  if (pathname === "/admin" || pathname === "/login") {
    return NextResponse.next();
  }

  const isProtected =
    pathname === "/plans" ||
    pathname.startsWith("/plans/") ||
    pathname.startsWith("/admin/");

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE);
  const secret = process.env.AUTH_SECRET ?? "";
  if (secret && (await verifySessionEdge(cookie?.value, secret))) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/plans/:path*", "/admin/:path*"],
};
