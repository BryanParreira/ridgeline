import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/services";
import { cities } from "@/lib/cities";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/portfolio"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/contact-us"), lastModified: now, priority: 0.8 },
    { url: abs("/service-area"), lastModified: now, priority: 0.7 },
    { url: abs("/faqs"), lastModified: now, priority: 0.6 },
    ...servicePages.map((s) => ({ url: abs(`/${s.slug}`), lastModified: now, priority: 0.9 })),
    ...cities.map((c) => ({ url: abs(`/areas-we-serve/${c.slug}`), lastModified: now, priority: c.region === "home" ? 0.8 : 0.6 })),
  ];
}
