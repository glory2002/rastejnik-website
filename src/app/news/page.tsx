import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { ListingHero } from "@/components/ListingHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  cardGapClass,
  cardGapFeaturedClass,
  cardGapHierarchyClass,
} from "@/components/ui/cardSurface";
import { Body } from "@/components/ui/Typography";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Новини — Растежник",
  description:
    "Новини от Растежник — обновления на платформата, нови материали и теми около ранното детско развитие.",
};

export default function NewsListingPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <ListingHero
            title="Новини"
            mark={
              <Image
                src="/images/icon-rub-02.svg"
                alt=""
                width={128}
                height={129}
                className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
              />
            }
          >
            <Body className="mt-4 max-w-hero-lead sm:mt-5">
              Какво е ново в Растежник — обновления, материали и теми около
              първите години с детето.
            </Body>
          </ListingHero>
        </Container>
      </section>

      <section id="news-listing" className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className={`flex flex-col ${cardGapHierarchyClass}`}>
            <ul className={`grid md:grid-cols-2 ${cardGapFeaturedClass}`}>
              {news.slice(0, 2).map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={index * 80}>
                    <NewsCard
                      href={`/news/${item.slug}`}
                      date={item.date}
                      title={item.title}
                      excerpt={item.excerpt}
                      index={index}
                      featured
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
            <ul className={`grid md:grid-cols-2 lg:grid-cols-3 ${cardGapClass}`}>
              {news.slice(2).map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={Math.min(index * 70, 210)}>
                    <NewsCard
                      href={`/news/${item.slug}`}
                      date={item.date}
                      title={item.title}
                      excerpt={item.excerpt}
                      index={index + 2}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
