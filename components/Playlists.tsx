import { artist } from "@/data/artist";
import { PlayIcon, YouTubeIcon } from "@/components/icons";

const featured = artist.playlists.find((playlist) => playlist.featured);
const genres = artist.playlists.filter((playlist) => !playlist.featured);

export function Playlists() {
  return (
    <section id="playlists" className="relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-28">
        <div className="mb-8 sm:mb-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            YouTube
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
            Playlists
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
            Além do drop: escolhe o clima ou ouve tudo de uma vez.
          </p>
        </div>

        {featured ? (
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-accent/40 bg-accent/10 px-5 py-5 shadow-[0_0_60px_rgba(225,6,0,0.12)] transition hover:border-accent hover:bg-accent/20 sm:min-h-[13rem] sm:px-8 sm:py-8"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 size-44 rounded-full bg-accent/25 blur-3xl transition group-hover:bg-accent/40" />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
                {featured.genre}
              </p>
              <h3 className="mt-2 font-display text-[2rem] leading-none tracking-wide text-white sm:text-5xl">
                {featured.name}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/60 sm:text-[15px]">
                {featured.description}
              </p>
            </div>
            <span className="relative mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(225,6,0,0.4)] transition group-hover:bg-[#ff1a12] sm:mt-6 sm:w-fit">
              <PlayIcon className="h-4 w-4 shrink-0" />
              Ouvir no YouTube
            </span>
          </a>
        ) : null}

        <ul className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          {genres.map((playlist) => (
            <li key={playlist.id}>
              <a
                href={playlist.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-5 transition hover:border-accent/70 hover:bg-white/[0.05] sm:min-h-[10.5rem] sm:px-7 sm:py-6"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/40 transition group-hover:text-accent">
                    {playlist.genre}
                  </p>
                  <h3 className="mt-2 font-display text-[1.75rem] leading-none tracking-wide text-white sm:text-4xl">
                    {playlist.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {playlist.description}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition group-hover:text-white sm:mt-6">
                  <YouTubeIcon className="h-4 w-4 shrink-0" />
                  Abrir playlist
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
