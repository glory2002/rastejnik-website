export interface AboutValue {
  icon: string;
  iconClass?: string;
  title: string;
  description: string;
}

export interface AboutGoal {
  title: string;
  description: string;
}

/** Who we are — short paragraphs for the „Кой сме“ section. */
export const aboutWhoWeAre = [
  "Растежник е образователна платформа за родители и специалисти, посветена на първите години от живота на детето.",
  "Започнахме от нуждата от кратки, ясни и валидирани отговори — без паника, без сравнения и без безкраен скрол във форуми.",
  "Работим с педиатри, психолози, логопеди и рехабилитатори, за да превърнем наученото в практични насоки за ежедневието.",
];

/** Ideas we stand on — shown as „Идеи“. */
export const aboutIdeas: AboutValue[] = [
  {
    icon: "/images/icon-pink.svg",
    iconClass: "rotate-90",
    title: "Основано на доказателства",
    description:
      "Всяка препоръка минава през специалисти по детско развитие, преди да стигне до вас — не мода, а научени факти.",
  },
  {
    icon: "/images/icon-green.svg",
    title: "Родителите са експертите",
    description:
      "Ние подкрепяме, не предписваме. Вие познавате детето си най-добре — Растежник само подрежда информацията.",
  },
  {
    icon: "/images/icon-blue.svg",
    iconClass: "-rotate-90",
    title: "Без надпревара",
    description:
      "Всяко дете расте със свой темп. Помагаме ви да наблюдавате развитието, а не да го сравнявате с чуждото.",
  },
  {
    icon: "/images/icon-orange.svg",
    iconClass: "rotate-90",
    title: "Общност от специалисти",
    description:
      "Работим ръка за ръка с психолози, логопеди и рехабилитатори, за да получите сигурен и кратък отговор.",
  },
];

/** Goals — shown as „Цели“. */
export const aboutGoals: AboutGoal[] = [
  {
    title: "Ясна ориентация за родителя",
    description:
      "Да дадем кратки инструменти — въпросници, съвети и ресурси — с които да разберете къде се намира детето ви и какво следва.",
  },
  {
    title: "По-малко шум, повече сигурност",
    description:
      "Да намалим тревогата от противоречиви съвети онлайн и да предложим една спокойна, проверена отправна точка.",
  },
  {
    title: "Мост към специалисти",
    description:
      "Да насочим към асоциации и практики, когато е нужна професионална подкрепа — без да заместваме медицински съвет.",
  },
];

/** @deprecated Prefer aboutIdeas — kept for any leftover imports. */
export const aboutValues = aboutIdeas;
