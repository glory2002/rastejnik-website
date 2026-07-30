export interface Association {
  name: string;
  description: string;
  href: string;
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
    description:
      "Съсловната организация на лекарите. През сайта и регистъра можете да потърсите специалисти и регионални колегии.",
    href: "https://blsbg.com/bg",
    logo: "/images/associations/bls.png",
    logoTone: "dark",
  },
  {
    name: "Асоциация на специалистите по здравни грижи",
    description:
      "Съсловна организация на професионалистите по здравни грижи — сестри, акушерки и свързани специалисти.",
    href: "https://nursing-bg.com/",
    logo: "/images/associations/bapzg.svg",
    logoTone: "light",
  },
  {
    name: "Българска педиатрична асоциация",
    description:
      "Обединява педиатри и специалисти по детско здраве — добра отправна точка за педиатрична грижа и практики.",
    href: "https://pediatria-bg.eu/",
    logo: "/images/associations/bpa-ped.png",
    logoTone: "light",
  },
  {
    name: "Дружество на психолозите в България",
    description:
      "Националната организация на психолозите. През сайта можете да ориентирате към професионална психологическа подкрепа.",
    href: "https://psychology-bg.org/",
    logo: "/images/associations/dprb.png",
    logoTone: "light",
  },
  {
    name: "Сдружение на частно практикуващи логопеди",
    description:
      "Общност на логопеди в частна практика — полезно за контакти при език, говор и комуникация при деца.",
    href: "https://uppslt.bg/",
    logo: "/images/associations/uppslt.png",
    logoTone: "light",
  },
  {
    name: "Асоциация на физиотерапевтите в България",
    description:
      "Обединява кинезитерапевти и рехабилитатори — подходяща насока при двигателно развитие и рехабилитация.",
    href: "https://bgapt.org/",
    logo: "/images/associations/bgapt.png",
    logoTone: "light",
  },
  {
    name: "Алианс на българските акушерки",
    description:
      "Професионална организация на акушерките — подкрепа около раждане, следродилен период и ранна грижа.",
    href: "https://midwivesbulgaria.org/",
    logo: "/images/associations/aba.jpg",
    logoTone: "light",
  },
];
