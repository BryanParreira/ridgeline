import { Hammer, ShieldCheck, CloudLightning, Snowflake, Clock, BadgeCheck } from "lucide-react";

const items = [
  { icon: BadgeCheck, label: "Locally owned in Austin, MN" },
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: CloudLightning, label: "Hail & wind damage specialists" },
  { icon: Hammer, label: "Free roof inspections" },
  { icon: Snowflake, label: "Built for Minnesota winters" },
  { icon: Clock, label: "24/7 emergency tarping" },
];

// Infinite CSS marquee (no JS). Duplicated track gives a seamless loop; the copy is hidden from assistive tech.
export default function Marquee() {
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map(({ icon: I, label }) => (
        <li key={label}>
          <I size={18} /> {label}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="region" aria-label="Why homeowners choose RidgeLine">
      {track(false)}
      {track(true)}
    </div>
  );
}
