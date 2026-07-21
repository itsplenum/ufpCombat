import type { CSSProperties, ReactNode } from "react";

interface OutlineTextProps {
  children: ReactNode;
  /** Stroke color (defaults to full blood red). */
  strokeColor?: string;
  strokeWidth?: string;
  className?: string;
}

/** Hollow (outline-only) text for watermarks, "VS" and outline logos. */
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
