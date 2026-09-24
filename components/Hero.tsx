import Image from "next/image";
import { artist } from "@/data/artist";
import { formatReleaseDate, getVersionLabel, type Track } from "@/data/tracks";
import { ChevronDownIcon, PlayIcon } from "@/components/icons";

type HeroProps = {
  featured: Track;
  onListen: () => void;
};

export function Hero({ featured, onListen }: HeroProps) {
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
        <div className="relative mb-5 size-24 min-[380px]:size-28 sm:mb-8 sm:size-44 md:size-56 [@media(max-height:700px)]:mb-4 [@media(max-height:700px)]:size-24 sm:[@media(max-height:700px)]:size-32">
          <div className="absolute inset-[-14%] rounded-full bg-accent/30 blur-3xl" />
          <div className="group relative h-full w-full overflow-hidden rounded-full shadow-[0_0_40px_rgba(225,6,0,0.35)] ring-1 ring-white/15">
            <Image
              src="/logo.webp"
              alt="Quinhas Fieti"
              width={224}
              height={224}
              sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, 224px"
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              priority
            />
          </div>
        </div>

        <p className="font-display text-[clamp(1.6rem,7.5vw,2.35rem)] tracking-[0.18em] text-white sm:text-4xl sm:tracking-[0.42em] [@media(max-height:700px)]:text-[1.55rem]">
          {artist.tagline}
        </p>
        <p className="mt-3 flex max-w-sm flex-col gap-0.5 text-[13px] leading-5 text-white/55 sm:mt-3 sm:max-w-md sm:gap-1 sm:text-base sm:leading-7">
          <span>Novo drop</span>
          <span className="text-white/80">{featured.title}</span>
          {featured.version ? (
            <span className="text-white/40">{getVersionLabel(featured)}</span>
          ) : null}
          {featured.releaseDate ? (
            <span className="text-white/40">
              {formatReleaseDate(featured.releaseDate)}
            </span>
          ) : null}
        </p>

        <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center [@media(max-height:700px)]:mt-5">
          <button
            type="button"
            onClick={onListen}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold tracking-wide text-white shadow-[0_0_32px_rgba(225,6,0,0.45)] transition hover:bg-[#ff1a12] hover:shadow-[0_0_40px_rgba(225,6,0,0.6)]"
          >
            <PlayIcon className="h-4 w-4" />
            Ouvir agora
          </button>
          <a
            href="#agenda"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            Ver agenda
          </a>
        </div>
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
