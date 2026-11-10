"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  formatShortReleaseDate,
  genreOrder,
  getAgendaStatuses,
  getAgendaStatusesPlaceholder,
  getReleaseSchedule,
  getVersionLabel,
  type AgendaStatus,
  type GenreId,
  type Track,
} from "@/data/tracks";

type ReleaseScheduleProps = {
  onSelect: (track: Track) => void;
};

type GenreFilter = "all" | GenreId;

const genreFilters: { id: GenreFilter; label: string }[] = [
  { id: "all", label: "Todas" },
  ...genreOrder.map((genre) => ({ id: genre.id, label: genre.label })),
];

const statusLabel: Record<AgendaStatus, string> = {
  available: "Disponível",
  next: "Próxima",
  soon: "Em breve",
  tba: "A definir",
};

const rowClass: Record<AgendaStatus, string> = {
  available:
    "border-[color-mix(in_srgb,var(--track-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--track-accent)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--track-accent)_55%,transparent)] hover:bg-[color-mix(in_srgb,var(--track-accent)_11%,transparent)]",
  next: "border-white/20 bg-white/[0.045] hover:border-[color-mix(in_srgb,var(--track-accent)_48%,transparent)] hover:bg-[color-mix(in_srgb,var(--track-accent)_8%,transparent)]",
  soon: "border-white/[0.06] bg-transparent opacity-[0.48] hover:opacity-100 hover:border-[color-mix(in_srgb,var(--track-accent)_40%,transparent)] hover:bg-[color-mix(in_srgb,var(--track-accent)_6%,transparent)]",
  tba: "border-white/[0.06] bg-transparent opacity-[0.42] hover:opacity-100 hover:border-white/18 hover:bg-white/[0.04]",
};

const barClass: Record<AgendaStatus, string> = {
  available: "bg-[var(--track-accent)] opacity-80 group-hover:opacity-100",
  next: "bg-white/70 group-hover:bg-[var(--track-accent)] group-hover:opacity-100",
  soon: "bg-white/25 group-hover:bg-[var(--track-accent)] group-hover:opacity-90",
  tba: "bg-white/15 group-hover:bg-white/45",
};

const statusClass: Record<AgendaStatus, string> = {
  available: "text-[var(--track-accent)]",
  next: "text-white/80 group-hover:text-[var(--track-accent)]",
  soon: "text-white/40 group-hover:text-white/70",
  tba: "text-white/30 group-hover:text-white/55",
};

/** Mobile starts collapsed to this many rows (1-col layout). */
const MOBILE_PREVIEW_COUNT = 4;

export function ReleaseSchedule({ onSelect }: ReleaseScheduleProps) {
  const schedule = getReleaseSchedule();
  const [statuses, setStatuses] = useState(getAgendaStatusesPlaceholder);
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("all");
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    setStatuses(getAgendaStatuses());
  }, []);

  // Newest first for the grid; schedule/status helpers stay chronological.
  const visible = schedule
    .filter((track) => genreFilter === "all" || track.genre === genreFilter)
    .slice()
    .reverse();

  const mobileNeedsToggle = visible.length > MOBILE_PREVIEW_COUNT;

  return (
    <section id="agenda" className="relative border-t border-white/10 py-16 sm:py-28">
      <div className="px-4 sm:px-5 md:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
            Calendário
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-6xl">
            Agenda
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
            Cada drop na ordem certa — capa, versão e data num olhar.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filtrar por gênero"
          className="mb-8 flex gap-1 border-b border-white/10 sm:mb-10"
        >
          {genreFilters.map((filter) => {
            const active = genreFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setGenreFilter(filter.id);
                  setMobileExpanded(false);
                }}
                className={`-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors sm:px-4 sm:tracking-[0.24em] ${
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-white/45 hover:text-white/80"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-white/45">Nenhuma faixa nesse filtro.</p>
        ) : (
          <>
            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((track, index) => {
                const status = statuses.get(track.id) ?? "tba";
                const version = getVersionLabel(track);
                const mobileHidden =
                  mobileNeedsToggle &&
                  !mobileExpanded &&
                  index >= MOBILE_PREVIEW_COUNT;

                return (
                  <li
                    key={track.id}
                    className={mobileHidden ? "hidden sm:list-item" : undefined}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(track)}
                      style={{
                        ["--track-accent" as string]: track.accentColor,
                      }}
                      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition duration-300 min-[380px]:gap-3.5 sm:gap-3.5 sm:px-3.5 sm:py-3.5 lg:gap-3.5 xl:gap-3 ${rowClass[status]}`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 w-[3px] transition duration-300 ${barClass[status]}`}
                      />

                      <span
                        className={`relative size-12 shrink-0 overflow-hidden rounded-lg bg-black shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10 min-[380px]:size-14 sm:size-[3.25rem] lg:size-12 xl:size-[3.25rem] ${
                          status === "soon" || status === "tba"
                            ? "opacity-80 group-hover:opacity-100"
                            : ""
                        }`}
                      >
                        <Image
                          src={track.cover}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </span>

                      <span className="min-w-0 flex-1 pr-1">
                        <span
                          className={`block truncate font-display text-[1.2rem] leading-[1.05] tracking-wide transition-colors min-[380px]:text-[1.35rem] sm:text-[1.35rem] lg:text-[1.25rem] xl:text-[1.35rem] ${
                            status === "available" || status === "next"
                              ? "text-white group-hover:text-[var(--track-accent)]"
                              : "text-white/80 group-hover:text-[var(--track-accent)]"
                          }`}
                        >
                          {track.title}
                        </span>
                        <span
                          className={`mt-1.5 block truncate text-[10px] font-medium uppercase tracking-[0.16em] min-[380px]:mt-2 min-[380px]:text-[11px] sm:tracking-[0.18em] ${
                            status === "available" || status === "next"
                              ? "text-[color-mix(in_srgb,var(--track-accent)_75%,white)]"
                              : "text-white/35 group-hover:text-[color-mix(in_srgb,var(--track-accent)_70%,white)]"
                          }`}
                        >
                          {version}
                        </span>
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/40 min-[380px]:mt-1.5 min-[380px]:text-[11px] sm:tracking-[0.16em]">
                          {track.releaseDate
                            ? formatShortReleaseDate(track.releaseDate)
                            : "A definir"}
                        </span>
                      </span>

                      <span
                        className={`w-[4.25rem] shrink-0 self-center text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] transition-colors sm:tracking-[0.16em] ${statusClass[status]}`}
                      >
                        {statusLabel[status]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {mobileNeedsToggle ? (
              <button
                type="button"
                className="mt-5 w-full border border-white/12 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/25 hover:text-white sm:hidden"
                aria-expanded={mobileExpanded}
                onClick={() => setMobileExpanded((open) => !open)}
              >
                {mobileExpanded ? "Ver menos" : "Ver mais"}
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
