import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BabyCrawlIcon } from "@/components/icons/BabyCrawlIcon";
import { BabyRattleIcon } from "@/components/icons/BabyRattleIcon";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { defaultQuestions } from "@/data/questionBank";
import { getBabyIcons } from "@/lib/babyIcons";
import {
  questionnaireCategories,
  findInterval,
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

  const babyIcons = getBabyIcons();
  const icon = babyIcons.length > 0 ? babyIcons[index % babyIcons.length] : null;
  const isRattleBaby = icon === "/images/baby-1.svg";
  const isCrawlBaby = icon === "/images/baby-2.svg";

  const header = (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Breadcrumb: ancestors muted, current interval in active primary. */}
      <nav
        aria-label="Навигация във въпросника"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-bold uppercase"
      >
        <Link
          href="/questionnaires"
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
      </nav>

      <div className="flex items-center gap-3.5">
        {icon && (
          <div className="baby-animate-always relative flex h-[96px] w-[96px] shrink-0 items-center justify-center">
            {isRattleBaby ? (
              <BabyRattleIcon className="h-[96px] w-[96px]" />
            ) : isCrawlBaby ? (
              <BabyCrawlIcon className="h-[96px] w-[96px]" />
            ) : (
              <Image
                src={icon}
                alt=""
                width={96}
                height={96}
                className="h-[96px] w-[96px]"
              />
            )}
          </div>
        )}

        <h1 className="max-w-[700px] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.05] text-primary">
          {currentInterval.label}
        </h1>
      </div>
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
