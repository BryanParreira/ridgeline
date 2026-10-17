import { company } from "./content";

// Set NEXT_PUBLIC_SITE_URL in Hostinger env vars if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ridgelineroofingmn.com").replace(/\/$/, "");

export const abs = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;

export const businessId = `${SITE_URL}/#business`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": businessId,
  name: company.name,
  url: SITE_URL,
  telephone: "+1-507-440-8756",
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  priceRange: "$$",
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
