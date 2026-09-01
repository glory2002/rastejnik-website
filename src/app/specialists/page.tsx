import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Body, Display, Heading, Meta, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

function CardFrieze() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-8 bottom-5 h-5 sm:inset-x-10 sm:bottom-6 sm:h-6 md:inset-x-14 lg:inset-x-16"
      style={{
        backgroundImage: "url('/images/specialist-frieze.svg')",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "left center",
        backgroundSize: "auto 100%",
      }}
    />
  );
}

function SideShevitsa({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed z-0 hidden h-[56vh] w-[min(85vw,980px)] overflow-hidden opacity-[0.22] select-none md:block",
        isLeft ? "-left-[8%] bottom-[-10%]" : "-right-[22%] bottom-[-6%]",
      ].join(" ")}
    >
      <Image
        src="/images/embroidery-3.svg"
        alt=""
        width={709}
        height={726}
        className="h-full w-auto max-w-none object-cover object-bottom"
        priority={false}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравни грижи.",
};

export default function SpecialistsPage() {
  return (
    <main className="relative bg-cream">
      <Header variant="framed" />

      <SideShevitsa side="left" />
      <SideShevitsa side="right" />

      <section className="relative z-10 w-full py-12 sm:py-16 md:py-24">
        <Container>
          <Reveal>
            <Display className="max-w-[800px] text-balance">
              Специалисти и пространства
            </Display>
            <Body className="mt-5 max-w-[640px] sm:mt-6">
              Растежник не замества медицински съвет. Списъкът е ориентир —
              асоциациите са мястото, откъдето можете да проверите
              правоспособност, да намерите регионални контакти и да стигнете до
              практики, свързани с ранно детско развитие и здравни грижи.
              Отворете картата на организацията — на сайта ѝ обикновено има
              регистър, регионални колегии или контакти към практики близо до
              вас.
            </Body>
          </Reveal>
        </Container>
      </section>

      <section className="relative w-full">
        <ul className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          {associations.map((association, index) => (
            <li
              key={association.name}
              className="sticky top-6 sm:top-8 md:top-10"
              style={{ zIndex: index + 1 }}
            >
              <Container>
                <article className="relative bg-white">
                  <div className="flex min-h-[18rem] flex-col justify-center gap-10 px-8 py-12 sm:min-h-[20rem] sm:px-10 md:min-h-[22rem] md:flex-row md:items-center md:justify-between md:gap-16 md:px-14 md:py-16 lg:px-16">
                    <div className="flex max-w-[36rem] flex-col items-start gap-5 sm:gap-7">
                      <Meta>{association.category}</Meta>
                      <Heading as="h3" size="lg" className="text-balance">
                        {association.name}
                      </Heading>
                      <Body className="text-base leading-[1.35]">
                        {association.description}
                      </Body>
                    </div>
                    <Button
                      href={association.href}
                      size="l"
                      className="shrink-0 self-start md:self-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Към сайта
                    </Button>
                  </div>
                  <CardFrieze />
                </article>
              </Container>
            </li>
          ))}
        </ul>
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
