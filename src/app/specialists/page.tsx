import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { associations } from "@/data/specialists";

export const metadata: Metadata = {
  title: "Специалисти и пространства — Растежник",
  description:
    "Препоръчани асоциации и отправни точки към практики и пространства, свързани с ранното детско развитие и здравните грижи.",
};

export default function SpecialistsPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <h1 className="max-w-[800px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            Специалисти и пространства
          </h1>
          <p className="mt-6 max-w-[640px] text-lg leading-[1.3] text-primary-dark">
            Растежник не замества медицински съвет. Списъкът е ориентир —
            асоциациите са мястото, откъдето можете да проверите
            правоспособност, да намерите регионални контакти и да стигнете до
            практики, свързани с ранно детско развитие и здравни грижи.
          </p>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Препоръчани асоциации
          </h2>
          <p className="mt-4 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
            Отворете картата на организацията — на сайта ѝ обикновено има
            регистър, регионални колегии или контакти към практики близо до
            вас.
          </p>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {associations.map((association) => (
              <li key={association.name} className="min-h-0">
                <a
                  href={association.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-5 bg-white p-6 transition-colors hover:bg-cream md:p-7"
                >
                  <div
                    className={`flex h-[96px] items-center justify-center px-4 ${
                      association.logoTone === "dark"
                        ? "bg-primary-dark"
                        : "bg-white"
                    }`}
                  >
                    <Image
                      src={association.logo}
                      alt=""
                      width={180}
                      height={80}
                      className="max-h-[72px] w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-[20px] font-bold leading-[1.2] text-primary md:text-[22px]">
                      {association.name}
                    </h3>
                    <p className="text-base leading-[1.35] text-primary-dark">
                      {association.description}
                    </p>
                  </div>

                  <span className="mt-auto inline-flex w-fit items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity group-hover:opacity-80">
                    Към сайта
                    <Image
                      src="/images/arrow-link.svg"
                      alt=""
                      width={14}
                      height={22}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <h2 className="max-w-[700px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Как да ползвате тази страница
          </h2>
          <div className="mt-6 flex max-w-[640px] flex-col gap-4 text-lg leading-[1.3] text-primary-dark">
            <p>
              Скоро ще добавим още организации. Ако познавате подходяща
              асоциация или пространство,{" "}
              <Link
                href="/#contact"
                className="font-bold text-primary underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                пишете ни
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
