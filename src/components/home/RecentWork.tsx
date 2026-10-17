import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { formatMonth, projectAlt, type Project } from "@/lib/projects";
import { Reveal } from "../Reveal";

export default function RecentWork({ items, total }: { items: Project[]; total: number }) {
  return (
    <section className="section alt">
      <div className="container">
        <Reveal className="section-head row">
          <div style={{ display: "grid", gap: 14 }}>
            <span className="eyebrow">Recent work</span>
            <h2 className="h-lg">Real roofs in your neighborhood.</h2>
          </div>
          <Link href="/portfolio" className="btn btn-outline">
            View all {total} on the map <ArrowRight size={16} />
          </Link>
        </Reveal>
        <div className="grid-3 work-grid">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <Link href={`/portfolio?p=${p.id}`} className="card">
                <div className="card-img">
                  <img src={p.photos[0].l} alt={projectAlt(p)} loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="work-meta">
                    <span>
                      <MapPin size={13} /> {p.city}, {p.state}
                    </span>
                    <span>{formatMonth(p.date)}</span>
                  </div>
                  <h3 style={{ fontSize: 19 }}>{p.color ?? "Roof replacement"}</h3>
                  <p style={{ fontSize: 14 }}>{p.product ?? "Architectural shingles"}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
