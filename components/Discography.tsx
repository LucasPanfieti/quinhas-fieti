"use client";

import Image from "next/image";
import { artist } from "@/data/artist";
import { formatReleaseDate, tracks, type Track } from "@/data/tracks";
import { PlayIcon } from "@/components/icons";

type DiscographyProps = {
  onSelect: (track: Track) => void;
  onCoverEnter: (track: Track) => void;
  onCoverLeave: (track: Track) => void;
};

export function Discography({
  onSelect,
  onCoverEnter,
  onCoverLeave,
}: DiscographyProps) {
  return (
    <section
      id="musicas"
      className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-28"
    >
      <div className="mb-8 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            Discografia
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
            As faixas
          </h2>
        </div>
        <a
          href="#playlists"
          className="py-1 text-sm font-medium text-white/60 underline-offset-4 transition hover:text-white hover:underline"
        >
          Ver playlists
        </a>
      </div>

      <ul className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {tracks.map((track) => (
          <li key={track.id}>
            <button
              type="button"
              onClick={() => onSelect(track)}
              onMouseEnter={() => onCoverEnter(track)}
              onMouseLeave={() => onCoverLeave(track)}
              className="group w-full cursor-pointer text-left"
              style={{ ["--track-accent" as string]: track.accentColor }}
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src={track.cover}
                  alt={`Capa de ${track.title}`}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 45vw, 380px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="cover-veil track-cover-veil absolute inset-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="track-play-btn flex size-14 items-center justify-center rounded-full bg-accent text-white opacity-90 shadow-[0_0_30px_rgba(225,6,0,0.55)] transition duration-300 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
                    <PlayIcon className="h-6 w-6 translate-x-px" />
                  </span>
                </span>
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="track-title font-display text-[1.75rem] leading-none tracking-wide text-white transition-colors sm:text-3xl">
                  {track.title}
                </h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-white/40 sm:tracking-[0.24em]">
                  {track.releaseDate
                    ? formatReleaseDate(track.releaseDate)
                    : artist.name}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
