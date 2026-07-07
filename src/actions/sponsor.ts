"use server";

import { sponsorContactSchema } from "@/lib/schemas";
import type { FormActionState } from "./apply";

/** Recibe solicitudes de patrocinio. Se conectará a email/CRM en producción. */
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

  console.log("[UFP] Solicitud de patrocinio recibida:", parsed.data);
  return { status: "success" };
}
