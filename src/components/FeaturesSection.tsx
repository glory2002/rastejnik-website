import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { cardGapClass, cardSurfaceClass } from "@/components/ui/cardSurface";
import { LinkButton } from "@/components/ui/Button";
import { Body, Heading, Title } from "@/components/ui/Typography";

const features = [
  {
    icon: "/images/icon-rub-01.svg",
    iconWidth: 145,
    iconHeight: 112,
    title: "Въпросници",
    description:
      "Кратки валидирани оценки на развитието - какво работи в реалния живот: ритуали, граници, разговори, ежедневни.",
    href: "/questionnaires",
    cta: "Към въпросниците",
  },
  {
    icon: "/images/icon-rub-02.svg",
    iconWidth: 128,
    iconHeight: 129,
    title: "Новини",
    description:
      "Обновления на платформата, нови материали и теми около ранното детско развитие — накратко и ясно.",
    href: "/news",
    cta: "Към новините",
  },
  {
    icon: "/images/icon-rub-04.svg",
    iconWidth: 165,
    iconHeight: 110,
    title: "Полезна информация",
    description:
      "Кратки, практични идеи за сън, хранене, игра и връзка — на прост език за родителския ден.",
    href: "/tips",
    cta: "Прочети",
  },
  {
    icon: "/images/icon-rub-03.svg",
    iconWidth: 128,
    iconHeight: 109,
    title: "Специалисти и пространства",
    description:
      "Препоръки към асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие.",
    href: "/specialists",
    cta: "Виж асоциации",
  },
] as const;

const motion =
  "duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none";

export function FeaturesSection() {
  return (
    <section id="resources" className="w-full bg-cream py-section">
      <Container>
        <Reveal className="mb-block max-w-[1000px] text-left">
          <Title>Нашите рубрики</Title>
        </Reveal>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ${cardGapClass}`}
        >
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 90}>
              <Link
              href={feature.href}
              className={`group ${cardSurfaceClass} relative flex h-full flex-col gap-cluster bg-cream p-cluster outline-none transition-colors ${motion} hover:bg-white focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary`}
            >
              <div className="relative flex aspect-mark size-mark shrink-0 items-center justify-center overflow-visible">
                <div
                  className={`origin-center scale-mark transition-transform ${motion} group-hover:scale-mark-hover group-focus-visible:scale-mark-hover`}
                >
                  <Image
                    src={feature.icon}
                    alt=""
                    width={feature.iconWidth}
                    height={feature.iconHeight}
                    className="size-mark object-contain object-center"
                  />
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex flex-col gap-stack">
                  <Heading size="lg" className="text-balance">
                    {feature.title}
                  </Heading>
                  <Body
                    size="card"
                    tone="primary"
                    className={`feature-copy transition-colors ${motion}`}
                  >
                    {feature.description}
                  </Body>
                </div>

                <LinkButton
                  interactive={false}
                  hoverGroup={false}
                  className="mt-auto w-fit pt-cluster"
                >
                  {feature.cta}
                </LinkButton>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
