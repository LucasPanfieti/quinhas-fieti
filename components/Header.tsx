import Image from "next/image";
import { artist } from "@/data/artist";
import { SocialIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
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

        <nav className="flex min-w-0 items-center gap-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:gap-8 sm:text-[11px] sm:tracking-[0.32em]">
          <a href="#musicas" className="py-2 transition-colors hover:text-white">
            Músicas
          </a>
          <a href="#sobre" className="py-2 transition-colors hover:text-white">
            Sobre
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          {artist.socials.map((social) => {
            const hiddenOnMobile =
              social.id === "spotify" || social.id === "email"
                ? "hidden sm:flex"
                : "flex";

            if (social.href) {
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className={`${hiddenOnMobile} size-10 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:size-9`}
                >
                  <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
                </a>
              );
            }

            return (
              <span
                key={social.id}
                title={`${social.label} — em breve`}
                aria-label={`${social.label} em breve`}
                className={`${hiddenOnMobile} size-10 cursor-not-allowed items-center justify-center rounded-full text-white/25 sm:size-9`}
              >
                <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}
