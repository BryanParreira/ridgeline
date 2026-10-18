"use client";

import { motion } from "motion/react";
import { steps } from "@/lib/content";
import { Reveal } from "../Reveal";
import SplitHeading from "../SplitHeading";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <SplitHeading className="h-lg">A simple process with no surprises.</SplitHeading>
        </Reveal>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.n} className="step">
              <span className="step-bar">
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <Reveal delay={i * 0.15}>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
