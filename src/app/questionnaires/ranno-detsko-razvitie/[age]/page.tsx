import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BabyCrawlIcon } from "@/components/icons/BabyCrawlIcon";
import { BabyRattleIcon } from "@/components/icons/BabyRattleIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardGapCompactClass, cardSurfaceClass } from "@/components/ui/cardSurface";
import { LinkButton } from "@/components/ui/Button";
import { Display, Heading, Lead } from "@/components/ui/Typography";
import { getBabyIcons } from "@/lib/babyIcons";
import {
  questionnaireCategories,
  findAgeSubcategory,
} from "@/data/questionnaires";

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

  const babyIcons = getBabyIcons();

  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <LinkButton
            href="/questionnaires/ranno-detsko-razvitie"
            icon="back"
            className="mb-8"
          >
            Ранно детско развитие
          </LinkButton>

          <Reveal>
            <Display className="max-w-[700px]">{sub.title}</Display>
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
          <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${cardGapCompactClass}`}>
            {sub.intervals.map((interval, index) => {
              const icon = babyIcons[index % babyIcons.length];
              const isRattleBaby = icon === "/images/baby-1.svg";
              const isCrawlBaby = icon === "/images/baby-2.svg";

              return (
                <Reveal key={interval.label} delay={Math.min(index * 50, 200)}>
                <Link
                  href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}/${interval.slug}`}
                  className={`group ${cardSurfaceClass} relative flex aspect-square flex-col items-center gap-4 bg-cream p-6 text-center transition-colors duration-200 ease-out hover:bg-white`}
                >
                  {babyIcons.length > 0 && (
                    <div className="relative flex h-[112px] w-[112px] shrink-0 items-center justify-center">
                      {isRattleBaby ? (
                        <BabyRattleIcon className="h-[112px] w-[112px]" />
                      ) : isCrawlBaby ? (
                        <BabyCrawlIcon className="h-[112px] w-[112px]" />
                      ) : (
                        <Image
                          src={icon}
                          alt=""
                          width={112}
                          height={112}
                          className="h-[112px] w-[112px]"
                        />
                      )}
                    </div>
                  )}
                  <Heading as="span" size="sm">
                    {interval.label}
                  </Heading>
                  <LinkButton
                    interactive={false}
                    hoverGroup={false}
                    className="mt-auto"
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
