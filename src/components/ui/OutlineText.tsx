import type { CSSProperties, ReactNode } from "react";

interface OutlineTextProps {
  children: ReactNode;
  /** Color del trazo (default: rojo sangre pleno). */
  strokeColor?: string;
  strokeWidth?: string;
  className?: string;
}

/** Texto hueco (solo contorno) para watermarks, "VS" y logos outline. */
export function OutlineText({
  children,
  strokeColor = "var(--color-blood)",
  strokeWidth = "1px",
  className = "",
}: OutlineTextProps) {
  const style = {
    "--stroke-color": strokeColor,
    "--stroke-width": strokeWidth,
  } as CSSProperties;

  return (
    <span className={`text-stroke font-display uppercase ${className}`} style={style}>
      {children}
    </span>
  );
}
