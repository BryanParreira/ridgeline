import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import ContactLines from "@/components/ContactLines";
import { Reveal, Ridges } from "@/components/Reveal";
import { breadcrumbSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact RidgeLine Roofing | Get a Roofing Quote | Austin, MN",
  description:
    "Request a roofing quote or inspection from RidgeLine Roofing in Austin, MN. Call (507) 440-8756, available 24/7 for storm emergencies.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <section className="section" style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <div className="container quote">
          <Reveal>
            <Ridges />
            <p className="eyebrow" style={{ marginTop: 16, display: "block" }}>
              Contact
            </p>
            <h1 className="h-xl" style={{ margin: "14px 0 18px" }}>
              Let&apos;s talk about your roof.
            </h1>
            <p className="lede">
              Tell us what you need and we&apos;ll follow up to schedule an inspection. For storm emergencies, call us
              any time.
            </p>
            <ContactLines />
          </Reveal>
          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line)" }}>
        <iframe
          title="RidgeLine Roofing location"
          src="https://www.google.com/maps?q=209+Main+St+S,+Austin,+MN+55912&output=embed"
          width="100%"
          height="380"
          style={{ border: 0, display: "block", filter: "grayscale(0.4)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
