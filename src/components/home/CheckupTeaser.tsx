import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { Reveal } from "../Reveal";

export default function CheckupTeaser() {
  return (
    <section className="section tight">
      <div className="container">
        <Reveal className="teaser">
          <span className="teaser-ic"><ClipboardList size={26} /></span>
          <div>
            <h2 className="h-md">Does your roof need replacing?</h2>
            <p className="lede" style={{ marginTop: 8 }}>Take the 60-second roof checkup. Three questions, an honest answer, no obligation.</p>
          </div>
          <Link href="/roof-checkup" className="btn btn-primary" data-magnetic>Start the checkup <ArrowRight size={16} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
