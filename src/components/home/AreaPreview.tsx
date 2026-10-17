"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { towns } from "@/lib/content";
import { cities } from "@/lib/cities";
import { Reveal } from "../Reveal";

const slugFor = (name: string) => cities.find((c) => c.name === name)?.slug ?? "austin-mn";

export default function AreaPreview() {
  const [hot, setHot] = useState<string | null>(null);
  const hq = towns.find((t) => t.hq)!;

  return (
    <section className="section" id="area">
      <div className="container area">
        <Reveal>
          <span className="eyebrow">Service area</span>
          <h2 className="h-lg" style={{ marginTop: 14 }}>
            Based in Austin. Serving all of southern Minnesota.
          </h2>
          <ul className="town-list">
            {towns.map((t) => (
              <li key={t.name}>
                <Link
                  href={`/areas-we-serve/${slugFor(t.name)}`}
                  className={hot === t.name ? "hot" : ""}
                  onMouseEnter={() => setHot(t.name)}
                  onMouseLeave={() => setHot(null)}
                >
                  {t.name} <small>{t.hq ? "HQ" : "MN"}</small>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-area">
                + North Iowa & Twin Cities <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
          <Link href="/service-area" className="text-link">
            See all {cities.length} communities <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal className="map-card" delay={0.1}>
          <svg viewBox="0 0 720 500" role="img" aria-label="Map of RidgeLine Roofing service area in southern Minnesota">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#efeeeb" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="720" height="500" fill="url(#grid)" />
            <circle cx={hq.x} cy={hq.y} r="230" fill="var(--accent)" opacity="0.04" />
            <circle cx={hq.x} cy={hq.y} r="230" fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeDasharray="4 6" />
            {towns
              .filter((t) => !t.hq)
              .map((t, i) => (
                <motion.line
                  key={t.name}
                  x1={hq.x}
                  y1={hq.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={hot === t.name ? "var(--accent)" : "#d4d2ce"}
                  strokeWidth={hot === t.name ? 2 : 1.25}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            {towns.map((t) => {
              const on = hot === t.name || t.hq;
              return (
                <g key={t.name} onMouseEnter={() => setHot(t.name)} onMouseLeave={() => setHot(null)}>
                  <circle cx={t.x} cy={t.y} r={t.hq ? 10 : 7} fill={on ? "var(--accent)" : "#fff"} stroke="var(--accent)" strokeWidth="2.5" />
                  <text
                    x={t.x}
                    y={t.y - 18}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="600"
                    fill={on ? "var(--ink)" : "var(--muted)"}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {t.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
