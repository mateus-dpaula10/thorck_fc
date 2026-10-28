import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thorck FC",
    short_name: "Thorck FC",
    description: "Time de futebol de várzea de Indaiatuba - SP",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  };
}
