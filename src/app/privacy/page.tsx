import type { Metadata } from "next";
import Link from "next/link";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { Body, Display, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Поверителност — Растежник",
  description:
    "Информация как Растежник обработва лични данни и как защитаваме вашата поверителност.",
};

export default function PrivacyPage() {
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
            <span className="text-primary">Поверителност</span>
          </nav>

          <Display className="max-w-[800px]">Поверителност</Display>
          <Body className="mt-5 max-w-[620px] sm:mt-6">
            Тук ще опишем какви данни събираме, защо и как ги пазим. Текстът е
            чернова — ще се допълни с финална политика преди публичен старт.
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
              <Heading as="h2">Какви данни обработваме</Heading>
              <p>
                При регистрация и ползване на въпросниците може да обработваме
                данни за контакт и информация, която въвеждате за детето — само
                доколкото е нужна за услугата.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Heading as="h2">За какво ги ползваме</Heading>
              <p>
                За да ви покажем резултати, да запазим прогреса ви и да
                подобрим съдържанието на платформата. Не продаваме лични данни.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Heading as="h2">Вашите права</Heading>
              <p>
                Можете да поискате достъп, поправка или изтриване на данни.
                Пишете ни през{" "}
                <ContactTrigger className="font-bold text-primary transition-opacity hover:opacity-80">
                  контактите
                </ContactTrigger>
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
