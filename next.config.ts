import type { NextConfig } from "next";

// Hostinger Node.js Web App: default build (`npm run build` + `npm start`).
// Hostinger shared/static hosting: set STATIC_EXPORT=1 to emit a static site in /out.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
