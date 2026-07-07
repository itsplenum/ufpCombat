"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitFullFighterApplication, type FormActionState } from "@/actions/apply";
import { divisions } from "@/data/divisions";
import type { Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { fieldClasses, labelClasses, submitClasses } from "./formStyles";

const VIDEO_FIELDS = [1, 2, 3] as const;

/** Formulario completo de inscripción de peleadores (/inscripcion). */
export function ApplicationFormFull() {
  const t = useTranslations("applyPage");
  const locale = useLocale() as Locale;
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    submitFullFighterApplication,
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
          <span className={labelClasses}>{t("name")}</span>
          <input name="name" required className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("email")}</span>
          <input name="email" type="email" required className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("phone")}</span>
          <input name="phone" type="tel" className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("record")}</span>
          <input
            name="record"
            required
            pattern="\d{1,3}-\d{1,3}-\d{1,3}"
            placeholder="5-1-0"
            className={fieldClasses}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("division")}</span>
          <select name="division" required className={fieldClasses}>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {L(division.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("gym")}</span>
          <input name="gym" className={fieldClasses} />
        </label>
      </div>

      {VIDEO_FIELDS.map((number) => (
        <label key={number} className="flex flex-col gap-1.5">
          <span className={labelClasses}>{t("video", { number })}</span>
          <input
            name={`video${number}`}
            type="url"
            placeholder="https://"
            className={fieldClasses}
          />
        </label>
      ))}

      <label className="flex flex-col gap-1.5">
        <span className={labelClasses}>{t("message")}</span>
        <textarea name="message" rows={4} className={fieldClasses} />
      </label>

      <button type="submit" disabled={isPending} className={submitClasses}>
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
