// Recreation of the RidgeLine Roofing mark: rust peak + three stepped gray ridges.
export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 294 110" aria-hidden="true">
      <polygon points="0,110 55,0 95,0 150,110 112,110 75,36 38,110" fill="var(--accent)" />
      <polygon points="103,0 143,0 198,110 158,110" fill="#5f6062" />
      <polygon points="151,0 191,0 246,110 206,110" fill="#8a8b8d" />
      <polygon points="199,0 239,0 294,110 254,110" fill="#b4b5b7" />
    </svg>
  );
}

export default function Logo({ stacked = false }: { stacked?: boolean }) {
  return (
    <span className={`logo ${stacked ? "logo-stacked" : ""}`}>
      <LogoMark />
      <span className="logo-word">
        <span>RIDGELINE</span>
        <span>ROOFING</span>
      </span>
    </span>
  );
}
