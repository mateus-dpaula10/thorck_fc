import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `npm run build` gera a pasta `out/`, que sobe em qualquer hospedagem.
  output: "export",
  trailingSlash: true,
  // As imagens já saem otimizadas (webp) do scripts/gerar-imagens.mjs.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
