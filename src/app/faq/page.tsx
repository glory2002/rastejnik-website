import type { Metadata } from "next";
import { FaqBrowser } from "@/components/FaqBrowser";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Header";
import { FullWidth, Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Всички въпроси — Растежник",
  description:
    "Пълен списък с валидирани отговори на най-честите въпроси на родители за развитието на детето.",
};

export default function FaqPage() {
  return (
    <main className="bg-cream">
      <FullWidth
        as="header"
        className="flex items-center justify-between border-b border-border-green py-6"
      >
        <Link href="/" aria-label="Растежник начало">
          <Logo variant="footer" tone="dark" />
        </Link>
        <Link
          href="/#questionnaires"
          className="text-sm font-bold uppercase tracking-wider text-primary transition-opacity hover:opacity-70"
        >
          ← Начало
        </Link>
      </FullWidth>

      <section className="w-full py-16 md:py-24">
        <Container>
          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            Всички въпроси
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.3] text-primary-dark">
            Пълният списък с кратки, валидирани отговори на най-честите
            въпроси на родители — филтрирай по тема или разгледай всичко.
          </p>

          <div className="mt-14">
            <FaqBrowser />
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
