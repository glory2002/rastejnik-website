"use client";

import type { FaqFilter } from "@/data/faq";

const motion = "duration-200 ease-out motion-reduce:transition-none";

interface FaqFiltersProps {
  filters: FaqFilter[];
  activeFilter: string | null;
  onSelect: (category: string | null) => void;
}

export function FaqFilters({ filters, activeFilter, onSelect }: FaqFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.category;
        return (
          <button
            key={filter.label}
            type="button"
            onClick={() => onSelect(filter.category)}
            className={`w-fit text-left text-sm font-bold uppercase tracking-wider transition-colors ${motion} ${
              isActive
                ? "text-primary-dark"
                : "text-primary-dark/40 hover:text-primary-dark/70"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
