import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShevitsaMark } from "@/components/icons/ShevitsaMark";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Action, Body, Display, Heading, Meta, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравни грижи.",
};

export default function SpecialistsPage() {
  return (
    <main className="relative bg-cream">
      <Header variant="framed" />

      <section className="relative z-10 w-full py-12 sm:py-16 md:py-24">
        <Container>
          <div className="flex items-center justify-between gap-cluster">
            <div className="min-w-0 flex-1">
              <Display className="text-balance md:text-nowrap">
                Специалисти и пространства
              </Display>
              <Body className="mt-4 max-w-hero-lead sm:mt-5">
                Растежник не замества медицински съвет. Списъкът е ориентир —
                през сайтовете на асоциациите можете да проверите
                правоспособност и да намерите практики близо до вас.
              </Body>
            </div>
            <Image
              src="/images/icon-rub-03.svg"
              alt=""
              width={128}
              height={109}
              className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
            />
          </div>
        </Container>
      </section>

      <section className="relative w-full pb-12 sm:pb-16 md:pb-24">
        <Container>
          <ul className="border-t border-border-green">
            {associations.map((association, index) => (
              <li key={association.name} className="border-b border-border-green">
                <a
                  href={association.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`directory-row group ${cardSurfaceClass} flex items-center gap-stack px-card-inset py-cluster outline-none sm:gap-8`}
                >
                  <ShevitsaMark index={index} className="relative shrink-0" />
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
                    <span className="flex shrink-0 items-center gap-1.5">
                      <Action className="transition-opacity group-hover:opacity-80">
                        Към сайта
                      </Action>
                      <Image
                        src="/images/arrow-link.svg"
                        alt=""
                        width={14}
                        height={22}
                        className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
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
