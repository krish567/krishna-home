import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionEdge } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  const secret = process.env.AUTH_SECRET ?? "";
  return NextResponse.json({
    authenticated: !!(await verifySessionEdge(session?.value, secret)),
  });
}
