import { artist } from "@/data/artist";
import { SocialIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 sm:gap-6 sm:px-6 sm:py-12">
        <nav className="flex items-center gap-1 sm:hidden">
          <a
            href="#musicas"
            className="px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/50"
          >
            Músicas
          </a>
          <a
            href="#sobre"
            className="px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/50"
          >
            Sobre
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {artist.socials.map((social) =>
            social.href ? (
              <a
                key={social.id}
                href={social.href}
                target={social.id === "email" ? undefined : "_blank"}
                rel={social.id === "email" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="flex size-11 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white sm:size-10"
              >
                <SocialIcon id={social.id} className="h-5 w-5" />
              </a>
            ) : (
              <span
                key={social.id}
                title={`${social.label} — em breve`}
                className="flex size-11 cursor-not-allowed items-center justify-center rounded-full text-white/20 sm:size-10"
              >
                <SocialIcon id={social.id} className="h-5 w-5" />
              </span>
            ),
          )}
        </div>

        <p className="text-center text-xs tracking-wide text-white/35">
          © {new Date().getFullYear()} {artist.name}
        </p>
      </div>
    </footer>
  );
}
