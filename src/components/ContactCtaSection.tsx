"use client";

import { ContactButton } from "@/components/ContactModal";
import { Body, Title } from "@/components/ui/Typography";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full bg-white py-section-quiet">
      <Container>
        <div className="flex flex-col items-center gap-cluster text-center">
          <Reveal>
            <Title className="max-w-[600px] text-balance">
              Имате въпрос към нас?
            </Title>
          </Reveal>
          <Reveal delay={120}>
            <Body className="max-w-[500px]">
              Пишете ни — с удоволствие ще отговорим.
            </Body>
          </Reveal>
          <Reveal delay={220}>
            <ContactButton />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
