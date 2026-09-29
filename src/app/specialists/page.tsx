import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShevitsaMark } from "@/components/icons/ShevitsaMark";
import { ListingHero } from "@/components/ListingHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { LinkButton } from "@/components/ui/Button";
import { Body, Heading, Lead, Meta, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравни грижи.",
};

const listingRailClass =
  "flex w-[length:var(--listing-rail)] shrink-0 items-center justify-center";

export default function SpecialistsPage() {
  return (
    <main className="relative bg-cream [--listing-rail:4.75rem] sm:[--listing-rail:calc(var(--size-mark)*127.56/109.44)]">
      <Header variant="framed" />

      <section className="relative z-10 w-full py-12 sm:py-16 md:py-24">
        <Container>
          <ListingHero
            className="sm:px-directory-inset"
            title="Специалисти и пространства"
            mark={
              <span className={listingRailClass}>
                <Image
                  src="/images/icon-rub-03.svg"
                  alt=""
                  width={128}
                  height={109}
                  className="h-auto w-[length:var(--listing-rail)] shrink-0 object-contain"
                />
              </span>
            }
          >
            <Lead className="mt-4 max-w-hero-lead sm:mt-5">
              Растежник не замества медицински съвет. Списъкът е ориентир —
              през сайтовете на асоциациите можете да проверите
              правоспособност и да намерите практики близо до вас.
            </Lead>
          </ListingHero>
        </Container>
      </section>

      <section className="relative w-full pb-12 sm:pb-16 md:pb-24">
        <Container>
          <ul className="directory-fan border-t border-border-green">
            {associations.map((association, index) => (
              <li
                key={association.name}
                className="border-b border-border-green"
                style={{ "--directory-fan-index": index } as CSSProperties}
              >
                <Reveal delay={Math.min(index * 60, 180)}>
                <a
                  href={association.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`directory-row group ${cardSurfaceClass} flex items-center gap-cluster py-cluster outline-none sm:px-directory-inset`}
                >
                  <span className={listingRailClass}>
                    <ShevitsaMark index={index} className="relative shrink-0" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-stack sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <Meta>{association.category}</Meta>
                      <Heading as="h2" size="lg" className="mt-stack text-balance">
                        {association.name}
                      </Heading>
                      <Body size="card" className="mt-stack max-w-[640px]">
                        {association.description}
                      </Body>
                    </div>
                    <LinkButton interactive={false} hoverGroup={false} className="shrink-0">
                      Към сайта
                    </LinkButton>
                  </div>
                </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="relative z-20 w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <Reveal>
            <Title className="max-w-[700px] text-balance">
              Как да ползвате тази страница
            </Title>
            <Body as="div" className="mt-5 flex max-w-[640px] flex-col gap-4 sm:mt-6">
              <p>
                Скоро ще добавим още организации. Ако познавате подходяща
                асоциация или пространство,{" "}
                <ContactTrigger className="font-bold text-primary underline underline-offset-2 transition-opacity hover:opacity-80">
                  пишете ни
                </ContactTrigger>
                .
              </p>
            </Body>
          </Reveal>
        </Container>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}
