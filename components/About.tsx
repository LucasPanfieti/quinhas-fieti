import { artist } from "@/data/artist";

const lead = artist.bio.slice(0, -1);
const closer = artist.bio[artist.bio.length - 1];

export function About() {
  return (
    <section id="sobre" className="relative border-t border-white/10 py-16 sm:py-28">
      <div className="grid gap-10 px-4 sm:gap-12 sm:px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] md:items-start md:gap-14 md:px-6 lg:gap-20">
        <header className="md:sticky md:top-[calc(4.5rem+env(safe-area-inset-top,0px))]">
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            Sobre
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl md:text-[4.5rem] md:leading-[0.92]">
            {artist.name}
          </h2>
          {closer ? (
            <p className="mt-5 max-w-sm font-display text-[1.65rem] leading-[1.05] tracking-wide text-accent sm:mt-6 sm:text-[2rem]">
              {closer}
            </p>
          ) : null}
          <a
            href={`mailto:${artist.email}`}
            className="mt-6 inline-flex text-sm font-medium text-white/55 underline-offset-4 transition hover:text-white hover:underline sm:mt-8"
          >
            {artist.email}
          </a>
        </header>

        <div className="max-w-2xl space-y-5 text-[15px] leading-7 text-white/60 sm:space-y-6 sm:text-lg sm:leading-9">
          {lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
