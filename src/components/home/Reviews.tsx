import { ExternalLink, MessageSquareQuote, Star } from "lucide-react";
import { company } from "@/lib/content";
import { hasReviews, reviewData } from "@/lib/reviews";
import { Reveal } from "../Reveal";
import SplitHeading from "../SplitHeading";

const Stars = ({ n }: { n: number }) => (
  <span className="stars-row" role="img" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} fill={i < n ? "currentColor" : "none"} />
    ))}
  </span>
);

// Real Google reviews when src/data/reviews.json is populated (npm run sync:reviews); otherwise a link block.
export default function Reviews() {
  if (!hasReviews) {
    return (
      <section className="section tight">
        <div className="container">
          <Reveal className="review-cta">
            <div>
              <div className="stars" aria-hidden="true">
                <MessageSquareQuote size={26} />
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

  return (
    <section className="section" id="reviews">
      <div className="container">
        <Reveal className="section-head row">
          <div style={{ display: "grid", gap: 14 }}>
            <span className="eyebrow">Reviews</span>
            <SplitHeading className="h-lg">Hear it from your neighbors.</SplitHeading>
          </div>
          <a href={reviewData.url ?? company.social.google} target="_blank" rel="noopener noreferrer" className="rating-pill">
            <strong>{reviewData.rating?.toFixed(1)}</strong>
            <Stars n={Math.round(reviewData.rating ?? 5)} />
            <span>{reviewData.count} Google reviews</span>
          </a>
        </Reveal>
        <ul className="review-rail">
          {reviewData.reviews.map((r, i) => (
            <li key={i} className="review-card">
              <Stars n={r.rating} />
              <blockquote>{r.text.length > 320 ? r.text.slice(0, 317).trimEnd() + "…" : r.text}</blockquote>
              <footer>
                {r.photo ? <img src={r.photo} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" /> : <i className="avatar-ph" />}
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.when} · Google</span>
                </div>
              </footer>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 20 }}>
          <a href={company.social.googleReview} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Leave a review <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
