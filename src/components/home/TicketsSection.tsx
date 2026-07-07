import { getTranslations } from "next-intl/server";
import type { UFPEvent } from "@/data/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TicketGrid } from "@/components/event/TicketGrid";

interface TicketsSectionProps {
  event: UFPEvent;
}

/** Zonas de boletos del próximo evento. */
export async function TicketsSection({ event }: TicketsSectionProps) {
  const t = await getTranslations("sections.tickets");

  if (event.tickets.length === 0) return null;

  return (
    <Section id="boletos" background="ticket-gradient" width="md" borderTop>
      <SectionHeading title={t("title")} titleAccent={t("titleAccent")} />
      <TicketGrid tickets={event.tickets} />
    </Section>
  );
}
