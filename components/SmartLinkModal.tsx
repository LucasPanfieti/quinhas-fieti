"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { artist } from "@/data/artist";
import {
  formatReleaseDate,
  genreOrder,
  getTrackVersions,
  getVersionLabel,
  platformOrder,
  type Track,
} from "@/data/tracks";
import {
  CloseIcon,
  PauseIcon,
  PlatformIcon,
  PlayIcon,
} from "@/components/icons";

type SmartLinkModalProps = {
  track: Track | null;
  isPlaying: boolean;
  onTogglePreview: () => void;
  onSelectVersion: (track: Track) => void;
  onClose: () => void;
};

function getFocusableElements(container: HTMLElement) {
  return [
    ...container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((element) => !element.hasAttribute("disabled"));
}

function TrackMeta({
  track,
  titleId,
  compact,
  showVersion = true,
}: {
  track: Track;
  titleId?: string;
  compact?: boolean;
  showVersion?: boolean;
}) {
  const genreLabel =
    genreOrder.find((genre) => genre.id === track.genre)?.label ?? track.genre;

  return (
    <div className={compact ? "min-w-0 flex-1 text-left" : "min-w-0 pr-2"}>
      <p
        className={`font-medium uppercase text-white/45 ${
          compact
            ? "text-[10px] tracking-[0.28em]"
            : "text-[11px] tracking-[0.34em]"
        }`}
      >
        {artist.name}
      </p>
      <h3
        id={titleId}
        className={
          compact
            ? "mt-1 font-display text-[clamp(1.35rem,5.8vw,1.75rem)] leading-[0.95] tracking-wide text-white"
            : "mt-2 font-display text-[2.65rem] leading-[0.92] tracking-wide text-white"
        }
      >
        {track.title}
        {showVersion && track.version ? (
          <span className="text-white/35"> ({track.version})</span>
        ) : null}
      </h3>
      <p
        className={`mt-2.5 uppercase tracking-[0.18em] ${
          compact
            ? "text-[10px] text-white/40"
            : "text-[11px] tracking-[0.2em] text-white/40"
        }`}
      >
        <span className="text-white/60">{genreLabel}</span>
        <span className="mx-1.5 text-white/25" aria-hidden>
          ·
        </span>
        <span>Single</span>
        {track.releaseDate ? (
          <>
            <span className="mx-1.5 text-white/25" aria-hidden>
              ·
            </span>
            <span>{formatReleaseDate(track.releaseDate)}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}

function VersionTabs({
  versions,
  activeId,
  onSelect,
}: {
  versions: Track[];
  activeId: string;
  onSelect: (track: Track) => void;
}) {
  if (versions.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label="Versões"
      className="version-tabs flex shrink-0 gap-1 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 md:px-6 md:pb-1 md:pt-3"
    >
      {versions.map((version) => {
        const active = version.id === activeId;
        return (
          <button
            key={version.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(version)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
              active
                ? "bg-[var(--track-accent,#e10600)] text-white shadow-[0_0_20px_color-mix(in_srgb,var(--track-accent,#e10600)_35%,transparent)]"
                : "bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white/80"
            }`}
          >
            {getVersionLabel(version)}
          </button>
        );
      })}
    </div>
  );
}

export function SmartLinkModal({
  track,
  isPlaying,
  onTogglePreview,
  onSelectVersion,
  onClose,
}: SmartLinkModalProps) {
  const onCloseRef = useRef(onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const wasOpenRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!track) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        document.body.style.overflow = previousOverflowRef.current;
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    const opening = !wasOpenRef.current;
    wasOpenRef.current = true;

    if (opening) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    const focusFrame = opening
      ? window.requestAnimationFrame(() => {
          const buttons =
            panelRef.current?.querySelectorAll<HTMLButtonElement>(
              "[data-preview-btn]",
            );
          const visible = [...(buttons ?? [])].find(
            (button) => button.getClientRects().length > 0,
          );
          visible?.focus();
        })
      : null;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      if (focusFrame !== null) window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKey);
    };
  }, [track]);

  if (!track) return null;

  const versions = getTrackVersions(track);
  const showVersionInTitle = versions.length < 2;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-link-title"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px] animate-fade-in"
      />

      <div
        ref={panelRef}
        style={{ ["--track-accent" as string]: track.accentColor }}
        className="relative z-10 flex max-h-[min(92dvh,100%)] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 bg-[#0a0a0a] shadow-[0_0_80px_color-mix(in_srgb,var(--track-accent,#e10600)_18%,transparent)] animate-rise-in sm:max-h-[85vh] sm:rounded-3xl md:max-w-[52rem]"
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/25 md:hidden" />

        <VersionTabs
          versions={versions}
          activeId={track.id}
          onSelect={onSelectVersion}
        />

        <div className="relative isolate shrink-0 md:hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <Image
              src={track.cover}
              alt=""
              fill
              sizes="100vw"
              className="scale-150 object-cover opacity-40 blur-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/88 to-[#0a0a0a]" />
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background: `linear-gradient(to top, #0a0a0a, color-mix(in srgb, var(--track-accent, #e10600) 12%, transparent), transparent)`,
              }}
            />
          </div>

          <div className="relative flex items-start gap-3.5 px-5 pb-4 pt-3">
            <div className="relative size-[6.75rem] shrink-0 overflow-hidden rounded-xl shadow-[0_14px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
              <Image
                src={track.cover}
                alt={`Capa de ${track.title}`}
                fill
                sizes="108px"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  boxShadow: `inset 0 0 0 1px color-mix(in srgb, white 12%, transparent), 0 0 28px color-mix(in srgb, var(--track-accent, #e10600) 28%, transparent)`,
                }}
              />
            </div>

            <div className="flex min-w-0 flex-1 items-start gap-2 pt-0.5">
              <TrackMeta
                track={track}
                titleId="smart-link-title"
                compact
                showVersion={showVersionInTitle}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm"
              >
                <CloseIcon className="h-[1.125rem] w-[1.125rem]" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative hidden shrink-0 md:grid md:grid-cols-[minmax(260px,34%)_1fr]">
          <div className="relative overflow-hidden border-b border-white/10">
            <div aria-hidden className="absolute inset-0">
              <Image
                src={track.cover}
                alt=""
                fill
                sizes="300px"
                className="scale-125 object-cover opacity-50 blur-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#0a0a0a]/55 to-[#0a0a0a]" />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent 35%, #0a0a0a 100%), radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--track-accent, #e10600) 18%, transparent), transparent 65%)`,
                }}
              />
            </div>
            <div className="relative flex justify-center p-6 pr-5">
              <div className="relative aspect-square w-full max-w-[17.5rem] overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
                <Image
                  src={track.cover}
                  alt={`Capa de ${track.title}`}
                  fill
                  sizes="280px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-5 border-b border-white/10 px-7 py-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 55% at 0% 0%, color-mix(in srgb, var(--track-accent, #e10600) 14%, transparent), transparent 60%)`,
              }}
            />
            <div className="relative flex items-start justify-between gap-5">
              <TrackMeta
                track={track}
                titleId="smart-link-title-desktop"
                showVersion={showVersionInTitle}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/65 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              data-preview-btn
              onClick={onTogglePreview}
              className="relative mt-1 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full bg-[var(--track-accent,#e10600)] px-5 text-[0.9375rem] font-semibold leading-none text-white shadow-[0_0_28px_color-mix(in_srgb,var(--track-accent,#e10600)_40%,transparent)] transition hover:brightness-110 active:scale-[0.99]"
            >
              <span className="inline-flex items-center gap-2">
                {isPlaying ? (
                  <PauseIcon className="h-4 w-4 shrink-0" />
                ) : (
                  <PlayIcon className="h-4 w-4 shrink-0 translate-x-px" />
                )}
                <span>{isPlaying ? "Pausar preview" : "Ouvir preview"}</span>
              </span>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-1 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] sm:px-6 sm:py-5 md:border-t md:border-white/10 md:px-7 md:pt-5 md:pb-7">
          <button
            type="button"
            data-preview-btn
            onClick={onTogglePreview}
            className="mb-2.5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--track-accent,#e10600)] px-5 text-sm font-semibold leading-none text-white shadow-[0_0_28px_color-mix(in_srgb,var(--track-accent,#e10600)_40%,transparent)] transition hover:brightness-110 active:scale-[0.99] md:hidden"
          >
            <span className="inline-flex items-center gap-2">
              {isPlaying ? (
                <PauseIcon className="h-4 w-4 shrink-0" />
              ) : (
                <PlayIcon className="h-4 w-4 shrink-0 translate-x-px" />
              )}
              <span>{isPlaying ? "Pausar preview" : "Ouvir preview"}</span>
            </span>
          </button>

          <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 md:mb-3">
            Ouça nas plataformas
          </p>

          <ul className="space-y-1.5 md:grid md:grid-cols-2 md:gap-2 md:space-y-0">
            {platformOrder.map((platform) => {
              const href = track.platforms[platform.id];
              const rowClass =
                "flex min-h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 sm:min-h-12 sm:gap-3 sm:px-3.5 md:px-4";

              if (href) {
                return (
                  <li key={platform.id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${rowClass} transition hover:border-[color-mix(in_srgb,var(--track-accent,#e10600)_70%,transparent)] hover:bg-white/[0.05] active:scale-[0.995]`}
                    >
                      <PlatformIcon
                        id={platform.id}
                        className="h-5 w-5 shrink-0 text-white"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                        {platform.label}
                      </span>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--track-accent,#e10600)] sm:tracking-[0.22em]">
                        Ouvir
                      </span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={platform.id}>
                  <div className={`${rowClass} cursor-default opacity-40`}>
                    <PlatformIcon
                      id={platform.id}
                      className="h-5 w-5 shrink-0 text-white"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                      {platform.label}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 sm:tracking-[0.22em]">
                      Em breve
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
