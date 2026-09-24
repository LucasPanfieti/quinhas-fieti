"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  formatShortReleaseDate,
  getAgendaStatuses,
  getAgendaStatusesPlaceholder,
  getReleaseSchedule,
  getVersionLabel,
  type AgendaStatus,
  type Track,
} from "@/data/tracks";

type ReleaseScheduleProps = {
  onSelect: (track: Track) => void;
};

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

export function ReleaseSchedule({ onSelect }: ReleaseScheduleProps) {
  const schedule = getReleaseSchedule();
  const [statuses, setStatuses] = useState(getAgendaStatusesPlaceholder);

  useEffect(() => {
    setStatuses(getAgendaStatuses());
  }, []);

  return (
    <section id="agenda" className="relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-28">
        <div className="mb-10 sm:mb-14">
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

        <ul className="space-y-2.5 sm:space-y-3">
          {schedule.map((track) => {
            const status = statuses.get(track.id) ?? "tba";
            const version = getVersionLabel(track);

            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => onSelect(track)}
                  style={{
                    ["--track-accent" as string]: track.accentColor,
                  }}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition duration-300 min-[380px]:gap-3.5 sm:gap-5 sm:px-4 sm:py-3.5 ${rowClass[status]}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-[3px] transition duration-300 ${barClass[status]}`}
                  />

                  <span
                    className={`relative size-12 shrink-0 overflow-hidden rounded-lg bg-black shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10 min-[380px]:size-14 sm:size-16 ${
                      status === "soon" || status === "tba"
                        ? "opacity-80 group-hover:opacity-100"
                        : ""
                    }`}
                  >
                    <Image
                      src={track.cover}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </span>

                  <span className="min-w-0 flex-1 pr-1 sm:pr-2">
                    <span
                      className={`block font-display text-[1.2rem] leading-[1.05] tracking-wide transition-colors min-[380px]:text-[1.35rem] sm:text-2xl ${
                        status === "available" || status === "next"
                          ? "text-white group-hover:text-[var(--track-accent)]"
                          : "text-white/80 group-hover:text-[var(--track-accent)]"
                      }`}
                    >
                      {track.title}
                    </span>
                    <span
                      className={`mt-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] min-[380px]:mt-2 min-[380px]:text-[11px] sm:mt-2.5 sm:tracking-[0.2em] ${
                        status === "available" || status === "next"
                          ? "text-[color-mix(in_srgb,var(--track-accent)_75%,white)]"
                          : "text-white/35 group-hover:text-[color-mix(in_srgb,var(--track-accent)_70%,white)]"
                      }`}
                    >
                      {version}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/40 min-[380px]:mt-1.5 min-[380px]:text-[11px] sm:tracking-[0.18em]">
                      {track.releaseDate
                        ? formatShortReleaseDate(track.releaseDate)
                        : "A definir"}
                    </span>
                  </span>

                  <span
                    className={`w-[4.75rem] shrink-0 self-center text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors sm:w-auto sm:text-[11px] sm:tracking-[0.2em] ${statusClass[status]}`}
                  >
                    {statusLabel[status]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
