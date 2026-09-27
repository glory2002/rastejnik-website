import type { ComponentPropsWithoutRef, ElementType } from "react";

type Tone = "primary" | "dark" | "muted" | "white" | "inherit";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  className?: string;
  tone?: Tone;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "tone">;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const toneClass: Record<Tone, string> = {
  primary: "text-primary",
  dark: "text-primary-dark",
  muted: "text-primary-dark/60",
  white: "text-white",
  inherit: "text-inherit",
};

/**
 * Page lockup (H1). Bold by default.
 * `weight="medium"` is for soft homepage / quote lockups.
 */
export function Display<T extends ElementType = "h1">({
  as,
  className = "",
  tone = "primary",
  weight = "bold",
  ...props
}: PolymorphicProps<T> & { weight?: "bold" | "medium" }) {
  const Tag = as ?? "h1";
  return (
    <Tag
      className={cx(
        "text-display",
        weight === "medium" ? "font-medium leading-[1.04]" : "font-bold",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Homepage video hero only. Do not reuse on listing pages. */
export function DisplayHero<T extends ElementType = "h1">({
  as,
  className = "",
  tone = "white",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "h1";
  return (
    <Tag
      className={cx("text-display-hero font-medium", toneClass[tone], className)}
      {...props}
    />
  );
}

/** Section title (H2). */
export function Title<T extends ElementType = "h2">({
  as,
  className = "",
  tone = "primary",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "h2";
  return (
    <Tag
      className={cx("text-title font-bold", toneClass[tone], className)}
      {...props}
    />
  );
}

type HeadingSize = "sm" | "md" | "lg" | "featured";

const headingSizeClass: Record<HeadingSize, string> = {
  sm: "text-heading-sm",
  md: "text-heading",
  lg: "text-heading-lg",
  featured: "text-heading-featured",
};

/** Card / subsection heading. */
export function Heading<T extends ElementType = "h3">({
  as,
  className = "",
  tone = "primary",
  size = "md",
  weight = "bold",
  ...props
}: PolymorphicProps<T> & { size?: HeadingSize; weight?: "bold" | "medium" }) {
  const Tag = as ?? "h3";
  return (
    <Tag
      data-card-title=""
      className={cx(
        headingSizeClass[size],
        weight === "medium" ? "font-medium" : "font-bold",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

type LeadSize = "default" | "hero";

/**
 * One line under a heading. Not for body copy or card excerpts.
 */
export function Lead<T extends ElementType = "p">({
  as,
  className = "",
  tone = "dark",
  size = "default",
  ...props
}: PolymorphicProps<T> & { size?: LeadSize }) {
  const Tag = as ?? "p";
  return (
    <Tag
      className={cx(
        size === "hero" ? "text-lead-hero" : "text-lead",
        "font-medium",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

type BodySize = "default" | "card";

const bodySizeClass: Record<BodySize, string> = {
  default: "text-body",
  card: "text-card-body",
};

/** Body copy. Default line-height is open; `card` is the quieter 18px. */
export function Body<T extends ElementType = "p">({
  as,
  className = "",
  tone = "dark",
  size = "default",
  ...props
}: PolymorphicProps<T> & { size?: BodySize }) {
  const Tag = as ?? "p";
  return (
    <Tag
      className={cx(bodySizeClass[size], toneClass[tone], className)}
      {...props}
    />
  );
}

/** Form / UI label. */
export function Label<T extends ElementType = "span">({
  as,
  className = "",
  tone = "dark",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cx("text-label font-bold", toneClass[tone], className)}
      {...props}
    />
  );
}

/** Small uppercase meta (dates, kind tags). */
export function Meta<T extends ElementType = "p">({
  as,
  className = "",
  tone = "primary",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "p";
  return (
    <Tag
      className={cx(
        "text-meta font-bold uppercase tracking-[0.04em]",
        tone === "primary" ? "text-primary/70" : toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Uppercase action / text link style. */
export function Action<T extends ElementType = "span">({
  as,
  className = "",
  tone = "primary",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cx("text-action font-bold uppercase", toneClass[tone], className)}
      {...props}
    />
  );
}

/** Primary nav link text. */
export function NavText<T extends ElementType = "span">({
  as,
  className = "",
  tone = "primary",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cx("text-nav font-medium", toneClass[tone], className)}
      {...props}
    />
  );
}
