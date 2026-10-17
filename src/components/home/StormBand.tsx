import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal } from "../Reveal";

export default function StormBand() {
  return (
    <section className="section tight" id="storm">
      <div className="container">
        <Reveal className="band">
          <div>
            <span className="live">
              <i /> 24/7 emergency line
            </span>
            <h2 className="h-lg" style={{ marginTop: 14 }}>
              Storm damage? We&apos;ll be there fast.
            </h2>
            <p>
              Hail and wind hit southern Minnesota hard. We tarp and secure your roof, document the damage, and work
              directly with your insurance company so you don&apos;t have to.
            </p>
            <ul className="band-points">
              {["Emergency tarping", "Hail & wind inspections", "Insurance claim help", "Local, not storm chasers"].map((t) => (
                <li key={t}>
                  <Check size={16} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="actions">
            <a href={company.phoneHref} className="btn btn-primary">
              <Phone size={16} /> Call {company.phone}
            </a>
            <Link href="/storm-repairs" className="btn btn-ghost-light">
              Storm repairs <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
