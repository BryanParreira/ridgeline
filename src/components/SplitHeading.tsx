"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Word-by-word masked reveal when the heading scrolls into view. Text stays real text for SEO and screen readers.
export default function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        style={{ display: "inline" }}
      >
        {children.split(" ").map((w, i) => (
          <span className="word-mask" key={i}>
            <motion.span
              className="word"
              variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 0.75, ease }}
            >
              {w}
            </motion.span>{" "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
