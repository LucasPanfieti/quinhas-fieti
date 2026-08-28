export const artist = {
  name: "Quinhas Fieti",
  email: "quinhasfieti@gmail.com",
  tagline: "Ouça agora",
  bio: "Quinhas Fieti vem da madrugada — daquela hora em que a cidade ainda acende e ninguém pede desculpa. Três faixas pra ouvir agora no YouTube e no YouTube Music. Spotify, Apple Music, Deezer e o resto chegam juntas, no mesmo drop.",
  playlistUrl: "https://www.youtube.com/playlist?list=PLPBQzCTSvArw",
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
    {
      id: "email" as const,
      label: "E-mail",
      href: "mailto:quinhasfieti@gmail.com",
    },
  ],
};

export type SocialId = (typeof artist.socials)[number]["id"];
