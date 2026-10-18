"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { BeforeAfterPair } from "@/data/beforeAfter";

// Drag/touch/keyboard compare slider. A native range input drives it, so it works with screen readers and arrow keys.
export default function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const fromPointer = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    setTouched(true);
  };

  return (
    <figure className="ba">
      <div
        ref={box}
        className="ba-box"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => e.buttons && fromPointer(e.clientX)}
      >
        <img src={pair.after} alt={`After: ${pair.alt}`} loading="lazy" draggable={false} />
        <img src={pair.before} alt={`Before: ${pair.alt}`} loading="lazy" draggable={false} className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <span className="ba-tag l">Before</span>
        <span className="ba-tag r">After</span>
        <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className={touched ? "" : "nudge"}>
            <MoveHorizontal size={18} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => {
            setPos(+e.target.value);
            setTouched(true);
          }}
          aria-label="Drag to compare before and after"
          className="ba-range"
        />
      </div>
      <figcaption>
        <strong>{pair.place}</strong>
        {pair.note && <span> · {pair.note}</span>}
      </figcaption>
    </figure>
  );
}
