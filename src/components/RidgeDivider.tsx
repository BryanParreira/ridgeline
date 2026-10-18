"use client";

import { motion } from "motion/react";

// Roofline that draws itself as it enters the viewport.
export default function RidgeDivider() {
  return (
    <div className="ridge-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <motion.path
          d="M0 52 L180 52 L300 14 L420 52 L640 52 L780 8 L920 52 L1200 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
