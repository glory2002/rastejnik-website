import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Title } from "@/components/ui/Typography";
import {
  literacyAnswerOptions,
  parentalLiteracyQuestions,
} from "@/data/parentalLiteracy";

export const metadata: Metadata = {
  title: "Родителска грамотност — Растежник",
  description:
    "Проверете доколко разпознавате мит от научен факт в темите за отглеждане и ранно детско развитие.",
};

export default function ParentalLiteracyPage() {
  const header = (
    <div className="flex flex-col items-center gap-3 text-center">
      <Title as="h1" className="max-w-[700px]">
        Родителска грамотност
      </Title>
    </div>
  );

  return (
    <main>
      <Header variant="framed" />

      <QuestionnaireFlow
        questions={parentalLiteracyQuestions}
        options={literacyAnswerOptions}
        pageSize={1}
        variant="literacy"
        backHref="/dashboard"
        backLabel="Към таблото"
        header={header}
      />

      <Footer />
    </main>
  );
}
