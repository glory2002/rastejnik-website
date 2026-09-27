import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Display, Lead } from "@/components/ui/Typography";

export function ListingHero({
  mark,
  title,
  children,
  className = "",
}: {
  mark?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-cluster${className ? ` ${className}` : ""}`}>
      {mark ? <Reveal>{mark}</Reveal> : null}
      <div className="min-w-0">
        <Reveal delay={mark ? 100 : 0}>
          <Display className="text-balance md:text-nowrap">{title}</Display>
        </Reveal>
        <Reveal delay={mark ? 220 : 140}>
          {typeof children === "string" ? (
            <Lead className="mt-4 max-w-hero-lead sm:mt-5">{children}</Lead>
          ) : (
            children
          )}
        </Reveal>
      </div>
    </div>
  );
}
