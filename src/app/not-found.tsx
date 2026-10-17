import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ridges } from "@/components/Reveal";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container cta">
        <Ridges />
        <h1 className="h-lg">This page blew off in the last storm.</h1>
        <p className="lede">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="actions">
          <Link href="/" className="btn btn-primary">
            Back home <ArrowRight size={16} />
          </Link>
          <Link href="/contact-us" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
