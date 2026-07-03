"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

const motion = "duration-200 ease-out motion-reduce:transition-none";

/** Shared brand mark used as the accordion state indicator — green & tilted
 *  when collapsed, upright & amber when the answer is revealed. */
function FaqToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 51.4928 38.8664"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`mt-1 h-[18px] w-[25px] shrink-0 transition-[transform,color] ${motion} md:h-[22px] md:w-[29px] ${
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

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
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
              <h3 className="flex-1 text-[22px] font-bold leading-[1.2] text-primary">
                {item.question}
              </h3>
            </button>

            <div
              className={`grid transition-[grid-template-rows] ${motion} ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex gap-3 px-4 pb-5 md:gap-3.5 md:pb-6">
                  <div className="w-[25px] shrink-0 md:w-[29px]" aria-hidden />
                  <p className="flex-1 text-lg leading-[1.3] text-primary-dark">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
