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

// Content files are located under src/content/posts after src-structure migration
// Support both flat files:   src/content/posts/YYYY-MM-DD-slug.md
// and directory entries:     src/content/posts/YYYY-MM-DD-slug/index.md
const postsDir = path.join(process.cwd(), 'src', 'content', 'posts');
const FILE_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/i;
const DIR_RE = /^(\d{4}-\d{2}-\d{2})-(.+)$/i;

function normalizeSlugSegment(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function toSlugFromFilename(filename: string): string {
  const m = filename.match(FILE_RE);
  const seg = m ? m[2] : filename;
  return normalizeSlugSegment(seg);
}

function toSlugFromDir(dirname: string): string {
  const m = dirname.match(DIR_RE);
  const seg = m ? m[2] : dirname;
  return normalizeSlugSegment(seg);
}

type PostEntry = { slug: string; fullPath: string; date: string; pathSegment: string };

function findAllPostEntries(): PostEntry[] {
  if (!fs.existsSync(postsDir)) return [];
  const dirents = fs.readdirSync(postsDir, { withFileTypes: true });
  const entries: PostEntry[] = [];

  for (const d of dirents) {
    if (d.isFile() && FILE_RE.test(d.name)) {
      const full = path.join(postsDir, d.name);
      const m = d.name.match(FILE_RE);
      const date = (m?.[1]) || '';
      const pathSegment = m ? `${m[1]}-${m[2]}` : d.name.replace(/\.(md|markdown)$/i, '');
      entries.push({ slug: toSlugFromFilename(d.name), fullPath: full, date, pathSegment });
      continue;
    }

    if (d.isDirectory() && DIR_RE.test(d.name)) {
      const candIndexMd = path.join(postsDir, d.name, 'index.md');
      const candIndexMarkdown = path.join(postsDir, d.name, 'index.markdown');
      let full = '';
      if (fs.existsSync(candIndexMd)) full = candIndexMd;
      else if (fs.existsSync(candIndexMarkdown)) full = candIndexMarkdown;
      if (full) {
        const m = d.name.match(DIR_RE);
        const date = (m?.[1]) || '';
        const pathSegment = d.name;
        entries.push({ slug: toSlugFromDir(d.name), fullPath: full, date, pathSegment });
      }
    }
  }

  return entries;
}

export function listPostSlugs(): string[] {
  const entries = findAllPostEntries();
  return entries.map((e) => e.slug);
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const entries = findAllPostEntries();
  const posts = entries.map((e) => {
    const raw = fs.readFileSync(e.fullPath, 'utf8');
    const { data } = matter(raw);
    const date = e.date || (data?.date as string) || '';
    const title = (data?.title as string) || e.slug.replace(/-/g, ' ');
    return { slug: e.slug, title, date } as PostSummary;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const entries = findAllPostEntries();
  const match = entries.find((e) => e.slug === slug);
  if (!match) return null;
  const raw = fs.readFileSync(match.fullPath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  let htmlStr = processed.toString();
  // Rewrite relative asset paths (./assets/...) to absolute public paths (/posts/{slug}/assets/...)
  // Because the page URL is /posts/{slug} (no trailing slash), browsers resolve ./assets relative to /posts/.
  // Ensuring absolute paths avoids 404 like /posts/assets/*.
  const absPrefix = `/posts/${match.pathSegment}/assets/`;
  htmlStr = htmlStr
    .replace(/src=("|')\.\/assets\//g, (_m, q) => `src=${q}${absPrefix}`)
    .replace(/href=("|')\.\/assets\//g, (_m, q) => `href=${q}${absPrefix}`);
  const date = match.date || (data?.date as string) || '';
  const title = (data?.title as string) || slug.replace(/-/g, ' ');
  return { slug, title, date, html: htmlStr };
}


