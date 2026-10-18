"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

const layers = [
  { name: "Roof deck", body: "We inspect and repair the plywood or OSB first. A roof is only as sound as what it sits on.", cls: "deck" },
  { name: "Ice & water shield", body: "A self-sealing membrane along eaves and valleys stops meltwater from backing up under shingles every Minnesota spring.", cls: "ice" },
  { name: "Underlayment", body: "A second water barrier across the whole deck, so one blown-off shingle never means a leak.", cls: "felt" },
  { name: "Drip edge & flashing", body: "Metal at the edges, chimneys and walls guides water off the roof and away from your fascia and siding.", cls: "metal" },
  { name: "Architectural shingles", body: "Wind- and hail-rated shingles, nailed to spec and sealed, with ridge vents to keep your attic cold in winter.", cls: "shingle" },
];

function Layer({ i, p, cls, active, gap }: { i: number; p: MotionValue<number>; cls: string; active: boolean; gap: number }) {
  // Exploded view: layers start nearly stacked and fan apart as you scroll.
  const z = useTransform(p, [0, 0.5], [i * 5, i * gap]);
  return (
    <motion.div className={`rl-layer ${cls} ${active ? "on" : ""}`} style={{ z }}>
      <span className="rl-tex" />
    </motion.div>
  );
}

export default function RoofLayers() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [gap, setGap] = useState(74);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const set = () => setGap(mq.matches ? 40 : 74);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spread = useTransform(scrollYProgress, [0, 1], [0, reduce ? 1 : 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(layers.length - 1, Math.max(0, Math.floor(((v - 0.12) / 0.8) * layers.length)))));
  const rot = useTransform(scrollYProgress, [0, 1], [reduce ? -38 : -20, -38]);

  return (
    <section className="rl" ref={ref} aria-labelledby="rl-h">
      <div className="rl-sticky">
        <div className="container rl-grid">
          <div className="rl-copy">
            <span className="eyebrow">Anatomy of a roof</span>
            <h2 id="rl-h" className="h-lg" style={{ marginTop: 12 }}>
              Five layers between you and a Minnesota winter.
            </h2>
            <div className="rl-dots" aria-hidden="true">
              {layers.map((l, n) => (
                <i key={l.name} className={n === idx ? "on" : n < idx ? "past" : ""} />
              ))}
            </div>
            <ol className="rl-list">
              {layers.map((l, n) => (
                <li key={l.name} className={n === idx ? "on" : ""}>
                  <span className="rl-n">{String(n + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{l.name}</h3>
                    <p>{l.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rl-stage" aria-hidden="true">
            <motion.div className="rl-stack" style={{ rotateX: 62, rotateZ: rot }}>
              {layers.map((l, n) => (
                <Layer key={l.name} i={n} p={spread} cls={l.cls} active={n === idx} gap={gap} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
