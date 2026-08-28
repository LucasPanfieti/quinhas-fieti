export const platformOrder = [
  { id: "youtube", label: "YouTube" },
  { id: "youtubeMusic", label: "YouTube Music" },
  { id: "spotify", label: "Spotify" },
  { id: "appleMusic", label: "Apple Music" },
  { id: "deezer", label: "Deezer" },
  { id: "amazonMusic", label: "Amazon Music" },
  { id: "tidal", label: "TIDAL" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
] as const;

export type PlatformId = (typeof platformOrder)[number]["id"];

export type Track = {
  id: string;
  title: string;
  cover: string;
  featured?: boolean;
  releaseDate?: string;
  youtubeId: string;
  platforms: Record<PlatformId, string | null>;
};

export function formatReleaseDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(new Date(`${iso}T12:00:00`));
}

function platforms(youtubeId: string): Record<PlatformId, string | null> {
  return {
    youtube: `https://www.youtube.com/watch?v=${youtubeId}`,
    youtubeMusic: `https://music.youtube.com/watch?v=${youtubeId}`,
    spotify: null,
    appleMusic: null,
    deezer: null,
    amazonMusic: null,
    tidal: null,
    tiktok: null,
    instagram: null,
  };
}

export const tracks: Track[] = [
  {
    id: "depois-da-meia-noite",
    title: "Depois da Meia-Noite",
    cover: "/covers/depois-da-meia-noite.webp",
    featured: true,
    releaseDate: "2026-09-10",
    youtubeId: "7YV6_TIeEtI",
    platforms: platforms("7YV6_TIeEtI"),
  },
  {
    id: "fica",
    title: "Fica",
    cover: "/covers/fica.webp",
    releaseDate: "2026-09-24",
    youtubeId: "60iEM8L4Q58",
    platforms: platforms("60iEM8L4Q58"),
  },
  {
    id: "meu-ourinho-branco",
    title: "Meu Ourinho Branco",
    cover: "/covers/meu-ourinho-branco.webp",
    releaseDate: "2026-10-08",
    youtubeId: "SghuW7_NeyU",
    platforms: platforms("SghuW7_NeyU"),
  },
];

export const featuredTrack = tracks.find((track) => track.featured) ?? tracks[0];
