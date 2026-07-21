"use client";

import { useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageToggle } from "./LanguageToggle";

interface NavMobileProps {
  links: { href: string; label: string }[];
  ticketsLabel: string;
  openLabel: string;
  closeLabel: string;
}

/** Menú hamburguesa para pantallas < lg. */
export function NavMobile({ links, ticketsLabel, openLabel, closeLabel }: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  /* Con el overlay abierto: Escape cierra y el body no scrollea detrás. */
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? closeLabel : openLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-10 cursor-pointer flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`h-px w-6 bg-cream transition-transform ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
        />
        <span className={`h-px w-6 bg-blood transition-opacity ${isOpen ? "opacity-0" : ""}`} />
        <span
          className={`h-px w-6 bg-cream transition-transform ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-16 z-100 flex flex-col gap-1 border-b border-blood/35 bg-ink/97 px-7 py-6 backdrop-blur-[12px]"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-2 font-condensed text-lg uppercase tracking-[.14em] text-cream/85 transition-colors hover:text-blood-hover"
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <CtaButton href="/#boletos" size="sm">
              {ticketsLabel}
            </CtaButton>
            <LanguageToggle />
          </div>
        </div>
      )}
    </div>
  );
}
