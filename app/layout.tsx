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

export const metadata: Metadata = {
  title: "Quinhas Fieti",
  description:
    "Página oficial de Quinhas Fieti. Ouça Depois da Meia-Noite, Fica e Meu Ourinho Branco.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Quinhas Fieti",
    description:
      "Ouça Depois da Meia-Noite, Fica e Meu Ourinho Branco — YouTube e YouTube Music agora. O resto das plataformas chega em breve.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo.png" }],
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
