import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutValues } from "@/data/about";

export const metadata: Metadata = {
  title: "За нас — Растежник",
  description:
    "Растежник е образователна платформа за родители и специалисти, посветени на първите години от живота на детето.",
};

export default function AboutPage() {
  return (
    <main className="bg-cream">
      <Header variant="light" />

      <section className="w-full py-16 md:py-24">
        <Container>
          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            За Растежник
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
            Създадохме Растежник, защото родителите заслужават кратки, ясни и
            валидирани отговори за развитието на детето — без паника, без
            сравнения и без безкраен скрол в форуми.
          </p>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            В какво вярваме
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value) => (
              <div key={value.title} className="flex flex-col gap-6">
                <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center">
                  <Image
                    src={value.icon}
                    alt=""
                    width={70}
                    height={70}
                    className={`h-[70px] w-[70px] ${value.iconClass ?? ""}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[24px] font-bold leading-[1.2] text-primary">
                    {value.title}
                  </h3>
                  <p className="text-lg leading-[1.3] text-primary-dark">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] text-primary">
                Нашата история
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-lg leading-[1.3] text-primary-dark">
                <p>
                  Растежник започна като бележник с въпроси на един родител,
                  който не намираше кратки и сигурни отговори на прост език —
                  само противоречиви съвети от форуми и групи в социалните
                  мрежи.
                </p>
                <p>
                  Събрахме екип от педиатри, психолози и рехабилитатори, за да
                  превърнем научените факти в кратки, ясни отговори — така,
                  че всеки родител да може да ги прочете между две задачи от
                  деня.
                </p>
              </div>
            </div>

            <div className="relative mt-2 hidden h-[280px] md:block lg:h-[320px]">
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
