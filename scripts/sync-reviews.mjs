// Pulls RidgeLine's Google rating + latest reviews (Places API New) into src/data/reviews.json.
// Needs GOOGLE_PLACES_API_KEY (Google Cloud > Places API (New)). Without it, the existing snapshot is kept
// and the site shows the review-link block instead of a carousel. Never invents reviews.
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const PLACE_ID = "ChIJ80DXVivf82kRPksIFGDi10M";
const OUT = new URL("../src/data/reviews.json", import.meta.url);

// Load .env.local when run by hand (Next loads it itself during builds)
const envFile = new URL("../.env.local", import.meta.url);
if (!process.env.GOOGLE_PLACES_API_KEY && existsSync(envFile)) {
  for (const line of (await readFile(envFile, "utf8")).split("\n")) {
    const m = /^GOOGLE_PLACES_API_KEY=(.*)$/.exec(line.trim());
    if (m) process.env.GOOGLE_PLACES_API_KEY = m[1].replace(/^["']|["']$/g, "");
  }
}

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.log("[reviews] GOOGLE_PLACES_API_KEY not set; keeping existing snapshot.");
  process.exit(0);
}

try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri" },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const j = await res.json();
  const reviews = (j.reviews ?? [])
    .filter((r) => (r.rating ?? 0) >= 4 && r.text?.text)
    .map((r) => ({
      name: r.authorAttribution?.displayName ?? "Google user",
      photo: r.authorAttribution?.photoUri ?? null,
      rating: r.rating,
      text: r.text.text.trim(),
      when: r.relativePublishTimeDescription ?? "",
      date: r.publishTime ?? null,
    }));
  const out = { rating: j.rating ?? null, count: j.userRatingCount ?? 0, url: j.googleMapsUri ?? null, reviews };
  await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`[reviews] ${out.rating} stars, ${out.count} ratings, ${reviews.length} reviews saved.`);
} catch (e) {
  console.warn("[reviews] fetch failed, keeping snapshot:", String(e).slice(0, 200));
}
