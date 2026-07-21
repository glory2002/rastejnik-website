"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const features = [
  {
    icon: "/images/icon-rub-01.svg",
    iconWidth: 145,
    iconHeight: 112,
    title: "Въпросници",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
  },
  {
    icon: "/images/icon-rub-02.svg",
    iconWidth: 128,
    iconHeight: 129,
    title: "Новини",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
  },
  {
    icon: "/images/icon-rub-04.svg",
    iconWidth: 165,
    iconHeight: 110,
    title: "Полезни съвети",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
  },
  {
    icon: "/images/icon-rub-03.svg",
    iconWidth: 128,
    iconHeight: 109,
    title: "Специалисти и пространства",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
  },
];

// Calm, system-level motion: one shared rhythm for every moving part.
const motion = "duration-200 ease-out motion-reduce:transition-none";

export function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="resources" className="w-full bg-cream py-20 md:py-32">
      <Container>
        <Reveal as="h2" className="mb-16 max-w-[1000px] text-left text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] text-primary">
          Нашите рубрики
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

            return (
              <div
                key={feature.title}
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
                    <h3 className="text-[26px] font-bold leading-[1.2] text-primary md:text-[28px]">
                      {feature.title}
                    </h3>
                    <p className="text-lg leading-[1.3] text-primary-dark">
                      {feature.description}
                    </p>
                  </div>

                  <a
                    href="#"
                    className={`mt-auto inline-flex w-fit items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity ${motion} hover:opacity-80`}
                  >
                    Прочети Съвети
                    <Image
                      src="/images/arrow-link.svg"
                      alt=""
                      width={14}
                      height={22}
                      className={`shrink-0 transition-transform ${motion} group-hover:translate-x-1`}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
