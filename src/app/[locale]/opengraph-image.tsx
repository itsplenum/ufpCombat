import { getUpcomingEvent } from "@/data";
import { formatEventDate } from "@/lib/format";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "UFP · Ultimate Fight Promotions";

/** Home OG image: the next event as a poster. */
export default async function OgImage() {
  const event = getUpcomingEvent();

  if (!event) {
    return renderOgImage({ title: "UFP", footer: "MMA + BOXEO" });
  }

  return renderOgImage({
    eyebrow: `${formatEventDate(event.date, "es")} · ${event.venue.name}`,
    title: `UFP ${event.number}`,
    titleAccent: event.title,
    footer: "BOLETOS EN UFPCOMBAT.COM",
  });
}
