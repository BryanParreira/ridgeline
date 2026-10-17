import Counter from "../Counter";
import { Reveal } from "../Reveal";

export default function Intro({ projectCount, cityCount }: { projectCount: number; cityCount: number }) {
  return (
    <section className="section alt">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Why RidgeLine</span>
          <h2 className="h-lg">Local roofers. Honest advice. Work that lasts.</h2>
          <p className="lede">
            We&apos;re a locally owned crew based in downtown Austin with more than 20 years on southern Minnesota
            rooftops. No storm chasers and no pressure. Just clear inspections, fair pricing and roofs built for our
            winters.
          </p>
        </Reveal>
        <div className="stats">
          {[
            { n: 20, suf: "+", label: "Years of experience" },
            { n: projectCount, suf: "+", label: "Roofs on our project map" },
            { n: 24, suf: "/7", label: "Emergency storm service" },
            { n: cityCount, suf: "", label: "Communities served" },
          ].map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 0.06}>
              <strong>
                <Counter to={s.n} />
                {s.suf === "+" ? <sup>+</sup> : s.suf}
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
