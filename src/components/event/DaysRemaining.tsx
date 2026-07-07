"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { getDaysRemaining } from "@/lib/countdown";

const noopSubscribe = () => () => {};

interface DaysRemainingProps {
  targetIso: string;
}

/**
 * "Faltan N días" calculado en el cliente: el servidor renderiza "—" y el
 * cliente lo reemplaza al hidratar (evita quedar congelado en el build estático).
 */
export function DaysRemaining({ targetIso }: DaysRemainingProps) {
  const t = useTranslations("eventPage");
  const days = useSyncExternalStore(
    noopSubscribe,
    () => getDaysRemaining(targetIso),
    () => null,
  );

  return <>{t("daysRemaining", { days: days ?? "—" })}</>;
}
