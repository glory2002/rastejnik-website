import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Title } from "@/components/ui/Typography";
import {
  competenceAnswerOptions,
  parentalCompetenceQuestions,
} from "@/data/parentalCompetence";

export const metadata: Metadata = {
  title: "Родителска компетентност — Растежник",
  description:
    "Кратка самооценка на увереността и уменията ви да отговаряте на нуждите на детето във всекидневни ситуации.",
};

export default function ParentalCompetencePage() {
  const header = (
    <div className="flex flex-col items-center gap-4 text-center">
      <Title as="h1" className="max-w-[700px]">
        Родителска компетентност
      </Title>
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
        backHref="/dashboard"
        backLabel="Към таблото"
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
