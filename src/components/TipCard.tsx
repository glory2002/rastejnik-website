import Image from "next/image";
import Link from "next/link";
import { LogoSprout } from "@/components/icons/LogoSprout";
import { Action, Title } from "@/components/ui/Typography";

/**
 * Typography-led tip card — no cover image.
 * Excerpt up top, large title anchored at the bottom (editorial layout).
 */
export function TipCard({
  href,
  title,
  excerpt,
}: {
  href: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[280px] flex-col bg-white p-6 transition-colors sm:min-h-[320px] sm:p-8 lg:min-h-[360px]"
    >
      <LogoSprout className="mb-5 h-9 w-9 shrink-0 sm:mb-6" />

      <p className="text-base leading-[1.4] text-primary-dark/75">{excerpt}</p>

      <div className="mt-auto flex flex-col gap-5 pt-10 sm:pt-12">
        <Title as="h2" className="text-balance transition-opacity group-hover:opacity-80">
          {title}
        </Title>

        <div className="flex items-center justify-between gap-4">
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
      </div>
    </Link>
  );
}
