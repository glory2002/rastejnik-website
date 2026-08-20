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

      <section className="relative w-full overflow-hidden bg-cream py-16 md:py-24">
        {/* Quiet brand motif — sits in the wide-side margin, never over the text column. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8%] top-[12%] hidden w-[min(42vw,420px)] select-none opacity-[0.13] lg:block xl:-right-[4%] xl:w-[min(38vw,480px)]"
        >
          <Image
            src="/images/embroidery-3.svg"
            alt=""
            width={709}
            height={726}
            className="h-auto w-full"
            priority={false}
          />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto w-full max-w-[720px]">
            <Display>Всички въпроси</Display>
            <Body className="mt-6 max-w-[560px]">
              Пълният списък с кратки, валидирани отговори на най-честите
              въпроси на родители — потърсете дума или разгледайте надолу.
            </Body>

            <div className="mt-14">
              <FaqBrowser />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
