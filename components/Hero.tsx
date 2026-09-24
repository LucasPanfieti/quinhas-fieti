import Image from "next/image";
import {
  formatShortReleaseDate,
  getVersionLabel,
  type Track,
} from "@/data/tracks";
import { ChevronDownIcon } from "@/components/icons";

type HeroProps = {
  recent: Track[];
  onSelect: (track: Track) => void;
};

export function Hero({ recent, onSelect }: HeroProps) {
  return (
    <section
      id="topo"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      <Image
        src="/hero-bg.webp"
        alt=""
        fill
        priority
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1920px) 100vw, 1920px"
        className="object-cover object-[center_22%] md:object-center"
      />
      <div className="hero-veil absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-[max(5.75rem,calc(4.5rem+env(safe-area-inset-bottom)))] pt-[calc(5.5rem+env(safe-area-inset-top))] text-center sm:px-6 md:pb-24">
        <div className="relative mb-6 size-28 min-[380px]:size-32 sm:mb-8 sm:size-44 md:size-56 [@media(max-height:700px)]:mb-4 [@media(max-height:700px)]:size-24 sm:[@media(max-height:700px)]:size-32">
          <div className="absolute inset-[-14%] rounded-full bg-accent/30 blur-3xl" />
          <div className="group relative h-full w-full overflow-hidden rounded-full shadow-[0_0_40px_rgba(225,6,0,0.35)] ring-1 ring-white/15">
            <Image
              src="/logo.webp"
              alt="Quinhas Fieti"
              width={224}
              height={224}
              sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 224px"
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              priority
            />
          </div>
        </div>

        <p className="font-display text-[clamp(1.35rem,6.5vw,2rem)] tracking-[0.1em] text-white sm:text-[2rem] sm:tracking-[0.2em] [@media(max-height:700px)]:text-[1.25rem]">
          Últimos lançamentos
        </p>

        {recent.length > 0 ? (
          <div className="mt-8 w-full max-w-md sm:mt-10 sm:max-w-lg [@media(max-height:700px)]:mt-5">
            <ul className="space-y-2 sm:space-y-2.5">
              {recent.map((track, index) => {
                const isLatest = index === 0;
                const status = isLatest ? "Novo" : "Disponível";

                return (
                  <li key={track.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(track)}
                      style={{ ["--track-accent" as string]: track.accentColor }}
                      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/25 px-3 py-2.5 text-left backdrop-blur-sm transition duration-300 hover:border-[color-mix(in_srgb,var(--track-accent)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--track-accent)_8%,rgba(0,0,0,0.35))] min-[380px]:gap-3.5 sm:gap-4 sm:px-3.5 sm:py-3"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--track-accent)] opacity-70 transition duration-300 group-hover:opacity-100"
                      />

                      <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10 min-[380px]:size-12 sm:size-14">
                        <Image
                          src={track.cover}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          priority={isLatest}
                        />
                      </span>

                      <span className="min-w-0 flex-1 pr-1 text-left sm:pr-2">
                        <span className="block truncate font-display text-[1.15rem] leading-none tracking-wide text-white transition-colors group-hover:text-[var(--track-accent)] min-[380px]:text-[1.25rem] sm:text-xl">
                          {track.title}
                        </span>
                        <span className="mt-1.5 block truncate text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-[color-mix(in_srgb,var(--track-accent)_70%,white)] sm:tracking-[0.18em]">
                          {getVersionLabel(track)}
                        </span>
                        {track.releaseDate ? (
                          <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/35 sm:tracking-[0.16em]">
                            {formatShortReleaseDate(track.releaseDate)}
                          </span>
                        ) : null}
                      </span>

                      <span
                        className={`w-[4.75rem] shrink-0 self-center text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors sm:w-auto sm:text-[11px] sm:tracking-[0.2em] ${
                          isLatest
                            ? "text-[var(--track-accent)]"
                            : "text-white/55 group-hover:text-[var(--track-accent)]"
                        }`}
                      >
                        {status}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href="#agenda"
              className="mt-3 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              Ver agenda
            </a>
          </div>
        ) : null}
      </div>

      <a
        href="#musicas"
        className="absolute inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-10 flex flex-col items-center gap-1 text-white/45 transition-colors hover:text-white/70 motion-safe:animate-bounce"
        aria-label="Ir para as faixas"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
          As faixas
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </a>
    </section>
  );
}
