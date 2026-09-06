import type { CSSProperties } from "react";
import type { QuestionnaireAccent } from "@/data/questionnaires";

const accentText: Record<QuestionnaireAccent, string> = {
  pink: "text-accent-pink",
  orange: "text-accent-orange",
  green: "text-accent-green",
  blue: "text-accent-blue",
};

export function TokenIcon({
  src,
  accent,
  className,
  position = "left center",
}: {
  src: string;
  accent: QuestionnaireAccent;
  className?: string;
  position?: string;
}) {
  return (
    <span
      aria-hidden
      className={`icon-token ${accentText[accent]} ${className ?? ""}`}
      style={
        {
          "--icon-token": `url("${src}")`,
          "--icon-token-position": position,
        } as CSSProperties
      }
    />
  );
}
