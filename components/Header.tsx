"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { artist } from "@/data/artist";
import {
  CloseIcon,
  MenuIcon,
  SearchIcon,
  SocialIcon,
} from "@/components/icons";
import { SearchDialog } from "@/components/SearchDialog";
import type { Track } from "@/data/tracks";

const navLinks = [
  { href: "#musicas", id: "musicas", label: "Músicas" },
  { href: "#agenda", id: "agenda", label: "Agenda" },
  { href: "#playlists", id: "playlists", label: "Playlists" },
  { href: "#sobre", id: "sobre", label: "Sobre" },
] as const;

const sectionIds = ["topo", ...navLinks.map((link) => link.id)] as const;
type SectionId = (typeof sectionIds)[number];

const activeSocials = artist.socials.filter((social) => social.href);

type HeaderProps = {
  onSelectTrack: (track: Track) => void;
};

export function Header({ onSelectTrack }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("topo");
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const atHero = activeSection === "topo";

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const isMod = event.metaKey || event.ctrlKey;
      if (isMod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 640px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: SectionId = "topo";
        let bestRatio = -1;
        for (const id of sectionIds) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveSection(bestId);
        } else if (window.scrollY < 80) {
          setActiveSection("topo");
        }
      },
      {
        root: null,
        // Bias toward the band just under the fixed header
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 pt-[env(safe-area-inset-top)] backdrop-blur-md"
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:h-16 sm:gap-5 sm:px-5 md:px-6">
        <a
          href="#topo"
          className={`group relative size-9 shrink-0 overflow-hidden rounded-full transition-[box-shadow,ring-color] duration-300 sm:size-10 ${
            atHero
              ? "ring-2 ring-[#E20600] ring-offset-2 ring-offset-black shadow-[0_0_18px_rgba(226,6,0,0.5)]"
              : "ring-1 ring-white/20 hover:ring-white/40"
          }`}
          aria-label="Quinhas Fieti — início"
          aria-current={atHero ? "true" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/icone_redondo.webp"
            alt="Quinhas Fieti"
            width={40}
            height={40}
            sizes="40px"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            priority
          />
        </a>

        <nav
          className="hidden min-w-0 items-center gap-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/65 sm:flex sm:gap-0.5 md:gap-1 md:tracking-[0.32em]"
          aria-label="Principal"
        >
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-sm px-2.5 py-2 transition-[color,font-weight] duration-300 ease-out md:px-3 ${
                  active
                    ? "font-bold text-[#E20600]"
                    : "font-medium text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
          <button
            type="button"
            aria-label="Buscar músicas"
            title="Buscar músicas (Ctrl+K)"
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            className={`flex size-9 items-center justify-center rounded-full transition-colors sm:size-10 ${
              searchOpen
                ? "bg-white/10 text-white"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <SearchIcon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
          </button>

          {activeSocials.map((social) => (
            <a
              key={social.id}
              href={social.href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-9 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:size-10"
            >
              <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
            </a>
          ))}

          {artist.socials
            .filter((social) => !social.href)
            .map((social) => (
              <span
                key={social.id}
                title={`${social.label} — em breve`}
                aria-label={`${social.label} em breve`}
                className="hidden size-9 cursor-not-allowed items-center justify-center rounded-full text-white/25 sm:flex"
              >
                <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
              </span>
            ))}

          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon
              className={`absolute h-5 w-5 transition duration-200 ease-out ${
                menuOpen
                  ? "scale-75 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />
            <CloseIcon
              className={`absolute h-5 w-5 transition duration-200 ease-out ${
                menuOpen
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-75 -rotate-90 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none sm:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          id={menuId}
          aria-label="Seções"
          aria-hidden={!menuOpen}
          inert={!menuOpen ? true : undefined}
          className={`min-h-0 overflow-hidden bg-black/90 transition-[border-color] duration-300 ${
            menuOpen ? "border-t border-white/10" : "border-t border-transparent"
          }`}
        >
          <ul className="flex flex-col px-2 py-2">
            {navLinks.map((link, index) => {
              const active = activeSection === link.id;
              return (
                <li
                  key={link.href}
                  className={`transition duration-300 ease-out motion-reduce:transition-none ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-0"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${60 + index * 40}ms` : "0ms",
                  }}
                >
                  <a
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-12 items-center px-4 text-[12px] uppercase tracking-[0.22em] transition-[color,font-weight] duration-300 ease-out ${
                      active
                        ? "font-bold text-[#E20600]"
                        : "font-medium text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(track) => {
          setSearchOpen(false);
          onSelectTrack(track);
        }}
      />
    </header>
  );
}
