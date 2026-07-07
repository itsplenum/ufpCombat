import { getFighter } from "@/data";
import { formatRecordWithFinish } from "@/lib/format";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Peleador UFP";

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

/** OG image de peleador: apodo + apellido + récord. */
export default async function OgImage({ params }: OgImageProps) {
  const { slug } = await params;
  const fighter = getFighter(slug);

  if (!fighter) {
    return renderOgImage({ title: "UFP" });
  }

  return renderOgImage({
    eyebrow: "ROSTER UFP",
    title: fighter.nickname ? `"${fighter.nickname}"` : fighter.firstName,
    titleAccent: fighter.lastName,
    footer: formatRecordWithFinish(fighter.record),
  });
}
