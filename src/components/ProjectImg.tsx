import ids from "@/data/projectImages.json";
import { projectAlt, type Project } from "@/lib/projects";

const local = new Set<string>(ids);

// Project card photo: small local WebP when mirrored (see scripts/optimize-project-photos.mjs), else the remote photo.
export default function ProjectImg({ p, sizes = "(max-width: 720px) 82vw, (max-width: 920px) 50vw, 33vw", priority }: { p: Project; sizes?: string; priority?: boolean }) {
  const alt = projectAlt(p);
  const common = { alt, decoding: "async" as const, loading: priority ? ("eager" as const) : ("lazy" as const), width: 800, height: 600 };
  if (!local.has(p.id)) return <img src={p.photos[0].l} {...common} />;
  return (
    <img
      src={`/images/projects/${p.id}-800.webp`}
      srcSet={`/images/projects/${p.id}-480.webp 480w, /images/projects/${p.id}-800.webp 800w`}
      sizes={sizes}
      {...common}
    />
  );
}
