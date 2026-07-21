import Image from "next/image";

type PlaceholderVariant = "red" | "blue" | "neutral";

/** Diagonal stripes from the handoff: red (red corner), blue (blue corner) or neutral. */
const variantBackground: Record<PlaceholderVariant, string> = {
  red: "repeating-linear-gradient(45deg,#1A1113 0 12px,#140A0C 12px 24px)",
  blue: "repeating-linear-gradient(-45deg,#131317 0 12px,#0C0C10 12px 24px)",
  neutral: "repeating-linear-gradient(45deg,#1A1113 0 10px,#140A0C 10px 20px)",
};

interface PlaceholderImageProps {
  /** Monospace label shown while there is no real photo, e.g. "foto peleador". */
  label: string;
  variant?: PlaceholderVariant;
  /** Once the real asset lands, pass src/alt and the placeholder goes away. */
  src?: string;
  alt?: string;
  className?: string;
}

/**
 * Image that falls back to the design's striped placeholder.
 * Single swap point once real photos arrive: just add `src`.
 */
export function PlaceholderImage({
  label,
  variant = "neutral",
  src,
  alt,
  className = "",
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt ?? label} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: variantBackground[variant] }}
      role="img"
      aria-label={alt ?? label}
    >
      <span className="font-mono text-xs text-cream/60">[ {label} ]</span>
    </div>
  );
}
