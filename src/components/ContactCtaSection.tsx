"use client";

import { ContactButton } from "@/components/ContactModal";
import { Body, Title } from "@/components/ui/Typography";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full bg-white py-12 sm:py-16 md:py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <Title className="max-w-[600px] text-balance">
            Имате въпрос към нас?
          </Title>
          <Body className="max-w-[500px]">
            Пишете ни — с удоволствие ще отговорим.
          </Body>
          <ContactButton />
        </Reveal>
      </Container>
    </section>
  );
}
