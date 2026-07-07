"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { COUNTDOWN_PLACEHOLDER, getCountdownParts } from "@/lib/countdown";

interface CountdownProps {
  targetIso: string;
}

/**
 * Countdown en vivo al evento. Renderiza "--" en SSR y arranca el tick
 * al montar para evitar mismatch de hidratación.
 */
export function Countdown({ targetIso }: CountdownProps) {
  const t = useTranslations("countdown");
  const [parts, setParts] = useState(COUNTDOWN_PLACEHOLDER);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => setParts(getCountdownParts(target, Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  const cells = [
    { value: parts.days, label: t("days") },
    { value: parts.hours, label: t("hours") },
    { value: parts.minutes, label: t("minutes") },
    { value: parts.seconds, label: t("seconds"), highlighted: true },
  ];

  return (
    <div className="flex gap-2.5">
      {cells.map(({ value, label, highlighted }) => (
        <div
          key={label}
          className="flex min-w-16 flex-col items-center border border-blood/40 bg-surface px-4 py-3"
        >
          <span
            className={
              highlighted
                ? "animate-pulse-dim font-display text-[34px] text-blood"
                : "font-display text-[34px] text-cream"
            }
          >
            {value}
          </span>
          <span className="font-condensed text-[11px] uppercase tracking-[.24em] text-cream/50">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
