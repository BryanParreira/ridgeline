import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RidgeLine Roofing",
    short_name: "RidgeLine",
    description: "Roofing contractor in Austin, MN. Residential, commercial and storm-damage roofing.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c2471e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
