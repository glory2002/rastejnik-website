import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Shared label type for every button and text link. */
const labelClass = "text-action font-bold uppercase";

const motionEase = "duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]";

const revealClosedLeft = "[clip-path:circle(0px_at_var(--circle-offset)_50%)]";
const revealClosedRight =
  "[clip-path:circle(0px_at_calc(100%-var(--circle-offset))_50%)]";
const revealOpenLeft =
  "group-hover:[clip-path:circle(150%_at_var(--circle-offset)_50%)] group-focus-visible:[clip-path:circle(150%_at_var(--circle-offset)_50%)]";
const revealOpenRight =
  "group-hover:[clip-path:circle(150%_at_calc(100%-var(--circle-offset))_50%)] group-focus-visible:[clip-path:circle(150%_at_calc(100%-var(--circle-offset))_50%)]";
const revealOpenLeftSubcard =
  "group-hover/subcard:[clip-path:circle(150%_at_var(--circle-offset)_50%)] group-focus-visible/subcard:[clip-path:circle(150%_at_var(--circle-offset)_50%)]";
const revealOpenRightSubcard =
  "group-hover/subcard:[clip-path:circle(150%_at_calc(100%-var(--circle-offset))_50%)] group-focus-visible/subcard:[clip-path:circle(150%_at_calc(100%-var(--circle-offset))_50%)]";
const nudgeLeft =
  "group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5";
const nudgeRight = "group-hover:translate-x-1 group-focus-visible:translate-x-1";
const nudgeLeftSubcard =
  "group-hover/subcard:-translate-x-0.5 group-focus-visible/subcard:-translate-x-0.5";
const nudgeRightSubcard =
  "group-hover/subcard:translate-x-1 group-focus-visible/subcard:translate-x-1";
const subcardText =
  "group-hover/subcard:text-primary group-focus-visible/subcard:text-primary";
const subcardBorderPrimary =
  "group-hover/subcard:border-primary group-focus-visible/subcard:border-primary";
const subcardBorderSecondary =
  "group-hover/subcard:border-secondary group-focus-visible/subcard:border-secondary";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  href?: string;
  /** Passed through when `href` is set — for external association sites. */
  target?: string;
  rel?: string;
  /**
   * "xl" is the hero-scale CTA — reserved for the homepage hero button.
   * "l" is the same button family sized down for denser contexts (cards,
   * in-page CTAs, etc). "s" is the compact pill for tight surfaces such as
   * the dashboard fill popover. Only affects the arrow variant (`showArrow`).
   */
  size?: "xl" | "l" | "s";
  /**
   * "primary" is the filled yellow pill. "secondary" is the outlined
   * sibling — same geometry, quieter ink (listing / outbound actions).
   */
  variant?: "primary" | "secondary";
  /**
   * White-circle mark. `"arrow"` (default) and `"plus"` sit on the right.
   * `"back"` is the same arrow flipped, on the left — only for назад.
   */
  icon?: "arrow" | "back" | "plus";
  /**
   * @deprecated Prefer `icon`. `"left"` maps to `"back"` so the left
   * slot stays the back arrow, not a second forward icon.
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
  /**
   * Named Tailwind group (`group/{name}`). Use when a button sits inside
   * nested hoverable frames so `group-hover` does not inherit from a parent.
   */
  groupName?: string;
  /** Only applies to the `<button>`/`<Link>` branches (not the decorative span). */
  onClick?: () => void;
  disabled?: boolean;
  /** Native button type — ignored when rendering as a link. */
  type?: "button" | "submit" | "reset";
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
  target,
  rel,
  size = "xl",
  variant = "primary",
  icon: iconProp,
  iconSide,
  interactive = true,
  hoverGroup = true,
  groupName,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const sizeClasses = !showArrow
    ? "gap-1.5 px-5 py-3.5"
    : size === "xl"
      ? "min-h-[56px] gap-2 px-5 py-3.5 sm:h-[73px] sm:gap-2.5 sm:px-8 sm:py-5"
      : size === "l"
        ? "h-[56px] gap-2 px-5 py-3.5 sm:px-6"
        : "h-10 gap-1.5 px-3.5";

  const icon =
    iconProp ?? (iconSide === "left" ? "back" : "arrow");
  const iconOnLeft = showArrow && icon === "back";
  const arrowBoxClasses =
    size === "xl" ? "h-9 w-9" : size === "l" ? "h-7 w-7" : "h-5 w-5";
  const arrowImageSize = size === "xl" ? 36 : size === "l" ? 28 : 20;
  // Reveal circle's origin must sit under the icon's center: padding +
  // half the icon box (xl: 32+18, l: 24+14, s: 14+10).
  const circleOffset = size === "xl" ? "50px" : size === "l" ? "38px" : "24px";

  const isSecondary = variant === "secondary";
  const namedSubcard = groupName === "subcard";
  const groupClass = hoverGroup
    ? namedSubcard
      ? "group/subcard"
      : "group"
    : "";
  const clipOpen = namedSubcard
    ? iconOnLeft
      ? revealOpenLeftSubcard
      : revealOpenRightSubcard
    : iconOnLeft
      ? revealOpenLeft
      : revealOpenRight;
  const iconMotion = namedSubcard
    ? iconOnLeft
      ? nudgeLeftSubcard
      : nudgeRightSubcard
    : iconOnLeft
      ? nudgeLeft
      : nudgeRight;
  const colorClasses = showArrow
    ? cx(
        "border-[1.5px] text-primary-dark hover:text-primary focus-visible:text-primary",
        isSecondary
          ? "border-secondary hover:border-primary focus-visible:border-primary"
          : "border-transparent hover:border-secondary focus-visible:border-secondary",
        namedSubcard && subcardText,
        namedSubcard &&
          (isSecondary ? subcardBorderPrimary : subcardBorderSecondary),
      )
    : isSecondary
      ? "border-[1.5px] border-secondary text-primary-dark hover:border-primary hover:text-primary"
      : "text-primary-dark hover:bg-white hover:text-primary";

  const sharedClassName = cx(
    groupClass,
    "relative inline-flex items-center justify-center overflow-hidden rounded-full",
    isSecondary ? "bg-white" : "bg-secondary",
    labelClass,
    "transition-colors",
    motionEase,
    "disabled:pointer-events-none disabled:opacity-40",
    colorClasses,
    sizeClasses,
    className,
  );

  const arrow = showArrow && !isSecondary && (
    <span
      aria-hidden
      style={
        {
          "--circle-offset": circleOffset,
        } as React.CSSProperties
      }
      className={cx(
        "pointer-events-none absolute inset-0 z-0 rounded-full bg-white transition-[clip-path] motion-reduce:transition-none",
        motionEase,
        iconOnLeft ? revealClosedLeft : revealClosedRight,
        clipOpen,
      )}
    />
  );

  const iconSrc =
    icon === "plus"
      ? "/images/plus-icon.svg"
      : isSecondary
        ? "/images/arrow-link.svg"
        : "/images/arrow-hero.svg";
  const iconFlip = icon === "back" ? "-scale-x-100" : "";
  const iconWidth = isSecondary ? 14 : arrowImageSize;
  const iconHeight = isSecondary ? 22 : arrowImageSize;
  const secondaryBox = isSecondary ? "h-[22px] w-[14px]" : arrowBoxClasses;

  const arrowIcon = showArrow && (
    <span
      className={cx(
        "relative z-10 flex shrink-0 items-center justify-center transition-transform motion-reduce:transition-none",
        motionEase,
        iconMotion,
        secondaryBox,
      )}
    >
      <Image
        src={iconSrc}
        alt=""
        width={iconWidth}
        height={iconHeight}
        className={iconFlip}
      />
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
      <Link
        href={href}
        className={sharedClassName}
        onClick={onClick}
        target={target}
        rel={rel}
      >
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
      type={type}
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
  /**
   * `"arrow"` sits on the right. `"back"` is the same arrow, flipped, on the left.
   * `"none"` is the text-only tertiary action.
   */
  icon?: "arrow" | "back" | "none";
  /**
   * Set to false for a visual tertiary nested inside another link
   * (a whole-card `<Link>`), so the markup stays valid.
   */
  interactive?: boolean;
  /**
   * Set to false when a parent already has `group`, so the label
   * and the arrow follow that ancestor's hover.
   */
  hoverGroup?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-expanded"?: boolean;
}

export const LinkButton = forwardRef<HTMLElement, LinkButtonProps>(
  function LinkButton(
    {
      children,
      href,
      className = "",
      icon = "arrow",
      interactive = true,
      hoverGroup = true,
      onClick,
      disabled = false,
      type = "button",
      target,
      rel,
      "aria-expanded": ariaExpanded,
    },
    ref,
  ) {
    const iconOnLeft = icon === "back";
    const mark =
      icon === "none" ? null : (
        <Image
          src="/images/arrow-link.svg"
          alt=""
          width={14}
          height={22}
          className={cx(
            "shrink-0 transition-transform motion-reduce:transition-none",
            motionEase,
            iconOnLeft ? "-scale-x-100" : "",
            iconOnLeft ? nudgeLeft : nudgeRight,
          )}
        />
      );

    const sharedClassName = cx(
      hoverGroup && "group",
      "inline-flex items-center justify-center gap-2 rounded-full py-3.5 transition-colors",
      motionEase,
      "text-primary-dark hover:text-primary focus-visible:text-primary",
      !hoverGroup &&
        "group-hover:text-primary group-focus-visible:text-primary",
      labelClass,
      "disabled:pointer-events-none disabled:opacity-40",
      className,
    );
    const content = (
      <>
        {iconOnLeft ? mark : null}
        {children}
        {icon === "arrow" ? mark : null}
      </>
    );

    if (!interactive) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={sharedClassName}>
          {content}
        </span>
      );
    }

    if (href) {
      const external = /^https?:/i.test(href);
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={sharedClassName}
            onClick={onClick}
            target={target}
            rel={rel}
            aria-expanded={ariaExpanded}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={sharedClassName}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-expanded={ariaExpanded}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={sharedClassName}
        onClick={onClick}
        disabled={disabled}
        aria-expanded={ariaExpanded}
      >
        {content}
      </button>
    );
  },
);

/** Icon-only carousel control. Same 36px hero arrow as the XL button. */
const carouselArrowClass = "h-9 w-9";

interface CarouselArrowProps {
  direction?: "prev" | "next";
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CarouselArrow({
  direction = "next",
  label,
  disabled = false,
  onClick,
  className = "",
}: CarouselArrowProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35",
        className,
      )}
    >
      <Image
        src="/images/arrow-hero.svg"
        alt=""
        width={36}
        height={36}
        className={cx(
          carouselArrowClass,
          direction === "prev" && "rotate-180",
        )}
      />
    </button>
  );
}
