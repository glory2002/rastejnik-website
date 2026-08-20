"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Action, Body, Display, Heading } from "@/components/ui/Typography";

const features = [
  {
    icon: "/images/icon-rub-01.svg",
    iconWidth: 145,
    iconHeight: 112,
    title: "Въпросници",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
    href: "/questionnaires",
  },
  {
    icon: "/images/icon-rub-02.svg",
    iconWidth: 128,
    iconHeight: 129,
    title: "Новини",
    description:
      "Обновления на платформата, нови материали и теми около ранното детско развитие — накратко и ясно.",
    href: "/news",
  },
  {
    icon: "/images/icon-rub-04.svg",
    iconWidth: 165,
    iconHeight: 110,
    title: "Полезна информация",
    description:
      "Кратки, практични идеи за сън, хранене, игра и връзка — на прост език за родителския ден.",
    href: "/tips",
  },
  {
    icon: "/images/icon-rub-03.svg",
    iconWidth: 128,
    iconHeight: 109,
    title: "Специалисти и пространства",
    description:
      "Препоръки към асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие.",
    href: "/specialists",
  },
];

// Calm, system-level motion: one shared rhythm for every moving part.
const motion = "duration-200 ease-out motion-reduce:transition-none";

export function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="resources" className="w-full bg-cream py-20 md:py-32">
      <Container>
        <Reveal className="mb-16 max-w-[1000px] text-left">
          <Display weight="medium" as="h2">
            Нашите рубрики
          </Display>
        </Reveal>

        {/*
          One system, four entry points: no borders between columns, just a
          shared surface. Hovering a column redistributes space across the
          whole row (28% / 24% / 24% / 24%) so the layout reads as one
          interface quietly reorganizing itself.
        */}
        {/*
          Fixed height at the row level: hovering redistributes column
          widths, which reflows text into more or fewer lines. Locking the
          row's height keeps that reflow contained instead of making the
          whole section grow/shrink while interacting.
        */}
        <Reveal
          delay={150}
          className="flex flex-col overflow-hidden bg-transparent xl:h-[450px] xl:flex-row"
        >
          {features.map((feature, index) => {
            const isHovered = hovered === index;
            const basis = hovered === null ? 25 : isHovered ? 28 : 24;
            const ctaLabel =
              feature.href === "/specialists"
                ? "Виж асоциации"
                : feature.href === "/tips"
                  ? "Прочети"
                  : feature.href === "/news"
                    ? "Към новините"
                    : feature.href === "/questionnaires"
                      ? "Към въпросниците"
                      : "Прочети";

            return (
              <Link
                key={feature.title}
                href={feature.href}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                style={{ ["--col-basis" as string]: `${basis}%` }}
                className={`group relative flex min-w-0 flex-col gap-8 overflow-hidden p-8 transition-[flex-basis,background-color] md:p-10 xl:grow-0 xl:shrink-0 xl:basis-[var(--col-basis)] ${motion} ${
                  isHovered ? "bg-[#fefefc]" : "bg-transparent"
                }`}
              >
                <div className="relative z-10 flex h-[70px] w-[70px] shrink-0 items-center justify-center">
                  <div
                    className={`origin-center scale-[1.014] transition-transform ${motion} group-hover:scale-[1.38]`}
                  >
                    <Image
                      src={feature.icon}
                      alt=""
                      width={feature.iconWidth}
                      height={feature.iconHeight}
                      className="h-[70px] w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="relative z-10 flex flex-1 flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Heading size="lg">{feature.title}</Heading>
                    <Body>{feature.description}</Body>
                  </div>

                  <Action
                    className={`mt-auto inline-flex w-fit items-center gap-1.5 transition-opacity ${motion} group-hover:opacity-80`}
                  >
                    {ctaLabel}
                    <Image
                      src="/images/arrow-link.svg"
                      alt=""
                      width={14}
                      height={22}
                      className={`shrink-0 transition-transform ${motion} group-hover:translate-x-1`}
                    />
                  </Action>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
