import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import CtaBlock from "@/components/CtaBlock";
import AreaPreview from "@/components/home/AreaPreview";
import { cities, regionInfo, type Region } from "@/lib/cities";
import { breadcrumbSchema, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Service Area | Roofing in Southern MN & North Iowa | RidgeLine Roofing",
  description:
    "RidgeLine Roofing serves Austin, Albert Lea, Rochester, Owatonna, Waseca, north Iowa and the Twin Cities metro. Find roofing services in your community.",
  path: "/service-area",
});

const order: Region[] = ["home", "iowa", "metro"];

export default function ServiceArea() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Area", path: "/service-area" },
  ];
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Service area"
        title="Roofing across southern Minnesota & north Iowa"
        intro="From our shop in downtown Austin we serve 27 communities, from Albert Lea and Rochester to Mason City and the Twin Cities south metro."
      />
      <section className="section">
        <div className="container">
          {order.map((r) => (
            <div key={r}>
              <p className="region-title">{regionInfo[r].title}</p>
              <div className="city-grid">
                {cities
                  .filter((c) => c.region === r)
                  .map((c) => (
                    <Link key={c.slug} href={`/areas-we-serve/${c.slug}`}>
                      {c.name}, {c.state} <small>{c.drive}</small>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <AreaPreview />
      <CtaBlock />
    </main>
  );
}
