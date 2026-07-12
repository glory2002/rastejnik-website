import fs from "fs";
import path from "path";
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
import { SectionLead } from "@/components/ui/SectionLead";
import {
  questionnaireCategories,
  findAgeSubcategory,
} from "@/data/questionnaires";

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

/**
 * Baby illustrations are added one at a time (baby-1.svg, baby-2.svg, ...).
 * Reading the actual files lets each new one automatically join the
 * rotation for every age card instead of needing a code change per icon.
 */
function getBabyIcons(): string[] {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /^baby-\d+\.svg$/.test(file))
    .sort(
      (a, b) =>
        Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]),
    );
  return files.length > 0 ? files.map((file) => `/images/${file}`) : [];
}

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
          <Link
            href="/questionnaires"
            className="group mb-8 inline-flex items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/arrow-link.svg"
              alt=""
              width={12}
              height={19}
              className="shrink-0 rotate-180"
            />
            Ранно детско развитие
          </Link>

          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            {sub.title}
          </h1>
          <SectionLead className="mt-6 max-w-[560px]">
            {sub.description} Изберете конкретен етап по-долу, за да
            започнете съответния въпросник.
          </SectionLead>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <Reveal className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {sub.intervals.map((interval, index) => {
              const icon = babyIcons[index % babyIcons.length];
              const isRattleBaby = icon === "/images/baby-1.svg";
              const isCrawlBaby = icon === "/images/baby-2.svg";

              return (
                <Link
                  key={interval.label}
                  href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}/${interval.slug}`}
                  className="group relative flex aspect-square flex-col gap-4 bg-cream p-6 transition-colors duration-200 ease-out hover:bg-[#f3ecdf]"
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
                  <span className="text-lg font-bold leading-[1.2] text-primary">
                    {interval.label}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold uppercase text-primary-dark transition-transform duration-200 ease-out group-hover:translate-x-1">
                    Започни
                    <Image
                      src="/images/arrow-link.svg"
                      alt=""
                      width={10}
                      height={16}
                      className="shrink-0"
                    />
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
