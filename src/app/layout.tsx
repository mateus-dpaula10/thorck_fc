import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { JsonLd } from "@/components/ui";
import { clube, contato, redes, SITE_URL } from "@/data/clube";
import "./globals.css";

const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400", display: "swap" });
const barlow = Barlow({ variable: "--font-barlow", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thorck FC | Time de futebol de várzea de Indaiatuba - SP",
    template: "%s | Thorck FC",
  },
  description: clube.descricao,
  keywords: ["Thorck FC", "futebol de várzea", "Indaiatuba", "time de futebol Indaiatuba", "várzea Indaiatuba", "futebol amador SP"],
  applicationName: "Thorck FC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Thorck FC",
    title: "Thorck FC | Várzea de Indaiatuba - SP",
    description: clube.descricao,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Escudo do Thorck FC" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const dadosClube = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: clube.nome,
  sport: "Futebol",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-512.webp`,
  image: `${SITE_URL}/og.jpg`,
  description: clube.descricao,
  foundingDate: String(clube.fundacao),
  email: contato.email,
  telephone: `+${contato.whatsapps[0].numero}`,
  location: {
    "@type": "Place",
    name: clube.campo.nome,
    address: {
      "@type": "PostalAddress",
      streetAddress: clube.campo.rua,
      postalCode: clube.campo.cep,
      addressLocality: clube.cidade,
      addressRegion: clube.estado,
      addressCountry: "BR",
    },
    hasMap: clube.campo.mapa,
  },
  sameAs: redes.map((r) => r.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd dados={dadosClube} />
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
      </body>
    </html>
  );
}
