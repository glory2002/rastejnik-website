"use client";

import { Fragment, useState, type ReactNode } from "react";
import type { FaqItem } from "@/data/faq";
import { Body, Heading } from "@/components/ui/Typography";

const motion = "duration-200 ease-out motion-reduce:transition-none";

/** Shared brand mark used as the accordion state indicator — green & tilted
 *  when collapsed, upright & amber when the answer is revealed. */
export function FaqToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 51.4928 38.8664"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`mt-1 h-4 w-[22px] shrink-0 transition-[transform,color] ${motion} md:h-5 md:w-[26px] ${
        isOpen ? "-rotate-90 text-secondary" : "-rotate-45 text-primary"
      }`}
    >
      <path
        d="M51.4928 12.9555L38.5586 0L25.8684 12.9555L12.9342 0L0 12.9555L25.8684 38.8664L51.4928 12.9555Z"
        fill="currentColor"
      />
    </svg>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Soft highlight of search matches — pale primary wash, keeps type intact. */
function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const pattern = new RegExp(`(${escapeRegExp(q)})`, "gi");
  const parts = text.split(pattern);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    const isMatch = part.toLocaleLowerCase("bg") === q.toLocaleLowerCase("bg");
    if (!isMatch) return <Fragment key={index}>{part}</Fragment>;
    return (
      <span
        key={index}
        className="relative mx-[0.06em] inline-block px-[0.18em] align-baseline text-inherit"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[0.2em] bottom-[-0.04em] bg-primary/22"
        />
        <span className="relative z-[1]">{part}</span>
      </span>
    );
  });
}

interface FaqListProps {
  items: FaqItem[];
  /** When set, matching substrings in question/answer are highlighted. */
  highlightQuery?: string;
}

export function FaqList({ items, highlightQuery = "" }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={`${item.question}-${index}`}
            className={`transition-colors ${motion} hover:bg-[#fefefc] ${
              isOpen ? "bg-[#fefefc]" : "bg-transparent"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-3 px-4 py-5 text-left md:gap-3.5 md:py-6"
            >
              <FaqToggleIcon isOpen={isOpen} />
              <Heading className="flex-1">
                <HighlightedText text={item.question} query={highlightQuery} />
              </Heading>
            </button>

            <div
              className={`grid transition-[grid-template-rows] ${motion} ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex gap-3 px-4 pb-5 md:gap-3.5 md:pb-6">
                  <div className="w-[22px] shrink-0 md:w-[26px]" aria-hidden />
                  <Body className="flex-1">
                    <HighlightedText text={item.answer} query={highlightQuery} />
                  </Body>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
