import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import CtaBlock from "@/components/CtaBlock";
import ProjectMap from "@/components/map/ProjectMap";
import { Reveal, Ridges } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { abs, breadcrumbSchema, businessId } from "@/lib/site";

export const metadata: Metadata = {
  title: `Project Map | ${projects.length}+ Roofs in Austin & Southern MN | RidgeLine Roofing`,
  description: `Explore ${projects.length}+ real roof replacements by RidgeLine Roofing on an interactive map. CertainTeed Landmark shingles in Austin, Albert Lea and across southern Minnesota.`,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Project Map", path: "/portfolio" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "RidgeLine Roofing completed projects",
            url: abs("/portfolio"),
            numberOfItems: projects.length,
            itemListElement: projects.slice(0, 50).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: `${p.color ?? "Roof"} ${p.product ?? ""} roof replacement in ${p.city}, ${p.state}`.replace(/\s+/g, " "),
                dateCreated: p.date,
                image: p.photos[0]?.l,
                creator: { "@id": businessId },
                locationCreated: { "@type": "Place", name: `${p.city}, ${p.state} ${p.zip}` },
              },
            })),
          },
        ]}
      />

      <section className="pmap-head">
        <div className="container">
          <Reveal className="section-head row" style={{ marginBottom: 24 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <Ridges />
              <span className="eyebrow">Project map</span>
              <h1 className="h-lg">{projects.length}+ roofs. Find one near you.</h1>
            </div>
            <p className="lede" style={{ maxWidth: "44ch" }}>
              Every pin is a real RidgeLine roof. Filter by shingle line or city and tap a project to see the photos.
            </p>
          </Reveal>
        </div>
      </section>

      <ProjectMap projects={projects} />

      <CtaBlock title="Want a roof like these?" />
    </main>
  );
}
