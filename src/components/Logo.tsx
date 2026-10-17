// Official RidgeLine Roofing logo. "light" swaps the black wordmark to white for dark backgrounds.
export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <img
      className="logo-img"
      src={variant === "light" ? "/brand/ridgeline-logo-light.png" : "/brand/ridgeline-logo.png"}
      alt="RidgeLine Roofing"
      width={324}
      height={228}
    />
  );
}
