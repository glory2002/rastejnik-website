import { Container } from "./ui/Container";
import { CtaShevitsa } from "./CtaShevitsa";
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
      className="relative w-full overflow-hidden bg-cream py-section-emphasis"
    >
      <CtaShevitsa tone="cream" />
      <Container className="relative z-20">
        <div className="max-w-[1100px]">
          <p className="font-medium text-primary text-[clamp(1.35rem,3.2vw,2.75rem)] leading-[1.35]">
            {verse.map((line, index) => (
              <Reveal key={line} as="span" delay={index * 70} className="block">
                {line}
              </Reveal>
            ))}
          </p>
          <Reveal delay={verse.length * 70 + 40}>
            <p className="mt-cluster text-[clamp(1rem,1.8vw,1.25rem)] font-medium leading-none text-primary">
              Г.Ангелова
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
