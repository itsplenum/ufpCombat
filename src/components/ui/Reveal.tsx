"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Retraso en segundos (para escalonar elementos de una misma sección). */
  delay?: number;
  /** true = anima al entrar al viewport; false = anima al montar (heros). */
  onScroll?: boolean;
  className?: string;
}

/** Entrada estándar del sitio: translateY(26px) → 0 + fade, .8s ease-out. */
export function Reveal({ children, delay = 0, onScroll = true, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = onScroll
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }
    : { animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
}
