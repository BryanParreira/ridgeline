import { company } from "./content";
import { cities } from "./cities";
import { servicePages } from "./services";
import { hasReviews, reviewData } from "./reviews";

// Set NEXT_PUBLIC_SITE_URL in Hostinger env vars if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ridgelineroofingmn.com").replace(/\/$/, "");

export const abs = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;

export const businessId = `${SITE_URL}/#business`;
export const websiteId = `${SITE_URL}/#website`;

// Bump when page content meaningfully changes; feeds sitemap <lastmod> (Google ignores lastmod that changes every build).
export const CONTENT_UPDATED = new Date("2026-10-17");

export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "RidgeLine Roofing, Austin MN roofing contractor" };

// Next replaces (not merges) openGraph per page, so every page builds its full social/SEO block here.
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const img = image ? { url: image, alt: title } : OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, siteName: "RidgeLine Roofing", locale: "en_US", title, description, url: abs(path), images: [img] },
    twitter: { card: "summary_large_image" as const, title, description, images: [img.url] },
  };
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": businessId,
  name: company.name,
  url: SITE_URL,
  telephone: "+1-507-440-8756",
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/brand/ridgeline-logo.png`,
  description:
    "Locally owned roofing contractor in Austin, MN with 20+ years of experience. Residential shingle and metal roofing, commercial TPO and EPDM, and 24/7 storm and hail damage repair with insurance claim help across southern Minnesota and north Iowa.",
  slogan: "Roofs built for Minnesota weather.",
  ...(hasReviews && {
    aggregateRating: { "@type": "AggregateRating", ratingValue: reviewData.rating, reviewCount: reviewData.count, bestRating: 5, worstRating: 1 },
    review: reviewData.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      ...(r.date && { datePublished: r.date.slice(0, 10) }),
    })),
  }),
  priceRange: "$$",
  hasMap: company.mapsHref,
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Credit Card",
  knowsAbout: [
    "Roof replacement",
    "Hail damage roof repair",
    "Wind damage roof repair",
    "Insurance claim roofing",
    "Asphalt shingle roofing",
    "Standing seam metal roofing",
    "TPO commercial roofing",
    "EPDM rubber roofing",
    "Roof inspections",
    "Ice dam prevention",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-507-440-8756",
      contactType: "customer service",
      areaServed: ["US-MN", "US-IA"],
      availableLanguage: "English",
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
  ],
  areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, ${c.state}` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Roofing services",
    itemListElement: servicePages.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.label, url: `${SITE_URL}/${s.slug}` },
    })),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "209 Main St S",
    addressLocality: "Austin",
    addressRegion: "MN",
    postalCode: "55912",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 43.6655, longitude: -92.9746 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [company.social.facebook, company.social.bbb],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: company.name,
  inLanguage: "en-US",
  publisher: { "@id": businessId },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
