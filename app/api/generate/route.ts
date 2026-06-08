import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

export async function POST(req: NextRequest) {
  try {
    const { url, type } = await req.json();

    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    // 1. Fetch URL content
    setStatus("Fetching URL...");
    let text = "";
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(15000),
      });
      text = await res.text();
    } catch (err: any) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${err.message}` },
        { status: 400 }
      );
    }

    // 2. Strip HTML tags
    const stripped = text
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s{2,}/g, " ")
      .trim()
      .substring(0, 10000);

    // 3. Extract title
    let title =
      stripped.match(/^([A-Z][^\n.]{10,80})/m)?.[1] ||
      stripped.substring(0, 80);
    // Try og:title
    const ogMatch = text.match(/<meta property="og:title" content="([^"]+)"/i);
    if (ogMatch) title = ogMatch[1];

    const slug = slugify(title) + "-" + crypto.randomBytes(2).toString("hex");

    // 4. Extract authors
    let authors = "";
    const authorMatch = stripped.match(/(?:authors?|by)[\s:]+([^\n]{10,200})/i);
    if (authorMatch) authors = authorMatch[1].trim();

    // 5. Extract date
    let date = "";
    const dateMatch = stripped.match(
      /(?:published|posted|dated)[\s:]*(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\w+ \d{1,2},? \d{4})/i
    );
    if (dateMatch) date = dateMatch[1];

    // 6. Generate sections
    const sentences = stripped.match(/[^.!?]+[.!?]+/g) || [];
    const core = sentences.slice(0, 20).join(" ");

    // Build sections: try to split by paragraph blocks
    const paragraphs = stripped.split(/\n\n+/).filter((p) => p.trim().length > 50);
    const sections = paragraphs.slice(0, 6).map((p, i) => {
      const headingMatch = p.match(/^#+\s*(.+)|^\*\*(.+?)\*\*/);
      const heading =
        headingMatch
          ? (headingMatch[1] || headingMatch[2])
          : `Part ${i + 1}`;
      const gist =
        sentences[i * 3]
          ? sentences[i * 3].trim().substring(0, 150)
          : p.substring(0, 120) + "...";

      return {
        heading: heading.replace(/^#+\s*/, "").trim(),
        gist,
        content: p.replace(/\n/g, " ").trim(),
        type:
          i === 0 ? "tldr" : i === paragraphs.length - 1 ? "conclusion" : "section",
      };
    });

    if (sections.length === 0) {
      // Fallback: one big section
      sections.push({
        heading: "Content",
        gist: stripped.substring(0, 150),
        content: stripped.substring(0, 2000),
        type: "section",
      });
    }

    // 7. Write JSON file
    const pageData = {
      slug,
      title,
      sourceUrl: url,
      authors,
      date: date || new Date().toISOString().split("T")[0],
      type: type || "article",
      sections,
      createdAt: new Date().toISOString(),
    };

    const contentDir = path.join(process.cwd(), "content/learn");
    await fs.mkdir(contentDir, { recursive: true });

    await fs.writeFile(
      path.join(contentDir, `${slug}.json`),
      JSON.stringify(pageData, null, 2)
    );

    // 8. Update manifest
    let manifest: any[] = [];
    try {
      const mf = await fs.readFile(
        path.join(contentDir, "manifest.json"),
        "utf8"
      );
      manifest = JSON.parse(mf);
    } catch {}

    // Remove existing entry with same slug
    manifest = manifest.filter((m) => m.slug !== slug);
    manifest.unshift({
      slug,
      title,
      sourceUrl: url,
      authors,
      date: pageData.date,
      type: pageData.type,
    });

    await fs.writeFile(
      path.join(contentDir, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );

    // 9. Commit + push
    setStatus("Committing...");
    try {
      const repoDir = await initGitRepo();
      execSync(`git add content/learn/`, { cwd: repoDir, stdio: "pipe" });
      execSync(
        `git commit -m "Add learning page: ${title.substring(0, 50)}"`,
        { cwd: repoDir, stdio: "pipe" }
      );
      execSync(`git push`, { cwd: repoDir, stdio: "pipe" });
    } catch (e: any) {
      console.error("Git push failed:", e.message);
      // Don't fail the request — file is written locally
    }

    return NextResponse.json({ slug, title });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Generation failed" },
      { status: 500 }
    );
  }
}

function setStatus(msg: string) {
  console.log(`[generate] ${msg}`);
}

async function initGitRepo() {
  const dir = path.join(os.tmpdir(), "krishna-home-repo");
  const token = process.env.GH_TOKEN;

  if (!token) throw new Error("GH_TOKEN not set");

  try {
    await fs.access(dir);
  } catch {
    execSync(
      `git clone https://${token}@github.com/krish567/krishna-home.git ${dir}`,
      { stdio: "pipe", timeout: 30000 }
    );
  }

  execSync(`git config user.email "jarvis@krish.io"`, {
    cwd: dir,
    stdio: "pipe",
  });
  execSync(`git config user.name "Jarvis"`, { cwd: dir, stdio: "pipe" });

  return dir;
}