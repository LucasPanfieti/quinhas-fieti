"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { artist } from "@/data/artist";
import { CloseIcon, MenuIcon, SocialIcon } from "@/components/icons";

const navLinks = [
  { href: "#musicas", label: "Músicas" },
  { href: "#playlists", label: "Playlists" },
  { href: "#sobre", label: "Sobre" },
] as const;

const activeSocials = artist.socials.filter((social) => social.href);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

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
    function onResize() {
      if (window.matchMedia("(min-width: 640px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 pt-[env(safe-area-inset-top)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <a
          href="#topo"
          className="group relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 sm:size-10"
          aria-label="Quinhas Fieti — início"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.webp"
            alt="Quinhas Fieti"
            width={40}
            height={40}
            sizes="40px"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            priority
          />
        </a>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-8 text-[11px] font-medium uppercase tracking-[0.32em] text-white/70 sm:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap px-1.5 py-2.5 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:ml-0 sm:gap-2">
          {activeSocials.map((social) => (
            <a
              key={social.id}
              href={social.href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-9 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
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
            className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Seções"
        className={`border-t border-white/10 bg-black/90 sm:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-2 py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center px-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
