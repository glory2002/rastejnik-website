import type { ComponentPropsWithoutRef } from "react";
import { Lead } from "@/components/ui/Typography";

type LeadTone = "primary" | "dark" | "muted" | "white" | "inherit";

interface SectionLeadProps extends ComponentPropsWithoutRef<"p"> {
  /** @deprecated Use `white` — `light` still maps to it. */
  tone?: LeadTone | "light";
  size?: "default" | "hero";
}

/** @deprecated Prefer `Lead` from Typography. */
export function SectionLead({
  tone = "dark",
  ...props
}: SectionLeadProps) {
  return <Lead tone={tone === "light" ? "white" : tone} {...props} />;
}
