import { getTranslations } from "next-intl/server";
import { getPastEvents } from "@/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultCard } from "@/components/event/ResultCard";

/** Last 3 events with their result and featured video. */
export async function ResultsSection() {
  const t = await getTranslations("sections.results");
  const pastEvents = getPastEvents().slice(0, 3);

  return (
    <Section id="resultados" background="ink-2">
      <SectionHeading title={t("title")} kicker={t("kicker")} />
      <div className="grid gap-5 md:grid-cols-3">
        {pastEvents.map((event) => (
          <ResultCard key={event.slug} event={event} />
        ))}
      </div>
    </Section>
  );
}
