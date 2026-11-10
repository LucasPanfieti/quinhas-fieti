"use client";

import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  formatShortReleaseDate,
  genreOrder,
  getVersionLabel,
  searchTracks,
  type Track,
} from "@/data/tracks";
import { CloseIcon, SearchIcon } from "@/components/icons";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (track: Track) => void;
};

export function SearchDialog({ open, onClose, onSelect }: SearchDialogProps) {
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchTracks(deferredQuery, 10),
    [deferredQuery],
  );

  const showingSuggestions = deferredQuery.trim().length === 0;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    setActiveIndex(0);

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length === 0 ? 0 : (index + 1) % results.length,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length === 0
            ? 0
            : (index - 1 + results.length) % results.length,
        );
        return;
      }

      if (event.key === "Enter") {
        const track = results[activeIndex];
        if (!track) return;
        event.preventDefault();
        onSelect(track);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onSelect, results, activeIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-6 sm:pt-[min(18vh,7.5rem)]">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar busca"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px] animate-fade-in"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={inputId}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.65)] animate-rise-in"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5">
          <SearchIcon className="h-5 w-5 shrink-0 text-white/45" />
          <label htmlFor={inputId} className="sr-only">
            Buscar músicas
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar faixa, versão ou gênero…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-controls={listId}
            aria-autocomplete="list"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35 sm:text-base"
          />
          {query ? (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="flex size-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35 sm:inline">
              Esc
            </kbd>
          )}
        </div>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain">
          <p className="px-4 pt-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 sm:px-5">
            {showingSuggestions ? "Sugestões" : "Resultados"}
            {!showingSuggestions ? (
              <span className="ml-2 tracking-[0.14em] text-white/25">
                {results.length}
              </span>
            ) : null}
          </p>

          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-white/45 sm:px-5">
              Nenhuma faixa encontrada para “{query.trim()}”.
            </p>
          ) : (
            <ul id={listId} role="listbox" className="px-2 py-2 sm:px-3">
              {results.map((track, index) => {
                const active = index === activeIndex;
                const genreLabel =
                  genreOrder.find((genre) => genre.id === track.genre)?.label ??
                  track.genre;

                return (
                  <li key={track.id} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => onSelect(track)}
                      style={{
                        ["--track-accent" as string]: track.accentColor,
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition sm:gap-3.5 sm:px-3 ${
                        active
                          ? "bg-white/[0.07]"
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10 sm:size-14">
                        <Image
                          src={track.cover}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-[1.35rem] leading-none tracking-wide text-white sm:text-[1.5rem]">
                          {track.title}
                          {track.version ? (
                            <span className="text-white/35">
                              {" "}
                              ({track.version})
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1.5 block truncate text-[11px] uppercase tracking-[0.16em] text-white/40">
                          <span className="text-[color-mix(in_srgb,var(--track-accent)_75%,white)]">
                            {genreLabel}
                          </span>
                          <span className="mx-1.5 text-white/20" aria-hidden>
                            ·
                          </span>
                          {getVersionLabel(track)}
                          <span className="mx-1.5 text-white/20" aria-hidden>
                            ·
                          </span>
                          {track.releaseDate
                            ? formatShortReleaseDate(track.releaseDate)
                            : "Em breve"}
                        </span>
                      </span>

                      <span
                        className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                          active ? "text-[#E20600]" : "text-white/30"
                        }`}
                      >
                        Abrir
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
