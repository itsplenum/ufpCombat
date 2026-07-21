"use server";

import { sponsorContactSchema } from "@/lib/schemas";
import type { FormActionState } from "./apply";

/** Receives sponsorship requests. Will be wired to email/CRM in production. */
export async function submitSponsorContact(
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = sponsorContactSchema.safeParse({
    company: formData.get("company"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    tierId: formData.get("tierId"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  console.log("[UFP] Sponsorship request received:", parsed.data);
  return { status: "success" };
}
