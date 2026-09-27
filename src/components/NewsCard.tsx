import Link from "next/link";
import { ShevitsaMark } from "@/components/icons/ShevitsaMark";
import { LinkButton } from "@/components/ui/Button";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Body, Heading, Meta } from "@/components/ui/Typography";

export const newsCardWashes = [
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
  const { wash, shevitsa } = newsCardWashes[index % newsCardWashes.length];

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
        <Body
          size="card"
          tone="primary"
          className={`feature-copy ${
            featured ? "mt-card-copy-featured" : "mt-card-copy"
          }`}
        >
          {excerpt}
        </Body>
      ) : null}
      <div
        className={`mt-auto flex items-center ${
          featured ? "pt-card-action-featured" : "pt-card-action"
        }`}
      >
        <LinkButton interactive={false} hoverGroup={false}>
          Прочети
        </LinkButton>
      </div>
    </Link>
  );
}
