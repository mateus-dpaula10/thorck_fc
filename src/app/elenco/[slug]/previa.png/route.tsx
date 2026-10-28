// /elenco/<slug>/previa.png — prévia do link da página do jogador (WhatsApp, Instagram, Facebook...).
// É rota .png (e não opengraph-image.tsx) para o arquivo sair com extensão: servidor estático
// entrega com Content-Type image/png e o WhatsApp mostra a prévia.
import { ImageResponse } from "next/og";
import { elenco, jogadorPorSlug, posicoes, slugDe } from "@/data/clube";
import { DesenhoCard, Fundo, idadeHoje, recursosDoCard, rodapeArte } from "@/lib/imagemCard";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return elenco.map((j) => ({ slug: slugDe(j.nome) }));
}

const tamanhoPrevia = { width: 1200, height: 630 };

export async function GET(_req: Request, ctx: RouteContext<"/elenco/[slug]/previa.png">) {
  const jogador = jogadorPorSlug((await ctx.params).slug);
  if (!jogador) return new Response("Jogador não encontrado", { status: 404 });
  const recursos = await recursosDoCard(jogador);
  const idade = idadeHoje(jogador);
  const numeros = [
    ["Gols", jogador.gols ?? 0],
    ["Assistências", jogador.assistencias ?? 0],
    ...(idade !== undefined ? [["Anos", idade] as const] : []),
  ];

  return new ImageResponse(
    (
      <Fundo>
        <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "0 70px", gap: 70 }}>
          <DesenhoCard jogador={jogador} w={400} recursos={recursos} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 28, letterSpacing: 6, color: "#ffd400", textTransform: "uppercase" }}>Elenco Thorck FC</span>
            <span style={{ fontFamily: "Bebas", fontSize: 150, lineHeight: 0.95, marginTop: 10 }}>{jogador.nome}</span>
            {jogador.posicao && (
              <span style={{ fontSize: 34, color: "#c9ced6", marginTop: 6 }}>{posicoes[jogador.posicao]}</span>
            )}
            <div style={{ display: "flex", gap: 46, marginTop: 34 }}>
              {numeros.map(([rotulo, valor]) => (
                <div key={rotulo} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Bebas", fontSize: 92, lineHeight: 1 }}>{valor}</span>
                  <span style={{ fontSize: 22, letterSpacing: 4, color: "#ffd400", textTransform: "uppercase" }}>{rotulo}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: 24, color: "#9aa0a8", marginTop: 34 }}>{rodapeArte}</span>
          </div>
        </div>
      </Fundo>
    ),
    { ...tamanhoPrevia, fonts: recursos.fontes },
  );
}
