export interface AboutValue {
  icon: string;
  iconClass?: string;
  title: string;
  description: string;
}

export const aboutValues: AboutValue[] = [
  {
    icon: "/images/icon-pink.svg",
    iconClass: "rotate-90",
    title: "Основано на доказателства",
    description:
      "Всяка препоръка минава през педиатри и специалисти по детско развитие, преди да стигне до вас — не мода, а научени факти.",
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
