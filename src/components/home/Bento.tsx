import Link from "next/link";
import { ArrowUpRight, Camera, CloudLightning, FileCheck2, MapPinned, ShieldCheck } from "lucide-react";
import { images } from "@/lib/content";
import Counter from "../Counter";
import Img from "../Img";
import { Reveal } from "../Reveal";
import SplitHeading from "../SplitHeading";

export default function Bento({ projectCount, cityCount }: { projectCount: number; cityCount: number }) {
  return (
    <section className="section alt">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Why RidgeLine</span>
          <SplitHeading className="h-lg">Local roofers. Honest advice. Work that lasts.</SplitHeading>
          <p className="lede">
            A locally owned crew in downtown Austin with 20+ years on southern Minnesota rooftops. No storm chasers, no
            pressure, just clear inspections and roofs built for our winters.
          </p>
        </Reveal>

        <div className="bento">
          <Reveal className="bento-tile t-photo">
            <Img src={images.crane} alt="RidgeLine crew lifting materials onto a commercial roof in southern Minnesota" sizes="(max-width: 920px) 100vw, 50vw" />
            <div className="t-photo-cap">
              <span className="chip-dark">Commercial &amp; residential</span>
              <Link href="/commercial-roofing" className="t-arrow" aria-label="Commercial roofing">
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal className="bento-tile t-stat" delay={0.05}>
            <strong>
              <Counter to={20} />
              <sup>+</sup>
            </strong>
            <span>Years on Minnesota roofs</span>
          </Reveal>

          <Reveal className="bento-tile t-stat" delay={0.1}>
            <strong>
              <Counter to={projectCount} />
              <sup>+</sup>
            </strong>
            <span>Roofs on our public project map</span>
          </Reveal>

          <Reveal className="bento-tile t-feature" delay={0.05}>
            <ShieldCheck size={26} />
            <h3>Insurance claim help</h3>
            <p>We document damage, meet your adjuster on site and handle the paperwork.</p>
          </Reveal>

          <Reveal className="bento-tile t-feature dark" delay={0.1}>
            <CloudLightning size={26} />
            <h3>24/7 storm response</h3>
            <p>Emergency tarping the same day so one storm doesn&apos;t become two.</p>
          </Reveal>

          <Reveal className="bento-tile t-feature" delay={0.05}>
            <Camera size={26} />
            <h3>Photo-documented</h3>
            <p>You get photos of every step and a walkthrough when we finish.</p>
          </Reveal>

          <Reveal className="bento-tile t-feature" delay={0.1}>
            <FileCheck2 size={26} />
            <h3>Clear written quotes</h3>
            <p>Scope and price up front. Free inspections, no pressure.</p>
          </Reveal>

          <Reveal className="bento-tile t-wide" delay={0.05}>
            <div>
              <MapPinned size={26} />
              <h3>
                Serving <Counter to={cityCount} /> communities
              </h3>
              <p>Austin, Albert Lea, Rochester, Owatonna, Waseca and north Iowa.</p>
            </div>
            <Link href="/service-area" className="btn btn-outline">
              See the service area <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
