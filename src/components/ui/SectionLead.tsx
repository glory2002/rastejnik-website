import type { ComponentPropsWithoutRef } from "react";

/**
 * The short intro line placed directly under a section's main heading
 * (e.g. "Напишете ни съобщение..." under "Свържете се с нас").
 *
 * Reserved specifically for that heading → lead-paragraph pattern — do
 * not reuse it for general body copy, card text, or anything not sitting
 * right below an <h2>.
 */
export function SectionLead({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={`text-[20px] font-medium leading-[1.3] text-primary ${className}`}
      {...props}
    />
  );
}
