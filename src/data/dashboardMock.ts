import {
  findAgeSubcategory,
  questionnaireCategories,
  type QuestionnaireAccent,
} from "@/data/questionnaires";

/**
 * Mock data for the logged-in parent dashboard (`/dashboard`). There is no
 * auth/backend yet, so a child's test history normally recorded server-side
 * is hard-coded here purely to make the screen demoable end to end.
 */

export const dashboardDomains = [
  "Език и говор",
  "Познавателно развитие",
  "Физическо развитие",
  "Социално и емоционално развитие",
] as const;

export type DashboardDomain = (typeof dashboardDomains)[number];

export type DashboardCell =
  | { kind: "na" }
  | { kind: "done"; values: number[] }
  | { kind: "pending"; prompt: string; href: string }
  | { kind: "upcoming" };

export type DashboardChildGender = "boy" | "girl";

export interface DashboardTable {
  columns: string[];
  domains: readonly string[];
  rows: Record<string, DashboardCell[]>;
}

export interface EarlyDevelopmentBand {
  slug: string;
  title: string;
  shortTitle: string;
  /** Same accent as the questionnaire age card (pink / orange / green / blue). */
  accent: QuestionnaireAccent;
  table: DashboardTable;
}

/** One of the three parental questionnaires (not early childhood development). */
export interface ParentalQuestionnaireResult {
  slug: string;
  title: string;
  icon: string;
  iconClass?: string;
  cell: DashboardCell;
}

export interface DashboardChild {
  id: string;
  name: string;
  gender: DashboardChildGender;
  ageLabel: string;
  /** Age band the child is currently in — drives default tab / timeline node. */
  currentAgeGroupSlug: string;
  earlyDevelopmentBands: EarlyDevelopmentBand[];
  /** One result each for грамотност / компетентност / родител–специалист. */
  parentalQuestionnaires: ParentalQuestionnaireResult[];
}

export interface NewChildInput {
  name: string;
  /** `YYYY-MM` from `<input type="month">`. */
  birthMonth: string;
  gender: "Момче" | "Момиче";
}

function pendingCell(ageSlug: string, intervalLabel: string): DashboardCell {
  const sub = findAgeSubcategory(ageSlug);
  const interval = sub?.intervals.find((i) => i.label === intervalLabel);
  return {
    kind: "pending",
    prompt: `Направи тест за ${intervalLabel}`,
    href: `/questionnaires/ranno-detsko-razvitie/${ageSlug}/${interval?.slug ?? ""}`,
  };
}

const parentalQuestionnaireMeta = questionnaireCategories.filter(
  (category) => category.slug !== "ranno-detsko-razvitie",
);

function parentalPending(title: string): DashboardCell {
  return {
    kind: "pending",
    prompt: `Направи теста „${title}"`,
    href: "/questionnaires",
  };
}

function parentalQuestionnaireResults(
  cells: Record<string, DashboardCell>,
): ParentalQuestionnaireResult[] {
  return parentalQuestionnaireMeta.map((category) => ({
    slug: category.slug,
    title: category.title,
    icon: category.icon,
    iconClass: category.iconClass,
    cell: cells[category.slug] ?? parentalPending(category.title),
  }));
}

function columnsForAgeSlug(ageSlug: string): string[] {
  const sub = findAgeSubcategory(ageSlug);
  if (!sub) return [];
  if (ageSlug === "0-1-godina") {
    return sub.intervals.map((_, i) => `Месец ${i + 1}`);
  }
  return sub.intervals.map((interval) => interval.label);
}

function rowsFromCells(
  build: (domain: DashboardDomain) => DashboardCell[],
): Record<DashboardDomain, DashboardCell[]> {
  return {
    "Език и говор": build("Език и говор"),
    "Познавателно развитие": build("Познавателно развитие"),
    "Физическо развитие": build("Физическо развитие"),
    "Социално и емоционално развитие": build(
      "Социално и емоционално развитие",
    ),
  };
}

function upcomingRows(columnCount: number): Record<DashboardDomain, DashboardCell[]> {
  return rowsFromCells(() =>
    Array.from({ length: columnCount }, () => ({ kind: "upcoming" as const })),
  );
}

function doneRows(
  valuesByDomain: Record<DashboardDomain, number[]>,
): Record<DashboardDomain, DashboardCell[]> {
  return rowsFromCells((domain) =>
    valuesByDomain[domain].map((value) => ({
      kind: "done" as const,
      values: [value],
    })),
  );
}

function makeBand(
  slug: string,
  shortTitle: string,
  rows: Record<DashboardDomain, DashboardCell[]>,
): EarlyDevelopmentBand {
  const sub = findAgeSubcategory(slug);
  const columns = columnsForAgeSlug(slug);
  return {
    slug,
    title: sub?.title ?? shortTitle,
    shortTitle,
    accent: sub?.accent ?? "green",
    table: {
      columns,
      domains: dashboardDomains,
      rows,
    },
  };
}

/** 0–1 for Иванчо: N/A, done at month 3, pending month 4, then upcoming. */
function ivanchoZeroOneCells(doneValue: number): DashboardCell[] {
  return columnsForAgeSlug("0-1-godina").map((_, i) => {
    if (i < 2) return { kind: "na" };
    if (i === 2) return { kind: "done", values: [doneValue] };
    if (i === 3) return pendingCell("0-1-godina", "4 месеца");
    return { kind: "upcoming" };
  });
}

const ivanchoZeroOneRows = rowsFromCells((domain) =>
  ivanchoZeroOneCells(
    domain === "Физическо развитие" ? 83 : 75,
  ),
);

const petyaTwoThreeRows: Record<DashboardDomain, DashboardCell[]> = {
  "Език и говор": [
    { kind: "done", values: [88] },
    { kind: "done", values: [92] },
    pendingCell("2-3-godini", "2г 9м"),
    { kind: "upcoming" },
  ],
  "Познавателно развитие": [
    { kind: "done", values: [70] },
    { kind: "done", values: [65] },
    pendingCell("2-3-godini", "2г 9м"),
    { kind: "upcoming" },
  ],
  "Физическо развитие": [
    { kind: "done", values: [95] },
    { kind: "done", values: [90] },
    pendingCell("2-3-godini", "2г 9м"),
    { kind: "upcoming" },
  ],
  "Социално и емоционално развитие": [
    { kind: "done", values: [80] },
    { kind: "done", values: [85] },
    pendingCell("2-3-godini", "2г 9м"),
    { kind: "upcoming" },
  ],
};

/** Sample completed history for Петя’s earlier age bands. */
const petyaZeroOneRows = doneRows({
  "Език и говор": [70, 72, 74, 76, 78, 80, 82, 84, 85, 86, 88, 90],
  "Познавателно развитие": [68, 70, 72, 74, 75, 76, 78, 80, 82, 83, 85, 86],
  "Физическо развитие": [80, 82, 84, 86, 88, 90, 91, 92, 93, 94, 95, 96],
  "Социално и емоционално развитие": [
    72, 74, 76, 78, 80, 81, 82, 84, 85, 86, 88, 89,
  ],
});

const petyaOneTwoRows = doneRows({
  "Език и говор": [86, 88, 90, 91],
  "Познавателно развитие": [78, 80, 82, 84],
  "Физическо развитие": [92, 93, 94, 95],
  "Социално и емоционално развитие": [84, 86, 87, 88],
});


export const dashboardChildren: DashboardChild[] = [
  {
    id: "ivancho",
    name: "Иванчо",
    gender: "boy",
    ageLabel: "3 месеца",
    currentAgeGroupSlug: "0-1-godina",
    earlyDevelopmentBands: [
      makeBand("0-1-godina", "0–1 г.", ivanchoZeroOneRows),
      makeBand(
        "1-2-godini",
        "1–2 г.",
        upcomingRows(columnsForAgeSlug("1-2-godini").length),
      ),
      makeBand(
        "2-3-godini",
        "2–3 г.",
        upcomingRows(columnsForAgeSlug("2-3-godini").length),
      ),
      makeBand(
        "3-4-godini",
        "3–4 г.",
        upcomingRows(columnsForAgeSlug("3-4-godini").length),
      ),
    ],
    parentalQuestionnaires: parentalQuestionnaireResults(
      Object.fromEntries(
        parentalQuestionnaireMeta.map((category) => [
          category.slug,
          parentalPending(category.title),
        ]),
      ),
    ),
  },
  {
    id: "petya",
    name: "Петя",
    gender: "girl",
    ageLabel: "2 години",
    currentAgeGroupSlug: "2-3-godini",
    earlyDevelopmentBands: [
      makeBand("0-1-godina", "0–1 г.", petyaZeroOneRows),
      makeBand("1-2-godini", "1–2 г.", petyaOneTwoRows),
      makeBand("2-3-godini", "2–3 г.", petyaTwoThreeRows),
      makeBand(
        "3-4-godini",
        "3–4 г.",
        upcomingRows(columnsForAgeSlug("3-4-godini").length),
      ),
    ],
    parentalQuestionnaires: parentalQuestionnaireResults({
      "roditelska-gramotnost": { kind: "done", values: [82] },
      "roditelska-kompetentnost": { kind: "done", values: [76] },
      "roditel-specialist": parentalPending(
        "Взаимоотношения родител-специалист",
      ),
    }),
  },
];

const AGE_BAND_DEFS = [
  { slug: "0-1-godina", shortTitle: "0–1 г.", maxExclusive: 12 },
  { slug: "1-2-godini", shortTitle: "1–2 г.", maxExclusive: 24 },
  { slug: "2-3-godini", shortTitle: "2–3 г.", maxExclusive: 36 },
  { slug: "3-4-godini", shortTitle: "3–4 г.", maxExclusive: Infinity },
] as const;

function ageMonthsFromBirthMonth(birthMonth: string): number {
  const [year, month] = birthMonth.split("-").map(Number);
  if (!year || !month) return 0;
  const now = new Date();
  return Math.max(
    0,
    (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month),
  );
}

function ageLabelFromMonths(months: number): string {
  if (months < 1) return "Новородено";
  if (months === 1) return "1 месец";
  if (months < 12) return `${months} месеца`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return years === 1 ? "1 година" : `${years} години`;
  return `${years}г ${rem}м`;
}

function currentBandIndex(ageMonths: number): number {
  return AGE_BAND_DEFS.findIndex((band) => ageMonths < band.maxExclusive);
}

function currentIntervalIndex(ageSlug: string, ageMonths: number): number {
  const columns = columnsForAgeSlug(ageSlug);
  if (columns.length === 0) return 0;
  if (ageSlug === "0-1-godina") {
    return Math.min(Math.max(ageMonths, 0), columns.length - 1);
  }
  const bandStart =
    ageSlug === "1-2-godini" ? 12 : ageSlug === "2-3-godini" ? 24 : 36;
  const within = Math.max(0, ageMonths - bandStart);
  return Math.min(Math.floor(within / 3), columns.length - 1);
}

function emptyBandRows(
  ageSlug: string,
  bandIndex: number,
  activeBandIndex: number,
  ageMonths: number,
): Record<DashboardDomain, DashboardCell[]> {
  const columns = columnsForAgeSlug(ageSlug);
  if (bandIndex < activeBandIndex) {
    return rowsFromCells(() =>
      Array.from({ length: columns.length }, () => ({ kind: "na" as const })),
    );
  }
  if (bandIndex > activeBandIndex) {
    return upcomingRows(columns.length);
  }
  const pendingIndex = currentIntervalIndex(ageSlug, ageMonths);
  return rowsFromCells(() =>
    columns.map((label, i) => {
      if (i < pendingIndex) return { kind: "na" as const };
      if (i === pendingIndex) return pendingCell(ageSlug, label);
      return { kind: "upcoming" as const };
    }),
  );
}

/** Builds a fresh dashboard child with empty / pending test history. */
export function createDashboardChild(input: NewChildInput): DashboardChild {
  const ageMonths = ageMonthsFromBirthMonth(input.birthMonth);
  const bandIdx = Math.max(0, currentBandIndex(ageMonths));
  const current = AGE_BAND_DEFS[bandIdx] ?? AGE_BAND_DEFS[0];

  return {
    id: `child-${Date.now()}`,
    name: input.name.trim(),
    gender: input.gender === "Момиче" ? "girl" : "boy",
    ageLabel: ageLabelFromMonths(ageMonths),
    currentAgeGroupSlug: current.slug,
    earlyDevelopmentBands: AGE_BAND_DEFS.map((band, index) =>
      makeBand(
        band.slug,
        band.shortTitle,
        emptyBandRows(band.slug, index, bandIdx, ageMonths),
      ),
    ),
    parentalQuestionnaires: parentalQuestionnaireResults(
      Object.fromEntries(
        parentalQuestionnaireMeta.map((category) => [
          category.slug,
          parentalPending(category.title),
        ]),
      ),
    ),
  };
}

/** Red / orange / green tiers, same thresholds used on the results screen. */
export function resultTierColor(percentage: number): string {
  if (percentage <= 100 / 3) return "var(--color-status-red)";
  if (percentage <= 200 / 3) return "var(--color-accent-orange)";
  return "var(--color-primary)";
}

export function resultTierColorLight(percentage: number): string {
  if (percentage <= 100 / 3) return "var(--color-status-red-light)";
  if (percentage <= 200 / 3) return "var(--color-accent-orange-light)";
  return "var(--color-accent-green-light)";
}
