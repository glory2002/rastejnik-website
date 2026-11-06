import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TokenIcon } from "@/components/icons/TokenIcon";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  cardGapCompactClass,
  cardSurfaceClass,
} from "@/components/ui/cardSurface";
import { Display, Heading, Lead } from "@/components/ui/Typography";
import { competenceAgeBands } from "@/data/parentalCompetence";
import { questionnaireCategories } from "@/data/questionnaires";

const category = questionnaireCategories.find(
  (item) => item.slug === "roditelska-kompetentnost",
)!;

export const metadata: Metadata = {
  title: "Родителска компетентност — Растежник",
  description: category.description,
};

export default function ParentalCompetencePage() {
  return (
    <main>
      <Header variant="framed" surface="bg-accent-orange-light" />

      <section className="w-full bg-accent-orange-light py-16 md:py-24">
        <Container>
          <LinkButton href="/questionnaires" icon="back" className="mb-8">
            Въпросници
          </LinkButton>

          <Reveal className="text-accent-orange">
            <Display tone="inherit" className="max-w-[700px]">
              {category.title}
            </Display>
          </Reveal>
          <Reveal delay={140}>
            <Lead className="mt-6 max-w-[560px]">
              {category.description} Изберете възраст по-долу, за да започнете
              съответния въпросник.
            </Lead>
          </Reveal>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div
            className={`@container grid sm:grid-cols-2 ${cardGapCompactClass}`}
          >
            {competenceAgeBands.map((band, index) => (
              <Reveal key={band.slug} delay={index * 80} className="h-full">
                <Link
                  href={`/questionnaires/roditelska-kompetentnost/${band.slug}`}
                  className={`group ${cardSurfaceClass} relative flex h-full flex-col items-center justify-center gap-4 bg-cream p-6 text-center transition-colors duration-200 ease-out hover:bg-white aspect-square md:aspect-auto md:h-[calc((100cqw-2*var(--spacing-card-compact))/3)] lg:h-[calc((100cqw-3*var(--spacing-card-compact))/4)]`}
                >
                  <div className="relative flex h-[112px] w-full shrink-0 items-center justify-center">
                    <TokenIcon
                      src={category.icon}
                      accent={band.accent}
                      position="center"
                      className="h-[96px] w-[96px]"
                    />
                  </div>
                  <Heading as="span" size="sm">
                    {band.title}
                  </Heading>
                  <LinkButton interactive={false} hoverGroup={false}>
                    Започни
                  </LinkButton>
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
