import { Clock, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/content";

export default function ContactLines() {
  return (
    <div className="contact-lines">
      <a href={company.phoneHref} className="contact-line">
        <span className="ic">
          <Phone size={18} />
        </span>
        <span>
          <small>Call or text</small>
          <strong>{company.phone}</strong>
        </span>
      </a>
      <a href={company.mapsHref} target="_blank" rel="noopener noreferrer" className="contact-line">
        <span className="ic">
          <MapPin size={18} />
        </span>
        <span>
          <small>Visit our shop</small>
          <strong>{company.address}</strong>
        </span>
      </a>
      <div className="contact-line">
        <span className="ic">
          <Clock size={18} />
        </span>
        <span>
          <small>Storm emergencies</small>
          <strong>Available 24/7</strong>
        </span>
      </div>
    </div>
  );
}
