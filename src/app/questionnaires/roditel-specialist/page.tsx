import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionnaireFlow } from "@/components/QuestionnaireFlow";
import { Title } from "@/components/ui/Typography";
import {
  parentalSpecialistQuestions,
  specialistAnswerOptions,
  specialistDomainGuidance,
} from "@/data/parentalSpecialist";

export const metadata: Metadata = {
  title: "Взаимоотношения родител-специалист — Растежник",
  description:
    "Оценете работата си със специалиста в същите шест области като родителската компетентност.",
};

export default function ParentSpecialistPage() {
  const header = (
    <div className="flex flex-col items-center gap-4 text-center">
      <Title as="h1" className="max-w-[700px]">
        Взаимоотношения родител-специалист
      </Title>
    </div>
  );

  return (
    <main>
      <Header variant="framed" />

      <QuestionnaireFlow
        questions={parentalSpecialistQuestions}
        options={specialistAnswerOptions}
        pageSize={1}
        variant="literacy"
        showDomain
        domainGuidance={specialistDomainGuidance}
        backHref="/dashboard"
        backLabel="Към таблото"
        header={header}
        completion={{
          lead: "Успешно завършихте оценката на работата ви със специалиста. Ето обобщението по области.",
          guidance:
            "Резултатът показва как усещате работата със специалиста във всяка област. Той не оценява специалиста. По-нисък резултат показва къде следващият разговор може да стане по-конкретен и по-близо до вашия ден.",
          overallLabels: {
            red: "Нужна е по-ясна връзка",
            yellow: "Има място за по-близка работа",
            green: "Стабилно партньорство",
          },
        }}
      />

      <Footer />
    </main>
  );
}
