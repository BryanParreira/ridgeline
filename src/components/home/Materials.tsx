"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { materials, type Material } from "@/lib/content";
import { Reveal } from "../Reveal";

function Swatch({ kind }: { kind: Material["pattern"] }) {
  if (kind === "shingle")
    return (
      <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="280" fill="#2a2f33" />
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 14 }).map((__, c) => {
            const w = 52 + ((r * 7 + c * 13) % 5) * 6;
            const x = c * 50 - (r % 2) * 25 - 10;
            const shade = 40 + ((r * 3 + c * 5) % 6) * 6;
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={r * 32 - 4}
                width={w}
                height={30}
                rx={2}
                fill={`rgb(${shade},${shade + 4},${shade + 8})`}
                stroke="#16191b"
                strokeWidth="2"
              />
            );
          })
        )}
      </svg>
    );
  if (kind === "metal")
    return (
      <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="panel" x1="0" x2="1">
            <stop offset="0" stopColor="#3b4a52" />
            <stop offset=".5" stopColor="#56676f" />
            <stop offset="1" stopColor="#34424a" />
          </linearGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".18" />
            <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 64} y="0" width="64" height="280" fill="url(#panel)" />
            <rect x={i * 64 + 60} y="0" width="6" height="280" fill="#22292d" />
            <rect x={i * 64 + 58} y="0" width="2" height="280" fill="#7c8d95" />
          </g>
        ))}
        <rect width="600" height="280" fill="url(#sheen)" />
      </svg>
    );
  if (kind === "tpo")
    return (
      <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="280" fill="#eef1f2" />
        {[70, 160, 250].map((y) => (
          <g key={y}>
            <rect x="0" y={y} width="600" height="10" fill="#dfe4e6" />
            <rect x="0" y={y + 4} width="600" height="2" fill="#c9d0d3" />
          </g>
        ))}
        {[120, 300, 480].map((x) => (
          <circle key={x} cx={x} cy="120" r="14" fill="none" stroke="#c9d0d3" strokeWidth="3" />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="grain">
          <feTurbulence baseFrequency=".9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .25 0" />
        </filter>
      </defs>
      <rect width="600" height="280" fill="#1a1d1f" />
      <rect width="600" height="280" filter="url(#grain)" />
      {[0, 200, 400].map((x) => (
        <rect key={x} x={x + 196} y="0" width="8" height="280" fill="#111314" />
      ))}
    </svg>
  );
}

export default function Materials() {
  const [i, setI] = useState(0);
  const m = materials[i];

  return (
    <section className="section alt" id="materials">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Materials</span>
          <h2 className="h-lg">Compare the roofing systems we install.</h2>
          <p className="lede">Shingle or metal for your home, TPO or rubber for your business.</p>
        </Reveal>

        <Reveal className="mat-wrap">
          <div className="mat-tabs" role="tablist" aria-label="Roofing materials">
            {materials.map((mat, idx) => (
              <button
                key={mat.key}
                role="tab"
                aria-selected={idx === i}
                className={`mat-tab ${idx === i ? "active" : ""}`}
                onClick={() => setI(idx)}
              >
                {idx === i && (
                  <motion.span layoutId="mat-bg" className="mat-tab-bg" transition={{ type: "spring", stiffness: 400, damping: 36 }} />
                )}
                <span className="name">{mat.name}</span>
                <span className="tag">{mat.tag}</span>
              </button>
            ))}
          </div>

          <div className="mat-panel" role="tabpanel">
            <div className="mat-visual">
              <AnimatePresence initial={false}>
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Swatch kind={m.pattern} />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={m.key}
                className="mat-body"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <h3>{m.name}</h3>
                <div className="mat-meta">
                  <div>
                    <small>Typical lifespan</small>
                    <strong>
                      {m.lifespan[0]}–{m.lifespan[1]} yrs
                    </strong>
                  </div>
                  <div>
                    <small>Best for</small>
                    <strong>{m.bestFor}</strong>
                  </div>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 15 }}>{m.desc}</p>
                {m.traits.map((t, ti) => (
                  <div className="bar" key={t.label}>
                    <div className="bar-head">
                      <span>{t.label}</span>
                    </div>
                    <div className="bar-track">
                      <motion.div
                        className="bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${t.value}%` }}
                        transition={{ duration: 0.8, delay: ti * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
                <p className="mat-note">Lifespans are typical industry ranges, not warranties.</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
