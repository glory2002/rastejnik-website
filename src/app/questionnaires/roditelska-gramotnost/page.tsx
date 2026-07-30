import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
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
      <nav
        aria-label="Навигация във въпросника"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-bold uppercase"
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
      </nav>
      <h1 className="max-w-[700px] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.05] text-primary">
        Родителска грамотност
      </h1>
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
