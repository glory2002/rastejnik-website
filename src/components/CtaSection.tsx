import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function CtaSection() {
  return (
    <section
      id="cta-section"
      className="relative w-full overflow-hidden bg-primary py-24 md:py-40"
    >
      <Container className="relative z-20">
        <Reveal
          as="p"
          className="max-w-[950px] text-left text-[clamp(2rem,4.6vw,4.75rem)] font-medium leading-[1.2] text-white"
        >
          Развитието не е състезание. Растежник помага да го наблюдавате, а не
          да го сравнявате.
        </Reveal>
      </Container>
    </section>
  );
}
