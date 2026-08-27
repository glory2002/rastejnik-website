import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { Body, Display, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Бисквитки — Растежник",
  description:
    "Информация за бисквитките, които Растежник използва, и как можете да ги управлявате.",
};

export default function CookiesPage() {
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
            <span className="text-primary">Бисквитки</span>
          </nav>

          <Display className="max-w-[800px]">Бисквитки</Display>
          <Body className="mt-5 max-w-[620px] sm:mt-6">
            Кратка информация кои бисквитки ползваме и защо. Финалният текст и
            банерът за съгласие ще се добавят преди публичен старт.
          </Body>
        </Container>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <Body
            as="div"
            size="relaxed"
            className="mx-auto flex max-w-[720px] flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <Heading as="h2">Необходими бисквитки</Heading>
              <p>
                Ползваме ги за основна работа на сайта — например сесия и
                запазване на предпочитания. Без тях някои функции може да не
                работят коректно.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Heading as="h2">Аналитични бисквитки</Heading>
              <p>
                Ако ги включим, ще ни помагат да разберем как се ползва
                платформата — в обобщен вид, без да продаваме данни на трети
                страни за реклама.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Heading as="h2">Управление</Heading>
              <p>
                Можете да ограничите бисквитките от настройките на браузъра.
                Повече за личните данни има в{" "}
                <Link
                  href="/privacy"
                  className="font-bold text-primary transition-opacity hover:opacity-80"
                >
                  политиката за поверителност
                </Link>
                .
              </p>
            </div>
          </Body>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
