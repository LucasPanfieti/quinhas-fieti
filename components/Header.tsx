import Image from "next/image";
import { artist } from "@/data/artist";
import { SocialIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <a
          href="#topo"
          className="relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 sm:size-10"
          aria-label="Quinhas Fieti — início"
        >
          <Image
            src="/logo.webp"
            alt="Quinhas Fieti"
            width={40}
            height={40}
            sizes="40px"
            className="h-full w-full object-cover"
            priority
          />
        </a>

        <nav className="flex min-w-0 flex-1 items-center justify-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/70 sm:gap-8 sm:text-[11px] sm:tracking-[0.32em]">
          <a
            href="#musicas"
            className="shrink-0 whitespace-nowrap px-1.5 py-2.5 transition-colors hover:text-white"
          >
            Músicas
          </a>
          <a
            href="#playlists"
            className="shrink-0 whitespace-nowrap px-1.5 py-2.5 transition-colors hover:text-white"
          >
            Playlists
          </a>
          <a
            href="#sobre"
            className="shrink-0 whitespace-nowrap px-1.5 py-2.5 transition-colors hover:text-white"
          >
            Sobre
          </a>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {artist.socials.map((social) =>
            social.href ? (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
              </a>
            ) : (
              <span
                key={social.id}
                title={`${social.label} — em breve`}
                aria-label={`${social.label} em breve`}
                className="flex size-9 cursor-not-allowed items-center justify-center rounded-full text-white/25"
              >
                <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
              </span>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
