import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* routes EXCEPT /admin (login page is itself public)
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const adminPassword = request.cookies.get("admin_session");

    if (!adminPassword || adminPassword.value !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};