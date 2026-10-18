import type { CSSProperties } from "react";

const WIDTHS = [480, 800, 1200, 1600];
const LOCAL = /^\/images\/([^/]+)\.jpe?g$/i;

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

// Serves AVIF/WebP at several widths for owner photos in /public/images; falls back to a plain <img> for remote photos.
export default function Img({ src, alt, sizes = "(max-width: 920px) 100vw, 50vw", priority, className, style }: Props) {
  const m = LOCAL.exec(src);
  const img = (
    <img
      src={m ? `/images/opt/${m[1]}-1200.webp` : src}
      alt={alt}
      className={className}
      style={style}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
  if (!m) return img;
  const set = (ext: string) => WIDTHS.map((w) => `/images/opt/${m[1]}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {img}
    </picture>
  );
}
