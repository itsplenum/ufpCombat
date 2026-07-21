"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitFighterApplication, type FormActionState } from "@/actions/apply";

const inputClasses =
  "border border-cream/20 bg-ink px-4 py-[13px] font-body text-sm text-cream outline-none transition-colors focus:border-blood placeholder:text-cream/55";

/** Short fighter application form (home). */
export function ApplicationFormMini() {
  const t = useTranslations("sections.apply");
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    submitFighterApplication,
    { status: "idle" },
  );

  const submitted = state.status === "success";

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input name="name" required placeholder={t("namePlaceholder")} className={inputClasses} />
      <input
        name="record"
        required
        pattern="\d{1,3}-\d{1,3}-\d{1,3}"
        placeholder={t("recordPlaceholder")}
        className={inputClasses}
      />
      <input
        name="division"
        required
        placeholder={t("divisionPlaceholder")}
        className={inputClasses}
      />
      <button
        type="submit"
        disabled={submitted || isPending}
        className="cursor-pointer border-none bg-blood px-4 py-[15px] font-condensed text-base font-bold uppercase tracking-[.2em] text-cream transition-colors hover:bg-blood-hover hover:text-ink disabled:cursor-default disabled:hover:bg-blood disabled:hover:text-cream"
      >
        {submitted ? t("submitted") : t("submit")}
      </button>
    </form>
  );
}
