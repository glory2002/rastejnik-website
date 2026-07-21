export interface QuestionAnswerOption {
  value: string;
  label: string;
}

export interface QuestionnaireQuestion {
  id: string;
  domain: string;
  text: string;
}

export const answerOptions: QuestionAnswerOption[] = [
  { value: "yes", label: "Да" },
  { value: "sometimes", label: "Понякога" },
  { value: "not-yet", label: "Все още не" },
];

/** Score each answer contributes toward its domain's 0–100% result. */
const answerScores: Record<string, number> = {
  yes: 100,
  sometimes: 50,
  "not-yet": 0,
};

export interface DomainResult {
  domain: string;
  percentage: number;
  feedback: string;
}

/**
 * Three-tier feedback copy per domain, keyed by score band. Kept
 * supportive and non-diagnostic — this is a parent self-report screener,
 * not a clinical assessment.
 */
const domainFeedback: Record<string, { low: string; medium: string; high: string }> = {
  "Физическо развитие": {
    low: "Основните двигателни умения все още се изграждат. Отделяйте кратки, редовни моменти за свободна игра и движение на пода, за да подкрепите тази област.",
    medium: "Двигателните умения се развиват добре, с място за още практика. Продължавайте с редовна игра на пода и движение навън.",
    high: "Детето показва стабилно физическо развитие за своята възраст. Продължавайте да насърчавате активното движение и изследването на пространството около него.",
  },
  "Език и говор": {
    low: "Комуникативните умения тепърва се развиват. Говорете често с детето, назовавайте предмети и действия и четете заедно всеки ден.",
    medium: "Езиковото развитие върви в правилна посока, с индивидуален темп. Продължавайте разговорите, четенето и песничките в ежедневието.",
    high: "Детето показва добро разбиране на речта и комуникативни умения за своята възраст. Продължавайте да обогатявате речника чрез разговори и книжки.",
  },
  "Социално и емоционално развитие": {
    low: "Социалните и емоционалните реакции на детето все още се изграждат. Прегръдките, зрителният контакт и утешаването помагат то да се чувства сигурно.",
    medium: "Детето изгражда социални и емоционални връзки с добър темп. Продължавайте с топла, отзивчива грижа и съвместни игри.",
    high: "Детето показва силни социални и емоционални умения за своята възраст. Продължавайте да подхранвате тази близка връзка.",
  },
  "Познавателно развитие": {
    low: "Познавателните умения — изследване, разбиране на причина и следствие — тепърва се развиват. Насърчавайте прости игри като „скрий и намери“.",
    medium: "Познавателното развитие върви добре, с място за още изследване. Простите игри с причина и следствие подкрепят тази област.",
    high: "Детето показва добро познавателно развитие за своята възраст. Продължавайте да предлагате нови, безопасни предизвикателства за изследване.",
  },
};

const fallbackFeedback = {
  low: "Тази област все още се развива. Кратки, редовни моменти на внимание и игра в тази насока ще помогнат на детето да напредва в собствения си темп.",
  medium: "Тази област се развива добре, с място за още практика в ежедневието.",
  high: "Детето показва добро развитие в тази област за своята възраст. Продължавайте в същата посока.",
};

export const generalGuidance =
  "Всяко дете се развива с различно темпо и тези резултати са само ориентировъчни — целта им е да ви помогнат да забележите областите, в които детето може да се възползва от още игра и внимание, а не да поставят диагноза. При притеснения винаги споделяйте резултатите с педиатър или специалист по детско развитие.";

/** Supportive guidance copy for a domain score — shared by results screen and dashboard. */
export function feedbackForScore(domain: string, percentage: number): string {
  const tiers = domainFeedback[domain] ?? fallbackFeedback;
  if (percentage < 40) return tiers.low;
  if (percentage < 75) return tiers.medium;
  return tiers.high;
}

export type OverallLevel = "red" | "yellow" | "green";

export interface OverallStatus {
  level: OverallLevel;
  label: string;
}

const overallLabels: Record<OverallLevel, string> = {
  red: "Нужно е внимание",
  yellow: "Наблюдавайте развитието",
  green: "Добро общо развитие",
};

/** Traffic-light read of the average domain score — same 40/75 bands used for the per-domain feedback tiers, so the two always agree. */
export function getOverallStatus(domainResults: DomainResult[]): OverallStatus {
  if (domainResults.length === 0) {
    return { level: "green", label: overallLabels.green };
  }

  const average =
    domainResults.reduce((sum, result) => sum + result.percentage, 0) /
    domainResults.length;

  const level: OverallLevel = average < 40 ? "red" : average < 75 ? "yellow" : "green";
  return { level, label: overallLabels[level] };
}

/** Aggregates answers into a per-domain score (0–100%) with matching feedback copy, in the domains' first-appearance order. */
export function getDomainResults(
  questions: QuestionnaireQuestion[],
  answers: Record<string, string>,
): DomainResult[] {
  const order: string[] = [];
  const totals = new Map<string, { sum: number; count: number }>();

  for (const q of questions) {
    const value = answers[q.id];
    if (value === undefined) continue;

    if (!totals.has(q.domain)) {
      totals.set(q.domain, { sum: 0, count: 0 });
      order.push(q.domain);
    }
    const entry = totals.get(q.domain)!;
    entry.sum += answerScores[value] ?? 0;
    entry.count += 1;
  }

  return order.map((domain) => {
    const { sum, count } = totals.get(domain)!;
    const percentage = count > 0 ? Math.round(sum / count) : 0;
    return { domain, percentage, feedback: feedbackForScore(domain, percentage) };
  });
}

/**
 * Starter question bank shared across the "Ранно детско развитие" interval
 * pages. Content is placeholder and intentionally domain-general (motor,
 * language, social-emotional, cognitive) so it stays meaningful regardless
 * of exact age — swap in age-specific items here once available.
 */
export const defaultQuestions: QuestionnaireQuestion[] = [
  { id: "q1", domain: "Физическо развитие", text: "Детето задържа стабилно главата си, докато е изправено." },
  { id: "q2", domain: "Физическо развитие", text: "Детето обръща тялото си от гръб на корем и обратно." },
  { id: "q3", domain: "Физическо развитие", text: "Детето посяга и хваща предмети с ръка." },
  { id: "q4", domain: "Физическо развитие", text: "Детето прехвърля предмет от една ръка в друга." },
  { id: "q5", domain: "Физическо развитие", text: "Детето се придвижва самостоятелно (пълзи, лази или прохожда)." },
  { id: "q6", domain: "Физическо развитие", text: "Детето пази равновесие за кратко без опора." },
  { id: "q7", domain: "Език и говор", text: "Детето издава различни звуци, за да привлече внимание." },
  { id: "q8", domain: "Език и говор", text: "Детето реагира с обръщане на глава, когато чуе познат глас." },
  { id: "q9", domain: "Език и говор", text: "Детето повтаря срички или прости думи." },
  { id: "q10", domain: "Език и говор", text: "Детето разбира и изпълнява проста молба без жест (напр. \"дай\")." },
  { id: "q11", domain: "Език и говор", text: "Детето сочи предмет или картинка, за да покаже интерес." },
  { id: "q12", domain: "Език и говор", text: "Детето използва думи или звуци, за да назове познати хора или предмети." },
  { id: "q13", domain: "Социално и емоционално развитие", text: "Детето се усмихва в отговор на познато лице." },
  { id: "q14", domain: "Социално и емоционално развитие", text: "Детето поддържа зрителен контакт по време на игра." },
  { id: "q15", domain: "Социално и емоционално развитие", text: "Детето имитира изражения или действия на възрастен." },
  { id: "q16", domain: "Социално и емоционално развитие", text: "Детето показва предпочитание към определени хора или играчки." },
  { id: "q17", domain: "Социално и емоционално развитие", text: "Детето се успокоява, когато е разстроено, с утеха от възрастен." },
  { id: "q18", domain: "Познавателно развитие", text: "Детето следи с поглед движещ се предмет." },
  { id: "q19", domain: "Познавателно развитие", text: "Детето търси скрит предмет, който е видяло да се скрива." },
  { id: "q20", domain: "Познавателно развитие", text: "Детето изследва предмети чрез пипане, тръскане или удряне." },
  { id: "q21", domain: "Познавателно развитие", text: "Детето показва разбиране за причина и следствие (напр. натиска бутон за звук)." },
  { id: "q22", domain: "Познавателно развитие", text: "Детето разпознава себе си или близки на снимка." },
];
