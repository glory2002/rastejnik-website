"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  answerOptions,
  generalGuidance,
  getDomainResults,
  getOverallStatus,
  type OverallLevel,
  type QuestionnaireQuestion,
} from "@/data/questionBank";
import { ShevitsaAssembleIcon } from "@/components/icons/ShevitsaAssembleIcon";
import { TrafficLightIcon } from "@/components/icons/TrafficLightIcon";
import { FaqToggleIcon } from "@/components/FaqList";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { completeOnboarding, isLoggedIn } from "@/lib/authMock";

const inputClassName =
  "w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors focus:border-primary";

function FormField({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
>) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[14px] font-bold text-primary-dark">{label}</span>
      <input {...props} className={inputClassName} />
    </label>
  );
}

function FormSelect({
  label,
  options,
  className = "",
  ...props
}: {
  label: string;
  options: string[];
  className?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[14px] font-bold text-primary-dark">{label}</span>
      <select
        {...props}
        className="w-full border-[1.5px] border-border-green py-3 pl-4 pr-11 text-base text-primary-dark outline-none transition-colors focus:border-primary"
      >
        <option value="" disabled hidden>
          Изберете&hellip;
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function OnboardStepShell({
  step,
  title,
  description,
  maxWidth = "560px",
  children,
}: {
  step: 1 | 2 | 3;
  title: string;
  description?: string;
  maxWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <Container>
        <div
          className="shevitsa-stage-enter mx-auto flex w-full flex-col gap-10"
          style={{ maxWidth }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-[13px] font-bold uppercase tracking-wide text-primary-dark/70">
              Стъпка {step} от 3
            </span>
            <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.1] text-primary">
              {title}
            </h1>
            {description && (
              <p className="max-w-[440px] text-base leading-[1.4] text-primary-dark">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Active square fill — white shevitsa sits on top. */
const trafficLightActiveBg: Record<OverallLevel, string> = {
  red: "bg-status-red",
  yellow: "bg-accent-orange",
  green: "bg-primary",
};

/** Idle squares stay pale solids (no motif), matching the design mock. */
const trafficLightIdleBg: Record<OverallLevel, string> = {
  red: "bg-[#f0d4d2]",
  yellow: "bg-cream-solid",
  green: "bg-primary-light-solid",
};

/**
 * Domain result bars share the wave progress mask; tier color is chosen by
 * score band (0–33% / 33–67% / 67–100%) for a traffic-light read at a glance.
 */
function domainTierColor(percentage: number): string {
  if (percentage <= 100 / 3) return "var(--color-status-red)";
  if (percentage <= 200 / 3) return "var(--color-accent-orange)";
  return "var(--color-primary)";
}

const trafficLightOrder: OverallLevel[] = ["red", "yellow", "green"];

function TrafficLight({
  level,
  label,
}: {
  level: OverallLevel;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        {trafficLightOrder.map((dot) => {
          const isActive = dot === level;
          return (
            <div
              key={dot}
              className={`relative flex h-11 w-11 shrink-0 origin-center items-center justify-center transition-transform duration-300 ease-out ${
                isActive
                  ? `${trafficLightActiveBg[dot]} scale-[1.15] traffic-light-active`
                  : `${trafficLightIdleBg[dot]} scale-100`
              }`}
            >
              {isActive && (
                <TrafficLightIcon className="h-9 w-9 text-white/45" />
              )}
            </div>
          );
        })}
      </div>
      <span className="text-[14px] font-bold text-primary-dark">{label}</span>
    </div>
  );
}

const PAGE_SIZE = 5;
/** Piece anim ~2.35s + max delay ~0.76s + settle 0.75s + short hold. */
const TRANSITION_DURATION_MS = 3600;
type Stage =
  | "checking"
  | "register"
  | "parent"
  | "child"
  | "questions"
  | "transition"
  | "complete";

interface ParentData {
  name: string;
  birthDate: string;
  gender: string;
  ethnicity: string;
  maritalStatus: string;
  role: string;
  city: string;
  education: string;
  extendedFamily: string;
  childrenCount: string;
}

interface ChildData {
  name: string;
  birthMonth: string;
  gender: string;
  birthOrder: string;
  fullTerm: string;
  childcare: string;
}

const emptyParentData: ParentData = {
  name: "",
  birthDate: "",
  gender: "",
  ethnicity: "",
  maritalStatus: "",
  role: "",
  city: "",
  education: "",
  extendedFamily: "",
  childrenCount: "",
};

const emptyChildData: ChildData = {
  name: "",
  birthMonth: "",
  gender: "",
  birthOrder: "",
  fullTerm: "",
  childcare: "",
};

interface QuestionnaireFlowProps {
  questions: QuestionnaireQuestion[];
  backHref: string;
  backLabel: string;
  /** Age/interval title block (icon, label, back link) — hidden once the
   *  results are shown, so the completion screen isn't crowded by it. */
  header: React.ReactNode;
}

export function QuestionnaireFlow({
  questions,
  backHref,
  backLabel,
  header,
}: QuestionnaireFlowProps) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("checking");
  const [openDomain, setOpenDomain] = useState<number | null>(null);
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [parentData, setParentData] = useState<ParentData>(emptyParentData);
  const [childData, setChildData] = useState<ChildData>(emptyChildData);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Every new questionnaire run collects parent + child details again.
  // Logged-in users skip only the account registration step.
  useEffect(() => {
    setStage(isLoggedIn() ? "parent" : "register");
  }, []);

  function updateParent(key: keyof ParentData, value: string) {
    setParentData((prev) => ({ ...prev, [key]: value }));
  }

  function updateChild(key: keyof ChildData, value: string) {
    setChildData((prev) => ({ ...prev, [key]: value }));
  }

  function finishOnboarding() {
    completeOnboarding();
    setStage("questions");
  }

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

  const headerSection = stage === "questions" && (
    <section className="w-full bg-cream py-5 md:py-6">
      <Container>{header}</Container>
    </section>
  );

  // Render nothing while we check localStorage on mount, to avoid a flash
  // of the registration screen for users who already completed it.
  if (stage === "checking") {
    return null;
  }

  if (stage === "register") {
    return (
      <OnboardStepShell
        step={1}
        title="Регистрация"
        description="За да започнете въпросника, създайте безплатен профил — данните ви помагат да следите развитието на детето във времето."
        maxWidth="440px"
      >
        <div className="flex flex-col gap-5">
          <FormField
            label="Имейл"
            type="email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <FormField
            label="Парола"
            type="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setStage("parent")}
            className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full border-[1.5px] border-border-green bg-white text-[14px] font-bold uppercase text-primary-dark transition-colors duration-150 ease-out hover:border-primary"
          >
            Регистрация с Google
          </button>
          <Button size="l" className="w-full" onClick={() => setStage("parent")}>
            Регистрация
          </Button>
          <button
            type="button"
            className="mt-1 text-[14px] font-bold uppercase text-primary-dark transition-opacity hover:opacity-70"
          >
            Вход
          </button>
        </div>
      </OnboardStepShell>
    );
  }

  if (stage === "parent") {
    return (
      <OnboardStepShell
        step={2}
        title="Данни за родител"
        description="Тази информация ни помага да персонализираме препоръките за вас и детето ви."
        maxWidth="720px"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Имена"
            value={parentData.name}
            onChange={(e) => updateParent("name", e.target.value)}
          />
          <FormField
            label="Дата на раждане"
            type="date"
            value={parentData.birthDate}
            onChange={(e) => updateParent("birthDate", e.target.value)}
          />
          <FormSelect
            label="Пол"
            options={["Жена", "Мъж", "Друго"]}
            value={parentData.gender}
            onChange={(e) => updateParent("gender", e.target.value)}
          />
          <FormField
            label="Етнос"
            value={parentData.ethnicity}
            onChange={(e) => updateParent("ethnicity", e.target.value)}
          />
          <FormField
            label="Семейно положение"
            value={parentData.maritalStatus}
            onChange={(e) => updateParent("maritalStatus", e.target.value)}
          />
          <FormSelect
            label="Вие сте"
            options={["Родител", "Приемен родител", "Настойник"]}
            value={parentData.role}
            onChange={(e) => updateParent("role", e.target.value)}
          />
          <FormField
            label="Населено място"
            value={parentData.city}
            onChange={(e) => updateParent("city", e.target.value)}
          />
          <FormField
            label="Образование"
            value={parentData.education}
            onChange={(e) => updateParent("education", e.target.value)}
          />
          <FormField
            label="Участие на разширеното семейство в грижата за децата"
            className="sm:col-span-2"
            value={parentData.extendedFamily}
            onChange={(e) => updateParent("extendedFamily", e.target.value)}
          />
          <FormField
            label="Брой деца, отглеждани в домакинството/семейството"
            type="number"
            min={0}
            value={parentData.childrenCount}
            onChange={(e) => updateParent("childrenCount", e.target.value)}
          />
        </div>

        <Button size="l" className="self-center" onClick={() => setStage("child")}>
          Следваща стъпка
        </Button>
      </OnboardStepShell>
    );
  }

  if (stage === "child") {
    return (
      <OnboardStepShell
        step={3}
        title="Данни за дете"
        description="Последна стъпка — данни за детето, за което ще попълвате въпросника."
        maxWidth="560px"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Име/псевдоним"
            className="sm:col-span-2"
            value={childData.name}
            onChange={(e) => updateChild("name", e.target.value)}
          />
          <FormField
            label="Месец и година на раждане"
            type="month"
            value={childData.birthMonth}
            onChange={(e) => updateChild("birthMonth", e.target.value)}
          />
          <FormSelect
            label="Пол"
            options={["Момче", "Момиче"]}
            value={childData.gender}
            onChange={(e) => updateChild("gender", e.target.value)}
          />
          <FormField
            label="Кое поред дете"
            type="number"
            min={1}
            value={childData.birthOrder}
            onChange={(e) => updateChild("birthOrder", e.target.value)}
          />
          <FormSelect
            label="Родено на термин"
            options={["Да", "Не"]}
            value={childData.fullTerm}
            onChange={(e) => updateChild("fullTerm", e.target.value)}
          />
          <FormSelect
            label="Посещава ли детско заведение"
            options={["Да", "Не", "Понякога"]}
            className="sm:col-span-2"
            value={childData.childcare}
            onChange={(e) => updateChild("childcare", e.target.value)}
          />
        </div>

        <Button size="l" className="self-center" onClick={finishOnboarding}>
          Запази
        </Button>
      </OnboardStepShell>
    );
  }

  if (stage === "transition") {
    return (
      <div
        className="shevitsa-stage-enter fixed inset-0 z-[100] overflow-hidden bg-[color-mix(in_srgb,var(--color-secondary)_9%,white)]"
        aria-hidden="true"
      >
        <div className="shevitsa-stage-space absolute left-1/2 top-1/2 w-[min(52vw,400px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(46vw,460px)]">
          <ShevitsaAssembleIcon className="h-auto w-full overflow-visible" />
        </div>
      </div>
    );
  }

  if (stage === "complete") {
    const domainResults = getDomainResults(questions, answers);
    const overallStatus = getOverallStatus(domainResults);

    return (
      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto w-full max-w-[720px]">
            <div className="shevitsa-stage-enter flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="max-w-[560px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] text-primary">
            Поздравления!
          </h2>
          <p className="max-w-[480px] text-base leading-[1.5] text-primary-dark">
            Успешно завършихте оценката на развитието на вашето дете. Ето
            обобщените резултати и препоръки, които ще ви помогнат да
            подкрепите растежа му.
          </p>
        </div>

        {domainResults.length > 0 && (
          <div className="w-full bg-white p-6 text-left sm:p-8 md:p-10">
            <div className="flex flex-col items-center gap-12 text-center">
              <h3 className="text-[20px] font-bold leading-[1.2] text-primary md:text-[22px]">
                Обобщение на резултатите
              </h3>
              <TrafficLight level={overallStatus.level} label={overallStatus.label} />
            </div>

            {/* Large gap between domain groups; tight spacing inside each group. */}
            <div className="mt-16 flex flex-col gap-16">
              {domainResults.map((result, index) => {
                const tierColor = domainTierColor(result.percentage);
                const isOpen = openDomain === index;
                return (
                  <div key={result.domain} className="flex flex-col">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-[18px] font-bold text-primary-dark">
                        {result.domain}
                      </span>
                      <span
                        className="shrink-0 text-[18px] font-bold"
                        style={{ color: tierColor }}
                      >
                        {result.percentage}%
                      </span>
                    </div>

                    <div className="wave-progress-bar @container relative w-full">
                      <div className="wave-progress-track absolute inset-0 bg-cream-solid" />
                      <div
                        className="wave-progress-fill absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
                        style={{
                          width: `${result.percentage}%`,
                          backgroundImage: "none",
                          backgroundColor: tierColor,
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenDomain(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="mt-2.5 flex items-center gap-2.5 self-start transition-opacity hover:opacity-70"
                    >
                      <FaqToggleIcon isOpen={isOpen} />
                      <span className="text-[13px] font-bold uppercase text-primary">
                        Насоки
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-2 text-base leading-[1.4] text-primary-dark">
                          {result.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 flex flex-col gap-3">
              <h4 className="text-[18px] font-bold text-primary">
                Общи насоки
              </h4>
              <p className="text-base leading-[1.45] text-primary-dark">
                {generalGuidance}
              </p>
            </div>
          </div>
        )}

              <Button href={backHref} size="l" className="mt-2">
                {backLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {headerSection}
      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto w-full max-w-[720px]">
            <div className="flex flex-col gap-10">
              <div>
                <div className="mb-2 flex items-center justify-between text-[13px] font-bold uppercase text-primary-dark">
                  <span>
                    Стъпка {page + 1} от {totalPages}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="wave-progress-bar @container relative w-full">
                  <div className="wave-progress-track absolute inset-0 bg-cream-solid" />
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
                    className="flex flex-col gap-4 py-6 first:pt-0 last:pb-0"
                  >
                    <p className="max-w-[600px] text-[22px] font-bold leading-[1.3] text-primary-dark">
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
                                : "border-border-green bg-primary-light-solid text-primary-dark hover:border-primary"
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
        </Container>
      </section>
    </>
  );
}
