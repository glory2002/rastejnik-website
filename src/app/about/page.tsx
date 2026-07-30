import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutGoals, aboutIdeas, aboutWhoWeAre } from "@/data/about";

export const metadata: Metadata = {
  title: "За нас — Растежник",
  description:
    "Растежник е образователна платформа за родители и специалисти, посветени на първите години от живота на детето.",
};

export default function AboutPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            За нас
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
            Кои сме, какво ни води и какво искаме да постигнем заедно с
            родителите и специалистите около малкото дете.
          </p>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
                Кой сме
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-lg leading-[1.3] text-primary-dark">
                {aboutWhoWeAre.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative mt-2 hidden h-[280px] md:block lg:mt-10 lg:h-[320px]">
              <Image
                src="/images/pattern-contact-1.svg"
                alt=""
                width={150}
                height={150}
                className="absolute left-0 top-0"
              />
              <Image
                src="/images/pattern-contact-2.svg"
                alt=""
                width={150}
                height={150}
                className="absolute left-30 top-15"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Идеи
          </h2>
          <p className="mt-4 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
            Принципите, върху които градим съдържанието и инструментите на
            Растежник.
          </p>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {aboutIdeas.map((idea) => (
              <div key={idea.title} className="flex flex-col gap-6">
                <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center">
                  <Image
                    src={idea.icon}
                    alt=""
                    width={70}
                    height={70}
                    className={`h-[70px] w-[70px] ${idea.iconClass ?? ""}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[24px] font-bold leading-[1.2] text-primary">
                    {idea.title}
                  </h3>
                  <p className="text-lg leading-[1.3] text-primary-dark">
                    {idea.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Цели
          </h2>
          <p className="mt-4 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
            Към какво се стремим с платформата — за родителя, за детето и за
            връзката със специалистите.
          </p>

          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {aboutGoals.map((goal, index) => (
              <li key={goal.title} className="flex flex-col gap-3">
                <span className="text-[13px] font-bold uppercase tracking-wide text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[22px] font-bold leading-[1.2] text-primary md:text-[24px]">
                  {goal.title}
                </h3>
                <p className="text-lg leading-[1.3] text-primary-dark">
                  {goal.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />

      <section className="w-full bg-white py-16 md:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-[600px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Имате въпрос към нас?
          </h2>
          <p className="max-w-[500px] text-lg leading-[1.3] text-primary-dark">
            Пишете ни — с удоволствие ще отговорим.
          </p>
          <Button href="/#contact">свържи се с нас</Button>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
