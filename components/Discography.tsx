"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import {
  formatReleaseDate,
  genreOrder,
  getTracksByGenre,
  type Track,
} from "@/data/tracks";
import { PlayIcon, RowChevronIcon } from "@/components/icons";

/** Keep tile width and edge-control height in sync (square covers). */
const TILE_WIDTH =
  "w-[42vw] max-w-[11.5rem] min-[420px]:w-[38vw] sm:max-w-none sm:w-[30vw] md:w-[22vw] lg:w-[17vw] xl:w-[14.5vw] 2xl:w-[13vw]";
const TILE_HEIGHT =
  "h-[42vw] max-h-[11.5rem] min-[420px]:h-[38vw] sm:max-h-none sm:h-[30vw] md:h-[22vw] lg:h-[17vw] xl:h-[14.5vw] 2xl:h-[13vw]";
const EDGE_WIDTH =
  "w-[21vw] max-w-[5.75rem] min-[420px]:w-[19vw] sm:max-w-none sm:w-[15vw] md:w-[11vw] lg:w-[8.5vw] xl:w-[7.25vw] 2xl:w-[6.5vw]";

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
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image
          src={track.cover}
          alt={`Capa de ${track.title}${track.version ? ` (${track.version})` : ""}`}
          fill
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 18vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="cover-veil track-cover-veil absolute inset-0 transition duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="track-play-btn flex size-11 items-center justify-center rounded-full text-white opacity-90 transition duration-300 sm:size-12 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
            <PlayIcon className="relative z-10 h-5 w-5 translate-x-px" />
          </span>
        </span>
      </div>
      <div className="mt-2.5 sm:mt-3">
        <h3 className="track-title font-display text-[1.15rem] leading-[1.05] tracking-wide text-white transition-colors min-[400px]:text-[1.3rem] sm:text-[1.55rem]">
          {track.title}
          {track.version ? (
            <span className="text-white/35"> ({track.version})</span>
          ) : null}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-[11px] sm:tracking-[0.2em]">
          {track.releaseDate
            ? formatReleaseDate(track.releaseDate)
            : "Em breve"}
        </p>
      </div>
    </button>
  );
}

function GenreRow({
  label,
  tracks,
  onSelect,
  onCoverEnter,
  onCoverLeave,
}: {
  label: string;
  tracks: Track[];
  onSelect: (track: Track) => void;
  onCoverEnter: (track: Track) => void;
  onCoverLeave: (track: Track) => void;
}) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);

    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
      observer.disconnect();
    };
  }, [tracks, updateEdges]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: "smooth",
    });
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    // Capture only after real drag — early capture + tiny jitter was eating clicks.
  };

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(delta) < 12) return;
      drag.moved = true;
      el.setPointerCapture(event.pointerId);
    }
    el.scrollLeft = drag.startScroll - delta;
  };

  const endDrag = (event: PointerEvent<HTMLUListElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.moved) suppressClickRef.current = true;
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
  };

  const onClickCapture = (event: MouseEvent<HTMLUListElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div className="group/row relative">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:mb-5 sm:px-5 md:px-6">
        <h3 className="text-xs font-medium uppercase tracking-[0.42em] text-accent sm:text-[0.8125rem] sm:tracking-[0.48em]">
          {label}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
          {tracks.length} {tracks.length === 1 ? "faixa" : "faixas"}
        </p>
      </div>

      <div className="relative">
        <ul
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          className="row-scroller flex gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 sm:gap-3 sm:px-5 md:gap-3.5 md:px-6"
        >
          {tracks.map((track) => (
            <li key={track.id} className={`shrink-0 ${TILE_WIDTH}`}>
              <TrackCard
                track={track}
                onSelect={onSelect}
                onCoverEnter={onCoverEnter}
                onCoverLeave={onCoverLeave}
              />
            </li>
          ))}
        </ul>

        {canPrev ? (
          <div
            aria-hidden
            className={`row-edge-control row-edge-control--prev pointer-events-none absolute top-0 left-0 z-10 flex ${EDGE_WIDTH} ${TILE_HEIGHT} items-center justify-start opacity-0 transition-[opacity,background-color] duration-200 ease-out group-hover/row:opacity-100 max-md:hidden`}
          >
            <button
              type="button"
              aria-label={`Ver faixas anteriores de ${label}`}
              onClick={() => scrollByPage(-1)}
              className="pointer-events-none flex h-full w-14 items-center justify-center group-hover/row:pointer-events-auto"
            >
              <RowChevronIcon
                direction="left"
                className="row-edge-chevron h-10 w-7 text-white"
              />
            </button>
          </div>
        ) : null}

        {canNext ? (
          <div
            aria-hidden
            className={`row-edge-control row-edge-control--next pointer-events-none absolute top-0 right-0 z-10 flex ${EDGE_WIDTH} ${TILE_HEIGHT} items-center justify-end opacity-0 transition-[opacity,background-color] duration-200 ease-out group-hover/row:opacity-100 max-md:hidden`}
          >
            <button
              type="button"
              aria-label={`Ver mais faixas de ${label}`}
              onClick={() => scrollByPage(1)}
              className="pointer-events-none flex h-full w-14 items-center justify-center group-hover/row:pointer-events-auto"
            >
              <RowChevronIcon
                direction="right"
                className="row-edge-chevron h-10 w-7 text-white"
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Discography({
  onSelect,
  onCoverEnter,
  onCoverLeave,
}: DiscographyProps) {
  return (
    <section id="musicas" className="relative py-16 sm:py-28">
      <div className="mb-10 flex flex-col gap-3 px-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-5 md:px-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            Discografia
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
            As faixas
          </h2>
        </div>
        <a
          href="#agenda"
          className="py-1 text-sm font-medium text-white/60 underline-offset-4 transition hover:text-white hover:underline"
        >
          Ver agenda
        </a>
      </div>

      <div className="space-y-10 sm:space-y-14">
        {genreOrder.map((genre) => {
          const genreTracks = getTracksByGenre(genre.id);

          if (genreTracks.length === 0) {
            return (
              <div key={genre.id} className="px-4 sm:px-5 md:px-6">
                <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
                  <h3 className="text-xs font-medium uppercase tracking-[0.42em] text-accent sm:text-[0.8125rem] sm:tracking-[0.48em]">
                    {genre.label}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Em breve
                  </p>
                </div>
                <div className="flex h-28 items-center border border-dashed border-white/12 px-5 sm:h-32 sm:px-6">
                  <p className="text-sm text-white/40">
                    Novas faixas de {genre.label} em preparação.
                  </p>
                </div>
              </div>
            );
          }

          return (
            <GenreRow
              key={genre.id}
              label={genre.label}
              tracks={genreTracks}
              onSelect={onSelect}
              onCoverEnter={onCoverEnter}
              onCoverLeave={onCoverLeave}
            />
          );
        })}
      </div>
    </section>
  );
}
