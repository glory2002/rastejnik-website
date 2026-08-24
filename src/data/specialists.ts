export interface AssociationHighlight {
  label: string;
}

export interface Association {
  name: string;
  description: string;
  href: string;
  /** Uppercase category chip above the title. */
  category: string;
  /** Short secondary cues under the description. */
  highlights: AssociationHighlight[];
  logo: string;
  /** Dark well for marks that ship on black (e.g. BLS monogram). */
  logoTone?: "light" | "dark";
}

/**
 * Professional associations recommended as starting points for finding
 * related practices and contacts. More entries can be added later.
 */
export const associations: Association[] = [
  {
    name: "Български лекарски съюз",
    category: "Лекари и медицински специалисти",
    description:
      "Съсловната организация на лекарите. През сайта и регистъра можете да потърсите специалисти и регионални колегии.",
    href: "https://blsbg.com/bg",
    highlights: [
      { label: "Регистър на лекари" },
      { label: "Регионални колегии" },
      { label: "Намери близо до теб" },
    ],
    logo: "/images/associations/bls.png",
    logoTone: "dark",
  },
  {
    name: "Асоциация на специалистите по здравни грижи",
    category: "Здравни грижи",
    description:
      "Съсловна организация на професионалистите по здравни грижи — сестри, акушерки и свързани специалисти.",
    href: "https://nursing-bg.com/",
    highlights: [
      { label: "Членство" },
      { label: "Регионални структури" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/bapzg.svg",
    logoTone: "light",
  },
  {
    name: "Българска педиатрична асоциация",
    category: "Педиатрия",
    description:
      "Обединява педиатри и специалисти по детско здраве — добра отправна точка за педиатрична грижа и практики.",
    href: "https://pediatria-bg.eu/",
    highlights: [
      { label: "За асоциацията" },
      { label: "Събития" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/bpa-ped.png",
    logoTone: "light",
  },
  {
    name: "Дружество на психолозите в България",
    category: "Психология",
    description:
      "Националната организация на психолозите. През сайта можете да ориентирате към професионална психологическа подкрепа.",
    href: "https://psychology-bg.org/",
    highlights: [
      { label: "За дружеството" },
      { label: "Ресурси" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/dprb.png",
    logoTone: "light",
  },
  {
    name: "Сдружение на частно практикуващи логопеди",
    category: "Логопедия",
    description:
      "Общност на логопеди в частна практика — полезно за контакти при език, говор и комуникация при деца.",
    href: "https://uppslt.bg/",
    highlights: [
      { label: "За сдружението" },
      { label: "Членове" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/uppslt.png",
    logoTone: "light",
  },
  {
    name: "Асоциация на физиотерапевтите в България",
    category: "Физиотерапия и рехабилитация",
    description:
      "Обединява кинезитерапевти и рехабилитатори — подходяща насока при двигателно развитие и рехабилитация.",
    href: "https://bgapt.org/",
    highlights: [
      { label: "За асоциацията" },
      { label: "Регистър" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/bgapt.png",
    logoTone: "light",
  },
  {
    name: "Алианс на българските акушерки",
    category: "Акушерство",
    description:
      "Професионална организация на акушерките — подкрепа около раждане, следродилен период и ранна грижа.",
    href: "https://midwivesbulgaria.org/",
    highlights: [
      { label: "За алианса" },
      { label: "Ресурси" },
      { label: "Контакти" },
    ],
    logo: "/images/associations/aba.jpg",
    logoTone: "light",
  },
];
