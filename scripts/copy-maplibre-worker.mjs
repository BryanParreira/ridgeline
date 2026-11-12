// maplibre-gl 6 loads its web worker as a module from a URL. Next's bundler does not
// emit it, so copy the worker files from node_modules into /public and point the map at them.
import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const src = join("node_modules", "maplibre-gl", "dist");
const dest = join("public", "vendor", "maplibre");
mkdirSync(dest, { recursive: true });
for (const f of readdirSync(src)) {
  if (/^maplibre-gl-(worker|shared)\.mjs$/.test(f)) cpSync(join(src, f), join(dest, f));
}
