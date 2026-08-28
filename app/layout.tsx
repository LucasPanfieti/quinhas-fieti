import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

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
  description:
    "Página oficial de Quinhas Fieti. Ouça Depois da Meia-Noite, Fica e Meu Ourinho Branco.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quinhas Fieti",
    description:
      "Ouça Depois da Meia-Noite, Fica e Meu Ourinho Branco — YouTube e YouTube Music agora. O resto das plataformas chega em breve.",
    url: "/",
    siteName: "Quinhas Fieti",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quinhas Fieti",
    description:
      "Ouça Depois da Meia-Noite, Fica e Meu Ourinho Branco — YouTube e YouTube Music agora. O resto das plataformas chega em breve.",
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
