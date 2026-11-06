import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Heading, Title } from "@/components/ui/Typography";
import {
  competenceAgeBands,
  competenceAnswerOptions,
  parentalCompetenceQuestions,
} from "@/data/parentalCompetence";

export function generateStaticParams() {
  return competenceAgeBands.map((band) => ({ band: band.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ band: string }>;
}): Promise<Metadata> {
  const { band: slug } = await params;
  const band = competenceAgeBands.find((item) => item.slug === slug);

  return {
    title: band
      ? `${band.title} — Родителска компетентност — Растежник`
      : "Растежник",
    description:
      "Кратка самооценка на увереността и уменията ви да отговаряте на нуждите на детето във всекидневни ситуации.",
  };
}

export default async function ParentalCompetenceBandPage({
  params,
}: {
  params: Promise<{ band: string }>;
}) {
  const { band: slug } = await params;
  const band = competenceAgeBands.find((item) => item.slug === slug);

  if (!band) notFound();

  const header = (
    <div className="flex flex-col items-center gap-4 text-center">
      <Title as="h1" className="max-w-[700px]">
        Родителска компетентност
      </Title>
      <Heading as="p" size="sm">
        {band.title}
      </Heading>
    </div>
  );

  return (
    <main>
      <Header variant="framed" />

      <QuestionnaireFlow
        questions={parentalCompetenceQuestions}
        options={competenceAnswerOptions}
        pageSize={1}
        variant="literacy"
        showDomain
        backHref="/questionnaires/roditelska-kompetentnost"
        backLabel="Родителска компетентност"
        header={header}
        completion={{
          lead: "Успешно завършихте самооценката на родителската компетентност. Ето обобщението и насоките за ежедневието с детето.",
          guidance:
            "Резултатът показва колко често усещате, че се справяте в ежедневни ситуации. Той не оценява колко добър родител сте. По-нисък резултат означава, че в тези моменти има място за повече опора. При нужда споделете как се чувствате с близък човек или със специалист.",
          overallLabels: {
            red: "Нужна е подкрепа",
            yellow: "Има място за увереност",
            green: "Стабилна компетентност",
          },
        }}
      />

      <Footer />
    </main>
  );
}
