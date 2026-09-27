import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { NewsCard, newsCardWashes } from "@/components/NewsCard";
import { TipCard, tipIconHovers } from "@/components/TipCard";
import { BoyAvatar, GirlAvatar } from "@/components/icons/ChildAvatarIcons";
import { InfoMark } from "@/components/icons/InfoMark";
import { ListShevitsa } from "@/components/icons/ListShevitsa";
import { PdfPlaceholder } from "@/components/icons/PdfPlaceholder";
import { ShevitsaMark, shevitsaTones } from "@/components/icons/ShevitsaMark";
import { TokenIcon } from "@/components/icons/TokenIcon";
import { partners } from "@/components/PartnersSection";
import { FormDemo } from "./FormDemo";
import { Button, CarouselArrow, LinkButton } from "@/components/ui/Button";
import {
  cardGapClass,
  cardGapCompactClass,
  cardGapFeaturedClass,
  cardSurfaceClass,
} from "@/components/ui/cardSurface";
import { ResultsTable } from "@/components/DashboardView";
import type { DashboardTable } from "@/data/dashboardMock";
import { news } from "@/data/news";
import { questionnaireCategories } from "@/data/questionnaires";
import { resources } from "@/data/resources";
import { associations } from "@/data/specialists";
import { tips } from "@/data/tips";
import {
  Action,
  Body,
  Display,
  DisplayHero,
  Heading,
  Label,
  Lead,
  Meta,
  NavText,
  Title,
} from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Дизайн система — Растежник",
  robots: { index: false, follow: false },
};

const toc = [
  { href: "#cvetove", label: "Цветове" },
  { href: "#tipografia", label: "Типография" },
  { href: "#butoni", label: "Бутони" },
  { href: "#formi", label: "Форми" },
  { href: "#karti", label: "Карти" },
  { href: "#ritam", label: "Ритъм" },
  { href: "#ikoni", label: "Икони" },
  { href: "#bebeta", label: "Бебета" },
  { href: "#ornamenti", label: "Орнаменти" },
] as const;

const dashboardTableDemo: DashboardTable = {
  columns: ["Месец 1", "Месец 2", "Месец 3", "Месец 4"],
  domains: [
    "Език и говор",
    "Познавателно развитие",
    "Физическо развитие",
    "Социално и емоционално развитие",
  ],
  rows: {
    "Език и говор": [
      { kind: "done", values: [20] },
      { kind: "done", values: [50] },
      { kind: "done", values: [80] },
      { kind: "na" },
    ],
    "Познавателно развитие": [
      { kind: "done", values: [33] },
      { kind: "done", values: [66] },
      { kind: "done", values: [90] },
      { kind: "upcoming" },
    ],
    "Физическо развитие": [
      { kind: "done", values: [12] },
      { kind: "done", values: [45] },
      { kind: "done", values: [74] },
      { kind: "na" },
    ],
    "Социално и емоционално развитие": [
      { kind: "done", values: [28] },
      { kind: "done", values: [60] },
      { kind: "done", values: [95] },
      { kind: "upcoming" },
    ],
  },
};

const questionnaireDemo = questionnaireCategories[0];
const ageDemo = questionnaireCategories.find((item) => item.subcategories)
  ?.subcategories?.[0];
const resourceDemo = resources.find((item) => item.kind === "book");
const associationDemo = associations[0];

const accentCardClass = {
  pink: "bg-accent-pink-light text-accent-pink",
  orange: "bg-accent-orange-light text-accent-orange",
  green: "bg-accent-green-light text-accent-green",
  blue: "bg-accent-blue-light text-accent-blue",
} as const;

const iconGroups = [
  {
    name: "pink",
    icons: [
      { src: "/images/icon-rub-01.svg" },
      { src: "/images/resursi.svg" },
      { src: "/images/parent-specialist.svg", accent: "pink" },
    ],
  },
  {
    name: "orange",
    icons: [
      { src: "/images/icon-rub-03.svg" },
      { src: "/images/Za-nas.svg" },
      { src: "/images/parent.svg", accent: "orange" },
    ],
  },
  {
    name: "green",
    icons: [
      { src: "/images/icon-rub-02.svg" },
      { src: "/images/early-child.svg", accent: "green" },
      { src: "/images/arrow-hero.svg", scale: "scale-[1.7]" },
      { src: "/images/plus-icon.svg", scale: "scale-[2]" },
      { src: "/images/profile.svg" },
    ],
  },
  {
    name: "blue",
    icons: [
      { src: "/images/icon-rub-04.svg" },
      { src: "/images/question.svg" },
      { src: "/images/parent-2.svg", accent: "blue" },
    ],
  },
] as const;

const utilityIcons = ["/images/calendar.svg", "/images/pdf-icon.svg"] as const;

const colorRows = [
  {
    name: "primary",
    colors: [
      { name: "primary", token: "--color-primary", hex: "#6D954B", swatch: "bg-primary" },
      { name: "primary-dark", token: "--color-primary-dark", hex: "#385D30", swatch: "bg-primary-dark" },
      { name: "primary-light", token: "--color-primary-light", hex: "8% primary", swatch: "bg-primary-light ring-1 ring-border-green" },
      { name: "primary-light-solid", token: "--color-primary-light-solid", hex: "#F3F6F0", swatch: "bg-primary-light-solid ring-1 ring-border-green" },
    ],
  },
  {
    name: "secondary",
    colors: [
      { name: "secondary", token: "--color-secondary", hex: "#E9B063", swatch: "bg-secondary" },
      { name: "cream", token: "--color-cream", hex: "9% secondary", swatch: "bg-cream ring-1 ring-border-green" },
      { name: "cream-solid", token: "--color-cream-solid", hex: "#F3DFC5", swatch: "bg-cream-solid ring-1 ring-border-green" },
    ],
  },
  {
    name: "accent",
    colors: [
      { name: "accent-pink", token: "--color-accent-pink", hex: "#F27A97", swatch: "bg-accent-pink" },
      { name: "accent-green", token: "--color-accent-green", hex: "#6D954B", swatch: "bg-accent-green" },
      { name: "accent-blue", token: "--color-accent-blue", hex: "#476ABF", swatch: "bg-accent-blue" },
      { name: "status-red", token: "--color-status-red", hex: "#C1443E", swatch: "bg-status-red" },
    ],
  },
  {
    name: "wash",
    colors: [
      { name: "status-red-light", token: "--color-status-red-light", hex: "12% status-red", swatch: "bg-status-red-light ring-1 ring-border-green" },
      { name: "accent-orange-light", token: "--color-accent-orange-light", hex: "14% secondary", swatch: "bg-accent-orange-light ring-1 ring-border-green" },
      { name: "accent-green-light", token: "--color-accent-green-light", hex: "10% primary", swatch: "bg-accent-green-light ring-1 ring-border-green" },
      { name: "accent-pink-light", token: "--color-accent-pink-light", hex: "10% accent-pink", swatch: "bg-accent-pink-light ring-1 ring-border-green" },
      { name: "accent-blue-light", token: "--color-accent-blue-light", hex: "10% accent-blue", swatch: "bg-accent-blue-light ring-1 ring-border-green" },
      { name: "border-green", token: "--color-border-green", hex: "20% primary", swatch: "bg-border-green ring-1 ring-border-green" },
      { name: "footer-text", token: "--color-footer-text", hex: "#E6EBE6", swatch: "bg-footer-text ring-1 ring-border-green" },
    ],
  },
] as const;

const spacings = [
  { name: "section", token: "--spacing-section", className: "h-section bg-primary/25" },
  { name: "section-emphasis", token: "--spacing-section-emphasis", className: "h-section-emphasis bg-primary/25" },
  { name: "section-quiet", token: "--spacing-section-quiet", className: "h-section-quiet bg-primary/25" },
  { name: "block", token: "--spacing-block", className: "h-block bg-primary/35" },
  { name: "cluster", token: "--spacing-cluster", className: "h-cluster bg-primary/35" },
  { name: "stack", token: "--spacing-stack", className: "h-stack bg-primary/45" },
  { name: "card", token: "--spacing-card", className: "h-card bg-secondary/70" },
  { name: "card-row", token: "--spacing-card-row", className: "h-card-row bg-secondary/70" },
  { name: "card-featured", token: "--spacing-card-featured", className: "h-card-featured bg-secondary/70" },
  { name: "card-hierarchy", token: "--spacing-card-hierarchy", className: "h-card-hierarchy bg-secondary/70" },
  { name: "card-compact", token: "--spacing-card-compact", className: "h-card-compact bg-secondary/70" },
  { name: "card-inset", token: "--spacing-card-inset", className: "h-card-inset bg-secondary/70" },
  { name: "card-inset-featured", token: "--spacing-card-inset-featured", className: "h-card-inset-featured bg-secondary/70" },
  { name: "directory-inset", token: "--spacing-directory-inset", className: "h-directory-inset bg-secondary/50" },
  { name: "hero-inset", token: "--spacing-hero-inset", className: "h-hero-inset bg-primary/25" },
  { name: "hero-block", token: "--spacing-hero-block", className: "h-hero-block bg-primary/25" },
  { name: "hero-block-md", token: "--spacing-hero-block-md", className: "h-hero-block-md bg-primary/25" },
  { name: "hero-block-lg", token: "--spacing-hero-block-lg", className: "h-hero-block-lg bg-primary/25" },
] as const;

function Section({
  id,
  kicker,
  title,
  lead,
  tone = "white",
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  tone?: "white" | "cream";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 py-section-quiet ${tone === "cream" ? "bg-cream" : "bg-white"}`}
    >
      <Meta className="mb-3">{kicker}</Meta>
      <Title>{title}</Title>
      <Lead className="mt-4 max-w-hero-lead">{lead}</Lead>
      <div className="mt-block">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main>
      <Header variant="framed" />

      <div className="mx-auto w-full max-w-[1800px] px-2.5 md:flex md:items-start md:gap-10 md:px-4 lg:gap-16 lg:px-8">
        <aside className="shrink-0 border-b border-border-green py-8 md:sticky md:top-28 md:w-48 md:self-start md:border-b-0 md:py-section-quiet lg:w-56">
          <Heading as="p" size="lg">
            Дизайн система
          </Heading>
          <nav aria-label="Раздели на дизайн системата" className="mt-6">
            <ul className="flex flex-col gap-2">
              {toc.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-base font-bold text-primary-dark/70 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
      <Section
        id="cvetove"
        kicker="01 Цветове"
        title="Цветове"
        lead="Семантичните токени от @theme. Ползвайте класовете, не еднократни hex стойности."
      >
        <div className={`flex flex-col ${cardGapClass}`}>
          {colorRows.map((row) => (
            <div key={row.name}>
              <Label as="p" className="mb-3">
                {row.name}
              </Label>
              <div className={`grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 ${cardGapCompactClass}`}>
                {row.colors.map((color) => (
                  <figure key={color.token}>
                    <div className={`aspect-square ${color.swatch}`} />
                    <figcaption className="mt-2">
                      <Label as="p">{color.name}</Label>
                      <Body as="p" size="card" tone="muted" className="mt-1 break-all">
                        {color.hex}
                      </Body>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="tipografia"
        kicker="02 Типография"
        title="Типография"
        lead="Роли една под друга: заглавие, увод, абзац, подзаглавие, етикет. ADYS — medium за дисплеи, bold за заглавия."
      >
        <div className="max-w-[40rem] border border-border-green px-8 py-10">
          <Heading>Заглавие в карта</Heading>
          <Lead className="mt-3">
            Увод под заглавието. 22px, medium, тъмно зелено.
          </Lead>
          <Body className="mt-3">
            Абзац за четене. Остава 20px в същото тъмно зелено.
          </Body>
          <Heading as="h3" size="sm" className="mt-8">
            Подзаглавие
          </Heading>
          <Label as="p" className="mt-4">
            Етикет на поле
          </Label>
        </div>
        <div className="mt-block flex flex-col divide-y divide-border-green border-y border-border-green">
          <TypeRow
            name="DisplayHero"
            size="clamp(2.5rem, 6.4vw, 88px)"
            weight="500"
          >
            <div className="bg-primary-dark px-6 py-8 sm:px-10">
              <DisplayHero>
                Помагаме
                <br />
                на децата
              </DisplayHero>
            </div>
          </TypeRow>
          <TypeRow name="Display" size="clamp(2rem, 4vw, 3.5rem)" weight="700">
            <Display>Дизайн система</Display>
          </TypeRow>
          <TypeRow
            name="Display medium"
            size="clamp(2rem, 4vw, 3.5rem)"
            weight="500"
          >
            <Display as="p" weight="medium">
              Готови ли сте да започнете?
            </Display>
          </TypeRow>
          <TypeRow name="Title" size="clamp(1.75rem, 3vw, 2.5rem)" weight="700">
            <Title>Нашите рубрики</Title>
          </TypeRow>
          <TypeRow name="Heading lg" size="1.75rem (28px)" weight="700">
            <Heading size="lg">Голямо заглавие в карта</Heading>
          </TypeRow>
          <TypeRow name="Heading" size="1.625rem (26px)" weight="700">
            <Heading>Стандартно заглавие</Heading>
          </TypeRow>
          <TypeRow name="Heading sm" size="1.375rem (22px)" weight="700">
            <Heading size="sm">Компактно заглавие</Heading>
          </TypeRow>
          <TypeRow
            name="Heading featured"
            size="clamp(1.75rem, 1.2rem + 1.8vw, 2.25rem)"
            weight="700"
          >
            <Heading size="featured">Отличено заглавие</Heading>
          </TypeRow>
          <TypeRow name="Lead" size="1.375rem (22px)" weight="500">
            <Lead>
              Кратки валидирани оценки на развитието — ритуали, граници,
              разговори, ежедневни.
            </Lead>
          </TypeRow>
          <TypeRow
            name="Lead hero"
            size="clamp(1.1875rem, 0.35vw + 1.12rem, 1.4375rem)"
            weight="500"
          >
            <div className="bg-primary-dark px-6 py-6">
              <Lead tone="white" size="hero">
                За родители и специалисти — без сравнение, с ясна посока.
              </Lead>
            </div>
          </TypeRow>
          <TypeRow name="Body" size="1.25rem (20px)" weight="400">
            <Body>
              Ние сме интердисциплинарен екип от професионалисти с богат
              академичен и практически опит.
            </Body>
          </TypeRow>
          <TypeRow name="Body card" size="1.125rem (18px)" weight="400">
            <Body size="card" tone="muted">
              Текст в карта — малко по-тих от основното тяло.
            </Body>
          </TypeRow>
          <TypeRow name="Meta" size="0.75rem (12px)" weight="700">
            <Meta>24 септември 2026</Meta>
          </TypeRow>
          <TypeRow name="Label" size="1rem (16px)" weight="700">
            <Label>Име на поле</Label>
          </TypeRow>
          <TypeRow name="Action" size="1rem (16px)" weight="700">
            <Action>Прочети</Action>
          </TypeRow>
          <TypeRow name="Nav" size="1.3125rem (21px)" weight="500">
            <NavText>За Нас</NavText>
          </TypeRow>
        </div>
      </Section>

      <Section
        id="butoni"
        kicker="03 Бутони"
        title="Бутони"
        lead="По вид, после по размер."
      >
        <div className={`flex flex-col ${cardGapClass}`}>
          <ButtonSet caption="primary">
            <ButtonRow>
              <Button size="l">LABEL</Button>
              <Button icon="back" size="l">
                LABEL
              </Button>
              <Button icon="plus" size="l">
                LABEL
              </Button>
            </ButtonRow>
          </ButtonSet>
          <ButtonSet caption="secondary">
            <ButtonRow>
              <Button variant="secondary" size="l">
                LABEL
              </Button>
              <Button variant="secondary" icon="back" size="l">
                LABEL
              </Button>
              <Button variant="secondary" size="l" showArrow={false}>
                LABEL
              </Button>
            </ButtonRow>
          </ButtonSet>
          <ButtonSet caption="tertiary">
            <ButtonRow>
              <LinkButton href="#butoni">LABEL</LinkButton>
              <LinkButton href="#butoni" icon="back">
                LABEL
              </LinkButton>
            </ButtonRow>
          </ButtonSet>
          <ButtonSet caption="carousel">
            <ButtonRow>
              <CarouselArrow direction="prev" label="Назад" />
              <CarouselArrow direction="next" label="Напред" />
            </ButtonRow>
          </ButtonSet>
          <ButtonSet caption="size">
            <ButtonRow label="XL">
              <Button>LABEL</Button>
              <Button variant="secondary">LABEL</Button>
            </ButtonRow>
            <ButtonRow label="L">
              <Button size="l">LABEL</Button>
              <Button variant="secondary" size="l">
                LABEL
              </Button>
            </ButtonRow>
            <ButtonRow label="S">
              <Button size="s">LABEL</Button>
              <Button variant="secondary" size="s">
                LABEL
              </Button>
            </ButtonRow>
          </ButtonSet>
        </div>
      </Section>

      <Section
        id="formi"
        kicker="04 Форми"
        title="Форми"
        lead="Select, NumberInput, текстово поле, дата с календар и текстова област споделят зеления контур, бялата повърхност и текста text-primary-dark. Календарът е със същия контур и зеления избор. Търсенето във въпросите ползва същото поле."
      >
        <FormDemo />
      </Section>

      <Section
        id="karti"
        kicker="05 Карти"
        title="Карти"
        lead="По категории: news, полезна информация, въпросници, специалисти, ресурси и партньори."
      >
        <div className="flex flex-col gap-block">
          <div>
            <Heading as="h3">News</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Два вида: featured и regular. При ховър повърхността става бяла,
              заглавието и откъсът минават от text-primary към text-primary-dark,
              а крайните квадратчета на шевицата се разпръскват. Датата остава
              muted. „Прочети“ става text-primary заедно с ховъра на картата.
            </Body>
            <ul className={`mt-6 grid md:grid-cols-2 ${cardGapFeaturedClass}`}>
              <li className="flex h-full flex-col gap-3">
                <Meta>featured</Meta>
                <NewsCard
                  featured
                  index={0}
                  href={`/news/${news[0].slug}`}
                  date={news[0].date}
                  title={news[0].title}
                  excerpt={news[0].excerpt}
                />
              </li>
              <li className="flex h-full flex-col gap-3">
                <Meta>regular</Meta>
                <NewsCard
                  index={2}
                  href={`/news/${news[2].slug}`}
                  date={news[2].date}
                  title={news[2].title}
                  excerpt={news[2].excerpt}
                />
              </li>
            </ul>
            <div className="mt-block">
            <Heading as="h3" size="sm">Ред на цветовете</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Фонът се върти по index % 8 и после се повтаря. Featured ползва
              същия фон. Шевицата при regular следва фона. При featured е
              двуцветна: четен index е orange + blue, нечетен е green + pink.
            </Body>
            <ul className={`mt-6 grid grid-cols-4 lg:grid-cols-8 ${cardGapCompactClass}`}>
              {newsCardWashes.map((step, index) => (
                <li key={index}>
                  <div
                    className={`relative aspect-square ring-1 ring-border-green ${step.wash} [--news-inset:14%] [--news-shevitsa:34%] [--news-shevitsa-ink:0.7]`}
                  >
                    <ShevitsaMark index={index} tone={step.shevitsa} />
                  </div>
                  <Meta as="p" className="mt-2">
                    {index}
                  </Meta>
                  <Body as="p" size="card" tone="muted" className="mt-1">
                    {step.wash.replace("bg-", "")}
                  </Body>
                  <Body as="p" size="card" tone="muted">
                    {step.shevitsa}
                  </Body>
                </li>
              ))}
            </ul>
            </div>
          </div>

          <div>
            <Heading as="h3">Полезна информация</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Един вид карта, винаги бял фон. При ховър заглавието и откъсът
              стават text-primary-dark. Знакът е text-secondary, леко се
              уголемява и сменя цвета. „Прочети“ става text-primary заедно с
              ховъра на картата.
            </Body>
            <ul className="mt-6 grid max-w-xl">
              <li className="h-full">
                <TipCard
                  href={`/tips/${tips[0].slug}`}
                  title={tips[0].title}
                  excerpt={tips[0].excerpt}
                  index={0}
                />
              </li>
            </ul>
            <div className="mt-block">
            <Heading as="h3" size="sm">Ред на цветовете</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Фонът не се върти. Знакът в покой е secondary. При ховър цветът
              му се върти по index % 3 и после се повтаря.
            </Body>
            <ul className={`mt-6 grid max-w-xl grid-cols-3 ${cardGapCompactClass}`}>
              {tipIconHovers.map((step, index) => (
                <li key={step.name}>
                  <div className="relative aspect-square bg-white ring-1 ring-border-green">
                    <InfoMark
                      className={`absolute top-[14%] right-[14%] h-[34%] w-[34%] rotate-180 ${step.swatch}`}
                    />
                  </div>
                  <Meta as="p" className="mt-2">
                    {index}
                  </Meta>
                  <Body as="p" size="card" tone="muted" className="mt-1">
                    {step.name}
                  </Body>
                </li>
              ))}
            </ul>
            </div>
          </div>

          <div>
            <Heading as="h3">Таблица от таблото</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Същата таблица като в таблото за 0–1 година: колоните са „Месец
              1–4“. При ховър процентът показва „Насоки“, при клик отваря
              прозореца с препоръката. Цветът следва резултата: до 33 е червен,
              от 34 до 66 е оранжев, от 67 нагоре е зелен. Числата тук са
              примерен набор, за да се видят и трите цвята. „Няма“ и
              „Предстои“ нямат цвят.
            </Body>
            <div className="mt-6">
              <ResultsTable table={dashboardTableDemo} resetKey="design-system" />
            </div>
          </div>

          <div>
            <Heading as="h3">Въпросници</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Категорията е прозрачна и при ховър става бяла. Подкатегорията
              носи accent фона на възрастовата група: pink, orange, green или
              blue.
            </Body>
            <div className={`mt-6 grid items-stretch lg:grid-cols-2 ${cardGapClass}`}>
              <div className={`group ${cardSurfaceClass} flex h-full flex-col gap-5 bg-transparent px-0 py-6 transition-colors duration-200 ease-out hover:bg-white sm:gap-6 sm:p-8 md:p-10`}>
                <TokenIcon
                  src={questionnaireDemo.icon}
                  accent={questionnaireDemo.accent}
                  className="h-[70px] w-[110px] origin-center transition-transform duration-200 ease-out group-hover:scale-[1.3]"
                />
                <div className="flex flex-col gap-3">
                  <Heading as="h2" size="lg">
                    {questionnaireDemo.title}
                  </Heading>
                  <Body size="card" className="max-w-[560px]">
                    {questionnaireDemo.description}
                  </Body>
                </div>
                <Button
                  href={`/questionnaires/${questionnaireDemo.slug}`}
                  className="mt-auto w-fit"
                  size="l"
                  hoverGroup={false}
                >
                  Към въпросника
                </Button>
              </div>
              {ageDemo ? (
                <a
                  href={`/questionnaires/ranno-detsko-razvitie/${ageDemo.slug}`}
                  className={`group/subcard questionnaire-subcard ${cardSurfaceClass} flex h-full flex-col gap-cluster p-cluster transition-colors duration-200 ease-out hover:bg-white focus-visible:bg-white ${accentCardClass[ageDemo.accent]}`}
                >
                  <div className="flex flex-col gap-stack">
                    <Heading as="h3" size="sm" tone="inherit">
                      {ageDemo.title}
                    </Heading>
                    <Body as="span" size="card">
                      {ageDemo.description}
                    </Body>
                  </div>
                  <Button
                    className="mt-auto w-fit"
                    size="l"
                    interactive={false}
                    hoverGroup={false}
                    groupName="subcard"
                  >
                    Към въпросника
                  </Button>
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <Heading as="h3">Специалисти</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Ред в списъка, не карта. При ховър повърхността става бяла,
              „Към сайта“ става text-primary. Шевицата се върти по index % 4:
              green, pink, blue, orange.
            </Body>
            <a
              href={associationDemo.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`directory-row group ${cardSurfaceClass} mt-6 flex items-center gap-cluster border-y border-border-green px-directory-inset py-cluster outline-none`}
            >
              <span className="flex w-[length:var(--size-mark)] shrink-0 items-center justify-center">
                <ShevitsaMark index={0} className="relative shrink-0" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-stack sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0">
                  <Meta>{associationDemo.category}</Meta>
                  <Heading as="h2" size="lg" className="mt-stack text-balance">
                    {associationDemo.name}
                  </Heading>
                  <Body size="card" className="mt-stack max-w-[640px]">
                    {associationDemo.description}
                  </Body>
                </div>
                <LinkButton interactive={false} hoverGroup={false} className="shrink-0">
                  Към сайта
                </LinkButton>
              </div>
            </a>
            <div className="mt-block">
            <Heading as="h3" size="sm">Ред на цветовете</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Шевицата се върти по index % 4 и после се повтаря. При ховър на
              реда се уголемява и крайните квадратчета се разпръскват.
            </Body>
            <ul className={`mt-6 grid max-w-xl grid-cols-4 ${cardGapCompactClass}`}>
              {shevitsaTones.map((tone, index) => (
                <li key={tone}>
                  <div className="relative flex aspect-square items-center justify-center bg-cream ring-1 ring-border-green [--news-shevitsa:46%] [--news-shevitsa-ink:0.7]">
                    <ShevitsaMark
                      index={index}
                      tone={tone}
                      className="relative shrink-0"
                    />
                  </div>
                  <Meta as="p" className="mt-2">
                    {index}
                  </Meta>
                  <Body as="p" size="card" tone="muted" className="mt-1">
                    {tone}
                  </Body>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {resourceDemo ? (
            <div>
              <Heading as="h3">Ресурси</Heading>
              <Body className="mt-3 max-w-[46rem]">
                PDF картата е с крем фон и знака за документ. Видео картата е
                със същото тяло, но с миниатюра от YouTube и кръгъл play знак.
              </Body>
              <a
                href={resourceDemo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${cardSurfaceClass} mt-6 flex h-full max-w-md flex-col`}
              >
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-cream">
                  <PdfPlaceholder />
                </div>
                <div className="flex flex-1 flex-col gap-3 pt-5">
                  <Meta>PDF</Meta>
                  <Heading>{resourceDemo.title}</Heading>
                  <Body size="card">{resourceDemo.excerpt}</Body>
                  <LinkButton interactive={false} hoverGroup={false} className="mt-auto self-start pt-4">
                    Отвори PDF
                  </LinkButton>
                </div>
              </a>
            </div>
          ) : null}

          <div>
            <Heading as="h3">Партньори</Heading>
            <Body className="mt-3 max-w-[46rem]">
              Логотата са сиви и при ховър се връщат в цвят. На началната
              страница вървят в непрекъсната лента.
            </Body>
            <ul className={`mt-6 flex flex-wrap items-center ${cardGapClass}`}>
              {partners.map((partner) => (
                <li key={partner.src}>
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    unoptimized={partner.src.endsWith(".svg")}
                    className="h-[52px] w-auto object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0 sm:h-[72px]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="ritam"
        kicker="06 Ритъм"
        title="Ритъм"
        lead="Вертикалният ритъм, улуците между картите и вътрешните отстояния. Стойностите са токените от @theme."
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {spacings.map((space) => (
            <div key={space.token}>
              <div className="flex items-end bg-white">
                <div className={`w-full min-h-3 ${space.className}`} />
              </div>
              <Label as="p" className="mt-3">
                {space.name}
              </Label>
              <Body as="p" size="card" tone="muted" className="mt-1">
                {space.token}
              </Body>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="ikoni"
        kicker="07 Икони"
        title="Икони"
        lead="По една форма от всеки вид, подредени по цвят."
      >
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${cardGapClass}`}>
          {iconGroups.map((group) => (
            <div key={group.name} className="flex flex-col gap-y-card-row">
              <Meta tone="muted">{group.name}</Meta>
              {group.icons.map((icon) => (
                <Ornament key={icon.src} wash="none">
                  <span className="flex h-16 w-16 items-center justify-center overflow-hidden">
                    {"accent" in icon ? (
                      <TokenIcon
                        src={icon.src}
                        accent={icon.accent}
                        position="center"
                        className="h-16 w-16"
                      />
                    ) : (
                      <Image
                        src={icon.src}
                        alt=""
                        width={128}
                        height={128}
                        className={`h-16 w-16 object-contain ${"scale" in icon ? icon.scale : ""}`}
                      />
                    )}
                  </span>
                </Ornament>
              ))}
            </div>
          ))}
        </div>

        <div className={`mt-block grid grid-cols-2 lg:grid-cols-4 ${cardGapClass}`}>
          {utilityIcons.map((src) => (
            <Ornament key={src} wash="none">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  width={128}
                  height={128}
                  className="h-16 w-16 object-contain"
                />
              </span>
            </Ornament>
          ))}
        </div>

        <div className={`mt-block grid sm:grid-cols-2 lg:grid-cols-4 ${cardGapClass}`}>
          <Ornament wash="none">
            <BoyAvatar className="h-16 w-auto" />
          </Ornament>
          <Ornament wash="none">
            <GirlAvatar className="h-16 w-auto" />
          </Ornament>
        </div>
      </Section>

      <Section
        id="bebeta"
        kicker="08 Бебета"
        title="Бебета"
        lead="Две илюстрации: седнало бебе с дрънкалка и пълзящо бебе."
      >
        <div className={`grid sm:grid-cols-2 ${cardGapClass}`}>
          <Ornament wash="white" caption="baby-1">
            <Image
              src="/images/baby-1.svg"
              alt=""
              width={160}
              height={160}
              className="h-28 w-auto max-w-full object-contain"
            />
          </Ornament>
          <Ornament wash="white" caption="baby-2">
            <Image
              src="/images/baby-2.svg"
              alt=""
              width={160}
              height={160}
              className="h-28 w-auto max-w-full object-contain"
            />
          </Ornament>
        </div>
      </Section>

      <Section
        id="ornamenti"
        kicker="09 Орнаменти"
        title="Орнаменти"
        lead="Звездичката е в два варианта. Голямото цвете е embroidery-3."
      >
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${cardGapClass}`}>
          <Ornament wash="white" caption="ListShevitsa · pair 0">
            <ListShevitsa pair={0} className="h-16 w-16" />
          </Ornament>
          <Ornament wash="white" caption="ListShevitsa · pair 1">
            <ListShevitsa pair={1} className="h-16 w-16" />
          </Ornament>
          <Ornament wash="white" caption="embroidery-3">
            <Image
              src="/images/embroidery-3.svg"
              alt=""
              width={160}
              height={160}
              className="h-20 w-auto max-w-full object-contain"
            />
          </Ornament>
        </div>
      </Section>
        </div>
      </div>
    </main>
  );
}

function TypeRow({
  name,
  size,
  weight,
  children,
}: {
  name: string;
  size: string;
  weight: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 py-8 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-12">
      <div>
        <Label as="p">{name}</Label>
        <Body as="p" size="card" tone="muted" className="mt-2">
          font-size: {size}
        </Body>
        <Body as="p" size="card" tone="muted" className="mt-1">
          font-weight: {weight}
        </Body>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ButtonSet({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label as="p">{caption}</Label>
      <div className="mt-4 flex flex-col gap-5">{children}</div>
    </div>
  );
}

function ButtonRow({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {label ? (
        <Meta as="p" tone="muted" className="mb-3">
          {label}
        </Meta>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Ornament({
  caption,
  children,
  wash = "cream",
}: {
  caption?: string;
  children: ReactNode;
  wash?: "cream" | "white" | "none";
}) {
  const washClass =
    wash === "none" ? "" : wash === "white" ? "bg-white p-card-inset" : "bg-cream p-card-inset";

  return (
    <figure className={`flex flex-col items-start gap-4 ${washClass}`}>
      {children}
      {caption ? (
        <Meta as="figcaption" tone="muted">
          {caption}
        </Meta>
      ) : null}
    </figure>
  );
}
