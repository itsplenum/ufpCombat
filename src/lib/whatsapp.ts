import { site } from "@/data/site";

/**
 * Builds a wa.me link with a prefilled message.
 *
 * wa.me expects the number as country code + digits, with no "+" and no
 * separators; anything else silently opens a chat with nobody. The number
 * itself lives in `site.whatsappNumber` so there is a single place to change it.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
