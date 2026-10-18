"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin ridge-colored read-progress bar pinned above the nav.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}
