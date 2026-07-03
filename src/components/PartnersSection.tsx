import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Placeholder marks only — swap `partners` for the real partner logos
 * (as image assets) once they're provided. Kept as simple inline SVGs so
 * nothing breaks visually in the meantime.
 */
const partners = [
  { name: "Ейпекс" },
  { name: "Нордвю" },
  { name: "Кедрина" },
  { name: "Солара" },
  { name: "Вертис" },
  { name: "Лумина" },
];

function PlaceholderMark({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 opacity-50 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0">
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        aria-hidden
        className="shrink-0 text-primary"
      >
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
        <path
          d="M16 8L20 16L16 24L12 16L16 8Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-xl font-bold uppercase tracking-wide text-primary-dark">
        {name}
      </span>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="w-full bg-[#fefefc] py-16 md:py-24">
      <Container>
        <Reveal
          as="h2"
          className="mx-auto mb-16 max-w-[1000px] text-center text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] text-primary"
        >
          Партньори
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 60}>
              <PlaceholderMark name={partner.name} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
