import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  href?: string;
}

/**
 * Primary pill button. Every button with an arrow shares the exact
 * hero-button styling (height, padding, arrow size, hover animation)
 * so all primary CTAs across the site look identical. Pass `href` to
 * render it as a navigable link instead of an inert `<button>`.
 */
export function Button({
  children,
  className = "",
  showArrow = true,
  href,
}: ButtonProps) {
  const sizeClasses = showArrow
    ? "h-[73px] gap-2.5 px-8 py-5 text-[15px]"
    : "gap-1.5 px-5 py-3.5 text-[15px]";

  const colorClasses = showArrow
    ? "text-primary-dark hover:text-primary border-[1.5px] border-transparent hover:border-secondary"
    : "text-primary-dark hover:bg-white hover:text-primary";

  const sharedClassName = `group relative inline-flex items-center justify-center overflow-hidden rounded-[50px] bg-secondary font-bold uppercase transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${colorClasses} ${sizeClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {/*
          The reveal circle is clip-path based (not a scaled fixed-size box):
          a percentage radius always covers the full rectangle no matter how
          wide the button is (percent is measured against the box diagonal),
          so no sliver of the original background is ever left uncovered.
        */}
        {showArrow && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[50px] bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] [clip-path:circle(0px_at_calc(100%-50px)_50%)] group-hover:[clip-path:circle(150%_at_calc(100%-50px)_50%)] motion-reduce:transition-none"
          />
        )}

        <span className="relative z-20">{children}</span>

        {showArrow && (
          <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1 motion-reduce:transition-none">
            <Image src="/images/arrow-hero.svg" alt="" width={36} height={36} />
          </span>
        )}
      </Link>
    );
  }

  return (
    <button type="button" className={sharedClassName}>
      {/*
        The reveal circle is clip-path based (not a scaled fixed-size box):
        a percentage radius always covers the full rectangle no matter how
        wide the button is (percent is measured against the box diagonal),
        so no sliver of the original background is ever left uncovered.
      */}
      {showArrow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[50px] bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] [clip-path:circle(0px_at_calc(100%-50px)_50%)] group-hover:[clip-path:circle(150%_at_calc(100%-50px)_50%)] motion-reduce:transition-none"
        />
      )}

      <span className="relative z-20">{children}</span>

      {showArrow && (
        <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1 motion-reduce:transition-none">
          <Image src="/images/arrow-hero.svg" alt="" width={36} height={36} />
        </span>
      )}
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
