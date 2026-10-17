"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { company, images } from "@/lib/content";
import { Ridges } from "../Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const up = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero({ projectCount }: { projectCount: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <motion.div {...up(0)}>
            <Ridges />
          </motion.div>
          <motion.p className="eyebrow" style={{ marginTop: 18 }} {...up(0.05)}>
            Roofing contractor · Austin, MN
          </motion.p>
          <motion.h1 className="h-xl" {...up(0.1)}>
            Roofs built for <span className="accent">Minnesota</span> weather.
          </motion.h1>
          <motion.p className="lede" {...up(0.2)}>
            Locally owned residential, commercial and storm-damage roofing for Austin, Albert Lea, Rochester, Owatonna,
            Waseca and north Iowa. Honest inspections and direct insurance claim help.
          </motion.p>
          <motion.div className="hero-actions" {...up(0.3)}>
            <Link href="/contact-us" className="btn btn-primary">
              Get a quote <ArrowRight size={16} />
            </Link>
            <a href={company.phoneHref} className="btn btn-outline">
              <Phone size={16} /> {company.phone}
            </a>
          </motion.div>
          <motion.div className="trust" {...up(0.4)}>
            <div>
              <strong>20+</strong>
              <span>Years experience</span>
            </div>
            <div>
              <strong>{projectCount}+</strong>
              <span>Local roofs mapped</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Storm response</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          <motion.img
            src={images.hero}
            alt="White Cape Cod home with a new black shingle roof installed by RidgeLine Roofing in Austin, MN"
            fetchPriority="high"
            style={{ y: imgY }}
          />
          <motion.div className="hero-card" {...up(0.7)}>
            <span className="ic">
              <MapPin size={20} />
            </span>
            <div>
              <strong>See roofs near you</strong>
              <Link href="/portfolio" className="text-link" style={{ fontSize: 13 }}>
                Open the project map <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
