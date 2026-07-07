import Image from "next/image";

type PlaceholderVariant = "red" | "blue" | "neutral";

/** Rayas diagonales del handoff: rojas (esquina roja), azules (esquina azul) o neutras. */
const variantBackground: Record<PlaceholderVariant, string> = {
  red: "repeating-linear-gradient(45deg,#1A1113 0 12px,#140A0C 12px 24px)",
  blue: "repeating-linear-gradient(-45deg,#131317 0 12px,#0C0C10 12px 24px)",
  neutral: "repeating-linear-gradient(45deg,#1A1113 0 10px,#140A0C 10px 20px)",
};

interface PlaceholderImageProps {
  /** Etiqueta monospace visible mientras no hay foto real, ej. "foto peleador". */
  label: string;
  variant?: PlaceholderVariant;
  /** Cuando llegue el asset real, pasar src/alt y el placeholder desaparece. */
  src?: string;
  alt?: string;
  className?: string;
}

/**
 * Imagen con fallback al placeholder rayado del diseño.
 * Punto único de swap cuando lleguen fotos reales: solo agregar `src`.
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
      <span className="font-mono text-xs text-cream/40">[ {label} ]</span>
    </div>
  );
}
