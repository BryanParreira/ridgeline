import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import ProjectCards from "@/components/ProjectCards";
import CtaBlock from "@/components/CtaBlock";
import { Reveal } from "@/components/Reveal";
import { company, images } from "@/lib/content";
import { cities, distanceKm, getCity, regionInfo } from "@/lib/cities";
import { projects, projectsNear } from "@/lib/projects";
import { servicePages } from "@/lib/services";
import { abs, breadcrumbSchema, businessId, faqSchema } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCity((await params).city);
  if (!c) return {};
  const title = `Roofing Contractor in ${c.name}, ${c.state} | RidgeLine Roofing`;
  const description = `Roof replacement, storm & hail damage repair, and commercial roofing in ${c.name}, ${c.state}. Locally owned, 20+ years experience, insurance claim help. Call ${company.phone}.`;
  return {
    title,
    description,
    alternates: { canonical: `/areas-we-serve/${c.slug}` },
    openGraph: { title, description, url: abs(`/areas-we-serve/${c.slug}`) },
  };
}

export default async function CityPage({ params }: Props) {
  const c = getCity((await params).city);
  if (!c) notFound();

  const region = regionInfo[c.region];
  const local = projects.filter((p) => p.city === c.name);
  const near = local.length >= 3 ? local.slice(0, 6) : projectsNear(c, 6);
  const nearbyCities = cities
    .filter((o) => o.slug !== c.slug)
    .sort((a, b) => distanceKm(c, a) - distanceKm(c, b))
    .slice(0, 6);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Area", path: "/service-area" },
    { name: `${c.name}, ${c.state}`, path: `/areas-we-serve/${c.slug}` },
  ];
  const faqs = [
    {
      q: `Do you provide roofing services in ${c.name}, ${c.state}?`,
      a: `Yes. RidgeLine Roofing serves ${c.name} and the rest of ${c.county} with roof replacements, inspections, storm damage repair and commercial roofing.`,
    },
    {
      q: `How quickly can you respond to storm damage in ${c.name}?`,
      a: `We offer 24/7 emergency service. ${c.region === "home" ? `${c.name} is ${c.slug === "austin-mn" ? "our home base" : `about ${c.drive} from our Austin shop`}, so` : "We schedule"} we can typically get your roof tarped and secured quickly after a storm.`,
    },
    {
      q: `Will you work with my insurance company on a ${c.name} storm claim?`,
      a: "Yes. We document the damage, meet your adjuster on site, and work directly with your insurance company throughout the claim.",
    },
  ];

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Roofing in ${c.name}, ${c.state}`,
            serviceType: "Roofing contractor",
            provider: { "@id": businessId },
            areaServed: { "@type": "City", name: `${c.name}, ${c.state}` },
            url: abs(`/areas-we-serve/${c.slug}`),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${region.title} · ${c.county}`}
        title={`Roofing contractor in ${c.name}, ${c.state}`}
        intro={region.intro(c)}
        image={near[0]?.photos[0]?.l ?? images.residential}
        imageAlt={`Roof replacement near ${c.name}, ${c.state} by RidgeLine Roofing`}
      />

      <section className="section">
        <div className="container prose-grid">
          <Reveal className="prose">
            <h2>Roofing services in {c.name}</h2>
            <p>
              Whether you need a full roof replacement, a second opinion after a storm, or a dependable commercial roofer,
              RidgeLine Roofing brings 20+ years of experience to {c.name} homeowners and businesses.
            </p>
            <ul className="checks">
              {servicePages
                .filter((s) => s.slug !== "residential-roofing" && s.slug !== "commercial-roofing")
                .map((s) => (
                  <li key={s.slug}>
                    <Check size={16} />
                    <Link href={`/${s.slug}`}>{s.label}</Link>
                  </li>
                ))}
            </ul>
            <h2>Built for {c.name} weather</h2>
            <p>{region.weather(c)}</p>
            <h2>{c.name} roofing FAQ</h2>
            <FAQ items={faqs} />
          </Reveal>
          <aside className="aside-card">
            <h3>Serving {c.name}</h3>
            <p>
              {c.slug === "austin-mn" ? "Our shop is right here in Austin." : `About ${c.drive} from our Austin shop.`} Call
              for an inspection or emergency storm service.
            </p>
            <Link href="/contact-us" className="btn btn-primary">
              Get a quote <ArrowRight size={16} />
            </Link>
            <a href={company.phoneHref} className="btn btn-outline">
              {company.phone}
            </a>
          </aside>
        </div>
      </section>

      {near.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="section-head row">
              <div style={{ display: "grid", gap: 14 }}>
                <span className="eyebrow">{local.length >= 3 ? `${local.length} projects in ${c.name}` : "Nearby work"}</span>
                <h2 className="h-lg">{local.length >= 3 ? `Recent roofs in ${c.name}` : `Recent roofs near ${c.name}`}</h2>
              </div>
              <Link href="/portfolio" className="btn btn-outline">
                Open project map <ArrowRight size={16} />
              </Link>
            </div>
            <ProjectCards items={near} />
          </div>
        </section>
      )}

      <section className="section tight">
        <div className="container">
          <h2 className="h-md" style={{ marginBottom: 20 }}>
            Nearby communities we serve
          </h2>
          <div className="related">
            {nearbyCities.map((n) => (
              <Link key={n.slug} href={`/areas-we-serve/${n.slug}`}>
                {n.name}, {n.state} <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock title={`Need a roofer in ${c.name}?`} />
    </main>
  );
}
