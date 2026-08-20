import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfileView } from "@/components/ProfileView";
import { Container } from "@/components/ui/Container";
import { Body, Display } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Профил — Растежник",
  description: "Преглед и редакция на данните във вашия профил в Растежник.",
};

export default function ProfilePage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <nav
            aria-label="Пътека"
            className="mb-6 flex flex-wrap items-center gap-2 text-label font-medium text-primary-dark/60"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Профил</span>
          </nav>

          <Display className="max-w-[700px]">Профил</Display>
          <Body className="mt-6 max-w-[560px]">
            Данните за родителя — може да ги обновите по всяко време. Децата се
            управляват от таблото.
          </Body>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto w-full max-w-[720px]">
            <ProfileView />
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
