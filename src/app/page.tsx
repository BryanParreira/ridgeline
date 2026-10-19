import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import AtAGlance from "@/components/AtAGlance";
import CheckupTeaser from "@/components/home/CheckupTeaser";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import RoofLayers from "@/components/home/RoofLayers";
import Bento from "@/components/home/Bento";
import RidgeDivider from "@/components/RidgeDivider";
import Services from "@/components/home/Services";
import RecentWork from "@/components/home/RecentWork";
import Materials from "@/components/home/Materials";
import Process from "@/components/home/Process";
import StormBand from "@/components/home/StormBand";
import Reviews from "@/components/home/Reviews";
import AreaPreview from "@/components/home/AreaPreview";
import { MessageSquare, Phone } from "lucide-react";
import ContactLines from "@/components/ContactLines";
import FAQ from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { cities } from "@/lib/cities";
import { company, faqs } from "@/lib/content";
import { faqSchema } from "@/lib/site";

export default function Home() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Hero projectCount={projects.length} />
      <Marquee />
      <AtAGlance
        summary="RidgeLine Roofing is a locally owned roofing contractor in Austin, Minnesota. We replace and repair residential shingle and metal roofs, install commercial TPO and EPDM roofing, and handle hail and wind damage with direct insurance claim help. Inspections and written quotes are free."
        area="Austin, Albert Lea, Rochester, Owatonna, Waseca, Kasson, Faribault, Mankato, Red Wing and north Iowa."
      />
      <Bento projectCount={projects.length} cityCount={cities.length} />
      <Services />
      <RoofLayers />
      <BeforeAfterSection />
      <RecentWork items={projects.slice(0, 6)} total={projects.length} />
      <Process />
      <Materials />
      <RidgeDivider />
      <StormBand />
      <AreaPreview />
      <CheckupTeaser />
      <Reviews />

      <section className="section alt" id="quote">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <span className="eyebrow">Get a quote</span>
            <h2 className="h-lg" style={{ marginTop: 14 }}>
              Call for a free quote.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Talk to a real person. We&apos;ll schedule your inspection and give you a clear, written quote.
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
