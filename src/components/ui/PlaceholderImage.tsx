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
  /** Extra classes on the <Image> — object-position, filters (e.g. "object-top"). */
  imageClassName?: string;
  /**
   * Fades the image's bottom into the page. Pass a Tailwind gradient end color
   * (e.g. "to-ink-2") so a photo shot on a plain light wall dissolves into the
   * dark UI instead of punching a bright rectangle into it.
   */
  fadeTo?: string;
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
  imageClassName = "",
  fadeTo,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt ?? label} fill className={`object-cover ${imageClassName}`} />
        {fadeTo ? (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent ${fadeTo}`}
          />
        ) : null}
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
