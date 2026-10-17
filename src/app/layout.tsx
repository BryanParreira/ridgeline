import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MobileCallBar from "@/components/MobileCallBar";
import { SITE_URL, businessSchema } from "@/lib/site";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RidgeLine Roofing | Roofing Contractor in Austin, MN & Southern Minnesota",
    template: "%s",
  },
  description:
    "Locally owned roofing contractor in Austin, MN. Residential, commercial and storm-damage roofing for Albert Lea, Rochester, Owatonna, Waseca and north Iowa. 20+ years experience. Call (507) 440-8756.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "RidgeLine Roofing",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "RidgeLine Roofing" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
