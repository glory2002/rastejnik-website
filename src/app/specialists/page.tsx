import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
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
 * Fixed side embroidery — desktop only. Opaque white association panels
 * scroll over it and fully cover the motif on that side.
 * Same full-color motif on both sides (green, blue, red, pink, gold),
 * fully in frame — not flipped.
 */
function SideShevitsa({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed z-0 hidden w-[min(38vw,440px)] overflow-visible select-none lg:block",
        isLeft
          ? "left-10 top-[62%] xl:left-14"
          : "right-10 top-[70%] xl:right-14",
      ].join(" ")}
      style={{ transform: "translateY(-50%)" }}
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
  );
}

function AssociationPanel({
  onLeft,
  fullWidth = false,
  children,
}: {
  onLeft: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "flex min-h-[28rem] flex-col justify-center bg-white py-16 sm:min-h-[32rem] sm:py-20 md:min-h-[36rem] md:py-28 lg:min-h-[40rem] lg:py-32",
        fullWidth ? "w-full" : "w-full md:w-1/2 lg:w-[55%]",
        onLeft
          ? "pl-8 pr-8 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16 lg:pl-24 lg:pr-12 xl:pl-32"
          : "pl-8 pr-8 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16 lg:pl-12 lg:pr-24 xl:pr-32",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function AssociationCta({
  href,
  arrow,
}: {
  href: string;
  /** Arrow points toward page center on tablet/desktop zigzag. */
  arrow: "left" | "right";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex max-w-full"
    >
      {arrow === "left" ? (
        <span className="relative inline-flex h-[52px] max-w-full items-center justify-center gap-2 overflow-hidden rounded-[50px] border-[1.5px] border-transparent bg-secondary px-5 py-3 text-[13px] font-bold uppercase text-primary-dark transition-colors duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-secondary group-hover:text-primary sm:h-[56px] sm:px-6 sm:py-3.5 sm:text-[14px]">
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

function AssociationBlock({
  name,
  description,
  href,
  onLeft,
}: {
  name: string;
  description: string;
  href: string;
  onLeft: boolean;
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[1800px] flex-col gap-5 sm:gap-7 ${
        onLeft
          ? "items-start text-left"
          : "items-start text-left md:items-end md:text-right"
      }`}
    >
      <Heading as="h3" size="lg" className="max-w-[420px] text-balance">
        {name}
      </Heading>
      <Body className="max-w-[420px] text-base leading-[1.35]">
        {description}
      </Body>
      <AssociationCta href={href} arrow={onLeft ? "right" : "left"} />
    </div>
  );
}

export default function SpecialistsPage() {
  return (
    <main className="relative overflow-x-hidden bg-white">
      <Header variant="framed" />

      <SideShevitsa side="left" />
      <SideShevitsa side="right" />

      <section className="relative z-10 w-full bg-cream py-12 sm:py-16 md:py-24">
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

      {/*
        Mobile: stacked full-width white cards, left-aligned.
        Tablet+: zigzag halves; last row full-width white to seal shevitsas.
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
                  <AssociationPanel onLeft={onLeft} fullWidth>
                    <AssociationBlock
                      name={association.name}
                      description={association.description}
                      href={association.href}
                      onLeft={onLeft}
                    />
                  </AssociationPanel>
                ) : onLeft ? (
                  <>
                    <AssociationPanel onLeft>
                      <AssociationBlock
                        name={association.name}
                        description={association.description}
                        href={association.href}
                        onLeft
                      />
                    </AssociationPanel>
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
                    <AssociationPanel onLeft={false}>
                      <AssociationBlock
                        name={association.name}
                        description={association.description}
                        href={association.href}
                        onLeft={false}
                      />
                    </AssociationPanel>
                  </>
                )}
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="relative z-10 w-full bg-cream py-12 sm:py-16 md:py-24">
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

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
