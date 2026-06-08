import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPw = process.env.ADMIN_PASSWORD;

  if (!adminPw) {
    return NextResponse.json(
      { error: "Admin not configured" },
      { status: 500 }
    );
  }

  if (password === adminPw) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", adminPw, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid" }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ ok: true });
}