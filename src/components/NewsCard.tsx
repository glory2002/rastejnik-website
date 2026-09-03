import Image from "next/image";
import Link from "next/link";
import { Action, Heading, Meta } from "@/components/ui/Typography";

/**
 * Square shevitsa in the corner. Pair 0 = gold/blue, pair 1 = green/pink.
 * On hover the square rotates 45° into a diamond and fades.
 */
function ShevitsaMark({ pair }: { pair: 0 | 1 }) {
  return (
    <span
      aria-hidden
      className={`news-shevitsa pointer-events-none absolute top-6 right-6 z-[2] block sm:top-8 sm:right-8${
        pair === 1 ? " news-shevitsa--alt" : ""
      }`}
    />
  );
}

/**
 * Text-led news card — no cover image.
 * Light yellow at rest, white on hover. Corner shevitsa rotates on hover.
 */
export function NewsCard({
  href,
  date,
  title,
  excerpt,
  index = 0,
}: {
  href: string;
  date: string;
  title: string;
  excerpt?: string;
  index?: number;
}) {
  const pair = (index % 2 === 0 ? 0 : 1) as 0 | 1;

  return (
    <Link
      href={href}
      className="news-envelope group relative z-0 flex h-full flex-col overflow-visible bg-cream p-6 pr-[4.75rem] transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] hover:z-10 hover:bg-white motion-reduce:transition-none sm:p-8 sm:pr-[5.5rem]"
    >
      <ShevitsaMark pair={pair} />
      <Meta>{date}</Meta>
      <Heading as="h2" className="mt-3 text-balance">
        {title}
      </Heading>
      {excerpt ? (
        <p className="mt-3 text-base leading-[1.35] text-primary-dark">
          {excerpt}
        </p>
      ) : null}
      <div className="mt-auto flex items-center pt-6">
        <Action className="inline-flex items-center gap-1.5 transition-opacity group-hover:opacity-80">
          Прочети
          <Image
            src="/images/arrow-link.svg"
            alt=""
            width={14}
            height={22}
            className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </Action>
      </div>
    </Link>
  );
}
