import { beforeAfter } from "@/data/beforeAfter";
import BeforeAfter from "../BeforeAfter";
import { Reveal } from "../Reveal";
import SplitHeading from "../SplitHeading";

export default function BeforeAfterSection() {
  if (!beforeAfter.length) return null;
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Before &amp; after</span>
          <SplitHeading className="h-lg">See the difference a new roof makes.</SplitHeading>
          <p className="lede">Drag the handle to compare. Every photo is a real RidgeLine job.</p>
        </Reveal>
        <div className="ba-grid">
          {beforeAfter.map((p) => (
            <Reveal key={p.before}>
              <BeforeAfter pair={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
