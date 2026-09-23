import Image from "next/image";
import Link from "next/link";
import { ShevitsaMark } from "@/components/icons/ShevitsaMark";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Action, Heading, Meta } from "@/components/ui/Typography";

const cardWashes = [
  { wash: "bg-primary-light-solid", shevitsa: "green" },
  { wash: "bg-accent-pink-solid", shevitsa: "pink" },
  { wash: "bg-accent-pink-solid", shevitsa: "pink" },
  { wash: "bg-cream", shevitsa: "orange" },
  { wash: "bg-primary-light-solid", shevitsa: "green" },
  { wash: "bg-cream", shevitsa: "orange" },
  { wash: "bg-primary-light-solid", shevitsa: "green" },
  { wash: "bg-accent-pink-solid", shevitsa: "pink" },
] as const;

/**
 * Text-led news card — no cover image.
 * Green / pink / cream washes at rest, white on hover.
 * Titles carry the hierarchy; body stays quieter. Flat, no radius.
 */
export function NewsCard({
  href,
  date,
  title,
  excerpt,
  index = 0,
  featured = false,
}: {
  href: string;
  date: string;
  title: string;
  excerpt?: string;
  index?: number;
  featured?: boolean;
}) {
  const { wash, shevitsa } = cardWashes[index % cardWashes.length];

  return (
    <Link
      href={href}
      className={`news-envelope group ${cardSurfaceClass} relative z-0 flex h-full flex-col overflow-visible ${wash} transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] hover:z-10 hover:bg-white motion-reduce:transition-none${
        featured ? " news-envelope--featured" : ""
      }`}
    >
      <ShevitsaMark index={index} featured={featured} tone={shevitsa} />
      <Meta tone="muted">{date}</Meta>
      <Heading
        as="h2"
        size={featured ? "featured" : "sm"}
        className={`text-balance ${featured ? "mt-card-meta-featured" : "mt-card-meta"}`}
      >
        {title}
      </Heading>
      {excerpt ? (
        <p
          className={`feature-copy text-card-body text-primary ${
            featured ? "mt-card-copy-featured" : "mt-card-copy"
          }`}
        >
          {excerpt}
        </p>
      ) : null}
      <div
        className={`mt-auto flex items-center ${
          featured ? "pt-card-action-featured" : "pt-card-action"
        }`}
      >
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
