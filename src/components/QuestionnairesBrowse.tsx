"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import { Body, Display, Heading } from "@/components/ui/Typography";
import type {
  QuestionnaireAccent,
  QuestionnaireCategory,
} from "@/data/questionnaires";

const LG_VISIBLE = 3;

const accentClasses: Record<QuestionnaireAccent, string> = {
  pink: "bg-accent-pink-light text-accent-pink",
  orange: "bg-accent-orange-light text-accent-orange",
  green: "bg-accent-green-light text-accent-green",
  blue: "bg-accent-blue-light text-accent-blue",
};

function useVisibleCount() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      if (mqLg.matches) setVisible(LG_VISIBLE);
      else if (mqSm.matches) setVisible(2);
      else setVisible(1);
    };

    sync();
    mqSm.addEventListener("change", sync);
    mqLg.addEventListener("change", sync);
    return () => {
      mqSm.removeEventListener("change", sync);
      mqLg.removeEventListener("change", sync);
    };
  }, []);

  return visible;
}

function categoryHref(category: QuestionnaireCategory) {
  if (category.subcategories?.length) {
    return `#${category.slug}`;
  }
  return `/questionnaires/${category.slug}`;
}

function CategoryIcon({
  category,
  hoverScale = false,
}: {
  category: QuestionnaireCategory;
  hoverScale?: boolean;
}) {
  return (
    <div className="relative flex h-[70px] w-[110px] shrink-0 items-center justify-start">
      <Image
        src={category.icon}
        alt=""
        width={110}
        height={70}
        className={`h-[70px] w-auto max-h-[70px] object-contain object-left origin-center ${
          hoverScale
            ? "transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:scale-[1.3]"
            : ""
        } ${category.iconClass ?? ""}`}
      />
    </div>
  );
}

export function QuestionnairesBrowse({
  categories,
}: {
  categories: QuestionnaireCategory[];
}) {
  const visible = useVisibleCount();
  const isCarousel = categories.length > LG_VISIBLE;
  const maxIndex = Math.max(0, categories.length - visible);
  const [index, setIndex] = useState(0);

  const expandedCategories = categories.filter(
    (category) => category.subcategories && category.subcategories.length > 0,
  );

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const canPrev = isCarousel && index > 0;
  const canNext = isCarousel && index < maxIndex;

  const trackWidthPct = isCarousel
    ? (categories.length / visible) * 100
    : 100;
  const slideWidthPct = isCarousel
    ? 100 / categories.length
    : 100 / Math.min(categories.length, visible);
  const translatePct = isCarousel ? index * (100 / categories.length) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="flex flex-col justify-start">
          <Display>Въпросници</Display>
          <SectionLead className="mt-5 sm:mt-6">
            Кратки, валидирани въпросници, които ви помагат да разберете
            по-добре себе си като родител и развитието на детето — изберете
            категория по-долу.
          </SectionLead>

          {isCarousel ? (
            <div className="mt-8 flex items-center gap-3 sm:mt-10">
              <button
                type="button"
                aria-label="Предишни въпросници"
                disabled={!canPrev}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Image
                  src="/images/arrow-hero.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rotate-180"
                />
              </button>
              <button
                type="button"
                aria-label="Следващи въпросници"
                disabled={!canNext}
                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                className="transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Image
                  src="/images/arrow-hero.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
              </button>
            </div>
          ) : null}
        </div>

        <div className="min-w-0 lg:col-span-3">
          <div className="overflow-hidden">
            <div
              className={`flex ${
                isCarousel
                  ? "transition-transform duration-300 ease-out motion-reduce:transition-none"
                  : "flex-col sm:flex-row"
              }`}
              style={
                isCarousel
                  ? {
                      width: `${trackWidthPct}%`,
                      transform: `translate3d(-${translatePct}%, 0, 0)`,
                    }
                  : undefined
              }
            >
              {categories.map((category, cardIndex) => (
                <Reveal
                  key={category.slug}
                  delay={cardIndex * 60}
                  className={`group flex flex-col gap-5 bg-transparent px-0 py-6 transition-colors duration-200 ease-out hover:bg-[#fefefc] sm:gap-6 sm:p-8 md:p-10 ${
                    isCarousel ? "shrink-0" : "sm:flex-1"
                  }`}
                  style={
                    isCarousel ? { width: `${slideWidthPct}%` } : undefined
                  }
                >
                  <CategoryIcon category={category} hoverScale />

                  <div className="flex flex-col gap-3">
                    <Heading as="h2" size="lg">
                      {category.title}
                    </Heading>
                    <Body className="max-w-[560px]">
                      {category.description}
                    </Body>
                  </div>

                  <Button
                    href={categoryHref(category)}
                    className="mt-auto w-fit"
                    size="l"
                    hoverGroup={false}
                  >
                    Към въпросника
                  </Button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {expandedCategories.map((category) => (
        <Reveal
          key={`${category.slug}-expanded`}
          id={category.slug}
          className="scroll-mt-8 flex flex-col gap-5 bg-transparent px-0 py-6 sm:gap-6 sm:py-8 md:py-10"
        >
          <CategoryIcon category={category} />

          <div className="flex flex-col gap-3">
            <Heading as="h2" size="lg">
              {category.title}
            </Heading>
            <Body className="max-w-[560px]">{category.description}</Body>
          </div>

          <div className="mt-2 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {category.subcategories!.map((sub) => (
              <Link
                key={sub.slug}
                href={`/questionnaires/${category.slug}/${sub.slug}`}
                className={`group flex flex-col gap-4 p-5 transition-colors duration-200 ease-out hover:bg-[#fefefc] sm:gap-5 sm:p-8 ${accentClasses[sub.accent]}`}
              >
                <div className="flex flex-col gap-2">
                  <Heading as="h3" size="sm" tone="inherit">
                    {sub.title}
                  </Heading>
                  <Body as="span">{sub.description}</Body>
                </div>
                <Button
                  className="mt-auto w-fit"
                  size="l"
                  interactive={false}
                >
                  Към въпросника
                </Button>
              </Link>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
