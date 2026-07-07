"use server";

import { fighterApplicationSchema, fullFighterApplicationSchema } from "@/lib/schemas";

export interface FormActionState {
  status: "idle" | "success" | "error";
}

/**
 * Recibe la aplicación corta de la home. Hoy solo registra en el servidor;
 * aquí se conectará el email/CRM cuando exista.
 */
export async function submitFighterApplication(
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = fighterApplicationSchema.safeParse({
    name: formData.get("name"),
    record: formData.get("record"),
    division: formData.get("division"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  console.log("[UFP] Aplicación de peleador recibida:", parsed.data);
  return { status: "success" };
}

/** Recibe la aplicación completa de /inscripcion. */
export async function submitFullFighterApplication(
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const videoUrls = [
    formData.get("video1"),
    formData.get("video2"),
    formData.get("video3"),
  ].filter((value): value is string => typeof value === "string" && value.length > 0);

  const parsed = fullFighterApplicationSchema.safeParse({
    name: formData.get("name"),
    record: formData.get("record"),
    division: formData.get("division"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    gym: formData.get("gym"),
    videoUrls,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  console.log("[UFP] Aplicación completa de peleador recibida:", parsed.data);
  return { status: "success" };
}
