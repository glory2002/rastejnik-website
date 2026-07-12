"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { answerOptions, type QuestionnaireQuestion } from "@/data/questionBank";
import { ShevitsaAssembleIcon } from "@/components/icons/ShevitsaAssembleIcon";

const PAGE_SIZE = 5;
const TRANSITION_DURATION_MS = 1700;

type Stage = "questions" | "transition" | "complete";

interface QuestionnaireFlowProps {
  questions: QuestionnaireQuestion[];
  backHref: string;
  backLabel: string;
}

export function QuestionnaireFlow({
  questions,
  backHref,
  backLabel,
}: QuestionnaireFlowProps) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("questions");
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (stage !== "transition") return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [stage]);

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const isLastPage = page === totalPages - 1;

  const pageQuestions = useMemo(
    () => questions.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [questions, page],
  );

  const allCurrentAnswered = pageQuestions.every((q) => answers[q.id]);
  const answeredCount = Object.keys(answers).length;
  const progress =
    stage === "questions"
      ? Math.round((answeredCount / questions.length) * 100)
      : 100;

  function handleAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (isLastPage) {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setStage("complete");
        return;
      }

      setStage("transition");
      transitionTimeout.current = setTimeout(() => {
        setStage("complete");
      }, TRANSITION_DURATION_MS);
    } else {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setPage((p) => Math.max(0, p - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (stage === "transition") {
    return (
      <div className="shevitsa-stage-enter fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-[#fbf6ee] px-6 text-center">
        <div className="w-full max-w-[320px] rounded-[32px] bg-primary p-8 sm:max-w-[380px] sm:p-10">
          <ShevitsaAssembleIcon className="h-auto w-full" />
        </div>
        <p className="text-[13px] font-bold uppercase tracking-wide text-primary">
          Обобщаваме резултатите&hellip;
        </p>
      </div>
    );
  }

  if (stage === "complete") {
    return (
      <div className="shevitsa-stage-enter flex flex-col items-start gap-6">
        <span className="inline-flex items-center rounded-full bg-cream px-4 py-1.5 text-[13px] font-bold uppercase text-primary-dark">
          Готово
        </span>
        <h2 className="max-w-[560px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] text-primary">
          Благодарим за попълнения въпросник!
        </h2>
        <p className="max-w-[480px] text-base leading-[1.5] text-primary-dark">
          Отговорихте на всички {questions.length} въпроса. Резултатите ще ви
          помогнат да проследите развитието на детето през този период.
        </p>
        <Link
          href={backHref}
          className="mt-2 inline-flex items-center rounded-full bg-secondary px-6 py-3.5 text-[15px] font-bold uppercase text-primary-dark transition-opacity hover:opacity-90"
        >
          {backLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-2 flex items-center justify-between text-[13px] font-bold uppercase text-primary-dark">
          <span>
            Стъпка {page + 1} от {totalPages}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="relative h-9 w-full">
          <div className="wave-progress-track absolute inset-0 bg-[#e6ccaf]" />
          <div
            className="wave-progress-fill absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        {pageQuestions.map((q, index) => (
          <div
            key={q.id}
            className="flex flex-col gap-4 border-b border-border-green py-6 first:pt-0 last:border-b-0 last:pb-0"
          >
            <p className="max-w-[600px] text-lg font-bold leading-[1.3] text-primary-dark">
              <span className="text-primary">
                {page * PAGE_SIZE + index + 1}.{" "}
              </span>
              {q.text}
            </p>
            <div className="flex flex-wrap gap-3">
              {answerOptions.map((opt) => {
                const checked = answers[q.id] === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-full border-[1.5px] px-5 py-2.5 text-[14px] font-bold uppercase transition-colors duration-150 ease-out ${
                      checked
                        ? "border-primary bg-primary text-white"
                        : "border-border-green bg-white text-primary-dark hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={checked}
                      onChange={() => handleAnswer(q.id, opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={page === 0}
          className="text-[13px] font-bold uppercase text-primary-dark transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
        >
          Назад
        </button>

        <div className="flex flex-col items-end gap-2">
          {!allCurrentAnswered && (
            <span className="text-[13px] text-primary-dark/60">
              Отговорете на всички въпроси, за да продължите
            </span>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!allCurrentAnswered}
            className="inline-flex items-center rounded-full bg-secondary px-6 py-3.5 text-[15px] font-bold uppercase text-primary-dark transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastPage ? "Завърши" : "Напред"}
          </button>
        </div>
      </div>
    </div>
  );
}
