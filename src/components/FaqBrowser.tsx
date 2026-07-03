"use client";

import { useState } from "react";
import { FaqFilters } from "./FaqFilters";
import { FaqList } from "./FaqList";
import { faqQuestions, faqFilters } from "@/data/faq";

/** Full, unpaginated question browser used on the dedicated /faq page —
 *  same filters and accordion as the homepage teaser, minus the preview cap. */
export function FaqBrowser() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visibleQuestions = activeFilter
    ? faqQuestions.filter((item) => item.category === activeFilter)
    : faqQuestions;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,320px)_1fr] xl:gap-14">
      <div className="lg:sticky lg:top-10 lg:self-start">
        <FaqFilters
          filters={faqFilters}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />
      </div>

      <FaqList key={activeFilter ?? "all"} items={visibleQuestions} />
    </div>
  );
}
