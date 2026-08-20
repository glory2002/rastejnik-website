import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Meta, Title } from "@/components/ui/Typography";
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
      <Meta
        as="nav"
        aria-label="Навигация във въпросника"
        tone="inherit"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
      >
        <Link
          href="/questionnaires"
          className="text-primary/40 transition-colors hover:text-primary/70"
        >
          Въпросници
        </Link>
        <span aria-hidden className="text-primary/25">
          /
        </span>
        <span className="text-primary" aria-current="page">
          Родителска грамотност
        </span>
      </Meta>
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
