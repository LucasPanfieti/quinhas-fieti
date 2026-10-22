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
    platforms: {
      ...platforms("60iEM8L4Q58"),
      spotify: "https://open.spotify.com/track/3hKgOA50LoJeRoPKTwTGUi",
      appleMusic:
        "https://music.apple.com/br/album/fica/6804056233?i=6804056235",
      deezer: "https://www.deezer.com/track/4238673462",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HG39F3R3",
      tidal: "https://tidal.com/track/554538950",
      tiktok: "https://www.tiktok.com/music/Fica-7676627402328557585",
      instagram: "https://www.instagram.com/reels/audio/1729016225048926",
    },
  },
  {
    id: "linha-invisivel",
    title: "Linha Invisível",
    genre: "trap",
    cover: "/covers/linha-invisivel.webp",
    releaseDate: "2026-10-01",
    youtubeId: "Mrc5j2mnovo",
    preview: "/previews/linha-invisivel.mp3",
    accentColor: "#c026d3",
    platforms: {
      ...platforms("Mrc5j2mnovo"),
      spotify: "https://open.spotify.com/track/6HdXwIFU0UXIwVS7nkUvXk",
      appleMusic:
        "https://music.apple.com/br/album/linha-invisível-single/6811682644?i=6811682645",
      deezer: "https://www.deezer.com/track/4284074142",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HJP7GW4J",
      tidal: "https://tidal.com/track/560924325",
      tiktok: "https://www.tiktok.com/music/Linha-Invisível-7685131426731886609",
      instagram: "https://www.instagram.com/reels/audio/2541941496308882",
    },
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
    platforms: {
      ...platforms("SghuW7_NeyU"),
      spotify: "https://open.spotify.com/track/0SBnpPLn1beZx1BytByzNH",
      appleMusic:
        "https://music.apple.com/br/album/meu-ourinho-branco/6806435436?i=6806435437",
      deezer: "https://www.deezer.com/track/4252827711",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HHR2HJPP",
      tidal: "https://tidal.com/track/556600666",
      tiktok: "https://www.tiktok.com/music/Meu-Ourinho-Branco-7679246364145584145",
      instagram: "https://www.instagram.com/reels/audio/1694447628326112",
    },
  },
  {
    id: "fica-pop-version",
    title: "Fica",
    version: "Versão Pop",
    genre: "pop",
    cover: "/covers/fica-pop-version.webp",
    preview: "/previews/fica-pop-version.mp3",
    accentColor: "#e91e8c",
    platforms: emptyPlatforms(),
  },
  {
    id: "meu-ourinho-branco-pop-version",
    title: "Meu Ourinho Branco",
    version: "Versão Pop",
    genre: "pop",
    cover: "/covers/meu-ourinho-branco-pop-version.webp",
    preview: "/previews/meu-ourinho-branco-pop-version.mp3",
    accentColor: "#d4a017",
    platforms: emptyPlatforms(),
  },
  {
    id: "nao-sai-da-minha-cabeca",
    title: "Não Sai da Minha Cabeça",
    genre: "trap",
    cover: "/covers/nao-sai-da-minha-cabeca.webp",
    releaseDate: "2026-10-15",
    youtubeId: "3f0PmZV1Rwo",
    preview: "/previews/nao-sai-da-minha-cabeca.mp3",
    accentColor: "#2563eb",
    platforms: {
      ...platforms("3f0PmZV1Rwo"),
      spotify: "https://open.spotify.com/track/0ruAg6j3mpg06vem9u79wZ",
      appleMusic:
        "https://music.apple.com/br/album/não-sai-da-minha-cabeça/6811681580?i=6811681581",
      deezer: "https://www.deezer.com/track/4284074022",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HJP5V8GC",
      tidal: "https://tidal.com/track/560924310",
      tiktok:
        "https://www.tiktok.com/music/Não-Sai-da-Minha-Cabeça-7685108627459409936",
      instagram: "https://www.instagram.com/reels/audio/1526466322833416",
    },
  },
  {
    id: "fica-quinhas-version",
    title: "Fica",
    genre: "trap",
    cover: "/covers/fica-quinhas-version.webp",
    releaseDate: "2026-10-22",
    youtubeId: "CQ5mNTQQRZ0",
    preview: "/previews/fica-quinhas-version.mp3",
    accentColor: "#e91e8c",
    platforms: {
      ...platforms("CQ5mNTQQRZ0"),
      spotify: "https://open.spotify.com/track/1h1zHxJV1hWERH47FYXoqJ",
      appleMusic:
        "https://music.apple.com/br/album/fica/6813154624?i=6813154625",
      deezer: "https://www.deezer.com/track/4292117352",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HK6BJPMW",
      tidal: "https://tidal.com/track/561944227",
      tiktok: "https://www.tiktok.com/music/Fica-7686549530880067601",
      instagram: "https://www.instagram.com/reels/audio/1449723156997747",
    },
  },
  {
    id: "meu-ourinho-branco-quinhas-version",
    title: "Meu Ourinho Branco",
    genre: "trap",
    cover: "/covers/meu-ourinho-branco-quinhas-version.webp",
    releaseDate: "2026-10-08",
    youtubeId: "Remvx0xmARI",
    preview: "/previews/meu-ourinho-branco-quinhas-version.mp3",
    accentColor: "#d4a017",
    platforms: {
      ...platforms("Remvx0xmARI"),
      spotify: "https://open.spotify.com/track/2kYgFRG9G5Qhxh9TdxcR2k",
      appleMusic:
        "https://music.apple.com/br/album/meu-ourinho-branco/6812445133?i=6812445136",
      amazonMusic: "https://music.amazon.com.br/tracks/B0HJX2X274",
      tidal: "https://tidal.com/track/561430489",
      tiktok: "https://www.tiktok.com/music/Meu-Ourinho-Branco-7685773087485528080",
      instagram: "https://www.instagram.com/reels/audio/934829662521939",
    },
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
  {
    id: "mais-tempo",
    title: "Mais Tempo",
    genre: "trap",
    cover: "/covers/mais-tempo.webp",
    preview: "/previews/mais-tempo.mp3",
    accentColor: "#50C43C",
    platforms: emptyPlatforms(),
  },
];

export const featuredTrack =
  tracks.find((track) => track.featured) ?? tracks[0];

/**
 * Latest released drops (America/Sao_Paulo calendar day).
 * Same-day ties: featured flag, then later version variants.
 */
export function getRecentDrops(limit = 2, today = new Date()): Track[] {
  const todayIso = getTodayIso(today);
  return tracks
    .filter((track) => track.releaseDate && track.releaseDate <= todayIso)
    .sort((a, b) => {
      const byDate = b.releaseDate!.localeCompare(a.releaseDate!);
      if (byDate !== 0) return byDate;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return versionRank(b) - versionRank(a);
    })
    .slice(0, limit);
}

export function getCurrentDrop(today = new Date()): Track {
  return getRecentDrops(1, today)[0] ?? featuredTrack;
}

function compareReleaseDate(a: Track, b: Track) {
  if (!a.releaseDate && !b.releaseDate) return 0;
  if (!a.releaseDate) return 1;
  if (!b.releaseDate) return -1;
  return a.releaseDate.localeCompare(b.releaseDate);
}

function compareTrackVersions(a: Track, b: Track) {
  const aRank = versionRank(a);
  const bRank = versionRank(b);
  if (aRank !== bRank) return aRank - bRank;
  return compareReleaseDate(a, b);
}

function versionRank(track: Track) {
  if (!track.version) return 0;
  if (track.version === "Versão Pop") return 1;
  if (track.version === "Versão Pop Alternativa") return 2;
  if (track.version === "Versão Alternativa") return 3;
  return 4;
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

export type ReleaseStatus = "released" | "upcoming" | "tba";
export type AgendaStatus = "available" | "next" | "soon" | "tba";

export function formatShortReleaseDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

/** Calendar day in America/Sao_Paulo as YYYY-MM-DD. */
export function getTodayIso(today = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
}

export function getReleaseStatus(
  track: Track,
  today = new Date(),
): ReleaseStatus {
  if (!track.releaseDate) return "tba";
  return track.releaseDate <= getTodayIso(today) ? "released" : "upcoming";
}

/** Full release timeline, dated first then TBA. */
export function getReleaseSchedule() {
  return [...tracks].sort(compareReleaseDate);
}

/**
 * Agenda labels: only the first future dated release is "next";
 * later dated ones are "soon"; undated are "tba".
 */
export function getAgendaStatuses(today = new Date()) {
  const schedule = getReleaseSchedule();
  const statuses = new Map<string, AgendaStatus>();
  let assignedNext = false;

  for (const track of schedule) {
    const status = getReleaseStatus(track, today);

    if (status === "released") {
      statuses.set(track.id, "available");
      continue;
    }

    if (status === "tba") {
      statuses.set(track.id, "tba");
      continue;
    }

    if (!assignedNext) {
      statuses.set(track.id, "next");
      assignedNext = true;
    } else {
      statuses.set(track.id, "soon");
    }
  }

  return statuses;
}

/** Stable first paint (no "today") — avoids SSR/client date mismatches. */
export function getAgendaStatusesPlaceholder() {
  const statuses = new Map<string, AgendaStatus>();
  for (const track of getReleaseSchedule()) {
    statuses.set(track.id, track.releaseDate ? "soon" : "tba");
  }
  return statuses;
}
