import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipCard } from "@/components/TipCard";
import { Container } from "@/components/ui/Container";
import { cardGapClass } from "@/components/ui/cardSurface";
import { Body, Display } from "@/components/ui/Typography";
import { tips } from "@/data/tips";

export const metadata: Metadata = {
  title: "Полезна информация — Растежник",
  description:
    "Кратки, практични идеи за ежедневието с малко дете — на прост език, без паника и без сравнения.",
};

export default function TipsListingPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <div className="flex items-center justify-between gap-cluster">
            <div className="min-w-0 flex-1">
              <Display className="text-balance md:text-nowrap">
                Полезна информация
              </Display>
              <Body className="mt-4 max-w-hero-lead sm:mt-5">
                Кратки, практични идеи за сън, хранене, игра и връзка —
                написани за родителския ден, не за идеален свят.
              </Body>
            </div>
            <Image
              src="/images/icon-rub-04.svg"
              alt=""
              width={165}
              height={110}
              className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
            />
          </div>
        </Container>
      </section>

      <section id="tips-listing" className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 ${cardGapClass}`}>
            {tips.map((tip, index) => {
              const isCategoryAnchor =
                tips.findIndex((item) => item.categorySlug === tip.categorySlug) ===
                index;

              return (
                <li
                  key={tip.slug}
                  id={isCategoryAnchor ? tip.categorySlug : undefined}
                  className={isCategoryAnchor ? "scroll-mt-24" : undefined}
                >
                  <TipCard
                    href={`/tips/${tip.slug}`}
                    title={tip.title}
                    excerpt={tip.excerpt}
                    index={index}
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
