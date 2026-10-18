// Add real before/after pairs here (drop the photos in public/images, same framing for both shots).
// The home-page slider section only appears once at least one pair exists.
export type BeforeAfterPair = { before: string; after: string; alt: string; place: string; note?: string };

export const beforeAfter: BeforeAfterPair[] = [
  // { before: "/images/ba/austin-before.jpg", after: "/images/ba/austin-after.jpg", alt: "Roof replacement on a ranch home", place: "Austin, MN", note: "Storm-damaged 3-tab to architectural shingle" },
];
