import type { Metadata } from "next";
import { AboutView, PanelCta } from "@/components/AboutView";
import { CtaSection } from "@/components/CtaSection";
import { EmbroideryOverlay } from "@/components/EmbroideryOverlay";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "За нас — Растежник",
  description:
    "Интердисциплинарен екип и платформа за родители и специалисти в периода на ранното детско развитие — от 0 месеца до 4 години.",
};

export default function AboutPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <Header variant="framed" />

        <AboutView />

        <CtaSection />

        <PanelCta
          title="Готови ли сте да започнете?"
          body="Разгледайте въпросниците — крачка към по-ясна картина за развитието на детето."
        />

        <Footer />
      </main>
      <EmbroideryOverlay />
    </>
  );
}
