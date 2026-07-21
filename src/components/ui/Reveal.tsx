"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Retraso en segundos (para escalonar elementos de una misma sección). */
  delay?: number;
  /** true = anima al entrar al viewport; false = anima al montar (heros). */
  onScroll?: boolean;
  className?: string;
}

/** Fases del reveal. `server` = tal cual salió del SSR: visible, sin estilos. */
type RevealPhase = "server" | "hidden" | "revealed";

/** `useLayoutEffect` avisa en SSR; en el servidor no hay nada que medir igual. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Entrada estándar del sitio: translateY(26px) → 0 + fade, .8s ease-out
 * (keyframes `--animate-rise` de `globals.css`).
 *
 * El HTML del servidor sale **visible y sin estilos inline**: si el JS no
 * llega a correr, todo el contenido se ve igual. El estado oculto se aplica
 * en un layout effect —antes del paint, así que no hay flash— y solo si el
 * usuario no pidió reducir movimiento.
 */
export function Reveal({ children, delay = 0, onScroll = true, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<RevealPhase>("server");

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const element = elementRef.current;
    // Sin scroll-trigger (o sin IntersectionObserver) anima directo al montar.
    if (!onScroll || !element || typeof IntersectionObserver === "undefined") {
      setPhase("revealed");
      return;
    }

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPhase("revealed");
        observer.disconnect();
      },
      { rootMargin: "-80px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [onScroll]);

  const phaseClassName =
    phase === "hidden" ? "opacity-0" : phase === "revealed" ? "animate-rise" : "";

  return (
    <div
      ref={elementRef}
      className={[className, phaseClassName].filter(Boolean).join(" ")}
      style={phase === "revealed" && delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
