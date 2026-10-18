import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatMonth, type Project } from "@/lib/projects";
import ProjectImg from "./ProjectImg";

export default function ProjectCards({ items }: { items: Project[] }) {
  return (
    <div className="grid-3 work-grid">
      {items.map((p) => (
        <Link href={`/portfolio?p=${p.id}`} key={p.id} className="card">
          <div className="card-img">
            <ProjectImg p={p} />
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
