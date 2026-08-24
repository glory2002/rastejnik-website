import type { Metadata } from "next";
import Image from "next/image";
import { ContactTrigger } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Body, Display, Heading, Title } from "@/components/ui/Typography";
import { associations } from "@/data/specialists";

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравни грижи.",
};

/**
 * Fixed side embroidery — stays in the viewport. Opaque white association
 * panels scroll over it and fully cover the motif on that side.
 */
function SideShevitsa({
  side,
  src,
}: {
  side: "left" | "right";
  src: string;
}) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed top-[72%] z-0 hidden w-[min(52vw,560px)] -translate-y-1/2 select-none lg:block",
        side === "left"
          ? "left-0 -translate-x-[32%]"
          : "right-0 translate-x-[32%]",
      ].join(" ")}
    >
      <Image
        src={src}
        alt=""
        width={709}
        height={726}
        className={`h-auto w-full ${side === "left" ? "-scale-x-100" : ""}`}
        priority={false}
      />
    </div>
  );
}

function AssociationCta({
  href,
  arrow,
}: {
  href: string;
  /** Arrow points toward page center. */
  arrow: "left" | "right";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex"
    >
      {arrow === "left" ? (
        <span className="relative inline-flex h-[56px] items-center justify-center gap-2 overflow-hidden rounded-[50px] border-[1.5px] border-transparent bg-secondary px-6 py-3.5 text-[14px] font-bold uppercase text-primary-dark transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-secondary group-hover:text-primary">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[50px] bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none [clip-path:circle(0px_at_38px_50%)] group-hover:[clip-path:circle(150%_at_38px_50%)]"
          />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-x-0.5 motion-reduce:transition-none">
            <Image
              src="/images/arrow-hero.svg"
              alt=""
              width={28}
              height={28}
              className="rotate-180"
            />
          </span>
          <span className="relative z-20">Към сайта</span>
        </span>
      ) : (
        <Button interactive={false} hoverGroup={false} size="l">
          Към сайта
        </Button>
      )}
    </a>
  );
}

export default function SpecialistsPage() {
  return (
    <main className="relative bg-white">
      <Header variant="framed" />

      <SideShevitsa side="left" src="/images/embroidery-3.svg" />
      <SideShevitsa side="right" src="/images/embroidery-3.svg" />

      <section className="relative z-10 w-full bg-[color-mix(in_srgb,var(--color-secondary)_9%,white)] py-16 md:py-24">
        <Container>
          <Reveal>
            <Display className="max-w-[800px]">
              Специалисти и пространства
            </Display>
            <Body className="mt-6 max-w-[640px]">
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

      {/*
        Checkerboard zigzag: white half covers the shevitsa on that side;
        the open half leaves the fixed motif visible. Items slide in from
        their side on scroll.
      */}
      <section className="relative z-10 w-full bg-transparent">
        <ul className="flex flex-col">
          {associations.map((association, index) => {
            const onLeft = index % 2 === 0;
            const isLast = index === associations.length - 1;

            return (
              <Reveal
                key={association.name}
                as="li"
                from={onLeft ? "left" : "right"}
                delay={Math.min(index * 50, 200)}
                className="relative z-10 flex w-full"
              >
                {isLast ? (
                  <div className="flex w-full flex-col justify-center bg-white px-2.5 py-12 md:px-4 md:py-16 lg:px-8 lg:py-20">
                    <div
                      className={`mx-auto flex w-full max-w-[1800px] flex-col gap-5 ${
                        onLeft ? "items-start" : "items-end text-right"
                      }`}
                    >
                      <Heading as="h3" size="lg" className="max-w-[420px]">
                        {association.name}
                      </Heading>
                      <Body className="max-w-[420px] text-base leading-[1.35]">
                        {association.description}
                      </Body>
                      <AssociationCta
                        href={association.href}
                        arrow={onLeft ? "right" : "left"}
                      />
                    </div>
                  </div>
                ) : onLeft ? (
                  <>
                    <div className="flex w-full flex-col justify-center bg-white px-2.5 py-12 md:w-1/2 md:px-4 md:py-16 lg:w-[55%] lg:px-8 lg:py-20">
                      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-start gap-5">
                        <Heading as="h3" size="lg" className="max-w-[420px]">
                          {association.name}
                        </Heading>
                        <Body className="max-w-[420px] text-base leading-[1.35]">
                          {association.description}
                        </Body>
                        <AssociationCta
                          href={association.href}
                          arrow="right"
                        />
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="hidden bg-transparent md:block md:w-1/2 lg:w-[45%]"
                    />
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="hidden bg-transparent md:block md:w-1/2 lg:w-[45%]"
                    />
                    <div className="flex w-full flex-col justify-center bg-white px-2.5 py-12 md:w-1/2 md:px-4 md:py-16 lg:w-[55%] lg:px-8 lg:py-20">
                      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-end gap-5 text-right">
                        <Heading as="h3" size="lg" className="max-w-[420px]">
                          {association.name}
                        </Heading>
                        <Body className="max-w-[420px] text-base leading-[1.35]">
                          {association.description}
                        </Body>
                        <AssociationCta
                          href={association.href}
                          arrow="left"
                        />
                      </div>
                    </div>
                  </>
                )}
              </Reveal>
            );
          })}
        </ul>
      </section>
      <section className="relative z-10 w-full bg-[color-mix(in_srgb,var(--color-secondary)_9%,white)] py-16 md:py-24">
        <Container>
          <Reveal>
            <Title className="max-w-[700px]">Как да ползвате тази страница</Title>
            <Body as="div" className="mt-6 flex max-w-[640px] flex-col gap-4">
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

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
