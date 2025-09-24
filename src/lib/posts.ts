import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
};

export type PostDetail = PostSummary & {
  html: string;
};

const postsDir = path.join(process.cwd(), 'content', 'posts');
const FILE_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/i;

function toSlug(filename: string) {
  const m = filename.match(FILE_RE);
  const seg = m ? m[2] : filename;
  return seg.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function listPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir).filter((f) => FILE_RE.test(f)).map((f) => toSlug(f));
}

export async function getAllPosts(): Promise<PostSummary[]> {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => FILE_RE.test(f));
  const posts = files.map((f) => {
    const full = path.join(postsDir, f);
    const raw = fs.readFileSync(full, 'utf8');
    const { data } = matter(raw);
    const date = (f.match(FILE_RE)?.[1]) || (data?.date as string) || '';
    const title = (data?.title as string) || toSlug(f).replace(/-/g, ' ');
    return { slug: toSlug(f), title, date } as PostSummary;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!fs.existsSync(postsDir)) return null;
  const file = fs
    .readdirSync(postsDir)
    .find((f) => FILE_RE.test(f) && toSlug(f) === slug);
  if (!file) return null;
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const htmlStr = processed.toString();
  const date = (file.match(FILE_RE)?.[1]) || (data?.date as string) || '';
  const title = (data?.title as string) || slug.replace(/-/g, ' ');
  return { slug, title, date, html: htmlStr };
}


