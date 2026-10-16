import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MonthBaby } from "@/components/icons/MonthBaby";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  cardGapClass,
  cardGapCompactClass,
  cardSurfaceClass,
} from "@/components/ui/cardSurface";
import { LinkButton } from "@/components/ui/Button";
import { Display, Heading, Lead } from "@/components/ui/Typography";
import { getMonthIcons } from "@/lib/babyIcons";
import {
  questionnaireCategories,
  findAgeSubcategory,
  monthIconOffset,
  type QuestionnaireAccent,
} from "@/data/questionnaires";

const heroBackground: Record<QuestionnaireAccent, string> = {
  pink: "bg-accent-pink-light",
  orange: "bg-accent-orange-light",
  green: "bg-accent-green-light",
  blue: "bg-accent-blue-light",
};

const heroTitle: Record<QuestionnaireAccent, string> = {
  pink: "text-accent-pink",
  orange: "text-accent-orange",
  green: "text-accent-green",
  blue: "text-accent-blue",
};

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

export function generateStaticParams() {
  return parentCategory.subcategories!.map((sub) => ({ age: sub.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ age: string }>;
}): Promise<Metadata> {
  const { age } = await params;
  const sub = findAgeSubcategory(age);

  return {
    title: sub ? `${sub.title} — Ранно детско развитие — Растежник` : "Растежник",
    description: sub?.description,
  };
}

export default async function AgeQuestionnairePage({
  params,
}: {
  params: Promise<{ age: string }>;
}) {
  const { age } = await params;
  const sub = findAgeSubcategory(age);

  if (!sub) notFound();

  const monthIcons = getMonthIcons();
  const iconOffset = monthIconOffset(sub.slug);

  return (
    <main>
      <Header variant="framed" surface={heroBackground[sub.accent]} />

      <section className={`w-full py-16 md:py-24 ${heroBackground[sub.accent]}`}>
        <Container>
          <LinkButton
            href="/questionnaires/ranno-detsko-razvitie"
            icon="back"
            className="mb-8"
          >
            Ранно детско развитие
          </LinkButton>

          <Reveal className={heroTitle[sub.accent]}>
            <Display tone="inherit" className="max-w-[700px]">
              {sub.title}
            </Display>
          </Reveal>
          <Reveal delay={140}>
            <Lead className="mt-6 max-w-[560px]">
              {sub.description} Изберете конкретен етап по-долу, за да
              започнете съответния въпросник.
            </Lead>
          </Reveal>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div
            className={`grid ${
              sub.slug === "1-2-godini"
                ? `grid-cols-2 lg:grid-cols-4 ${cardGapClass}`
                : sub.slug === "2-3-godini" || sub.slug === "3-4-godini"
                  ? `sm:grid-cols-2 ${cardGapClass}`
                  : `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${cardGapCompactClass}`
            }`}
          >
            {sub.intervals.map((interval, index) => {
              const icon = monthIcons[iconOffset + index];

              return (
                <Reveal
                  key={interval.label}
                  delay={Math.min(index * 50, 200)}
                  className="h-full"
                >
                <Link
                  href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}/${interval.slug}`}
                  className={`group ${cardSurfaceClass} relative flex h-full flex-col items-center justify-center gap-4 bg-cream p-6 text-center transition-colors duration-200 ease-out hover:bg-white ${
                    sub.slug === "1-2-godini" ||
                    sub.slug === "2-3-godini" ||
                    sub.slug === "3-4-godini"
                      ? "min-h-56"
                      : "aspect-square"
                  }`}
                >
                  {icon && (
                    <div className="relative flex h-[112px] w-full shrink-0 items-center justify-center">
                      <MonthBaby src={icon} className="block h-full w-full" />
                    </div>
                  )}
                  <Heading as="span" size="sm">
                    {interval.label}
                  </Heading>
                  <LinkButton
                    interactive={false}
                    hoverGroup={false}
                  >
                    Започни
                  </LinkButton>
                </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
