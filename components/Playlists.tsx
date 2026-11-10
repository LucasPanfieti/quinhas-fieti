import Image from "next/image";
import { artist, type Playlist } from "@/data/artist";
import { PlayIcon, YouTubeIcon } from "@/components/icons";

const featured = artist.playlists.find((playlist) => playlist.featured);
const genres = artist.playlists.filter((playlist) => !playlist.featured);

function PlaylistCover({
  playlist,
  sizes,
  fit = "cover",
}: {
  playlist: Playlist;
  sizes: string;
  fit?: "cover" | "contain";
}) {
  if (playlist.cover) {
    return (
      <Image
        src={playlist.cover}
        alt={`Capa de ${playlist.name}`}
        fill
        sizes={sizes}
        className={
          fit === "contain"
            ? "object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            : "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        }
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(226,6,0,0.35),transparent_55%),linear-gradient(160deg,#1a0505,#050505)]">
      <span className="font-display text-4xl tracking-[0.2em] text-white/90 sm:text-5xl">
        {playlist.genre}
      </span>
    </div>
  );
}

function GenrePlaylistTile({ playlist }: { playlist: Playlist }) {
  const ready = Boolean(playlist.href);
  const className =
    "group block w-full text-left transition duration-300";

  const body = (
    <>
      <div className="relative aspect-square overflow-hidden bg-black ring-1 ring-white/10 transition duration-300 group-hover:ring-white/25">
        <PlaylistCover
          playlist={playlist}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 22vw"
          fit="contain"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:px-4 sm:py-3.5">
          <YouTubeIcon className="h-3.5 w-3.5 shrink-0" />
          {ready ? "Abrir" : "Em breve"}
        </span>
      </div>
      <div className="mt-2.5 sm:mt-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40 transition group-hover:text-accent sm:text-[11px]">
          {playlist.genre}
        </p>
        <h3 className="mt-1 font-display text-[1.35rem] leading-none tracking-wide text-white sm:text-[1.6rem] md:text-[1.75rem]">
          {playlist.name}
        </h3>
      </div>
    </>
  );

  if (!ready) {
    return (
      <div className={`${className} cursor-default opacity-75`} aria-label={`${playlist.name} — em breve`}>
        {body}
      </div>
    );
  }

  return (
    <a
      href={playlist.href!}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {body}
    </a>
  );
}

export function Playlists() {
  return (
    <section id="playlists" className="relative border-t border-white/10 py-16 sm:py-28">
      <div className="mb-10 flex flex-col gap-3 px-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-5 md:px-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            YouTube
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
            Playlists
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
            Além do drop: escolhe o clima ou ouve tudo de uma vez.
          </p>
        </div>
      </div>

      {featured?.href ? (
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-4 grid overflow-hidden bg-black ring-1 ring-white/10 transition duration-300 hover:ring-accent/60 sm:mx-5 sm:grid-cols-[minmax(12rem,28%)_minmax(0,1fr)] md:mx-6"
        >
          <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[14rem]">
            <PlaylistCover
              playlist={featured}
              sizes="(max-width: 640px) 100vw, 32vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-black/10 sm:to-black/70" />
          </div>

          <div className="relative flex flex-col justify-center gap-4 px-5 py-6 sm:px-8 sm:py-8 md:px-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
                {featured.genre}
              </p>
              <h3 className="mt-2 font-display text-[2.35rem] leading-[0.92] tracking-wide text-white sm:text-5xl md:text-6xl">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                {featured.description}
              </p>
            </div>
            <span className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-accent px-5 text-sm font-semibold text-white transition group-hover:bg-[#ff1a12] sm:w-fit">
              <PlayIcon className="h-4 w-4 shrink-0" />
              Ouvir no YouTube
            </span>
          </div>
        </a>
      ) : null}

      <div className="mt-10 sm:mt-14">
        <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:mb-5 sm:px-5 md:px-6">
          <h3 className="text-xs font-medium uppercase tracking-[0.42em] text-accent sm:text-[0.8125rem] sm:tracking-[0.48em]">
            Por gênero
          </h3>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            {genres.length} {genres.length === 1 ? "lista" : "listas"}
          </p>
        </div>

        <ul className="row-scroller flex gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 sm:gap-3 sm:px-5 md:gap-3.5 md:px-6">
          {genres.map((playlist) => (
            <li
              key={playlist.id}
              className="w-[42vw] max-w-[11.5rem] shrink-0 min-[420px]:w-[38vw] sm:max-w-none sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw]"
            >
              <GenrePlaylistTile playlist={playlist} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
