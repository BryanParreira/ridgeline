"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, CloudLightning, ShieldCheck } from "lucide-react";
import { company, images } from "@/lib/content";
import Img from "../Img";

const lines = ["Roofs built for", "Minnesota weather."];
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// Centered, light, type-first hero. Entrance uses CSS animations (they run before hydration, so LCP is never gated on JS);
// motion only drives the scroll-linked photo card.
export default function Hero({ projectCount }: { projectCount: number }) {
  const reduce = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: card, offset: ["start 92%", "start 18%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [reduce ? 28 : 44, 28]);

  return (
    <section className="ax">
      <div className="container ax-head">
        <div className="rise" style={d(0)}>
          <Link href="/storm-repairs" className="ax-pill">
            <i /> Storm season? We&apos;re on call 24/7 <ArrowRight size={14} />
          </Link>
        </div>

        <h1>
          {lines.map((l, n) => (
            <span className="ax-line" key={l}>
              <span style={d(0.05 + n * 0.1)}>{l}</span>
            </span>
          ))}
        </h1>

        <p className="ax-sub rise" style={d(0.3)}>
          Locally owned roofing for Austin, Albert Lea, Rochester and southern Minnesota. Honest inspections, clear written quotes and
          direct insurance claim help.
        </p>

        <div className="ax-actions rise" style={d(0.4)}>
          <Link href="/contact-us" className="btn ax-btn" data-magnetic>
            Get a free quote
          </Link>
          <a href={company.phoneHref} className="ax-link">
            Call {company.phone} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="container ax-stage rise" style={d(0.5)}>
        <motion.div ref={card} className="ax-card" style={{ scale, borderRadius: radius }}>
          <div className="ax-img">
            <Img
              src={images.hero}
              alt="White Cape Cod home with a new black shingle roof installed by RidgeLine Roofing in Austin, MN"
              priority
              sizes="(max-width: 720px) 100vw, (max-width: 1240px) 94vw, 1200px"
            />
          </div>

          <div className="ax-float f1 rise" style={d(1.1)}>
            <span><ShieldCheck size={18} /></span>
            <div>
              <b>Free roof inspection</b>
              <em>Photos and a written quote. No pressure.</em>
            </div>
          </div>
          <div className="ax-float f2 rise" style={d(1.3)}>
            <span><CloudLightning size={18} /></span>
            <div>
              <b>Hail &amp; wind damage</b>
              <em>We handle the insurance claim.</em>
            </div>
          </div>
        </motion.div>

        <dl className="ax-facts">
          <div><dt>20+</dt><dd>years on Minnesota roofs</dd></div>
          <div><dt>{projectCount}+</dt><dd>roofs on our project map</dd></div>
          <div><dt>24/7</dt><dd>emergency storm line</dd></div>
        </dl>
      </div>
    </section>
  );
}
