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
 * Page / section display heading (H1 scale).
 * Default: bold primary. Use `weight="medium"` for homepage-style soft displays.
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

/** Hero-scale display (homepage video hero). */
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

/** Large banner display (CTA / tagline sections). */
export function DisplayBanner<T extends ElementType = "h2">({
  as,
  className = "",
  tone = "primary",
  ...props
}: PolymorphicProps<T>) {
  const Tag = as ?? "h2";
  return (
    <Tag
      className={cx(
        "text-display-banner font-medium",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Section title (H2 scale). */
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

type HeadingSize = "sm" | "md" | "lg";

const headingSizeClass: Record<HeadingSize, string> = {
  sm: "text-heading-sm md:text-heading-sm-md",
  md: "text-heading md:text-heading-md",
  lg: "text-heading-lg md:text-heading-lg-md",
};

/** Card / subsection heading (H3 scale). */
export function Heading<T extends ElementType = "h3">({
  as,
  className = "",
  tone = "primary",
  size = "md",
  ...props
}: PolymorphicProps<T> & { size?: HeadingSize }) {
  const Tag = as ?? "h3";
  return (
    <Tag
      className={cx(
        headingSizeClass[size],
        "font-bold",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

type BodySize = "default" | "relaxed";

/** Body copy. */
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
      className={cx(
        size === "relaxed" ? "text-body-relaxed" : "text-body",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Form / UI label (14px bold). */
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

/** Uppercase action / text link style (Прочети, Към новините). */
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
