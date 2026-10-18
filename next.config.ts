import type { NextConfig } from "next";

// Hostinger Node.js Web App (recommended): `npm run build` + `npm start`.
// Hostinger shared/static hosting: `npm run build:static` and upload /out
// (redirects are then handled by public/.htaccess instead).
const isStatic = process.env.STATIC_EXPORT === "1";

// Old Duda URLs that changed. Everything else keeps its original path.
const legacyRedirects = [
  { source: "/areas-we-serve/albert-lee-mn", destination: "/areas-we-serve/albert-lea-mn" },
  { source: "/gallery", destination: "/portfolio" },
  { source: "/testimonials", destination: "/" },
  { source: "/referrals", destination: "/contact-us" },
  { source: "/resources", destination: "/faqs" },
];

const nextConfig: NextConfig = {
  ...(isStatic
    ? { output: "export", trailingSlash: true }
    : {
        async redirects() {
          return legacyRedirects.map((r) => ({ ...r, permanent: true }));
        },
      }),
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  experimental: { optimizePackageImports: ["lucide-react", "motion"] },
  ...(isStatic
    ? {}
    : {
        async headers() {
          const longCache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];
          return [
            { source: "/images/:path*", headers: longCache },
            { source: "/brand/:path*", headers: longCache },
          ];
        },
      }),
};

export default nextConfig;
