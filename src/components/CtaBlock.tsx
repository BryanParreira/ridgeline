import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal, Ridges } from "./Reveal";

export default function CtaBlock({ title = "Ready for a roof you can trust?" }: { title?: string }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta cta-panel">
          <Ridges />
          <h2 className="h-lg">{title}</h2>
          <p className="lede">Get an honest inspection and a clear, written quote from a local crew. Free, with no pressure.</p>
          <div className="actions">
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
  );
}
