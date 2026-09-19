import Image from "next/image";
import Link from "next/link";
import { InfoMark } from "@/components/icons/InfoMark";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Action, Title } from "@/components/ui/Typography";

const hoverIconColor = [
  "group-hover:text-accent-pink",
  "group-hover:text-primary",
  "group-hover:text-accent-blue",
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
  const iconHover = hoverIconColor[index % hoverIconColor.length];

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

      <p className="mt-card-copy text-card-body text-primary-dark/75">
        {excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-card-action">
        <Action className="transition-opacity group-hover:opacity-80">
          Прочети
        </Action>
        <Image
          src="/images/arrow-link.svg"
          alt=""
          width={14}
          height={22}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
