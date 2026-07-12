import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ContactCtaSection } from "@/components/ContactCtaSection";
import { TaglineSection } from "@/components/TaglineSection";
import { Footer } from "@/components/Footer";
import { EmbroideryOverlay } from "@/components/EmbroideryOverlay";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <CtaSection />
      <FaqSection />
      <PartnersSection />
      <TaglineSection />
      <ContactCtaSection />
      <Footer />
      <EmbroideryOverlay />
    </main>
  );
}
