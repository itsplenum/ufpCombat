import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionBackground = "ink" | "ink-2" | "ticket-gradient";

const backgroundClasses: Record<SectionBackground, string> = {
  ink: "bg-ink",
  "ink-2": "bg-ink-2",
  "ticket-gradient": "bg-linear-180 from-[#12080A] to-ink",
};

interface SectionProps {
  id?: string;
  background?: SectionBackground;
  /** Ancho del contenedor: md = 1100px (listas), lg = 1200px (grids). */
  width?: "md" | "lg";
  /** Borde superior rojo translúcido (separador de bloques fuertes). */
  borderTop?: boolean;
  children: ReactNode;
}

/** Sección estándar del sitio: padding 90/48, contenedor centrado y reveal de scroll. */
export function Section({
  id,
  background = "ink",
  width = "lg",
  borderTop = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 py-[70px] md:px-12 md:py-[90px] ${backgroundClasses[background]} ${
        borderTop ? "border-t border-blood/30" : ""
      }`}
    >
      <Reveal
        className={`mx-auto flex flex-col gap-8 ${width === "md" ? "max-w-[1100px]" : "max-w-[1200px]"}`}
      >
        {children}
      </Reveal>
    </section>
  );
}
