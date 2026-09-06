import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnairesBrowse } from "@/components/QuestionnairesBrowse";
import { Container } from "@/components/ui/Container";
import { Body, Display } from "@/components/ui/Typography";
import { questionnaireCategories } from "@/data/questionnaires";

export const metadata: Metadata = {
  title: "Въпросници — Растежник",
  description:
    "Валидирани въпросници за родителска грамотност, родителска компетентност, взаимоотношения родител-специалист и ранно детско развитие.",
};

export default function QuestionnairesPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <nav
            aria-label="Пътека"
            className="mb-5 flex flex-wrap items-center gap-2 text-label font-medium text-primary-dark/60 sm:mb-6"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Въпросници</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/images/icon-rub-01.svg"
              alt=""
              width={145}
              height={112}
              className="h-[56px] w-auto shrink-0 object-contain sm:h-[70px]"
            />
            <div>
              <Display className="max-w-[800px]">Въпросници</Display>
              <Body className="mt-4 max-w-[620px]">
                Кратки, валидирани въпросници, които ви помагат да разберете
                по-добре себе си като родител и развитието на детето — изберете
                категория по-долу.
              </Body>
            </div>
          </div>

          <div className="mt-10 sm:mt-14">
            <QuestionnairesBrowse categories={questionnaireCategories} />
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
