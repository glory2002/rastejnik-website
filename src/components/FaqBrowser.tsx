"use client";

import { useMemo, useState } from "react";
import { FaqList } from "./FaqList";
import { Button } from "@/components/ui/Button";
import { Body, Label } from "@/components/ui/Typography";
import { faqQuestions } from "@/data/faq";

const PAGE_SIZE = 12;

const searchInputClassName =
  "w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors placeholder:text-primary-dark/40 focus:border-primary";

/** Full question browser on /faq — search + load-more, no category filters. */
export function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("bg");
    if (!q) return faqQuestions;
    return faqQuestions.filter(
      (item) =>
        item.question.toLocaleLowerCase("bg").includes(q) ||
        item.answer.toLocaleLowerCase("bg").includes(q),
    );
  }, [query]);

  const visibleQuestions = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleQueryChange(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <label className="flex w-full flex-col gap-2">
        <Label>Търсене</Label>
        <input
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Търси въпрос…"
          className={searchInputClassName}
        />
      </label>

      {filtered.length === 0 ? (
        <Body>
          Няма въпроси за „{query.trim()}“. Опитайте с друга дума.
        </Body>
      ) : (
        <>
          <FaqList
            key={query.trim() || "all"}
            items={visibleQuestions}
            highlightQuery={query.trim()}
          />

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-label font-medium text-primary-dark/60">
              Показани {visibleQuestions.length} от {filtered.length}
            </p>
            {hasMore ? (
              <Button
                size="l"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Покажи още
              </Button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
