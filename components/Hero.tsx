import Image from "next/image";
import { artist } from "@/data/artist";
import { formatReleaseDate, type Track } from "@/data/tracks";
import { PlayIcon } from "@/components/icons";

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
        src={featured.cover}
        alt=""
        fill
        priority
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1920px) 100vw, 1920px"
        className="object-cover object-[center_18%] md:object-center"
      />
      <div className="hero-veil absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] text-center sm:px-6 md:pb-20">
        <div className="relative mb-6 size-28 min-[380px]:size-32 sm:mb-8 sm:size-44 md:size-56">
          <div className="absolute inset-[-14%] rounded-full bg-accent/30 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_0_40px_rgba(225,6,0,0.35)] ring-1 ring-white/15">
            <Image
              src="/logo.webp"
              alt="Quinhas Fieti"
              width={224}
              height={224}
              sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 224px"
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <p className="font-display text-[clamp(1.75rem,8vw,2.35rem)] tracking-[0.18em] text-white sm:text-4xl sm:tracking-[0.42em]">
          {artist.tagline}
        </p>
        <p className="mt-3 max-w-sm text-[13px] leading-6 text-white/55 sm:max-w-md sm:text-base sm:leading-7">
          <span className="block sm:inline">Novo drop</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">{featured.title}</span>
          {featured.releaseDate ? (
            <>
              <span className="hidden sm:inline"> · </span>
              <span className="block text-white/40 sm:inline">
                {formatReleaseDate(featured.releaseDate)}
              </span>
            </>
          ) : null}
        </p>

        <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onListen}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold tracking-wide text-white shadow-[0_0_32px_rgba(225,6,0,0.45)] transition hover:bg-[#ff1a12] hover:shadow-[0_0_40px_rgba(225,6,0,0.6)]"
          >
            <PlayIcon className="h-4 w-4" />
            Ouvir agora
          </button>
          <a
            href={artist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            Ouvir todas
          </a>
        </div>
      </div>
    </section>
  );
}
