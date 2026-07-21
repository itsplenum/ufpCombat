"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { FormActionState } from "@/actions/apply";
import { submitSponsorContact } from "@/actions/sponsor";
import { sponsorTiers } from "@/data/sponsors";
import type { Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { fieldClasses, labelClasses, submitClasses } from "./formStyles";

/** Sponsor contact form (/patrocinadores). */
export function SponsorForm() {
  const t = useTranslations("sponsorsPage");
  const locale = useLocale() as Locale;
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    submitSponsorContact,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-3 border border-win/50 bg-surface p-8 text-center">
        <span className="font-display text-3xl uppercase text-win">{t("successTitle")}</span>
        <p className="text-[15px] leading-relaxed text-cream/65">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.status === "error" ? (
        <p className="border border-blood bg-blood/10 px-4 py-3 text-sm text-blood-hover">
          {t("errorBody")}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("company")}</span>
          <input name="company" required className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("contactName")}</span>
          <input name="contactName" required className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("email")}</span>
          <input name="email" type="email" required className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("tier")}</span>
          <select name="tierId" required className={fieldClasses}>
            {sponsorTiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {L(tier.name, locale)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClasses}>{t("message")}</span>
        <textarea name="message" rows={4} className={fieldClasses} />
      </label>

      <button type="submit" disabled={isPending} className={submitClasses}>
        {t("submit")}
      </button>
    </form>
  );
}
