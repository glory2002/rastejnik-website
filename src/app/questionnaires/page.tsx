import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnairesBrowse } from "@/components/QuestionnairesBrowse";
import { Container } from "@/components/ui/Container";
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
          <QuestionnairesBrowse categories={questionnaireCategories} />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
