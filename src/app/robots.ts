import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

// Search and AI answer-engine crawlers are explicitly welcome so the business can be cited in AI answers.
const ai = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...ai.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
