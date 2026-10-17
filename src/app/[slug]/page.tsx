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
import { company } from "@/lib/content";
import { getService, servicePages } from "@/lib/services";
import { projects } from "@/lib/projects";
import { cities } from "@/lib/cities";
import { abs, breadcrumbSchema, businessId, faqSchema } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => servicePages.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: abs(`/${s.slug}`), images: [s.image] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    ...(s.group === "residential" && s.slug !== "residential-roofing"
      ? [{ name: "Residential Roofing", path: "/residential-roofing" }]
      : s.group === "commercial" && s.slug !== "commercial-roofing"
        ? [{ name: "Commercial Roofing", path: "/commercial-roofing" }]
        : []),
    { name: s.label, path: `/${s.slug}` },
  ];
  const related = s.related.map(getService).filter(Boolean);
  const showWork = s.group === "residential" || s.group === "storm";

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(s.faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.label,
            serviceType: s.label,
            description: s.metaDescription,
            url: abs(`/${s.slug}`),
            provider: { "@id": businessId },
            areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, ${c.state}` })),
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={s.eyebrow} title={s.h1} intro={s.intro} image={s.image} imageAlt={`${s.label} by RidgeLine Roofing`} />

      <section className="section">
        <div className="container prose-grid">
          <Reveal className="prose">
            {s.sections.map((sec) => (
              <div key={sec.h2}>
                <h2>{sec.h2}</h2>
                {sec.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
            <h2>What&apos;s included</h2>
            <ul className="checks">
              {s.checks.map((c) => (
                <li key={c}>
                  <Check size={16} /> {c}
                </li>
              ))}
            </ul>
            <h2>Common questions</h2>
            <FAQ items={s.faqs} />
          </Reveal>
          <aside className="aside-card">
            <h3>Talk to a local roofer</h3>
            <p>Get an honest inspection and a clear, written quote. 24/7 for storm emergencies.</p>
            <Link href="/contact-us" className="btn btn-primary">
              Get a quote <ArrowRight size={16} />
            </Link>
            <a href={company.phoneHref} className="btn btn-outline">
              {company.phone}
            </a>
          </aside>
        </div>
      </section>

      {showWork && projects.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="section-head row">
              <div style={{ display: "grid", gap: 14 }}>
                <span className="eyebrow">Recent projects</span>
                <h2 className="h-lg">Recent roofs from our crew.</h2>
              </div>
              <Link href="/portfolio" className="btn btn-outline">
                Open project map <ArrowRight size={16} />
              </Link>
            </div>
            <ProjectCards items={projects.slice(0, 3)} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section tight">
          <div className="container">
            <h2 className="h-md" style={{ marginBottom: 20 }}>
              Related services
            </h2>
            <div className="related">
              {related.map((r) => (
                <Link key={r!.slug} href={`/${r!.slug}`}>
                  {r!.label} <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBlock />
    </main>
  );
}
