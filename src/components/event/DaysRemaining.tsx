"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { getDaysRemaining } from "@/lib/countdown";

const noopSubscribe = () => () => {};

interface DaysRemainingProps {
  targetIso: string;
}

/**
 * "N days to go", computed on the client: the server renders "—" and the
 * client swaps it in on hydration (keeps it from freezing into the static build).
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
