"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
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
  aboutAdvantages,
  aboutForWhom,
  aboutHowResults,
  aboutHowWeAchieve,
  aboutHowWeAchieveLead,
  aboutOurGoal,
  aboutSupportLinks,
  aboutSupportLead,
  aboutSupportOpportunities,
  aboutSupportOpportunitiesLead,
  aboutSupportPractice,
  aboutSupportUsage,
  aboutSupportUsageLead,
  aboutWhoClusters,
  aboutWhoQuoteCause,
  aboutWhoQuoteClosing,
  aboutWhyQuestionnaires,
} from "@/data/about";

type AboutTab = "nas" | "rastejnik";

const tabs: { id: AboutTab; hash: string; label: string }[] = [
  { id: "nas", hash: "za-nas", label: "За нас" },
  { id: "rastejnik", hash: "za-rastejnik", label: "За Растежник" },
];

const accentText = [
  "text-accent-pink",
  "text-accent-orange",
  "text-primary",
  "text-accent-blue",
] as const;

const accentFills = [
  "bg-accent-pink",
  "bg-accent-orange",
  "bg-primary",
  "bg-accent-blue",
] as const;

function tabFromHash(hash: string): AboutTab {
  if (hash === "#za-rastejnik" || hash === "za-rastejnik") return "rastejnik";
  return "nas";
}

function ShevitsaMotif({
  src,
  side = "right",
  className = "",
  opacityClass = "opacity-[0.12]",
  topClass = "top-0",
}: {
  src: string;
  side?: "left" | "right";
  className?: string;
  opacityClass?: string;
  topClass?: string;
}) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute hidden w-[min(36vw,340px)] select-none lg:block",
        topClass,
        opacityClass,
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

function NumberedList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ol
      className={`flex max-w-[760px] flex-col gap-6 sm:gap-8 ${className}`}
    >
      {items.map((item, index) => (
        <Reveal key={item} delay={Math.min(index * 40, 200)} as="li">
          <div className="grid gap-2 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
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

function BulletList({
  items,
  columns = false,
  className = "mt-6 sm:mt-8",
}: {
  items: string[];
  /** Two columns from tablet up — for denser advantage lists. */
  columns?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={`gap-x-10 gap-y-3 sm:gap-y-4 ${
        columns
          ? "grid max-w-[960px] sm:grid-cols-2"
          : "flex max-w-[720px] flex-col"
      } ${className}`}
    >
      {items.map((item, index) => (
        <Reveal key={item} delay={Math.min(index * 30, 180)} as="li">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className={`mt-2 h-2 w-2 shrink-0 ${accentFills[index % 4]}`}
              style={{ transform: "rotate(45deg)" }}
            />
            <Body as="span">{item}</Body>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

function ParagraphStack({
  paragraphs,
  className = "mt-6",
  maxWidthClass = "max-w-[680px]",
}: {
  paragraphs: string[];
  className?: string;
  maxWidthClass?: string;
}) {
  return (
    <Body
      as="div"
      className={`flex flex-col gap-5 ${maxWidthClass} ${className}`}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Body>
  );
}

/** Same split as „Кои сме ние?“ / „Екипът“ — title column, then body. */
const aboutSplit =
  "grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20";

/**
 * Sticky title column. Sticky lives on this wrapper — not on Reveal —
 * because transform on Reveal would cancel position:sticky.
 */
function AboutSplitTitle({ children }: { children: ReactNode }) {
  return (
    <div className="lg:sticky lg:top-36 lg:self-start">
      <Reveal>{children}</Reveal>
    </div>
  );
}

function PullQuote({ children }: { children: string }) {
  return (
    <Reveal>
      <blockquote className="max-w-[720px] border-l-[3px] border-secondary pl-5 sm:pl-6">
        <Title as="p" className="text-balance font-medium">
          {children}
        </Title>
      </blockquote>
    </Reveal>
  );
}

export function PanelCta({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
      <Container className="flex flex-col items-center">
        <Reveal className="flex max-w-[640px] flex-col items-center gap-5 text-center sm:gap-6">
          <Title className="text-balance">{title}</Title>
          <Body>{body}</Body>
          <Button href="/questionnaires" size="l">
            Към тестовете
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

function TeamPanel() {
  const [team, space, belief] = aboutWhoClusters;

  return (
    <>
      <section className="w-full bg-white py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Title>Кои сме ние?</Title>
              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <span className="text-display font-medium leading-none text-primary">
                  08
                </span>
                <Body tone="muted" className="max-w-[12rem] text-label">
                  години работа с деца и семейства
                </Body>
              </div>
            </AboutSplitTitle>

            <div className="flex min-w-0 max-w-[44rem] flex-col gap-12 sm:gap-14 md:gap-16">
              <Reveal delay={60}>
                <Heading as="h3" size="sm">
                  {team.heading}
                </Heading>
                <ParagraphStack
                  paragraphs={team.paragraphs}
                  className="mt-4 sm:mt-5"
                />
              </Reveal>

              <PullQuote>{aboutWhoQuoteCause}</PullQuote>

              <Reveal delay={40}>
                <Heading as="h3" size="sm">
                  {space.heading}
                </Heading>
                <ParagraphStack
                  paragraphs={space.paragraphs}
                  className="mt-4 sm:mt-5"
                />
              </Reveal>

              <Reveal delay={40}>
                <Heading as="h3" size="sm">
                  {belief.heading}
                </Heading>
                <ParagraphStack
                  paragraphs={belief.paragraphs}
                  className="mt-4 sm:mt-5"
                />
              </Reveal>

              <PullQuote>{aboutWhoQuoteClosing}</PullQuote>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-primary py-12 sm:py-16 md:py-28">
        <Container>
          <Reveal className="max-w-[1000px]">
            <Meta as="p" tone="white" className="opacity-70">
              Нашата цел
            </Meta>
            <DisplayBanner
              as="h2"
              tone="white"
              className="mt-4 text-balance sm:mt-5"
            >
              {aboutOurGoal[0]}
            </DisplayBanner>
            <Body
              as="div"
              tone="white"
              className="mt-6 flex max-w-[640px] flex-col gap-4 opacity-90 sm:mt-8"
            >
              {aboutOurGoal.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Body>
          </Reveal>
        </Container>
      </section>

      <section className="relative w-full overflow-x-clip bg-cream py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Title>Как я постигаме?</Title>
              <Body className="mt-5 max-w-[560px]">{aboutHowWeAchieveLead}</Body>
            </AboutSplitTitle>
            <NumberedList items={aboutHowWeAchieve} />
          </div>
        </Container>
      </section>
    </>
  );
}

function PlatformPanel() {
  return (
    <>
      <section className="relative w-full overflow-x-clip bg-white py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Title className="text-balance">
                За кого е предназначена тази платформа?
              </Title>
              <div className="mt-6 flex items-baseline gap-3 sm:mt-8">
                <span className="text-display-banner font-medium leading-none text-primary">
                  0–4
                </span>
                <Meta as="span" className="normal-case tracking-normal">
                  години
                </Meta>
              </div>
            </AboutSplitTitle>
            <Reveal delay={80} className="min-w-0 max-w-[44rem]">
              <ParagraphStack
                paragraphs={aboutForWhom}
                className="mt-0"
                maxWidthClass="max-w-none"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative w-full overflow-hidden bg-cream py-12 sm:py-16 md:py-28">
        <ShevitsaMotif
          src="/images/embroidery-2.svg"
          side="right"
          topClass="top-8 md:top-12"
        />
        <Container className="relative z-10">
          <Reveal className="max-w-[760px]">
            <Title className="max-w-[700px] text-balance">
              Защо да направя въпросниците в тази платформа?
            </Title>
            <ParagraphStack
              paragraphs={aboutWhyQuestionnaires}
              maxWidthClass="max-w-[760px]"
            />
          </Reveal>
        </Container>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Title className="text-balance">
                Кои са предимствата на платформата?
              </Title>
            </AboutSplitTitle>
            <BulletList items={aboutAdvantages} className="" />
          </div>
        </Container>
      </section>

      <section className="w-full bg-cream py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Title className="max-w-[700px] text-balance">
                Как да се използват получените резултати?
              </Title>
            </AboutSplitTitle>
            <NumberedList items={aboutHowResults} />
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-28">
        <Container>
          <div className={aboutSplit}>
            <AboutSplitTitle>
              <Meta as="p">Подкрепата</Meta>
              <DisplayBanner as="p" className="mt-4 text-balance sm:mt-5">
                {aboutSupportLead}
              </DisplayBanner>
            </AboutSplitTitle>

            <div className="flex min-w-0 flex-col gap-12 sm:gap-16 md:gap-20">
              <Reveal>
                <Heading as="h3" size="sm">
                  Тя е като невидима, но здрава връзка между:
                </Heading>
                <BulletList items={aboutSupportLinks} />
              </Reveal>

              <Reveal delay={40}>
                <Heading as="h3" size="sm">
                  {aboutSupportUsageLead}
                </Heading>
                <BulletList items={aboutSupportUsage} />
              </Reveal>

              <Reveal delay={60}>
                <Heading as="h3" size="sm">
                  Успешното приложение на въпросниците в практиката
                </Heading>
                <ParagraphStack
                  paragraphs={aboutSupportPractice}
                  className="mt-5"
                  maxWidthClass="max-w-none"
                />
              </Reveal>

              <Reveal delay={80}>
                <Heading as="h3" size="sm">
                  {aboutSupportOpportunitiesLead}
                </Heading>
                <BulletList items={aboutSupportOpportunities} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function AboutView() {
  const [active, setActive] = useState<AboutTab>("nas");
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function syncFromHash() {
      setActive(tabFromHash(window.location.hash));
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function selectTab(tab: AboutTab) {
    const entry = tabs.find((item) => item.id === tab);
    if (!entry) return;
    setActive(tab);
    window.history.replaceState(null, "", `#${entry.hash}`);
    tabBarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const lead =
    active === "nas"
      ? "Кои сме, каква е целта ни и как я постигаме всеки ден."
      : "За кого е платформата, защо въпросниците, предимствата и как да ползвате резултатите.";

  const title = tabs.find((item) => item.id === active)!.label;

  return (
    <>
      <section className="relative w-full bg-cream pt-12 sm:pt-16 md:pt-28">
        <Container>
          <Reveal className="max-w-[720px]" key={active}>
            <Display>{title}</Display>
            <SectionLead className="mt-5 max-w-[540px] sm:mt-6">
              {lead}
            </SectionLead>
          </Reveal>
        </Container>

        <div
          ref={tabBarRef}
          className="sticky top-0 z-40 mt-10 scroll-mt-0 bg-cream sm:mt-12"
        >
          <Container>
            <div
              role="tablist"
              aria-label="Раздели"
              className="flex gap-1 sm:gap-2"
            >
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTab(tab.id)}
                    className={`min-w-0 flex-1 px-3 py-3.5 text-center text-[14px] font-bold uppercase tracking-[0.02em] transition-colors sm:flex-none sm:px-6 sm:py-4 sm:text-[15px] ${
                      isActive
                        ? "border-b-2 border-primary text-primary"
                        : "border-b-2 border-transparent text-primary-dark/55 hover:text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Container>
        </div>
      </section>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        key={active}
        className="about-tab-panel"
      >
        {active === "nas" ? <TeamPanel /> : <PlatformPanel />}
      </div>
    </>
  );
}
