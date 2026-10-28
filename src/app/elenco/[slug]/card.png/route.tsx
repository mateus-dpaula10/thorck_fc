// /elenco/<slug>/card.png — arte 4:5 (1080×1350) para story/feed/WhatsApp, gerada no build.
import { ImageResponse } from "next/og";
import { elenco, jogadorPorSlug, slugDe } from "@/data/clube";
import { DesenhoCard, Fundo, recursosDoCard, rodapeArte } from "@/lib/imagemCard";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return elenco.map((j) => ({ slug: slugDe(j.nome) }));
}

export async function GET(_req: Request, ctx: RouteContext<"/elenco/[slug]/card.png">) {
  const jogador = jogadorPorSlug((await ctx.params).slug);
  if (!jogador) return new Response("Jogador não encontrado", { status: 404 });
  const recursos = await recursosDoCard(jogador);

  return new ImageResponse(
    (
      <Fundo>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingTop: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={recursos.escudo} width={84} height={84} alt="" />
            <span style={{ fontFamily: "Bebas", fontSize: 92, lineHeight: 1, letterSpacing: 2 }}>
              Thorck <span style={{ color: "#ffd400", marginLeft: 18 }}>FC</span>
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 56 }}>
            <DesenhoCard jogador={jogador} w={640} recursos={recursos} />
          </div>
          <span style={{ marginTop: 44, fontSize: 34, letterSpacing: 6, color: "#ffd400", textTransform: "uppercase" }}>
            {rodapeArte}
          </span>
        </div>
      </Fundo>
    ),
    { width: 1080, height: 1350, fonts: recursos.fontes },
  );
}
