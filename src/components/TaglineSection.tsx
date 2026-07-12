import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function TaglineSection() {
  return (
    <section
      id="tagline-section"
      className="relative w-full overflow-hidden bg-cream py-24 md:py-40"
    >
      <Container className="relative z-20">
        <Reveal
          as="p"
          className="max-w-[950px] text-[clamp(2rem,4.6vw,4.75rem)] font-medium leading-[1.2] text-primary"
        >
          Всяко дете има свое темпо. Ние сме тук, за да ви помогнем да го
          разберете.
        </Reveal>
      </Container>
    </section>
  );
}
