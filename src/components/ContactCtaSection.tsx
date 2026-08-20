"use client";

import { ContactButton } from "@/components/ContactModal";
import { Body, Title } from "@/components/ui/Typography";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full bg-white py-16 md:py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <Title className="max-w-[600px]">Имате въпрос към нас?</Title>
          <Body className="max-w-[500px]">
            Пишете ни — с удоволствие ще отговорим.
          </Body>
          <ContactButton />
        </Reveal>
      </Container>
    </section>
  );
}
