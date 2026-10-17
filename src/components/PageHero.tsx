import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal, Ridges } from "./Reveal";

type Crumb = { name: string; path: string };

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="page-hero">
      <div className={`container ${image ? "page-hero-grid" : ""}`}>
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <Ridges />
          <p className="eyebrow" style={{ marginTop: 16, display: "block" }}>
            {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
          <div className="hero-actions">
            <Link href="/contact-us" className="btn btn-primary">
              Get a quote <ArrowRight size={16} />
            </Link>
            <a href={company.phoneHref} className="btn btn-outline">
              <Phone size={16} /> {company.phone}
            </a>
          </div>
        </Reveal>
        {image && (
          <Reveal className="page-hero-img" delay={0.1}>
            <img src={image} alt={imageAlt ?? title} fetchPriority="high" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
