import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipCard } from "@/components/TipCard";
import { ListingHero } from "@/components/ListingHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardGapClass } from "@/components/ui/cardSurface";
import { Body } from "@/components/ui/Typography";
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
          <ListingHero
            title="Полезна информация"
            mark={
              <Image
                src="/images/icon-rub-04.svg"
                alt=""
                width={165}
                height={110}
                className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
              />
            }
          >
            <Body className="mt-4 max-w-hero-lead sm:mt-5">
              Кратки, практични идеи за сън, хранене, игра и връзка —
              написани за родителския ден, не за идеален свят.
            </Body>
          </ListingHero>
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
                  <Reveal delay={Math.min(index * 70, 210)}>
                    <TipCard
                      href={`/tips/${tip.slug}`}
                      title={tip.title}
                      excerpt={tip.excerpt}
                      index={index}
                    />
                  </Reveal>
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
