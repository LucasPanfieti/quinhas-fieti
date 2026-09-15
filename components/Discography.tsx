"use client";

import Image from "next/image";
import {
  formatReleaseDate,
  genreOrder,
  getTracksByGenre,
  type Track,
} from "@/data/tracks";
import { PlayIcon } from "@/components/icons";

type DiscographyProps = {
  onSelect: (track: Track) => void;
  onCoverEnter: (track: Track) => void;
  onCoverLeave: (track: Track) => void;
};

function TrackCard({
  track,
  onSelect,
  onCoverEnter,
  onCoverLeave,
}: {
  track: Track;
  onSelect: (track: Track) => void;
  onCoverEnter: (track: Track) => void;
  onCoverLeave: (track: Track) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(track)}
      onMouseEnter={() => onCoverEnter(track)}
      onMouseLeave={() => onCoverLeave(track)}
      className="group w-full cursor-pointer text-left"
      style={{ ["--track-accent" as string]: track.accentColor }}
    >
      <div className="relative aspect-square">
        <div className="absolute inset-0 overflow-hidden bg-black">
          <Image
            src={track.cover}
            alt={`Capa de ${track.title}${track.version ? ` (${track.version})` : ""}`}
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 45vw, 380px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="cover-veil track-cover-veil absolute inset-0 transition duration-500 group-hover:opacity-100" />
        </div>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="track-play-btn flex size-14 items-center justify-center rounded-full text-white opacity-90 transition duration-300 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
            <PlayIcon className="relative z-10 h-6 w-6 translate-x-px" />
          </span>
        </span>
      </div>
      <div className="mt-3 sm:mt-4">
        <h3 className="track-title font-display text-[1.75rem] leading-none tracking-wide text-white transition-colors sm:text-3xl">
          {track.title}
          {track.version ? (
            <span className="text-white/35"> ({track.version})</span>
          ) : null}
        </h3>
        <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-white/40 sm:tracking-[0.24em]">
          {track.releaseDate
            ? formatReleaseDate(track.releaseDate)
            : "Em breve"}
        </p>
      </div>
    </button>
  );
}

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
      <div className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
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

      <div className="space-y-12 sm:space-y-16">
        {genreOrder.map((genre) => {
          const genreTracks = getTracksByGenre(genre.id);
          if (genreTracks.length === 0) return null;

          return (
            <div key={genre.id}>
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-3 sm:mb-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.42em] text-accent sm:text-[0.8125rem] sm:tracking-[0.48em]">
                  {genre.label}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  {genreTracks.length}{" "}
                  {genreTracks.length === 1 ? "faixa" : "faixas"}
                </p>
              </div>

              <ul className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                {genreTracks.map((track) => (
                  <li key={track.id}>
                    <TrackCard
                      track={track}
                      onSelect={onSelect}
                      onCoverEnter={onCoverEnter}
                      onCoverLeave={onCoverLeave}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
