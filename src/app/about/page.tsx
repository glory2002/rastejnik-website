import type { Metadata } from "next";
import Image from "next/image";
import { ContactButton } from "@/components/ContactModal";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import {
  Body,
  Display,
  DisplayBanner,
  Heading,
  Meta,
  Title,
} from "@/components/ui/Typography";
import {
  aboutAdvantageKeywords,
  aboutAdvantages,
  aboutForWhom,
  aboutHowResults,
  aboutHowWeAchieve,
  aboutHowWeAchieveLead,
  aboutIdeasAndGoals,
  aboutSupportDimensions,
  aboutWhoWeAre,
  aboutWhoWeAreClosing,
  aboutWhyTests,
} from "@/data/about";

export const metadata: Metadata = {
  title: "За нас — Растежник",
  description:
    "Интердисциплинарен екип и инструмент за родители и специалисти в периода на ранното детско развитие — от 0 месеца до 4 години.",
};

const accentFills = [
  "bg-accent-pink",
  "bg-accent-orange",
  "bg-primary",
  "bg-accent-blue",
] as const;

const accentText = [
  "text-accent-pink",
  "text-accent-orange",
  "text-primary",
  "text-accent-blue",
] as const;

const axis = ["родители", "деца", "специалисти"] as const;

/** Quiet embroidery in the side margin — never over the text column. */
function ShevitsaMotif({
  src,
  side = "right",
  className = "",
}: {
  src: string;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute top-[12%] hidden w-[min(36vw,340px)] select-none opacity-[0.12] lg:block",
        "about-shevitsa-drift",
        side === "right"
          ? "-right-[8%] xl:-right-[3%]"
          : "-left-[8%] xl:-left-[3%]",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt=""
        width={709}
        height={726}
        className={`h-auto w-full ${side === "left" ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="mt-10 flex max-w-[760px] flex-col gap-8">
      {items.map((item, index) => (
        <Reveal key={item} delay={Math.min(index * 40, 200)} as="li">
          <div className="grid gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
            <Meta as="span" tone="inherit" className={accentText[index % 4]}>
              {String(index + 1).padStart(2, "0")}
            </Meta>
            <Body as="span">{item}</Body>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

function ParagraphStack({
  paragraphs,
  className = "mt-6",
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <Body as="div" className={`flex max-w-[680px] flex-col gap-5 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Body>
  );
}

export default function AboutPage() {
  const [supportLead, ...supportRest] = aboutSupportDimensions;

  return (
    <main>
      <Header variant="framed" />

      {/* Hero — one composition: brand title, lead, axis */}
      <section className="relative w-full overflow-hidden bg-cream py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(109,149,75,0.1),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(233,176,99,0.14),transparent_50%)]"
        />
        <ShevitsaMotif src="/images/embroidery-3.svg" side="right" />
        <Container className="relative z-10">
          <Reveal className="max-w-[720px]">
            <Display>За нас</Display>
            <SectionLead className="mt-6 max-w-[540px]">
              Интердисциплинарен екип и инструмент за родителите и
              специалистите около първите години.
            </SectionLead>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <p className="sr-only">Ос на връзката: родители, деца, специалисти</p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-6">
              {axis.map((label, index) => (
                <li key={label} className="flex items-center gap-4 md:gap-6">
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 ${accentFills[index]}`}
                      style={{ transform: "rotate(45deg)" }}
                    />
                    <Heading as="span" size="lg" tone="dark">
                      {label}
                    </Heading>
                  </span>
                  {index < axis.length - 1 ? (
                    <span
                      aria-hidden
                      className="hidden h-px w-8 bg-primary/25 sm:block md:w-12"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Кои сме — sticky label + editorial column */}
      <section className="w-full bg-white py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Title>Кои сме</Title>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-display font-medium leading-none text-primary">
                  07
                </span>
                <Body tone="muted" className="max-w-[12rem] text-label">
                  години работа за превенция в ранното детство
                </Body>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ParagraphStack paragraphs={aboutWhoWeAre} className="mt-0" />
              <ParagraphStack
                paragraphs={aboutWhoWeAreClosing}
                className="mt-10"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Как го постигаме — numbered rhythm */}
      <section className="relative w-full overflow-hidden bg-cream py-20 md:py-28">
        <Container>
          <Reveal className="max-w-[720px]">
            <Title>Как го постигаме?</Title>
            <Body className="mt-5 max-w-[560px]">{aboutHowWeAchieveLead}</Body>
          </Reveal>
          <NumberedList items={aboutHowWeAchieve} />
        </Container>
      </section>

      {/* Идеи и цели — green statement band */}
      <section className="w-full bg-primary py-20 md:py-28">
        <Container>
          <Reveal>
            <Meta as="p" tone="white" className="opacity-70">
              Идеи и цели
            </Meta>
            <DisplayBanner as="h2" tone="white" className="mt-5 max-w-[920px]">
              {aboutIdeasAndGoals[0]}
            </DisplayBanner>
            <Body tone="white" className="mt-8 max-w-[640px] opacity-90">
              {aboutIdeasAndGoals[1]}
            </Body>
          </Reveal>
        </Container>
      </section>

      {/* За кого — age signal + prose */}
      <section className="w-full bg-white py-20 md:py-28">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="flex flex-col gap-2">
                <span className="text-display-banner font-medium leading-none text-primary">
                  0–4
                </span>
                <Meta as="span" className="normal-case tracking-normal">
                  години
                </Meta>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Title className="max-w-[640px]">
                За кого е предназначен този инструмент?
              </Title>
              <ParagraphStack paragraphs={aboutForWhom} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Защо тестовете + предимства */}
      <section className="relative w-full overflow-hidden bg-cream py-20 md:py-28">
        <ShevitsaMotif src="/images/embroidery-2.svg" side="left" />
        <Container className="relative z-10">
          <Reveal className="max-w-[720px]">
            <Title className="max-w-[700px]">
              Защо да направя тестовете в този инструмент?
            </Title>
            <ParagraphStack paragraphs={aboutWhyTests} />
          </Reveal>

          <Reveal delay={100} className="mt-16 max-w-[760px]">
            <Heading as="h3" size="sm">
              Предимствата са
            </Heading>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {aboutAdvantageKeywords.map((keyword, index) => (
                <li key={keyword} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`h-2 w-2 ${accentFills[index % 4]}`}
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <Heading as="span" size="sm" tone="dark">
                    {keyword}
                  </Heading>
                </li>
              ))}
            </ul>
            <NumberedList items={aboutAdvantages} />
          </Reveal>
        </Container>
      </section>

      {/* Резултати */}
      <section className="w-full bg-white py-20 md:py-28">
        <Container>
          <Reveal>
            <Title className="max-w-[700px]">
              Как може да се използват получените резултати?
            </Title>
          </Reveal>
          <NumberedList items={aboutHowResults} />
        </Container>
      </section>

      {/* Подкрепа — pull quote + CTA */}
      <section className="w-full bg-cream py-20 md:py-28">
        <Container>
          <Reveal className="max-w-[880px]">
            <Meta as="p">Подкрепата</Meta>
            <DisplayBanner as="p" className="mt-5">
              {supportLead}
            </DisplayBanner>
            <ParagraphStack paragraphs={supportRest} className="mt-10" />
            <div className="mt-12">
              <Button href="/questionnaires" size="l">
                Към тестовете
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />

      <section className="w-full bg-white py-16 md:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <Title className="max-w-[600px]">Имате въпрос към нас?</Title>
            <Body className="max-w-[500px]">
              Пишете ни — с удоволствие ще отговорим.
            </Body>
            <ContactButton />
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
