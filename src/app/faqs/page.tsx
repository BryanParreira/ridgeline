import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import CtaBlock from "@/components/CtaBlock";
import { faqs } from "@/lib/content";
import { servicePages } from "@/lib/services";
import { breadcrumbSchema, faqSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing FAQs | RidgeLine Roofing | Austin, MN",
  description:
    "Answers to common roofing questions: repair vs. replacement, insurance claims, storm damage, shingle vs. metal, timelines and more.",
  alternates: { canonical: "/faqs" },
};

export default function FaqPage() {
  const all = [...faqs, ...servicePages.flatMap((s) => s.faqs)];
  const unique = all.filter((f, i) => all.findIndex((x) => x.q === f.q) === i);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQs", path: "/faqs" },
  ];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(unique)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        title="Roofing questions, answered"
        intro="Straight answers from a local crew. Don't see your question? Give us a call."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <FAQ items={unique} />
        </div>
      </section>
      <CtaBlock />
    </main>
  );
}
