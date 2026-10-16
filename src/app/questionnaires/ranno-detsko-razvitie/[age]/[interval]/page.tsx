import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MonthBaby } from "@/components/icons/MonthBaby";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Reveal } from "@/components/ui/Reveal";
import { Meta, Title } from "@/components/ui/Typography";
import { defaultQuestions } from "@/data/questionBank";
import { getMonthIcons } from "@/lib/babyIcons";
import {
  questionnaireCategories,
  findInterval,
  monthIconOffset,
} from "@/data/questionnaires";

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

export function generateStaticParams() {
  return parentCategory.subcategories!.flatMap((sub) =>
    sub.intervals.map((interval) => ({
      age: sub.slug,
      interval: interval.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ age: string; interval: string }>;
}): Promise<Metadata> {
  const { age, interval } = await params;
  const found = findInterval(age, interval);

  return {
    title: found
      ? `${found.sub.title} · ${found.interval.label} — Растежник`
      : "Растежник",
  };
}

export default async function IntervalQuestionnairePage({
  params,
}: {
  params: Promise<{ age: string; interval: string }>;
}) {
  const { age, interval } = await params;
  const found = findInterval(age, interval);

  if (!found) notFound();

  const { sub, interval: currentInterval, index } = found;

  const monthIcons = getMonthIcons();
  const icon = monthIcons[monthIconOffset(sub.slug) + index] ?? null;

  const header = (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Breadcrumb: ancestors muted, current interval in active primary. */}
      <Reveal>
      <Meta
        as="nav"
        aria-label="Навигация във въпросника"
        tone="inherit"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
      >
        <Link
          href="/questionnaires/ranno-detsko-razvitie"
          className="text-primary/40 transition-colors hover:text-primary/70"
        >
          {parentCategory.title}
        </Link>
        <span aria-hidden className="text-primary/25">
          /
        </span>
        <Link
          href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}`}
          className="text-primary/40 transition-colors hover:text-primary/70"
        >
          {sub.title}
        </Link>
        <span aria-hidden className="text-primary/25">
          /
        </span>
        <span className="text-primary" aria-current="page">
          {currentInterval.label}
        </span>
      </Meta>
      </Reveal>

      <Reveal delay={120} className="flex items-center gap-3.5">
        {icon && (
          <div className="relative flex h-[96px] w-[120px] shrink-0 items-center justify-center">
            <MonthBaby src={icon} className="block h-full w-full" />
          </div>
        )}

        <Title as="h1" className="max-w-[700px]">
          {currentInterval.label}
        </Title>
      </Reveal>
    </div>
  );

  return (
    <main>
      <Header variant="framed" />

      <QuestionnaireFlow
        questions={defaultQuestions}
        backHref="/dashboard"
        backLabel="Към таблото"
        header={header}
      />

      <Footer />
    </main>
  );
}
