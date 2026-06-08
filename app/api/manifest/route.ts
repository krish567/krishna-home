import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "content/learn/manifest.json"),
      "utf8"
    );
    const pages = JSON.parse(file);
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ pages: [] });
  }
}