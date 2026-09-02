"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { artist } from "@/data/artist";
import { formatReleaseDate, platformOrder, type Track } from "@/data/tracks";
import { CloseIcon, PauseIcon, PlatformIcon, PlayIcon } from "@/components/icons";

type SmartLinkModalProps = {
  track: Track | null;
  isPlaying: boolean;
  onTogglePreview: () => void;
  onClose: () => void;
};

function getFocusableElements(container: HTMLElement) {
  return [
    ...container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((element) => !element.hasAttribute("disabled"));
}

export function SmartLinkModal({
  track,
  isPlaying,
  onTogglePreview,
  onClose,
}: SmartLinkModalProps) {
  const onCloseRef = useRef(onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!track) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusFrame = window.requestAnimationFrame(() => {
      previewButtonRef.current?.focus();
    });

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
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus();
    };
  }, [track]);

  if (!track) return null;

  const youtubeUrl = track.platforms.youtube;

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
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[min(94dvh,100%)] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_80px_rgba(225,6,0,0.18)] animate-rise-in sm:max-h-[85vh] sm:rounded-3xl"
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-white/25 md:hidden" />

        <div className="relative isolate md:hidden">
          <div className="relative h-36 w-full min-[380px]:h-40">
            <Image
              src={track.cover}
              alt={`Capa de ${track.title}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-black/20" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/70">
              {artist.name}
            </p>
            <h3
              id="smart-link-title"
              className="mt-1 font-display text-[clamp(1.4rem,7vw,1.85rem)] leading-none tracking-wide text-white"
            >
              {track.title}
            </h3>
            {track.releaseDate ? (
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-white/55">
                {formatReleaseDate(track.releaseDate)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[260px_1fr]">
          <div className="relative hidden aspect-square md:block">
            <Image
              src={track.cover}
              alt={`Capa de ${track.title}`}
              fill
              sizes="260px"
              className="object-cover"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="hidden items-start justify-between gap-4 border-b border-white/10 px-6 py-5 md:flex">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/45">
                  {artist.name}
                </p>
                <h3 className="mt-1 font-display text-4xl tracking-wide text-white">
                  {track.title}
                </h3>
                {track.releaseDate ? (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {formatReleaseDate(track.releaseDate)}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] sm:px-6 sm:py-5">
              <button
                ref={previewButtonRef}
                type="button"
                onClick={onTogglePreview}
                className="mb-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(225,6,0,0.4)] transition hover:bg-[#ff1a12]"
              >
                {isPlaying ? (
                  <PauseIcon className="h-4 w-4" />
                ) : (
                  <PlayIcon className="h-4 w-4" />
                )}
                {isPlaying ? "Pausar preview" : "Ouvir preview"}
              </button>

              {youtubeUrl ? (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:px-5"
                >
                  <PlatformIcon id="youtube" className="h-5 w-5 shrink-0" />
                  Assistir no YouTube
                </a>
              ) : null}

              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
                Ouça nas plataformas
              </p>

              <ul className="space-y-2">
                {platformOrder
                  .filter((platform) => platform.id !== "youtube")
                  .map((platform) => {
                    const href = track.platforms[platform.id];
                    const rowClass =
                      "flex min-h-12 items-center gap-2.5 rounded-xl border border-white/10 px-3 sm:gap-3 sm:px-3.5";

                    if (href) {
                      return (
                        <li key={platform.id}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${rowClass} transition hover:border-accent/70 hover:bg-white/[0.04]`}
                          >
                            <PlatformIcon
                              id={platform.id}
                              className="h-5 w-5 shrink-0 text-white"
                            />
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                              {platform.label}
                            </span>
                            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent sm:tracking-[0.22em]">
                              Ouvir
                            </span>
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={platform.id}>
                        <div className={`${rowClass} cursor-default opacity-45`}>
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
      </div>
    </div>
  );
}
