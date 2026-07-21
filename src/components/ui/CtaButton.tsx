import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type CtaVariant = "filled" | "outline" | "outlineRed";
type CtaSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-block text-center font-condensed font-bold uppercase transition-colors duration-200";

const variantClasses: Record<CtaVariant, string> = {
  filled:
    "bg-blood text-cream hover:bg-blood-hover hover:text-ink shadow-[0_0_40px_rgba(193,18,31,.4)]",
  outline:
    "border border-cream/55 text-cream hover:border-blood-hover hover:text-blood-hover",
  outlineRed: "border border-blood text-blood-hover hover:bg-blood hover:text-cream",
};

const sizeClasses: Record<CtaSize, string> = {
  sm: "clip-cta-sm px-[22px] py-[10px] text-[15px] tracking-[.18em]",
  md: "clip-cta px-7 py-3 text-[15px] tracking-[.18em]",
  lg: "clip-cta px-10 py-4 text-lg tracking-[.2em]",
};

interface CtaButtonProps {
  href?: ComponentProps<typeof Link>["href"];
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

/** Botón de acción con el corte de paralelogramo característico de UFP. */
export function CtaButton({
  href,
  variant = "filled",
  size = "md",
  className = "",
  children,
  type = "button",
  disabled,
}: CtaButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={`${classes} cursor-pointer`}>
      {children}
    </button>
  );
}
