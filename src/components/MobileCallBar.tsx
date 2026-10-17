import Link from "next/link";
import { Phone, ClipboardCheck } from "lucide-react";
import { company } from "@/lib/content";

export default function MobileCallBar() {
  return (
    <div className="callbar">
      <a href={company.phoneHref} className="btn btn-outline">
        <Phone size={16} /> Call
      </a>
      <Link href="/contact-us" className="btn btn-primary">
        <ClipboardCheck size={16} /> Get a Quote
      </Link>
    </div>
  );
}
