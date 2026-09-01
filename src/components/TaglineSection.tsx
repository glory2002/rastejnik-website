import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const verse = [
  "„Поглеждал ли си през очите на дете,",
  "да видиш красотата на живота —",
  "как паяжинка паяче плете",
  "и пърха пеперуда без посока,",
  "как утрото със трепет се задава",
  "и всеки ден е ново приключение,",
  "как цялата вселена оживява",
  "през погледа на детско сътворение.“",
] as const;

export function TaglineSection() {
  return (
    <section
      id="tagline-section"
      className="relative w-full overflow-hidden bg-cream py-14 sm:py-20 md:py-40"
    >
      <Container className="relative z-20">
        <Reveal className="max-w-[1100px]">
          <p className="font-medium text-primary text-[clamp(1.35rem,3.2vw,2.75rem)] leading-[1.35]">
            {verse.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-6 text-[clamp(1rem,1.8vw,1.25rem)] font-medium leading-none text-primary sm:mt-8">
            Г.Ангелова
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
