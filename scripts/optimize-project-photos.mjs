// Mirrors each project's first photo as small local WebP (480/800w) so cards load ~40KB instead of ~460KB.
// Writes public/images/projects/<id>-<w>.webp and src/data/projectImages.json (ids that have local copies).
// Skips files that already exist; failures just fall back to the remote photo.
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const projects = JSON.parse(await readFile(new URL("../src/data/projects.json", import.meta.url), "utf8"));
const OUT = new URL("../public/images/projects/", import.meta.url);
await mkdir(OUT, { recursive: true });
const WIDTHS = [480, 800];
const ids = [];

for (const p of projects) {
  const url = p.photos?.[0]?.l;
  if (!url) continue;
  const files = WIDTHS.map((w) => new URL(`${p.id}-${w}.webp`, OUT));
  try {
    if (!files.every((f) => existsSync(f))) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      await Promise.all(WIDTHS.map((w, i) => sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(files[i].pathname)));
    }
    ids.push(p.id);
  } catch (e) {
    console.warn(`[photos] ${p.id} skipped:`, String(e).slice(0, 80));
  }
}
await writeFile(new URL("../src/data/projectImages.json", import.meta.url), JSON.stringify(ids));
console.log(`[photos] ${ids.length}/${projects.length} projects have local thumbnails`);
