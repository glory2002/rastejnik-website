import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { Action, Body, Display, Heading, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравните грижи.",
};

export default function SpecialistsPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <Display className="max-w-[800px]">
            Специалисти и пространства
          </Display>
          <Body className="mt-6 max-w-[640px]">
            Растежник не замества медицински съвет. Списъкът е ориентир —
            асоциациите са мястото, откъдето можете да проверите
            правоспособност, да намерите регионални контакти и да стигнете до
            практики, свързани с ранно детско развитие и здравни грижи.
          </Body>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <Title className="max-w-[700px]">Препоръчани асоциации</Title>
          <Body className="mt-4 max-w-[620px]">
            Отворете картата на организацията — на сайта ѝ обикновено има
            регистър, регионални колегии или контакти към практики близо до
            вас.
          </Body>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {associations.map((association) => (
              <li key={association.name} className="min-h-0">
                <a
                  href={association.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-5 bg-white p-6 transition-colors hover:bg-cream md:p-7"
                >
                  <div
                    className={`flex h-[96px] items-center justify-center px-4 ${
                      association.logoTone === "dark"
                        ? "bg-primary-dark"
                        : "bg-white"
                    }`}
                  >
                    <Image
                      src={association.logo}
                      alt=""
                      width={180}
                      height={80}
                      className="max-h-[72px] w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    <Heading size="sm">{association.name}</Heading>
                    <p className="text-base leading-[1.35] text-primary-dark">
                      {association.description}
                    </p>
                  </div>

                  <Action className="mt-auto inline-flex w-fit items-center gap-1.5 transition-opacity group-hover:opacity-80">
                    Към сайта
                    <Image
                      src="/images/arrow-link.svg"
                      alt=""
                      width={14}
                      height={22}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </Action>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <Title className="max-w-[700px]">Как да ползвате тази страница</Title>
          <Body
            as="div"
            className="mt-6 flex max-w-[640px] flex-col gap-4"
          >
            <p>
              Скоро ще добавим още организации. Ако познавате подходяща
              асоциация или пространство,{" "}
              <ContactTrigger className="font-bold text-primary underline underline-offset-2 transition-opacity hover:opacity-80">
                пишете ни
              </ContactTrigger>
              .
            </p>
          </Body>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
