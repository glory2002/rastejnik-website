export type ResourceKind = "video" | "book";

export interface ResourceItem {
  id: string;
  kind: ResourceKind;
  title: string;
  excerpt: string;
  /** YouTube watch URL or path/URL to a PDF. */
  href: string;
  /** YouTube video id — used for thumbnail. */
  youtubeId?: string;
}

/**
 * Mixed videos + books for one card grid. Videos open on YouTube in a new
 * tab; books link to PDFs under `/public/resources/books/`.
 */
export const resources: ResourceItem[] = [
  {
    id: "video-ranno-razvitie",
    kind: "video",
    title: "Ранно детско развитие — основи за родители",
    excerpt:
      "Кратък преглед на ключови етапи в първите години и как да наблюдавате без паника.",
    href: "https://www.youtube.com/watch?v=aISXCw0Pi94",
    youtubeId: "aISXCw0Pi94",
  },
  {
    id: "book-hranene",
    kind: "book",
    title: "Хранене в ранна възраст — наръчник за родители",
    excerpt:
      "PDF с кратки насоки за хранене без борба и как да четете сигналите на детето.",
    href: "/resources/books/hranene-narachnik.pdf",
  },
  {
    id: "video-igra",
    kind: "video",
    title: "Играта като език на малкото дете",
    excerpt:
      "Защо присъствието в играта изгражда връзка и как да включите 10 минути на ден.",
    href: "https://www.youtube.com/watch?v=pjtqUswq_4Q",
    youtubeId: "pjtqUswq_4Q",
  },
  {
    id: "book-razvitie",
    kind: "book",
    title: "Наблюдаване на развитието 0–3 г.",
    excerpt:
      "Справочен материал за етапи, червени флагове и кога да потърсите специалист.",
    href: "/resources/books/razvitie-0-3.pdf",
  },
  {
    id: "video-granici",
    kind: "video",
    title: "Граници с любов в ежедневието",
    excerpt:
      "Как да казвате „не“ спокойно и последователно — без срам и без дълги лекции.",
    href: "https://www.youtube.com/watch?v=1OWdqfo6Y0g",
    youtubeId: "1OWdqfo6Y0g",
  },
  {
    id: "book-igra",
    kind: "book",
    title: "Игри за връзка у дома",
    excerpt:
      "Списък с кратки игри без специални материали — за всекидневието у дома.",
    href: "/resources/books/igri-za-vrazka.pdf",
  },
  {
    id: "video-sun",
    kind: "video",
    title: "Сън и ритуали при малки деца",
    excerpt:
      "Практични идеи за предсказуема вечер и по-спокойно заспиване.",
    href: "https://www.youtube.com/watch?v=i6TEQex0dY0",
    youtubeId: "i6TEQex0dY0",
  },
];
