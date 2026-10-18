import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import { Reveal } from "../Reveal";
import Img from "../Img";
import SplitHeading from "../SplitHeading";

const hrefs: Record<string, string> = {
  residential: "/residential-roofing",
  commercial: "/commercial-roofing",
  storm: "/storm-repairs",
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Services</span>
          <SplitHeading className="h-lg">Everything your roof needs, from one local crew.</SplitHeading>
        </Reveal>
        <div className="grid-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08}>
              <Link href={hrefs[s.key]} className="card">
                <div className="card-img">
                  <Img src={s.image} alt={`${s.title} by RidgeLine Roofing`} sizes="(max-width: 920px) 100vw, 33vw" />
                </div>
                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                  <ul className="tags">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className="text-link">
                    Learn more <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
