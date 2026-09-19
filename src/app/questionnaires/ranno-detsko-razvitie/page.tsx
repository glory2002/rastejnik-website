import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TokenIcon } from "@/components/icons/TokenIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import { cardGapClass, cardSurfaceClass } from "@/components/ui/cardSurface";
import { Action, Body, Display, Heading } from "@/components/ui/Typography";
import {
  questionnaireCategories,
  type QuestionnaireAccent,
} from "@/data/questionnaires";

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

const accentClasses: Record<QuestionnaireAccent, string> = {
  pink: "bg-accent-pink-light text-accent-pink",
  orange: "bg-accent-orange-light text-accent-orange",
  green: "bg-accent-green-light text-accent-green",
  blue: "bg-accent-blue-light text-accent-blue",
};

export const metadata: Metadata = {
  title: "Ранно детско развитие — Растежник",
  description: parentCategory.description,
};

export default function EarlyChildhoodCategoryPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <Action
            as={Link}
            href="/questionnaires"
            className="group mb-8 inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/arrow-link.svg"
              alt=""
              width={12}
              height={19}
              className="shrink-0 rotate-180"
            />
            Въпросници
          </Action>

          <div className="flex items-center justify-between gap-cluster">
            <div className="min-w-0 flex-1">
              <Display className="text-balance md:text-nowrap">
                {parentCategory.title}
              </Display>
              <SectionLead className="mt-4 max-w-hero-lead sm:mt-5">
                {parentCategory.description}
              </SectionLead>
            </div>
            <TokenIcon
              src={parentCategory.icon}
              accent={parentCategory.accent}
              className="size-mark shrink-0"
            />
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${cardGapClass}`}>
            {parentCategory.subcategories!.map((sub, index) => (
              <Reveal key={sub.slug} delay={index * 60}>
                <Link
                  href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}`}
                  className={`group ${cardSurfaceClass} flex h-full flex-col gap-cluster p-cluster transition-colors duration-200 ease-out hover:bg-white ${accentClasses[sub.accent]}`}
                >
                  <div className="flex flex-col gap-stack">
                    <Heading as="h2" size="sm" tone="inherit">
                      {sub.title}
                    </Heading>
                    <Body as="span" size="card">
                      {sub.description}
                    </Body>
                  </div>
                  <Button
                    className="mt-auto w-fit"
                    size="l"
                    interactive={false}
                  >
                    Към въпросника
                  </Button>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
