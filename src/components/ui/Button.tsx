import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  href?: string;
  /**
   * "xl" is the hero-scale CTA — reserved for the homepage hero button.
   * "l" is the same button family sized down for denser contexts (cards,
   * in-page CTAs, etc). Only affects the arrow variant (`showArrow`).
   */
  size?: "xl" | "l";
  /**
   * Which side the white-circle icon sits on. `"right"` is the default
   * hero arrow; `"left"` swaps in the plus glyph (same white disc + light
   * green mark) and originates the hover reveal from the left.
   */
  iconSide?: "left" | "right";
  /**
   * Set to false to render a decorative, non-interactive `<span>` instead of
   * a `<button>`/`<a>` — for cases where this is purely a visual CTA nested
   * inside another clickable element (e.g. a whole-card `<Link>`), where a
   * real nested interactive element would be invalid HTML and would break
   * keyboard/screen-reader navigation.
   */
  interactive?: boolean;
  /**
   * Set to false when the button is nested inside another element that
   * already establishes a `group` (e.g. a whole hoverable card) — the
   * button's reveal-circle/arrow animations then react to that ancestor's
   * hover instead of needing the pointer directly over the button itself.
   */
  hoverGroup?: boolean;
  /** Only applies to the `<button>`/`<Link>` branches (not the decorative span). */
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Primary pill button. Every button with an arrow shares the exact
 * hero-button styling (padding, arrow, hover animation) at a given `size`,
 * so all primary CTAs of that size look identical across the site. Pass
 * `href` to render it as a navigable link instead of an inert `<button>`.
 */
export function Button({
  children,
  className = "",
  showArrow = true,
  href,
  size = "xl",
  iconSide = "right",
  interactive = true,
  hoverGroup = true,
  onClick,
  disabled = false,
}: ButtonProps) {
  const sizeClasses = showArrow
    ? size === "xl"
      ? "h-[73px] gap-2.5 px-8 py-5 text-[15px]"
      : "h-[56px] gap-2 px-6 py-3.5 text-[14px]"
    : "gap-1.5 px-5 py-3.5 text-[15px]";

  const iconOnLeft = showArrow && iconSide === "left";
  // Left plus sits a touch smaller than the right arrow so it doesn't
  // overpower the shorter "Добави дете" label.
  const arrowBoxClasses = iconOnLeft
    ? size === "xl"
      ? "h-8 w-8"
      : "h-6 w-6"
    : size === "xl"
      ? "h-9 w-9"
      : "h-7 w-7";
  const arrowImageSize = iconOnLeft
    ? size === "xl"
      ? 32
      : 24
    : size === "xl"
      ? 36
      : 28;
  // Reveal circle's origin must sit under the icon's center: padding +
  // half the icon box (xl arrow: 32+18, l arrow: 24+14; xl plus: 32+16, l plus: 24+12).
  const circleOffset = iconOnLeft
    ? size === "xl"
      ? "48px"
      : "36px"
    : size === "xl"
      ? "50px"
      : "38px";

  const colorClasses = showArrow
    ? "text-primary-dark hover:text-primary border-[1.5px] border-transparent hover:border-secondary"
    : "text-primary-dark hover:bg-white hover:text-primary";

  const sharedClassName = `${hoverGroup ? "group" : ""} relative inline-flex items-center justify-center overflow-hidden rounded-[50px] bg-secondary font-bold uppercase transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] disabled:pointer-events-none disabled:opacity-40 ${colorClasses} ${sizeClasses} ${className}`;

  const arrow = showArrow && (
    <span
      aria-hidden
      style={
        {
          "--circle-offset": circleOffset,
        } as React.CSSProperties
      }
      className={
        iconOnLeft
          ? "pointer-events-none absolute inset-0 z-0 rounded-[50px] bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none [clip-path:circle(0px_at_var(--circle-offset)_50%)] group-hover:[clip-path:circle(150%_at_var(--circle-offset)_50%)]"
          : "pointer-events-none absolute inset-0 z-0 rounded-[50px] bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none [clip-path:circle(0px_at_calc(100%-var(--circle-offset))_50%)] group-hover:[clip-path:circle(150%_at_calc(100%-var(--circle-offset))_50%)]"
      }
    />
  );

  const iconSrc = iconOnLeft ? "/images/plus-icon.svg" : "/images/arrow-hero.svg";
  const iconMotion = iconOnLeft
    ? "group-hover:-translate-x-0.5"
    : "group-hover:translate-x-1";

  const arrowIcon = showArrow && (
    <span
      className={`relative z-10 flex shrink-0 items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none ${iconMotion} ${arrowBoxClasses}`}
    >
      <Image src={iconSrc} alt="" width={arrowImageSize} height={arrowImageSize} />
    </span>
  );

  const label = <span className="relative z-20">{children}</span>;
  const content = iconOnLeft ? (
    <>
      {arrow}
      {arrowIcon}
      {label}
    </>
  ) : (
    <>
      {arrow}
      {label}
      {arrowIcon}
    </>
  );

  if (!interactive) {
    return <span className={sharedClassName}>{content}</span>;
  }

  if (href) {
    return (
      <Link href={href} className={sharedClassName} onClick={onClick}>
        {/*
          The reveal circle is clip-path based (not a scaled fixed-size box):
          a percentage radius always covers the full rectangle no matter how
          wide the button is (percent is measured against the box diagonal),
          so no sliver of the original background is ever left uncovered.
        */}
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={sharedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

interface LinkButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function LinkButton({
  children,
  href = "#",
  className = "",
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[33px] py-3.5 text-[17px] font-bold uppercase text-primary transition-opacity hover:opacity-80 ${className}`}
    >
      {children}
      <Image
        src="/images/arrow-link.svg"
        alt=""
        width={14}
        height={22}
        className="shrink-0"
      />
    </a>
  );
}
