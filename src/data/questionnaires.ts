export interface AgeInterval {
  /** Short label for the timeline marker, e.g. "1 месец" or "1г 3м". */
  label: string;
  /** URL-safe identifier derived from the label, e.g. "1-mesec". */
  slug: string;
}

export interface QuestionnaireSubcategory {
  slug: string;
  title: string;
  description: string;
  /** Individual checkpoints within this age range (monthly, quarterly, etc). */
  intervals: AgeInterval[];
}

export interface QuestionnaireCategory {
  slug: string;
  icon: string;
  iconClass?: string;
  title: string;
  description: string;
  subcategories?: QuestionnaireSubcategory[];
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
  ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
};

function slugify(label: string): string {
  return label
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const monthlyIntervals = (count: number): AgeInterval[] =>
  Array.from({ length: count }, (_, i) => {
    const label = `${i + 1} месец${i === 0 ? "" : "а"}`;
    return { label, slug: slugify(label) };
  });

const quarterlyIntervals = (startYear: number): AgeInterval[] =>
  [
    `${startYear}г 3м`,
    `${startYear}г 6м`,
    `${startYear}г 9м`,
    `${startYear + 1} години`,
  ].map((label) => ({ label, slug: slugify(label) }));

export const questionnaireCategories: QuestionnaireCategory[] = [
  {
    slug: "roditelska-gramotnost",
    icon: "/images/icon-pink.svg",
    iconClass: "rotate-90",
    title: "Родителска грамотност",
    description:
      "Проверете доколко разпознавате мит от научен факт в най-често срещаните теми за отглеждане и развитие на дете.",
  },
  {
    slug: "roditelska-kompetentnost",
    icon: "/images/icon-green.svg",
    title: "Родителска компетентност",
    description:
      "Кратка самооценка на увереността и уменията ви да отговаряте на нуждите на детето във всекидневни ситуации.",
  },
  {
    slug: "roditel-specialist",
    icon: "/images/icon-blue.svg",
    iconClass: "-rotate-90",
    title: "Взаимоотношения родител-специалист",
    description:
      "Оценете комуникацията, доверието и удовлетвореността от съвместната работа с педиатри, логопеди и други специалисти.",
  },
  {
    slug: "ranno-detsko-razvitie",
    icon: "/images/icon-orange.svg",
    iconClass: "rotate-90",
    title: "Ранно детско развитие",
    description:
      "Валидирани оценки на развитието на детето по възрастови групи до 4-годишна възраст — изберете възрастта на детето, за да започнете.",
    subcategories: [
      {
        slug: "0-1-godina",
        title: "0 – 1 година",
        description: "Рефлекси, задържане на главата, сядане, пълзене.",
        intervals: monthlyIntervals(12),
      },
      {
        slug: "1-2-godini",
        title: "1 – 2 години",
        description: "Прохождане, първи думи, самостоятелно хранене.",
        intervals: quarterlyIntervals(1),
      },
      {
        slug: "2-3-godini",
        title: "2 – 3 години",
        description: "Кратки фрази, игра с други деца, самообслужване.",
        intervals: quarterlyIntervals(2),
      },
      {
        slug: "3-4-godini",
        title: "3 – 4 години",
        description: "Свързана реч, баланс и координация, социални игри.",
        intervals: quarterlyIntervals(3),
      },
    ],
  },
];

export function findAgeSubcategory(slug: string) {
  const parent = questionnaireCategories.find(
    (category) => category.slug === "ranno-detsko-razvitie",
  );
  return parent?.subcategories?.find((sub) => sub.slug === slug);
}

export function findInterval(ageSlug: string, intervalSlug: string) {
  const sub = findAgeSubcategory(ageSlug);
  if (!sub) return null;
  const index = sub.intervals.findIndex((i) => i.slug === intervalSlug);
  if (index === -1) return null;
  return { sub, interval: sub.intervals[index], index };
}
