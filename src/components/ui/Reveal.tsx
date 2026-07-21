"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds (to stagger elements within the same section). */
  delay?: number;
  /** true = animate on entering the viewport; false = animate on mount (heros). */
  onScroll?: boolean;
  className?: string;
}

/** Reveal phases. `server` = exactly as SSR emitted it: visible, unstyled. */
type RevealPhase = "server" | "hidden" | "revealed";

/** `useLayoutEffect` warns during SSR, and there is nothing to measure on the server anyway. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The site's standard entrance: translateY(26px) → 0 + fade, .8s ease-out
 * (`--animate-rise` keyframes from `globals.css`).
 *
 * The server HTML ships **visible and without inline styles**: if the JS never
 * runs, all the content still shows up. The hidden state is applied inside a
 * layout effect —before paint, so there is no flash— and only if the user
 * hasn't asked to reduce motion.
 */
export function Reveal({ children, delay = 0, onScroll = true, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<RevealPhase>("server");

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const element = elementRef.current;
    // With no scroll trigger (or no IntersectionObserver) animate straight away on mount.
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
