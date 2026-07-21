import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}

/**
 * Content sections — full-bleed background, but the content itself sits
 * in a generous, capped width (not infinite). This is how editorial /
 * premium sites actually do "full bleed": media and backdrops run edge
 * to edge, while text, forms and grids stay within a bound wide enough
 * to feel spacious on a laptop but sane on an ultra-wide monitor.
 */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1800px] px-2.5 md:px-4 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Header & footer — same generous cap so nav/logo don't drift to the far edges on ultra-wide screens */
export function FullWidth({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1800px] px-2.5 md:px-4 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
