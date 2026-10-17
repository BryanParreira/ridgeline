import { ExternalLink, Star } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal } from "../Reveal";

// Links to real review platforms. Swap in an embedded Google reviews feed when available.
export default function Reviews() {
  return (
    <section className="section tight">
      <div className="container">
        <Reveal className="review-cta">
          <div>
            <div className="stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <h2 className="h-md">Hear it from your neighbors.</h2>
            <p className="lede" style={{ marginTop: 8 }}>
              Read what 20+ southern Minnesota customers have said about working with RidgeLine.
            </p>
          </div>
          <div className="actions">
            <a href={company.social.google} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Google reviews <ExternalLink size={15} />
            </a>
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Facebook <ExternalLink size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
