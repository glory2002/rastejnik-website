import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { Container } from "@/components/ui/Container";
import { Body, Display } from "@/components/ui/Typography";
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
          <nav
            aria-label="Пътека"
            className="mb-5 flex flex-wrap items-center gap-2 text-label font-medium text-primary-dark/60 sm:mb-6"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Новини</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/images/icon-rub-02.svg"
              alt=""
              width={128}
              height={129}
              className="h-[56px] w-auto shrink-0 object-contain sm:h-[70px]"
            />
            <div>
              <Display className="max-w-[800px]">Новини</Display>
              <Body className="mt-4 max-w-[620px]">
                Какво е ново в Растежник — обновления, материали и теми около
                първите години с детето.
              </Body>
            </div>
          </div>
        </Container>
      </section>

      <section id="news-listing" className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {news.map((item, index) => (
              <li key={item.slug}>
                <NewsCard
                  href={`/news/${item.slug}`}
                  date={item.date}
                  title={item.title}
                  excerpt={item.excerpt}
                  index={index}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
