// Imagens PNG do card de jogador, geradas no build (Satori via next/og).
// O Satori não lê Tailwind: o card é redesenhado aqui com estilos inline, espelhando o CartaoFut.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { bandeiras } from "@/components/Bandeira";
import { idadeEm, posicoes, temporada, type Jogador } from "@/data/clube";

const AMARELO = "#ffd400";
// Mesmo formato do utilitário card-fut (globals.css), em coordenadas 100 × 140.
const CONTORNO = "12,0 88,0 100,8.4 100,121.8 50,140 0,121.8 0,8.4";
const MIOLO = "12.5,1.2 87.5,1.2 98.8,8.9 98.8,121 50,138.7 1.2,121 1.2,8.9";

const raiz = (...p: string[]) => path.join(process.cwd(), ...p);

// Fotos e escudo viram PNG em data URI (o Satori lida melhor com PNG do que com webp).
async function pngDataUri(arquivo: string) {
  const png = await sharp(await fs.readFile(arquivo)).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function recursosDoCard(j: Jogador) {
  const [bebas, barlow, escudo, foto] = await Promise.all([
    fs.readFile(raiz("assets/fontes/BebasNeue-Regular.ttf")),
    fs.readFile(raiz("assets/fontes/Barlow-Bold.ttf")),
    pngDataUri(raiz("public/logo-256.webp")),
    j.foto ? pngDataUri(raiz("public", j.foto)) : Promise.resolve(undefined),
  ]);
  return {
    escudo,
    foto,
    fontes: [
      { name: "Bebas", data: bebas, weight: 400 as const, style: "normal" as const },
      { name: "Barlow", data: barlow, weight: 700 as const, style: "normal" as const },
    ],
  };
}

type Recursos = Awaited<ReturnType<typeof recursosDoCard>>;

export const idadeHoje = (j: Jogador) => (j.nascimento ? idadeEm(j.nascimento, new Date()) : undefined);

// Card com largura `w` (altura = 1,4 × w).
export function DesenhoCard({ jogador: j, w, recursos }: { jogador: Jogador; w: number; recursos: Recursos }) {
  const h = w * 1.4;
  const u = w / 100; // 1 "cqw" do CartaoFut
  const idade = idadeHoje(j);
  const numeros = [
    ["GOL", j.gols ?? 0],
    ["AST", j.assistencias ?? 0],
    ["IDA", idade ?? "–"],
  ] as const;

  return (
    <div style={{ display: "flex", position: "relative", width: w, height: h }}>
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%" }}>
        {/* silhueta do card: borda dourada, fundo escuro e brilho (o clip-path do Satori falha aninhado) */}
        <svg viewBox="0 0 100 140" width={w} height={h} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="borda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={AMARELO} />
              <stop offset="0.55" stopColor="#d9a81b" />
              <stop offset="1" stopColor="#e6bd00" />
            </linearGradient>
            <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2c2c2c" />
              <stop offset="0.7" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="brilho" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={AMARELO} stopOpacity="0.16" />
              <stop offset="0.45" stopColor={AMARELO} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={CONTORNO} fill="url(#borda)" />
          <polygon points={MIOLO} fill="url(#fundo)" />
          <polygon points={MIOLO} fill="url(#brilho)" />
        </svg>

        {/* foto (ou silhueta) */}
        <div
          style={{
            position: "absolute",
            right: u * 2,
            top: h * 0.05,
            width: w * 0.74,
            height: w * 0.74,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            maskImage: "linear-gradient(to bottom, black 70%, transparent)",
          }}
        >
          {recursos.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={recursos.foto} width={w * 0.74} height={w * 0.74} style={{ objectFit: "cover" }} alt="" />
          ) : (
            <svg viewBox="0 0 100 100" width={w * 0.56} height={w * 0.56}>
              <circle cx="50" cy="40" r="19" fill="rgba(255,212,0,0.15)" />
              <path d="M12 100c0-24 17-37 38-37s38 13 38 37z" fill="rgba(255,212,0,0.15)" />
            </svg>
          )}
        </div>

        {/* posição, escudo e bandeira */}
        <div
          style={{
            position: "absolute",
            left: w * 0.09,
            top: h * 0.09,
            width: w * 0.2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: u * 3,
          }}
        >
          {j.posicao && (
            <span style={{ fontFamily: "Bebas", fontSize: u * 13, lineHeight: 1, color: AMARELO }}>{j.posicao}</span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recursos.escudo} width={u * 13} height={u * 13} alt="" />
          <svg viewBox="0 0 30 21" width={u * 12} height={u * 8.4}>
            {bandeiras[j.pais ?? "BR"].desenho}
          </svg>
        </div>

        {/* nome e números */}
        <div
          style={{
            position: "absolute",
            left: w * 0.1,
            right: w * 0.1,
            top: h * 0.58,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingBottom: u * 1.5,
              borderBottom: `${Math.max(1, u * 0.3)}px solid rgba(255,212,0,0.4)`,
              fontFamily: "Bebas",
              fontSize: u * 12,
              lineHeight: 1,
              color: "#f2f2f2",
              letterSpacing: u * 0.2,
            }}
          >
            {j.nome}
          </div>
          <div style={{ display: "flex", width: "100%", marginTop: u * 2.5 }}>
            {numeros.map(([sigla, valor], i) => (
              <div
                key={sigla}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderLeft: i ? `${Math.max(1, u * 0.3)}px solid rgba(255,212,0,0.2)` : "none",
                }}
              >
                <span style={{ fontFamily: "Bebas", fontSize: u * 12, lineHeight: 1, color: "#f2f2f2" }}>{valor}</span>
                <span style={{ fontFamily: "Barlow", fontSize: u * 4.5, color: AMARELO, letterSpacing: u * 0.5 }}>{sigla}</span>
              </div>
            ))}
          </div>
          <span
            style={{
              marginTop: u * 3,
              fontFamily: "Barlow",
              fontSize: u * 3.8,
              letterSpacing: u * 1.1,
              color: "rgba(255,212,0,0.6)",
              textTransform: "uppercase",
            }}
          >
            {j.posicao ? posicoes[j.posicao] : "Thorck FC"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Fundo da arte (preto com faixa diagonal amarela, como o site).
export function Fundo({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0a0a0a",
        backgroundImage: "linear-gradient(115deg, #0a0a0a 0%, #141414 55%, rgba(255,212,0,0.10) 55%, rgba(255,212,0,0.04) 100%)",
        fontFamily: "Barlow",
        color: "#f2f2f2",
      }}
    >
      {children}
    </div>
  );
}

export const rodapeArte = `@thorckfc · Temporada ${temporada.ano}`;
