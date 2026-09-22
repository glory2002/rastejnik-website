import type { Metadata } from "next";
import Image from "next/image";
import { FaqBrowser } from "@/components/FaqBrowser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListingHero } from "@/components/ListingHero";
import { Container } from "@/components/ui/Container";
import { Body } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Всички въпроси — Растежник",
  description:
    "Пълен списък с валидирани отговори на най-честите въпроси на родители за развитието на детето.",
};

export default function FaqPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <ListingHero
            title="Всички въпроси"
            mark={
              <Image
                src="/images/question.svg"
                alt=""
                width={63}
                height={88}
                className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
              />
            }
          >
            <Body className="mt-4 max-w-hero-lead sm:mt-5">
              Пълният списък с кратки, валидирани отговори на най-честите
              въпроси на родители — потърсете дума или разгледайте надолу.
            </Body>
          </ListingHero>

          <div className="mx-auto mt-10 w-full max-w-[720px] sm:mt-14">
            <FaqBrowser />
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
