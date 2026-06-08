import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const adminPw = process.env.ADMIN_PASSWORD;

  return NextResponse.json({
    authenticated: !!session && session.value === adminPw,
  });
}