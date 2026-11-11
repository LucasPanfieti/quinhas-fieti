import { getGenreListCopy, type GenreId } from "@/data/tracks";

export type Playlist = {
  id: string;
  name: string;
  genre: string;
  description: string;
  /** YouTube playlist URL — null while the playlist is still being set up. */
  href: string | null;
  /** Cover art path — null shows a genre placeholder in the UI. */
  cover: string | null;
  featured?: boolean;
  /** Links a genre playlist to `genreOrder` when applicable. */
  genreId?: GenreId;
};

export const artist = {
  name: "Quinhas Fieti",
  legalName: "Lucas Panfieti",
  email: "quinhasfieti@gmail.com",
  tagline: "Ouça agora",
  bio: [
    "Um projeto musical independente, criado para transformar sentimentos, histórias e ideias em música.",
    "Letras originais escritas por Quinhas Fieti, com produção e ferramentas de inteligência artificial como parte do processo criativo.",
    `Aqui você encontra ${getGenreListCopy()} e diferentes sonoridades, sempre buscando criar músicas marcantes, refrões que grudam e uma identidade própria.`,
    "Os lançamentos saem nas principais plataformas de streaming. Os links ficam aqui, faixa por faixa.",
    "Quinhas Fieti — música que gruda.",
  ],
  playlistUrl: "https://www.youtube.com/playlist?list=PLPBQzCTSvArw",
  playlists: [
    {
      id: "sounds",
      name: "Quinha's Sounds",
      genre: "Todas",
      description: `${getGenreListCopy({ capitalize: true })} — o catálogo inteiro num só lugar.`,
      href: "https://www.youtube.com/playlist?list=PLPBQzCTSvArw",
      cover: "/quinhas-sounds.webp",
      featured: true,
    },
    {
      id: "trap",
      name: "Quinha's Trap",
      genre: "Trap",
      genreId: "trap",
      description: "Todas as músicas Trap de Quinhas Fieti",
      href: "https://www.youtube.com/playlist?list=PLBhfugoWT_4c",
      cover: "/covers/quinhas-trap-capa-v2.webp",
    },
    {
      id: "pop",
      name: "Quinha's Pop",
      genre: "Pop",
      genreId: "pop",
      description: "Todas as músicas Pop de Quinhas Fieti",
      href: "https://www.youtube.com/playlist?list=PLJp7stsEMO8A",
      cover: "/covers/quinhas-pop-capa-v2.webp",
    },
    {
      id: "pagode",
      name: "Quinha's Pagode",
      genre: "Pagode",
      genreId: "pagode",
      description: "Todas as músicas Pagode de Quinhas Fieti",
      href: "https://www.youtube.com/playlist?list=PLfBPAu1uZUI0",
      cover: "/covers/quinhas-pagode-capa-v2.webp",
    },
  ] satisfies Playlist[],
  socials: [
    {
      id: "youtube" as const,
      label: "YouTube",
      href: "https://www.youtube.com/@QuinhasFieti",
    },
    {
      id: "instagram" as const,
      label: "Instagram",
      href: "https://www.instagram.com/quinhasfieti/",
    },
    {
      id: "tiktok" as const,
      label: "TikTok",
      href: "https://www.tiktok.com/@quinhas.fieti",
    },
    {
      id: "spotify" as const,
      label: "Spotify",
      href: "https://open.spotify.com/artist/1bKQ2NCpp2g5VRAhWeEvVi",
    },
  ],
};

export type SocialId = (typeof artist.socials)[number]["id"];
