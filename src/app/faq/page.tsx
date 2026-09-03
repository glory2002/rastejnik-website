import type { Metadata } from "next";
import Image from "next/image";
import { FaqBrowser } from "@/components/FaqBrowser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { Body, Display } from "@/components/ui/Typography";

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
          <div className="mx-auto w-full max-w-[720px]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Image
                src="/images/pattern-contact-2.svg"
                alt=""
                width={147}
                height={148}
                className="h-[56px] w-[56px] shrink-0 object-contain sm:h-[70px] sm:w-[70px]"
              />
              <div>
                <Display>Всички въпроси</Display>
                <Body className="mt-4 max-w-[560px] sm:mt-5">
                  Пълният списък с кратки, валидирани отговори на най-честите
                  въпроси на родители — потърсете дума или разгледайте надолу.
                </Body>
              </div>
            </div>

            <div className="mt-10 sm:mt-14">
              <FaqBrowser />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
