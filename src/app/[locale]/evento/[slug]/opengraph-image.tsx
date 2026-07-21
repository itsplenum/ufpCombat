import { getEvent, getMainFight, resolveCorner } from "@/data";
import { formatEventDate } from "@/lib/format";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Evento UFP";

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

/** Event OG image: title + main event fighters. */
export default async function OgImage({ params }: OgImageProps) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    return renderOgImage({ title: "UFP" });
  }

  const mainFight = getMainFight(event);
  const footer = mainFight
    ? `${resolveCorner(mainFight.red).fighter?.lastName ?? mainFight.red.name} VS ${
        resolveCorner(mainFight.blue).fighter?.lastName ?? mainFight.blue.name
      }`
    : undefined;

  return renderOgImage({
    eyebrow: `${formatEventDate(event.date, "es")} · ${event.venue.name}`,
    title: `UFP ${event.number}`,
    titleAccent: event.title,
    footer,
  });
}
