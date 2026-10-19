import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { MessageSquare, Phone } from "lucide-react";
import { company } from "@/lib/content";
import ContactLines from "@/components/ContactLines";
import { Reveal, Ridges } from "@/components/Reveal";
import { breadcrumbSchema, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact RidgeLine Roofing | Get a Roofing Quote | Austin, MN",
  description:
    "Call for a roofing quote or inspection from RidgeLine Roofing in Austin, MN. Call (507) 440-8756, available 24/7 for storm emergencies.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <section className="section" style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <Ridges />
            <p className="eyebrow" style={{ marginTop: 16, display: "block" }}>
              Contact
            </p>
            <h1 className="h-xl" style={{ margin: "14px 0 18px" }}>
              Let&apos;s talk about your roof.
            </h1>
            <p className="lede">
              Call us to schedule an inspection and get a free quote. For storm emergencies, call any time.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
              <a href={company.phoneHref} className="btn btn-primary">
                <Phone size={18} /> Call {company.phone}
              </a>
              <a href={company.smsHref} className="btn btn-outline">
                <MessageSquare size={18} /> Text us
              </a>
            </div>
            <ContactLines />
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
