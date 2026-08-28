import { artist } from "@/data/artist";

export function About() {
  return (
    <section id="sobre" className="relative border-t border-white/10">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
          Sobre
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
          {artist.name}
        </h2>
        <div className="mt-6 space-y-5 text-[15px] leading-7 text-white/60 sm:mt-8 sm:space-y-6 sm:text-lg sm:leading-9">
          {artist.bio.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === artist.bio.length - 1
                  ? "font-medium text-white/80"
                  : undefined
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
