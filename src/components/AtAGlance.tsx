import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal } from "./Reveal";

// Answer-first summary: concise, factual, quotable by search snippets and AI answer engines.
export default function AtAGlance({
  heading = "RidgeLine Roofing at a glance",
  summary,
  area,
}: {
  heading?: string;
  summary: string;
  area: string;
}) {
  const facts = [
    { icon: MapPin, label: "Based in", value: "Austin, MN (209 Main St S)" },
    { icon: ShieldCheck, label: "Experience", value: "20+ years, locally owned" },
    { icon: Clock, label: "Emergency", value: "24/7 storm tarping and repair" },
    { icon: Phone, label: "Call", value: company.phone, href: company.phoneHref },
  ];
  return (
    <section className="section tight glance-sec" aria-labelledby="glance-h">
      <div className="container">
        <Reveal className="glance">
          <div>
            <h2 id="glance-h" className="h-md">
              {heading}
            </h2>
            <p className="lede" style={{ marginTop: 10 }}>
              {summary}
            </p>
            <p className="glance-area">
              <strong>Serving:</strong> {area}
            </p>
          </div>
          <dl className="glance-facts">
            {facts.map(({ icon: I, label, value, href }) => (
              <div key={label}>
                <dt>
                  <I size={16} /> {label}
                </dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
