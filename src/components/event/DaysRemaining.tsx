"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getDaysRemaining } from "@/lib/countdown";

interface DaysRemainingProps {
  targetIso: string;
}

/** "Faltan N días" calculado en el cliente (evita quedar congelado en el build estático). */
export function DaysRemaining({ targetIso }: DaysRemainingProps) {
  const t = useTranslations("eventPage");
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getDaysRemaining(targetIso));
  }, [targetIso]);

  return <>{t("daysRemaining", { days: days ?? "—" })}</>;
}
