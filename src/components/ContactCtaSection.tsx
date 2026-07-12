import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full bg-white py-16 md:py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-[600px] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
            Имате въпрос към нас?
          </h2>
          <p className="max-w-[500px] text-lg leading-[1.3] text-primary-dark">
            Пишете ни — с удоволствие ще отговорим.
          </p>
          <Button>свържи се с нас</Button>
        </Reveal>
      </Container>
    </section>
  );
}
