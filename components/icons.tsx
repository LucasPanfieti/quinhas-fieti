import type { ReactNode } from "react";
import type { PlatformId } from "@/data/tracks";
import type { SocialId } from "@/data/artist";

type IconProps = {
  className?: string;
};

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
    >
      {children}
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.54 3.6 12 3.6 12 3.6s-7.54 0-9.38.46A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.84.46 9.38.46 9.38.46s7.54 0 9.38-.46a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.84 12l-6.09 3.57Z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.88 6.96a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM21.6 7.2a5.4 5.4 0 0 0-1.47-3.83A5.4 5.4 0 0 0 16.3 1.9C14.7 1.82 14.2 1.8 12 1.8s-2.7.02-4.3.1a5.4 5.4 0 0 0-3.83 1.47A5.4 5.4 0 0 0 2.4 7.2C2.32 8.8 2.3 9.3 2.3 12s.02 3.2.1 4.8a5.4 5.4 0 0 0 1.47 3.83 5.4 5.4 0 0 0 3.83 1.47c1.6.08 2.1.1 4.3.1s2.7-.02 4.3-.1a5.4 5.4 0 0 0 3.83-1.47 5.4 5.4 0 0 0 1.47-3.83c.08-1.6.1-2.1.1-4.3s-.02-2.7-.1-4.3ZM19.86 17a3.6 3.6 0 0 1-2.03 2.03c-.8.32-2.7.49-5.83.49s-5.03-.17-5.83-.49A3.6 3.6 0 0 1 4.14 17c-.32-.8-.49-2.7-.49-5.83s.17-5.03.49-5.83A3.6 3.6 0 0 1 6.17 3.31c.8-.32 2.7-.49 5.83-.49s5.03.17 5.83.49A3.6 3.6 0 0 1 19.86 7.17c.32.8.49 2.7.49 5.83s-.17 5.03-.49 5.83Z" />
    </Svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19.5 8.17a6.86 6.86 0 0 1-4.03-1.3v7.38a5.75 5.75 0 1 1-5.75-5.75c.12 0 .24 0 .36.02v2.85a2.92 2.92 0 1 0 2.06 2.8V2.25h2.84a6.86 6.86 0 0 0 4.52 5.52v2.4Z" />
    </Svg>
  );
}

export function SpotifyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 1.8C6.37 1.8 1.8 6.37 1.8 12S6.37 22.2 12 22.2 22.2 17.63 22.2 12 17.63 1.8 12 1.8Zm4.59 14.41c-.18.3-.56.39-.86.21-2.35-1.44-5.3-1.76-8.79-.96-.34.08-.67-.13-.75-.47-.07-.33.13-.67.47-.75 3.81-.87 7.08-.5 9.71 1.12.3.18.39.56.22.85Zm1.22-2.72c-.23.37-.7.48-1.07.26-2.69-1.65-6.79-2.13-9.97-1.17-.41.12-.85-.11-.97-.52-.13-.41.11-.85.52-.97 3.63-1.1 8.15-.57 11.23 1.35.37.22.48.7.26 1.05Zm.11-2.84C14.14 8.59 8.69 8.4 5.79 9.33c-.49.16-1.02-.14-1.17-.64-.16-.49.14-1.02.64-1.17 3.33-1.07 9.32-.87 13.01 1.34.44.26.59.84.33 1.28-.26.44-.84.59-1.28.33Z" />
    </Svg>
  );
}

export function YouTubeMusicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 17.6A7.6 7.6 0 1 1 12 4.4a7.6 7.6 0 0 1 0 15.2Zm0-13.2a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2Zm-1.68 8.4V9.2L15.2 12l-4.88 2.8Z" />
    </Svg>
  );
}

export function AppleMusicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19.1 12.74c-.03-2.33 1.9-3.45 1.99-3.5-1.09-1.59-2.78-1.81-3.38-1.83-1.43-.15-2.8.85-3.53.85-.73 0-1.86-.83-3.06-.81-1.57.03-3.02.92-3.83 2.33-1.64 2.84-.42 7.03 1.17 9.33.78 1.13 1.71 2.39 2.93 2.35 1.18-.05 1.63-.76 3.05-.76 1.42 0 1.82.76 3.06.73 1.27-.02 2.07-1.14 2.84-2.28.9-1.31 1.26-2.59 1.28-2.65-.03-.01-2.45-.94-2.48-3.76ZM16.4 6.4c.65-.79 1.09-1.88.97-2.98-1.06.04-2.35.71-3.11 1.6-.68.79-1.27 1.92-1.11 3.05 1.18.09 2.39-.6 3.25-1.67Z" />
    </Svg>
  );
}

export function DeezerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 15.2h3.2V18H2v-2.8Zm4.4-2.4h3.2V18H6.4v-5.2Zm4.4-2h3.2V18h-3.2V10.8Zm4.4-2.4h3.2V18h-3.2V8.4ZM2 12.4h3.2v2H2v-2Zm0-2.8h3.2v2H2v-2Z" />
    </Svg>
  );
}

export function AmazonMusicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.4 8.1v7.05c0 .62-.3.86-.78.86-.22 0-.5-.07-.78-.23l-.04.6c.32.19.7.29 1.08.29 1.02 0 1.64-.55 1.64-1.77V8.1h-1.12Zm3.02 2.55c-1.4 0-2.33.9-2.33 2.3 0 1.44.98 2.24 2.48 2.24.4 0 .86-.08 1.2-.22v-.72a2.3 2.3 0 0 1-1.08.26c-.86 0-1.43-.46-1.46-1.2h2.7c0-.08.02-.22.02-.34 0-1.3-.7-2.32-2.53-2.32Zm-.04.76c.78 0 1.26.42 1.3 1.14h-2.6c.1-.7.6-1.14 1.3-1.14ZM17.4 10.7c-.38 0-.7.14-.98.46l-.06-.4h-1.04v5.23h1.14v-3.18c.2-.26.5-.42.84-.42.1 0 .2.01.32.04v-1.1c-.08-.02-.16-.03-.22-.03Zm3.28-.06c-1.42 0-2.5.98-2.5 2.4 0 1.5 1.04 2.32 2.64 2.32.44 0 .9-.08 1.28-.24v-.74a2.4 2.4 0 0 1-1.16.28c-.9 0-1.5-.48-1.52-1.28h2.86c.02-.1.04-.24.04-.38 0-1.32-.74-2.36-2.64-2.36Zm-.02.78c.82 0 1.32.44 1.36 1.18h-2.76c.1-.72.62-1.18 1.4-1.18ZM4.86 13.04c0-1.84 1.5-2.4 2.88-2.4.7 0 1.28.12 1.8.3l-.3.86a3.6 3.6 0 0 0-1.5-.3c-.9 0-1.7.36-1.7 1.52 0 1.16.8 1.5 1.7 1.5.54 0 1.08-.1 1.5-.3v.88a4.4 4.4 0 0 1-1.8.34c-1.5 0-2.58-.7-2.58-2.4Z" />
    </Svg>
  );
}

export function TidalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.2 12 8 15.8 11.8 12 8 8.2 4.2 12Zm6.2 0 3.8 3.8L18 12l-3.8-3.8L10.4 12Zm6.2 0 3.8 3.8 3.8-3.8-3.8-3.8-3.8 3.8Z" />
    </Svg>
  );
}

export function EmailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.4 4.8H3.6A1.8 1.8 0 0 0 1.8 6.6v10.8a1.8 1.8 0 0 0 1.8 1.8h16.8a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8Zm0 2.16-8.16 5.1a.6.6 0 0 1-.64 0L3.6 6.96V6.6h16.8v.36Z" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={props.className ?? "h-5 w-5"}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={props.className ?? "h-6 w-6"}
    >
      <path d="M8.4 5.7v12.6L18.6 12 8.4 5.7Z" />
    </svg>
  );
}

const platformIcons: Record<PlatformId, (props: IconProps) => ReactNode> = {
  youtube: YouTubeIcon,
  youtubeMusic: YouTubeMusicIcon,
  spotify: SpotifyIcon,
  appleMusic: AppleMusicIcon,
  deezer: DeezerIcon,
  amazonMusic: AmazonMusicIcon,
  tidal: TidalIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
};

const socialIcons: Record<SocialId, (props: IconProps) => ReactNode> = {
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  spotify: SpotifyIcon,
  email: EmailIcon,
};

export function PlatformIcon({ id, className }: { id: PlatformId; className?: string }) {
  const Icon = platformIcons[id];
  return <Icon className={className} />;
}

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  const Icon = socialIcons[id];
  return <Icon className={className} />;
}
