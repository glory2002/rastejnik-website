import type { ComponentPropsWithoutRef } from "react";

interface SectionLeadProps extends ComponentPropsWithoutRef<"p"> {
  /** Text color for the lead paragraph. Use "light" over dark/video backgrounds. */
  tone?: "primary" | "light";
  /** "hero" is the homepage deck — larger, more open than the default lead. */
  size?: "default" | "hero";
}

/**
 * The short intro line placed directly under a section's main heading
 * (e.g. "Напишете ни съобщение..." under "Свържете се с нас", or the
 * subheading under the hero's <h1>).
 *
 * Reserved specifically for that heading → lead-paragraph pattern — do
 * not reuse it for general body copy, card text, or anything not sitting
 * right below a heading.
 */
export function SectionLead({
  className = "",
  tone = "primary",
  size = "default",
  ...props
}: SectionLeadProps) {
  const toneClass = tone === "light" ? "text-white/85" : "text-primary";
  const sizeClass = size === "hero" ? "text-lead-hero" : "text-lead";

  return (
    <p
      className={`${sizeClass} font-medium ${toneClass} ${className}`}
      {...props}
    />
  );
}
