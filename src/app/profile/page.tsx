import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfileView } from "@/components/ProfileView";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealStack } from "@/components/ui/Reveal";
import { Body, Display } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Профил — Растежник",
  description: "Преглед и редакция на данните във вашия профил в Растежник.",
};

export default function ProfilePage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <RevealStack>
            <Display className="max-w-[700px]">Профил</Display>
            <Body className="mt-5 max-w-[560px] sm:mt-6">
              Данните за родителя — може да ги обновите по всяко време. Децата се
              управляват от таблото.
            </Body>
          </RevealStack>
        </Container>
      </section>

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <Reveal delay={160} className="mx-auto w-full max-w-[720px]">
            <ProfileView />
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
