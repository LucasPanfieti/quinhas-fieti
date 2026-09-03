export const artist = {
  name: "Quinhas Fieti",
  tagline: "Ouça agora",
  bio: [
    "Um projeto musical independente, criado para transformar sentimentos, histórias e ideias em música.",
    "Letras originais escritas por Quinhas Fieti, com produção e ferramentas de inteligência artificial como parte do processo criativo.",
    "Aqui você encontra pop, trap e diferentes sonoridades, sempre buscando criar músicas marcantes, refrões que grudam e uma identidade própria.",
    "Três faixas pra ouvir agora no YouTube e no YouTube Music. Spotify, Apple Music, Deezer e o resto chegam juntas, no mesmo drop.",
    "Quinhas Fieti — música que gruda.",
  ],
  playlistUrl: "https://www.youtube.com/playlist?list=PLPBQzCTSvArw",
  playlists: [
    {
      id: "sounds",
      name: "Quinha's Sounds",
      genre: "Todas",
      description: "Pop, trap e o resto — o catálogo inteiro num só lugar.",
      href: "https://www.youtube.com/playlist?list=PLPBQzCTSvArw",
      cover: "/quinhas-sounds.webp",
      featured: true,
    },
    {
      id: "trap",
      name: "Quinha's Trap",
      genre: "Trap",
      description: "Todas as músicas Trap de Quinhas Fieti",
      href: "https://www.youtube.com/playlist?list=PLBhfugoWT_4c",
      cover: "/covers/quinhas-trap-capa.webp",
    },
    {
      id: "pop",
      name: "Quinha's Pop",
      genre: "Pop",
      description: "Todas as músicas Pop de Quinhas Fieti",
      href: "https://www.youtube.com/playlist?list=PLJp7stsEMO8A",
      cover: "/covers/quinhas-pop-capa.webp",
    },
  ],
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
      href: null,
    },
  ],
};

export type SocialId = (typeof artist.socials)[number]["id"];
