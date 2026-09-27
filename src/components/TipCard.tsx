import Link from "next/link";
import { InfoMark } from "@/components/icons/InfoMark";
import { LinkButton } from "@/components/ui/Button";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Body, Title } from "@/components/ui/Typography";

export const tipIconHovers = [
  { name: "accent-pink", hover: "group-hover:text-accent-pink", swatch: "text-accent-pink" },
  { name: "primary", hover: "group-hover:text-primary", swatch: "text-primary" },
  { name: "accent-blue", hover: "group-hover:text-accent-blue", swatch: "text-accent-blue" },
] as const;

/**
 * Typography-led tip card — no cover image.
 * Title first, then excerpt; action stays at the bottom.
 */
export function TipCard({
  href,
  title,
  excerpt,
  index = 0,
}: {
  href: string;
  title: string;
  excerpt: string;
  index?: number;
}) {
  const iconHover = tipIconHovers[index % tipIconHovers.length].hover;

  return (
    <Link
      href={href}
      className={`group ${cardSurfaceClass} flex h-full min-h-[280px] flex-col bg-white p-6 transition-colors duration-200 ease-out sm:min-h-[320px] sm:p-8 lg:min-h-[360px]`}
    >
      <InfoMark
        className={`mb-5 h-9 w-9 shrink-0 origin-center rotate-180 scale-100 text-secondary transition-[scale,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-110 sm:mb-6 ${iconHover}`}
      />

      <Title as="h2" className="text-balance">
        {title}
      </Title>

      <Body size="card" tone="muted" className="mt-card-copy">
        {excerpt}
      </Body>

      <div className="mt-auto flex items-center pt-card-action">
        <LinkButton interactive={false} hoverGroup={false}>
          Прочети
        </LinkButton>
      </div>
    </Link>
  );
}
