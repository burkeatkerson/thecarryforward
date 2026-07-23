import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { clusters } from "./clusters";

export type FaqItem = { q: string; a: string };

export type ArticleMeta = {
  slug: string;
  cluster: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  type: "guide" | "brief";
  level: "intro" | "working" | "pro";
  tags: string[];
  faq: FaqItem[];
  readingMinutes: number;
};

export type Article = ArticleMeta & { content: string };

const CONTENT_DIR = path.join(process.cwd(), "content");

function readingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function parseFile(cluster: string, file: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, cluster, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  return {
    slug,
    cluster,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    type: data.type === "brief" ? "brief" : "guide",
    level: data.level === "intro" || data.level === "pro" ? data.level : "working",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    faq: Array.isArray(data.faq)
      ? data.faq
          .filter((f: unknown) => f && typeof f === "object" && "q" in (f as object) && "a" in (f as object))
          .map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) }))
      : [],
    readingMinutes: readingTime(content),
    content,
  };
}

export function getClusterArticles(cluster: string): Article[] {
  const dir = path.join(CONTENT_DIR, cluster);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseFile(cluster, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(cluster: string, slug: string): Article | null {
  const file = path.join(CONTENT_DIR, cluster, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return parseFile(cluster, `${slug}.mdx`);
}

export function getAllArticles(): Article[] {
  return clusters.flatMap((c) => getClusterArticles(c.slug));
}

/** Related articles: shared tags first, then same cluster, excluding self. */
export function getRelated(article: ArticleMeta, limit = 4): ArticleMeta[] {
  const all = getAllArticles().filter(
    (a) => !(a.cluster === article.cluster && a.slug === article.slug)
  );
  const scored = all
    .map((a) => {
      const shared = a.tags.filter((t) => article.tags.includes(t)).length;
      const sameCluster = a.cluster === article.cluster ? 1 : 0;
      return { a, score: shared * 2 + sameCluster };
    })
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, limit).map((s) => s.a);
}

/** Prev/next within a cluster, ordered guides-first then date desc (hub order). */
export function getSiblings(article: ArticleMeta): {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const list = getClusterArticles(article.cluster);
  const idx = list.findIndex((a) => a.slug === article.slug);
  return {
    prev: idx > 0 ? list[idx - 1] : null,
    next: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
  };
}

/** Extract h2/h3 headings for the table of contents. */
export function extractHeadings(content: string): { depth: 2 | 3; text: string; id: string }[] {
  const lines = content.split("\n");
  const out: { depth: 2 | 3; text: string; id: string }[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "").trim();
      out.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) });
    }
  }
  return out;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
