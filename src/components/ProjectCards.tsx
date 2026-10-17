import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatMonth, projectAlt, type Project } from "@/lib/projects";

export default function ProjectCards({ items }: { items: Project[] }) {
  return (
    <div className="grid-3 work-grid">
      {items.map((p) => (
        <Link href={`/portfolio?p=${p.id}`} key={p.id} className="card">
          <div className="card-img">
            <img src={p.photos[0].l} alt={projectAlt(p)} loading="lazy" />
          </div>
          <div className="card-body">
            <div className="work-meta">
              <span>
                <MapPin size={13} /> {p.street}, {p.city}
              </span>
              <span>{formatMonth(p.date)}</span>
            </div>
            <h3 style={{ fontSize: 19 }}>{p.color ?? "Roof replacement"}</h3>
            <p style={{ fontSize: 14 }}>{p.product ?? "Architectural shingles"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
