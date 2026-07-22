"use server";

import { fighterApplicationSchema, fullFighterApplicationSchema } from "@/lib/schemas";
import { notifySubmission } from "@/lib/email";

export interface FormActionState {
  status: "idle" | "success" | "error";
}

/**
 * Receives the short application from the home page and relays it to the
 * promotion's inbox (see `notifySubmission`).
 */
export async function submitFighterApplication(
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = fighterApplicationSchema.safeParse({
    name: formData.get("name"),
    record: formData.get("record"),
    division: formData.get("division"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  await notifySubmission({
    subject: `Inscripción de peleador — ${parsed.data.name}`,
    fields: {
      Nombre: parsed.data.name,
      WhatsApp: parsed.data.phone,
      Récord: parsed.data.record,
      División: parsed.data.division,
      Origen: "Formulario corto (home)",
    },
  });
  return { status: "success" };
}

/** Receives the full application from /inscripcion. */
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

  await notifySubmission({
    subject: `Inscripción de peleador — ${parsed.data.name}`,
    replyTo: parsed.data.email,
    fields: {
      Nombre: parsed.data.name,
      Récord: parsed.data.record,
      División: parsed.data.division,
      Email: parsed.data.email,
      Teléfono: parsed.data.phone,
      Gimnasio: parsed.data.gym,
      Videos: parsed.data.videoUrls?.join("  |  "),
      Mensaje: parsed.data.message,
      Origen: "Formulario completo (/inscripcion)",
    },
  });
  return { status: "success" };
}
