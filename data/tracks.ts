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

export const genreOrder = [
  { id: "trap", label: "Trap" },
  { id: "pop", label: "Pop" },
] as const;

export type GenreId = (typeof genreOrder)[number]["id"];

export type Track = {
  id: string;
  title: string;
  version?: string;
  genre: GenreId;
  cover: string;
  featured?: boolean;
  releaseDate?: string;
  youtubeId?: string;
  preview: string;
  accentColor: string;
  platforms: Record<PlatformId, string | null>;
};

export function formatReleaseDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

function emptyPlatforms(): Record<PlatformId, string | null> {
  return {
    youtube: null,
    youtubeMusic: null,
    spotify: null,
    appleMusic: null,
    deezer: null,
    amazonMusic: null,
    tidal: null,
    tiktok: null,
    instagram: null,
  };
}

function platforms(youtubeId: string): Record<PlatformId, string | null> {
  return {
    ...emptyPlatforms(),
    youtube: `https://www.youtube.com/watch?v=${youtubeId}`,
    youtubeMusic: `https://music.youtube.com/watch?v=${youtubeId}`,
  };
}

export const tracks: Track[] = [
  {
    id: "depois-da-meia-noite",
    title: "Depois da Meia-Noite",
    version: "Versão Alternativa",
    genre: "trap",
    cover: "/covers/depois-da-meia-noite.webp",
    featured: true,
    releaseDate: "2026-09-10",
    youtubeId: "7YV6_TIeEtI",
    preview: "/previews/depois-da-meia-noite.mp3",
    accentColor: "#e10600",
    platforms: {
      ...platforms("7YV6_TIeEtI"),
      spotify: "https://open.spotify.com/track/61rX0ngNmlWfTnRqzi6CwC",
      appleMusic:
        "https://music.apple.com/br/album/depois-da-meia-noite/6804056774?i=6804056777",
      deezer: "https://www.deezer.com/track/4238673912",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HG3GG8P9",
      tidal: "https://tidal.com/track/554539022",
      tiktok:
        "https://www.tiktok.com/music/Depois-da-Meia-Noite-7676612461164840977",
      instagram: "https://www.instagram.com/reels/audio/1623949082669772",
    },
  },
  {
    id: "fica",
    title: "Fica",
    version: "Versão Pop Alternativa",
    genre: "pop",
    cover: "/covers/fica.webp",
    releaseDate: "2026-09-24",
    youtubeId: "60iEM8L4Q58",
    preview: "/previews/fica.mp3",
    accentColor: "#e91e8c",
    platforms: platforms("60iEM8L4Q58"),
  },
  {
    id: "linha-invisivel",
    title: "Linha Invisível",
    genre: "trap",
    cover: "/covers/linha-invisivel.webp",
    releaseDate: "2026-10-01",
    preview: "/previews/linha-invisivel.mp3",
    accentColor: "#c026d3",
    platforms: emptyPlatforms(),
  },
  {
    id: "meu-ourinho-branco",
    title: "Meu Ourinho Branco",
    version: "Versão Pop Alternativa",
    genre: "pop",
    cover: "/covers/meu-ourinho-branco.webp",
    releaseDate: "2026-10-08",
    youtubeId: "SghuW7_NeyU",
    preview: "/previews/meu-ourinho-branco.mp3",
    accentColor: "#d4a017",
    platforms: platforms("SghuW7_NeyU"),
  },
  {
    id: "nao-sai-da-minha-cabeca",
    title: "Não Sai da Minha Cabeça",
    genre: "trap",
    cover: "/covers/nao-sai-da-minha-cabeca.webp",
    releaseDate: "2026-10-15",
    preview: "/previews/nao-sai-da-minha-cabeca.mp3",
    accentColor: "#2563eb",
    platforms: emptyPlatforms(),
  },
  {
    id: "fica-quinhas-version",
    title: "Fica",
    genre: "trap",
    cover: "/covers/fica-quinhas-version.webp",
    releaseDate: "2026-10-22",
    preview: "/previews/fica-quinhas-version.mp3",
    accentColor: "#e91e8c",
    platforms: emptyPlatforms(),
  },
  {
    id: "meu-ourinho-branco-quinhas-version",
    title: "Meu Ourinho Branco",
    genre: "trap",
    cover: "/covers/meu-ourinho-branco-quinhas-version.webp",
    releaseDate: "2026-10-08",
    preview: "/previews/meu-ourinho-branco-quinhas-version.mp3",
    accentColor: "#d4a017",
    platforms: emptyPlatforms(),
  },
  {
    id: "depois-da-meia-noite-quinhas-version",
    title: "Depois da Meia-Noite",
    genre: "trap",
    cover: "/covers/depois-da-meia-noite-quinhas-version.webp",
    releaseDate: "2026-10-29",
    preview: "/previews/depois-da-meia-noite-quinhas-version.mp3",
    accentColor: "#e10600",
    platforms: emptyPlatforms(),
  },
];

export const featuredTrack =
  tracks.find((track) => track.featured) ?? tracks[0];

function compareReleaseDate(a: Track, b: Track) {
  if (!a.releaseDate && !b.releaseDate) return 0;
  if (!a.releaseDate) return 1;
  if (!b.releaseDate) return -1;
  return a.releaseDate.localeCompare(b.releaseDate);
}

function compareTrackVersions(a: Track, b: Track) {
  const aOfficial = !a.version;
  const bOfficial = !b.version;
  if (aOfficial !== bOfficial) return aOfficial ? -1 : 1;
  return compareReleaseDate(a, b);
}

/** Label for version tabs / UI. */
export function getVersionLabel(track: Track) {
  return track.version ?? "Oficial";
}

/** All releases that share a title (official first). */
export function getTrackVersions(track: Track) {
  return tracks
    .filter((item) => item.title === track.title)
    .sort(compareTrackVersions);
}

export function getTracksByGenre(genre: GenreId) {
  return tracks
    .filter((track) => track.genre === genre)
    .sort(compareReleaseDate);
}
