import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { getGenreListCopy } from "@/data/tracks";
import "./globals.css";

const genreBlurb = getGenreListCopy();

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const siteUrl = "https://quinhas-fieti.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quinhas Fieti",
  description: `Página oficial de Quinhas Fieti — ${genreBlurb} e lançamentos com links para ouvir nas plataformas.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quinhas Fieti",
    description: `Discografia e lançamentos de Quinhas Fieti em ${genreBlurb}, com links para ouvir nas plataformas.`,
    url: "/",
    siteName: "Quinhas Fieti",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quinhas Fieti",
    description: `Discografia e lançamentos de Quinhas Fieti em ${genreBlurb}, com links para ouvir nas plataformas.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-bg font-sans text-white">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
