import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipCard } from "@/components/TipCard";
import { Container } from "@/components/ui/Container";
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
          <nav
            aria-label="Пътека"
            className="mb-5 flex flex-wrap items-center gap-2 text-label font-medium text-primary-dark/60 sm:mb-6"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Полезна информация</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/images/icon-rub-04.svg"
              alt=""
              width={165}
              height={110}
              className="h-[56px] w-auto shrink-0 object-contain sm:h-[70px]"
            />
            <div>
              <Display className="max-w-[800px]">Полезна информация</Display>
              <Body className="mt-4 max-w-[620px]">
                Кратки, практични идеи за сън, хранене, игра и връзка —
                написани за родителския ден, не за идеален свят.
              </Body>
            </div>
          </div>
        </Container>
      </section>

      <section id="tips-listing" className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {tips.map((tip, index) => (
              <li key={tip.slug}>
                <TipCard
                  href={`/tips/${tip.slug}`}
                  title={tip.title}
                  excerpt={tip.excerpt}
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
