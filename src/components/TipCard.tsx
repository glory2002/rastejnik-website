import Image from "next/image";
import Link from "next/link";
import { Action, Title } from "@/components/ui/Typography";

const palettes = [
  ["#6d954b", "#e9b063", "#f27a97", "#476abf", "#6d954b"],
  ["#f27a97", "#6d954b", "#e9b063", "#476abf", "#f27a97"],
  ["#476abf", "#e9b063", "#6d954b", "#f27a97", "#476abf"],
  ["#e9b063", "#f27a97", "#476abf", "#6d954b", "#e9b063"],
] as const;

function diamond(cx: number, cy: number, s: number) {
  return `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`;
}

/** Compact shevitsa unit — five diamonds in brand colors. */
function ShevitsaMark({ variant = 0 }: { variant?: number }) {
  const [c, n, e, s, w] = palettes[variant % palettes.length];

  return (
    <svg
      viewBox="0 0 36 36"
      className="mb-5 h-9 w-9 shrink-0 sm:mb-6"
      aria-hidden
    >
      <polygon points={diamond(18, 7, 5)} fill={n} />
      <polygon points={diamond(29, 18, 5)} fill={e} />
      <polygon points={diamond(18, 29, 5)} fill={s} />
      <polygon points={diamond(7, 18, 5)} fill={w} />
      <polygon points={diamond(18, 18, 5)} fill={c} />
    </svg>
  );
}

/**
 * Typography-led tip card — no cover image.
 * Excerpt up top, large title anchored at the bottom (editorial layout).
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
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[280px] flex-col bg-white p-6 transition-colors sm:min-h-[320px] sm:p-8 lg:min-h-[360px]"
    >
      <ShevitsaMark variant={index} />

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
