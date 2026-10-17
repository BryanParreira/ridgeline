import Link from "next/link";
import { Facebook, MapPin, Phone, Star } from "lucide-react";
import { company } from "@/lib/content";
import { servicePages } from "@/lib/services";
import { cities } from "@/lib/cities";
import Logo from "./Logo";

export default function Footer() {
  const topCities = cities.filter((c) => c.region !== "metro").slice(0, 9);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="RidgeLine Roofing home">
              <Logo variant="light" />
            </Link>
            <p style={{ marginTop: 20, maxWidth: "34ch" }}>
              Locally owned residential, commercial and storm-damage roofing for southern Minnesota and north Iowa.
              20+ years of experience. 24/7 emergency service.
            </p>
            <div className="socials">
              <a href={company.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={18} />
              </a>
              <a href={company.social.googleReview} aria-label="Leave a Google review" target="_blank" rel="noopener noreferrer">
                <Star size={18} />
              </a>
              <a href={company.mapsHref} aria-label="Directions" target="_blank" rel="noopener noreferrer">
                <MapPin size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Service Area</h4>
            <ul>
              {topCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/areas-we-serve/${c.slug}`}>
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-area" style={{ color: "var(--copper-2)" }}>
                  All areas →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={company.phoneHref} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <Phone size={15} /> {company.phone}
                </a>
              </li>
              <li>
                <a href={company.mapsHref} target="_blank" rel="noopener noreferrer">
                  209 Main St S<br />
                  Austin, MN 55912
                </a>
              </li>
              <li>Open 24/7 for storm emergencies</li>
              <li>
                <Link href="/portfolio">Project map</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/contact-us">Get a quote</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RidgeLine Roofing LLC · Austin, Minnesota</span>
          <a href={company.social.bbb} target="_blank" rel="noopener noreferrer">
            BBB profile
          </a>
        </div>
      </div>
    </footer>
  );
}
