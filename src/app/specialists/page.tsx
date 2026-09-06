import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpecialistCardFrieze } from "@/components/SpecialistCardFrieze";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardSurfaceClass } from "@/components/ui/cardSurface";
import { Body, Display, Heading, Meta, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

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
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/images/icon-rub-03.svg"
              alt=""
              width={128}
              height={109}
              className="h-[56px] w-auto shrink-0 object-contain sm:h-[70px]"
            />
            <div>
              <Display className="max-w-[800px] text-balance">
                Специалисти и пространства
              </Display>
              <Body className="mt-4 max-w-[640px] sm:mt-5">
                Растежник не замества медицински съвет. Списъкът е ориентир —
                през сайтовете на асоциациите можете да проверите
                правоспособност и да намерите практики близо до вас.
              </Body>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative w-full pb-12 sm:pb-16 md:pb-24">
        <Container>
          <ul className="grid grid-cols-1 gap-card md:grid-cols-2">
            {associations.map((association) => (
              <li key={association.name}>
                <article
                  className={`group ${cardSurfaceClass} relative flex h-full flex-col bg-white transition-colors duration-200 ease-out`}
                >
                  <div className="px-cluster pt-cluster pb-stack">
                    <SpecialistCardFrieze />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-cluster px-cluster pb-cluster">
                    <div className="flex flex-col items-start gap-stack">
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
                      hoverGroup={false}
                      className="w-fit shrink-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Към сайта
                    </Button>
                  </div>
                </article>
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
