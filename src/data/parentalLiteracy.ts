import type {
  QuestionAnswerOption,
  QuestionnaireQuestion,
} from "@/data/questionBank";

export const literacyAnswerOptions: QuestionAnswerOption[] = [
  { value: "true", label: "Вярно е." },
  { value: "false", label: "Не е вярно." },
  { value: "unknown", label: "Не ми е известно/ Не знам." },
];

export const literacyInstruction =
  "За всяко от следните твърдения за ранното детско развитие, посочете дали според Вас е вярно, невярно или не Ви е известно:";

/**
 * Parental literacy items — true/false knowledge statements.
 * `correctAnswer` is the scientifically supported choice (true | false).
 * Demo set of 5; production bank is ~50.
 */
export const parentalLiteracyQuestions: (QuestionnaireQuestion & {
  correctAnswer: "true" | "false";
})[] = [
  {
    id: "pl-1",
    domain: "Родителска грамотност",
    text: "Не е задължително детето да има изграден режим на сън, бодърстване, хранене и активности.",
    correctAnswer: "false",
  },
  {
    id: "pl-2",
    domain: "Родителска грамотност",
    text: "Всяко дете се развива с един и същ темп — ако изостава от връстниците си, почти винаги има сериозен проблем.",
    correctAnswer: "false",
  },
  {
    id: "pl-3",
    domain: "Родителска грамотност",
    text: "Говоренето, четенето и пеенето на детето от ранна възраст подпомагат езиковото му развитие.",
    correctAnswer: "true",
  },
  {
    id: "pl-4",
    domain: "Родителска грамотност",
    text: "Ако вдигате плачещо бебе често, то ще се „разглези“ и ще плаче повече нарочно.",
    correctAnswer: "false",
  },
  {
    id: "pl-5",
    domain: "Родителска грамотност",
    text: "Свободната игра и движението са важни за физическото и познавателното развитие в ранна възраст.",
    correctAnswer: "true",
  },
];
