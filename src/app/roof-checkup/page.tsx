import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import RoofCheckup from "@/components/RoofCheckup";
import CtaBlock from "@/components/CtaBlock";
import FAQ from "@/components/FAQ";
import { Reveal, Ridges } from "@/components/Reveal";
import { abs, breadcrumbSchema, businessId, faqSchema, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Free Roof Checkup | Does My Roof Need Replacing? | RidgeLine Roofing MN",
  description: "Answer 3 quick questions to see if your roof needs repair, an inspection or replacement. Free roof checkup from RidgeLine Roofing in Austin, MN.",
  path: "/roof-checkup",
});

const faqs = [
  { q: "How long does a roof last in Minnesota?", a: "Asphalt shingle roofs in Minnesota typically last 20 to 30 years. Freeze-thaw cycles, ice dams, hail and poor attic ventilation can shorten that. Standing-seam metal roofs commonly last 40 to 70 years, and TPO or EPDM commercial roofs 20 to 30 years." },
  { q: "What are the signs I need a new roof?", a: "Common signs are a roof over 20 years old, missing or curling shingles, granules collecting in gutters, water stains on ceilings, ice dams every winter, sagging areas and recent hail or wind damage." },
  { q: "Is a roof inspection really free?", a: "Yes. RidgeLine Roofing inspects roofs for free, documents the condition with photos and gives you a clear written recommendation with no pressure." },
  { q: "Will insurance pay for hail damage to my roof?", a: "Often, yes. Hail and wind damage is commonly covered by homeowners insurance. We document the damage, meet your adjuster on site and work with your insurance company on the claim." },
];

export default function RoofCheckupPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Roof Checkup", path: "/roof-checkup" }]),
          faqSchema(faqs),
          { "@context": "https://schema.org", "@type": "WebPage", name: "Free Roof Checkup", url: abs("/roof-checkup"), about: { "@id": businessId } },
        ]}
      />
      <section className="section" style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <div className="container quote">
          <Reveal>
            <Ridges />
            <p className="eyebrow" style={{ marginTop: 16, display: "block" }}>Free roof checkup</p>
            <h1 className="h-xl" style={{ margin: "14px 0 18px" }}>Does my roof need replacing?</h1>
            <p className="lede">Three quick questions. Get an honest read on your roof&apos;s health in under a minute, then book a free inspection if you want a pro to confirm.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RoofCheckup />
          </Reveal>
        </div>
      </section>
      <section className="section alt">
        <div className="container faq-wrap">
          <Reveal>
            <span className="eyebrow">Roof health FAQ</span>
            <h2 className="h-lg" style={{ marginTop: 14 }}>How long do roofs last in Minnesota?</h2>
          </Reveal>
          <Reveal delay={0.1}><FAQ items={faqs} /></Reveal>
        </div>
      </section>
      <CtaBlock title="Want a pro to check it?" />
    </main>
  );
}
