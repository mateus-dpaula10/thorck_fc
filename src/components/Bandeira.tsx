import type { ReactNode } from "react";

// Bandeiras em SVG (o emoji de bandeira não aparece no Windows).
// Exportado para a imagem do card (src/lib/imagemCard.tsx) desenhar a mesma bandeira.
export const bandeiras: Record<"BR" | "PY", { nome: string; desenho: ReactNode }> = {
  BR: {
    nome: "Brasil",
    desenho: (
      <>
        <rect width="30" height="21" fill="#009b3a" />
        <path d="M15 2.5 27.5 10.5 15 18.5 2.5 10.5z" fill="#fedf00" />
        <circle cx="15" cy="10.5" r="4.4" fill="#002776" />
      </>
    ),
  },
  PY: {
    nome: "Paraguai",
    desenho: (
      <>
        <rect width="30" height="7" fill="#d52b1e" />
        <rect y="7" width="30" height="7" fill="#ffffff" />
        <rect y="14" width="30" height="7" fill="#0038a8" />
      </>
    ),
  },
};

export function Bandeira({ pais, className = "h-[0.6em] w-auto" }: { pais: keyof typeof bandeiras; className?: string }) {
  const { nome, desenho } = bandeiras[pais];
  return (
    <svg viewBox="0 0 30 21" role="img" aria-label={nome} className={`inline-block shrink-0 ${className}`}>
      <title>{nome}</title>
      {desenho}
    </svg>
  );
}
