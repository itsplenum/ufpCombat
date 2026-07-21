import { z } from "zod";

/** Récord de pelea en formato n-n-n, ej. "5-1-0". */
const recordPattern = /^\d{1,3}-\d{1,3}-\d{1,3}$/;

/** Form corto de la home. */
export const fighterApplicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  record: z.string().trim().regex(recordPattern),
  division: z.string().trim().min(3).max(120),
});

/** Form completo de /inscripcion. */
export const fullFighterApplicationSchema = fighterApplicationSchema.extend({
  email: z.email().trim(),
  phone: z.string().trim().min(7).max(25).optional().or(z.literal("")),
  gym: z.string().trim().max(120).optional().or(z.literal("")),
  videoUrls: z.array(z.url().trim()).max(3).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const sponsorContactSchema = z.object({
  company: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  email: z.email().trim(),
  tierId: z.string().trim().min(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});
