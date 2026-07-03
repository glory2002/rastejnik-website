import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLead } from "./ui/SectionLead";

export function ContactSection() {
  return (
    <section id="contact" className="w-full bg-cream py-20 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] text-primary">
              Свържете се с нас
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              <SectionLead className="max-w-[424px]">
                Напишете ни съобщение и ние ще се свържем с вас в най-кратки
                срокове.
              </SectionLead>
            </div>
          </Reveal>

          <Reveal
            as="form"
            delay={150}
            className="flex flex-col gap-8 bg-white p-8 md:p-12"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  Име
                </span>
                <input
                  type="text"
                  placeholder="Въведете вашето име"
                  className="w-full border-0 border-b border-[#d1d5db] bg-transparent px-0 pb-3 text-base text-primary-dark placeholder:text-[rgba(31,66,35,0.4)] outline-none focus:border-primary"
                />
              </label>
              <label className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  Имейл
                </span>
                <input
                  type="email"
                  placeholder="example@domain.bg"
                  className="w-full border-0 border-b border-[#d1d5db] bg-transparent px-0 pb-3 text-base text-primary-dark placeholder:text-[rgba(31,66,35,0.4)] outline-none focus:border-primary"
                />
              </label>
            </div>

            <label className="flex flex-col gap-4">
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                Съобщение
              </span>
              <textarea
                rows={6}
                placeholder="Напишете вашето съобщение тук..."
                className="w-full resize-none border-0 border-b border-[#d1d5db] bg-transparent px-0 pb-3 text-base text-primary-dark placeholder:text-[rgba(31,66,35,0.4)] outline-none focus:border-primary"
              />
            </label>

            <Button>изпрати съобщението</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
