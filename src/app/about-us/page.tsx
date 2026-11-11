import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowRight, Award, BadgeCheck, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import CtaBlock from "@/components/CtaBlock";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";
import { aboutPageLive, company } from "@/lib/content";
import { abs, breadcrumbSchema, businessId, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About RidgeLine Roofing | Locally Owned Roofer in Austin, MN",
  description: `Meet ${company.owner.name}, owner of RidgeLine Roofing in Austin, MN. Licensed Minnesota roofer (${company.owner.license}), CertainTeed SidingMaster Pro credentialed, 20+ years of experience.`,
  path: "/about-us",
});

const initials = company.owner.name
  .split(" ")
  .map((w) => w[0])
  .join("");

export default function AboutPage() {
  if (!aboutPageLive) notFound();
  const hasPhoto = existsSync(join(process.cwd(), "public", company.owner.photo));

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: abs("/about-us"),
            name: "About RidgeLine Roofing",
            about: { "@id": businessId },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: company.owner.name,
            jobTitle: company.owner.title,
            worksFor: { "@id": businessId },
            ...(hasPhoto ? { image: abs(company.owner.photo) } : {}),
          },
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ]}
        eyebrow="About us"
        title="A local roofer you can call by name."
        intro={`RidgeLine Roofing is owned and run by ${company.owner.name} in Austin, Minnesota. When you call, you reach the person who stands behind the work.`}
      />

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <div className="about-photo">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={company.owner.photo} alt={`${company.owner.name}, owner of RidgeLine Roofing`} width={640} height={800} />
              ) : (
                <span aria-hidden="true">{initials}</span>
              )}
            </div>
            <p className="about-caption">
              <strong>{company.owner.name}</strong>
              <span>{company.owner.title}, RidgeLine Roofing LLC</span>
            </p>
          </Reveal>

          <Reveal>
            <p className="eyebrow" style={{ display: "block" }}>
              Meet the owner
            </p>
            <h2 className="h-lg" style={{ margin: "12px 0 18px" }}>
              Hi, I&apos;m {company.owner.name.split(" ")[0]}.
            </h2>
            <p className="lede">
              RidgeLine Roofing is a locally owned roofing contractor based at {company.address}. We replace and repair residential
              shingle and metal roofs, install commercial TPO and flat roofing, and respond to storm damage across southern Minnesota
              and north Iowa.
            </p>
            <p className="lede" style={{ marginTop: 14 }}>
              We bring {company.years}+ years of roofing experience to every job. You get an honest inspection, a clear written quote,
              and a crew that cleans up after itself.
            </p>
            <div className="about-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Get a free quote <ArrowRight size={16} />
              </Link>
              <a href={company.phoneHref} className="btn btn-outline">
                <Phone size={16} /> {company.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ display: "block" }}>
              Licensed &amp; credentialed
            </p>
            <h2 className="h-lg" style={{ margin: "12px 0 28px" }}>
              Credentials you can verify.
            </h2>
          </Reveal>
          <div className="about-facts">
            <Reveal className="about-fact">
              <ShieldCheck size={22} />
              <h3>Minnesota licensed roofer</h3>
              <p>
                License no. <strong>{company.owner.license}</strong>
              </p>
              <small>Held by {company.owner.name}. Ask us for a copy any time.</small>
            </Reveal>
            <Reveal className="about-fact">
              <Award size={22} />
              <h3>CertainTeed SidingMaster Pro</h3>
              <p>Credentialed contractor</p>
              <small>Trained and credentialed through CertainTeed.</small>
            </Reveal>
            <Reveal className="about-fact">
              <Clock size={22} />
              <h3>{company.years}+ years of experience</h3>
              <p>Residential and commercial</p>
              <small>Open 24/7 for storm emergencies.</small>
            </Reveal>
            <Reveal className="about-fact">
              <MapPin size={22} />
              <h3>Locally owned in Austin, MN</h3>
              <p>{company.address}</p>
              <small>
                <Link href="/service-area">See the towns we serve</Link>
              </small>
            </Reveal>
          </div>
          <p className="about-note">
            <BadgeCheck size={16} /> See our work on the <Link href="/portfolio">project map</Link>: real roofs, real photos, real addresses.
          </p>
        </div>
      </section>

      <CtaBlock title="Let's look at your roof." />
    </main>
  );
}
