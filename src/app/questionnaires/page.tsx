import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="flex items-center justify-between gap-cluster">
            <div className="min-w-0 flex-1">
              <Display className="text-balance md:text-nowrap">Въпросници</Display>
              <Body className="mt-4 max-w-hero-lead sm:mt-5">
                Кратки, валидирани въпросници, които ви помагат да разберете
                по-добре себе си като родител и развитието на детето — изберете
                категория по-долу.
              </Body>
            </div>
            <Image
              src="/images/icon-rub-01.svg"
              alt=""
              width={145}
              height={112}
              className="h-[length:var(--size-mark)] w-auto shrink-0 object-contain"
            />
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
