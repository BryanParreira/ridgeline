// Builds responsive WebP/WebP variants of public/images/*.jpg -> public/images/opt/<name>-<w>.webp
import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "node:fs";

const SRC = "public/images";
const OUT = `${SRC}/opt`;
const WIDTHS = [480, 800, 1200, 1600];
mkdirSync(OUT, { recursive: true });

for (const f of readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f))) {
  const name = f.replace(/\.jpe?g$/i, "");
  const meta = await sharp(`${SRC}/${f}`).metadata();
  for (const w of WIDTHS) {
    for (const [ext, opts] of [["webp", { quality: 76 }]]) {
      const out = `${OUT}/${name}-${w}.${ext}`;
      if (existsSync(out)) continue;
      await sharp(`${SRC}/${f}`).resize({ width: w })[ext](opts).toFile(out);
    }
  }
  console.log(name, meta.width + "x" + meta.height);
}
