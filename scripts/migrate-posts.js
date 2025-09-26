#!/usr/bin/env node
/*
  Migrate flat markdown posts to folder-based posts with co-located assets.
  - From: src/content/posts/YYYY-MM-DD-slug.md (or .markdown)
  - To:   src/content/posts/YYYY-MM-DD-slug/index.md and ./assets/*
  - Copies referenced images from /assets/img/post/* into each post's assets/
  - Rewrites markdown and basic <img src> references to ./assets/*
*/

const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const GLOBAL_ASSETS_DIR = path.join(ROOT, 'assets', 'img', 'post');

const FILE_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/i;

function listFlatPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => FILE_RE.test(f) && fs.statSync(path.join(POSTS_DIR, f)).isFile());
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

function migrateOnePost(file) {
  const full = path.join(POSTS_DIR, file);
  const m = file.match(FILE_RE);
  const basename = `${m[1]}-${m[2]}`; // YYYY-MM-DD-slug
  const targetDir = path.join(POSTS_DIR, basename);
  const targetIndex = path.join(targetDir, 'index.' + m[3].toLowerCase());
  const assetsDir = path.join(targetDir, 'assets');

  if (fs.existsSync(targetIndex)) {
    // Already migrated
    return { file, skipped: true, reason: 'already exists' };
  }

  const raw = fs.readFileSync(full, 'utf8');

  // Collect image references from markdown and basic HTML img tags
  const mdImgRe = /!\[[^\]]*\]\((\/assets\/img\/post\/([^\s)]+))\)/g;
  const htmlImgRe = /<img\s+[^>]*src=["'](\/assets\/img\/post\/([^"'>\s]+))["'][^>]*>/g;
  const foundFiles = new Set();
  let match;
  while ((match = mdImgRe.exec(raw))) foundFiles.add(match[2]);
  while ((match = htmlImgRe.exec(raw))) foundFiles.add(match[2]);

  // Rewrite content paths to relative ./assets/...
  let next = raw
    .replace(mdImgRe, (all, abs, name) => all.replace(abs, `./assets/${name}`))
    .replace(htmlImgRe, (all, abs, name) => all.replace(abs, `./assets/${name}`));

  // Create target dir and move markdown -> index.md/markdown
  ensureDir(targetDir);
  fs.writeFileSync(targetIndex, next, 'utf8');

  // Copy referenced images into assets/
  if (foundFiles.size > 0) ensureDir(assetsDir);
  for (const name of foundFiles) {
    const srcPath = path.join(GLOBAL_ASSETS_DIR, name);
    const destPath = path.join(assetsDir, name);
    const ok = copyIfExists(srcPath, destPath);
    if (!ok) {
      console.warn(`[warn] missing source image: ${srcPath}`);
    }
  }

  // Remove old flat file
  fs.unlinkSync(full);
  return { file, migrated: true, images: foundFiles.size };
}

function main() {
  const files = listFlatPosts();
  if (files.length === 0) {
    console.log('No flat posts to migrate.');
    return;
  }
  const results = files.map(migrateOnePost);
  const migrated = results.filter((r) => r.migrated).length;
  console.log(`Migrated ${migrated}/${files.length} posts.`);
}

main();


