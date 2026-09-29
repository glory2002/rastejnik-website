"use client";

import { useState } from "react";
import { ResultsTable, ageAccentTabActive } from "@/components/DashboardView";
import type { DashboardTable } from "@/data/dashboardMock";
import type { QuestionnaireAccent } from "@/data/questionnaires";

const ageTabs: {
  slug: string;
  shortTitle: string;
  accent: QuestionnaireAccent;
}[] = [
  { slug: "0-1-godina", shortTitle: "0–1 г.", accent: "pink" },
  { slug: "1-2-godini", shortTitle: "1–2 г.", accent: "orange" },
  { slug: "2-3-godini", shortTitle: "2–3 г.", accent: "green" },
  { slug: "3-4-godini", shortTitle: "3–4 г.", accent: "blue" },
];

/** Dashboard age tabs above the sample results table. */
export function DashboardTableDemo({ table }: { table: DashboardTable }) {
  const [activeSlug, setActiveSlug] = useState(ageTabs[0].slug);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {ageTabs.map((band) => {
          const isActive = band.slug === activeSlug;
          return (
            <button
              key={band.slug}
              type="button"
              onClick={() => setActiveSlug(band.slug)}
              className={`border-[1.5px] px-4 py-2 text-[14px] font-bold transition-colors ${
                isActive
                  ? ageAccentTabActive[band.accent]
                  : "border-border-green bg-white text-primary-dark hover:border-primary hover:text-primary"
              }`}
            >
              {band.shortTitle}
            </button>
          );
        })}
      </div>
      <ResultsTable table={table} resetKey={`design-system-${activeSlug}`} />
    </div>
  );
}
