// Pulls RidgeLine's completed jobs from ProjectMapIt and writes a normalized
// snapshot to src/data/projects.json. Runs before every build; if the API is
// unreachable the existing snapshot is kept so deploys never break.
import { writeFile, readFile } from "node:fs/promises";

const ORG = "67f7f0011167c38003a8e505";
const OUT = new URL("../src/data/projects.json", import.meta.url);
const SKIP = new Set(["Other Services", "Roofing"]);

const STREET_ABBR = [
  [/\bSouthwest\b/i, "SW"],
  [/\bSoutheast\b/i, "SE"],
  [/\bNorthwest\b/i, "NW"],
  [/\bNortheast\b/i, "NE"],
  [/\bAvenue\b/i, "Ave"],
  [/\bStreet\b/i, "St"],
  [/\bDrive\b/i, "Dr"],
  [/\bBoulevard\b/i, "Blvd"],
  [/\bPlace\b/i, "Pl"],
  [/\bCourt\b/i, "Ct"],
  [/\bLane\b/i, "Ln"],
  [/\bRoad\b/i, "Rd"],
];

// Privacy: publish the street name only (no house number) and round
// coordinates to ~100 m so individual homes aren't pinpointed.
function publicStreet(street = "") {
  let s = street.replace(/^\s*\d+[A-Za-z]?\s+/, "").trim();
  for (const [re, abbr] of STREET_ABBR) s = s.replace(re, abbr);
  return s;
}
const round = (n) => Math.round(n * 1000) / 1000;

function normalize(r) {
  const cats = r.categories || [];
  const product = cats.find((c) => !c.parent && !SKIP.has(c.name))?.name ?? null;
  const color = cats.find((c) => c.parent && !SKIP.has(c.parent.name))?.name ?? null;
  const photos = (r.photos || [])
    .filter((p) => p.published !== false && p.path?.large)
    .map((p) => ({
      s: p.path.small,
      l: p.path.large,
      w: p.meta?.width ?? 1200,
      h: p.meta?.height ?? 800,
    }));
  const dates = (r.photos || []).map((p) => p.takenPicDate).filter(Boolean).sort();
  return {
    id: r.id,
    city: r.city,
    state: r.state || "MN",
    zip: r.zip,
    street: publicStreet(r.street || r.name),
    lng: round(r.location[0]),
    lat: round(r.location[1]),
    date: (dates[0] || r.created).slice(0, 10),
    product,
    color,
    photos,
  };
}

async function main() {
  const all = [];
  let page = 1;
  let pages = 1;
  do {
    const res = await fetch(`https://projectmapit.com/v3/org/${ORG}/recent-work?page=${page}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
    const json = await res.json();
    pages = json.pages;
    all.push(...json.results);
    page++;
  } while (page <= pages);

  const projects = all
    .filter((r) => r.active && Array.isArray(r.location))
    .map(normalize)
    .sort((a, b) => b.date.localeCompare(a.date));

  await writeFile(OUT, JSON.stringify(projects, null, 1) + "\n");
  console.log(`[sync-projects] wrote ${projects.length} projects`);
}

main().catch(async (err) => {
  try {
    const existing = JSON.parse(await readFile(OUT, "utf8"));
    console.warn(`[sync-projects] ${err.message} — keeping snapshot (${existing.length} projects)`);
  } catch {
    console.warn(`[sync-projects] ${err.message} — no snapshot, writing empty list`);
    await writeFile(OUT, "[]\n");
  }
});
