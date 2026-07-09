import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  signSessionEdge,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  let body: { password?: unknown };
  try {
    body = (await req.json()) as { password?: unknown };
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const expected = process.env.KRISHNA_HOME_SHARED_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (!expected || !secret) {
    // 503 rather than silently auth-everyone.
    return NextResponse.json(
      { error: "Auth not configured" },
      { status: 503 },
    );
  }

  // Constant-time compare.
  let expectedBytes: Uint8Array, gotBytes: Uint8Array;
  try {
    const enc = new TextEncoder();
    expectedBytes = enc.encode(expected);
    gotBytes = enc.encode(password);
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }
  if (expectedBytes.length !== gotBytes.length) {
    // Burn time even on length mismatch.
    let dummy = 0;
    for (let i = 0; i < Math.max(expectedBytes.length, 1); i++) {
      dummy |= 0;
    }
    void dummy;
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }
  let diff = 0;
  for (let i = 0; i < expectedBytes.length; i++) {
    diff |= expectedBytes[i] ^ gotBytes[i];
  }
  if (diff !== 0) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  // Issue session.
  const token = await signSessionEdge(
    { ts: Date.now(), nonce: crypto.randomUUID().replace(/-/g, "") },
    secret,
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
