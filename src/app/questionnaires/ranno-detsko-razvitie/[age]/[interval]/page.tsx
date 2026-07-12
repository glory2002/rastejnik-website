import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Container } from "@/components/ui/Container";
import { defaultQuestions } from "@/data/questionBank";
import {
  questionnaireCategories,
  findInterval,
} from "@/data/questionnaires";

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

export function generateStaticParams() {
  return parentCategory.subcategories!.flatMap((sub) =>
    sub.intervals.map((interval) => ({
      age: sub.slug,
      interval: interval.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ age: string; interval: string }>;
}): Promise<Metadata> {
  const { age, interval } = await params;
  const found = findInterval(age, interval);

  return {
    title: found
      ? `${found.sub.title} · ${found.interval.label} — Растежник`
      : "Растежник",
  };
}

export default async function IntervalQuestionnairePage({
  params,
}: {
  params: Promise<{ age: string; interval: string }>;
}) {
  const { age, interval } = await params;
  const found = findInterval(age, interval);

  if (!found) notFound();

  const { sub, interval: currentInterval } = found;

  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <Link
            href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}`}
            className="group mb-8 inline-flex items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/arrow-link.svg"
              alt=""
              width={12}
              height={19}
              className="shrink-0 rotate-180"
            />
            {sub.title}
          </Link>

          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            {currentInterval.label}
          </h1>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto w-full max-w-[720px]">
            <QuestionnaireFlow
              questions={defaultQuestions}
              backHref={`/questionnaires/ranno-detsko-razvitie/${sub.slug}`}
              backLabel="Обратно към възрастовата група"
            />
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
