import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Services from "@/components/home/Services";
import RecentWork from "@/components/home/RecentWork";
import Materials from "@/components/home/Materials";
import Process from "@/components/home/Process";
import StormBand from "@/components/home/StormBand";
import Reviews from "@/components/home/Reviews";
import AreaPreview from "@/components/home/AreaPreview";
import QuoteForm from "@/components/QuoteForm";
import ContactLines from "@/components/ContactLines";
import FAQ from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { cities } from "@/lib/cities";
import { faqs } from "@/lib/content";
import { faqSchema } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Hero projectCount={projects.length} />
      <Intro projectCount={projects.length} cityCount={cities.length} />
      <Services />
      <RecentWork items={projects.slice(0, 6)} total={projects.length} />
      <Process />
      <Materials />
      <StormBand />
      <AreaPreview />
      <Reviews />

      <section className="section alt" id="quote">
        <div className="container quote">
          <Reveal>
            <span className="eyebrow">Get a quote</span>
            <h2 className="h-lg" style={{ marginTop: 14 }}>
              Tell us about your roof.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Three quick steps. We&apos;ll follow up to schedule your inspection and give you a clear, written quote.
            </p>
            <ContactLines />
          </Reveal>
          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq-wrap">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="h-lg" style={{ marginTop: 14 }}>
              Common questions.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
