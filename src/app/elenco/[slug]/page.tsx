import type { Metadata } from "next";
import { CartaoFut, dataBuild } from "@/components/CartaoFut";
import { Compartilhar } from "@/components/Compartilhar";
import { Idade } from "@/components/Idade";
import { Container, LinkSeta } from "@/components/ui";
import { elenco, jogadorPorSlug, posicoes, slugDe, temporada } from "@/data/clube";

export const dynamicParams = false;

export function generateStaticParams() {
  return elenco.map((j) => ({ slug: slugDe(j.nome) }));
}

export async function generateMetadata({ params }: PageProps<"/elenco/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const j = jogadorPorSlug(slug)!;
  const posicao = j.posicao ? `, ${posicoes[j.posicao].toLowerCase()}` : "";
  const previa = { url: `/elenco/${slug}/previa.png`, width: 1200, height: 630, alt: `Card de ${j.nome} no Thorck FC` };
  return {
    title: `${j.nome} — card do jogador`,
    description: `${j.nome}${posicao} do Thorck FC: ${j.gols ?? 0} gols e ${j.assistencias ?? 0} assistências na temporada ${temporada.ano}.`,
    alternates: { canonical: `/elenco/${slug}/` },
    openGraph: { url: `/elenco/${slug}/`, title: `${j.nome} | Thorck FC`, type: "profile", images: [previa] },
    twitter: { card: "summary_large_image", images: [previa] },
  };
}

export default async function PaginaJogador({ params }: PageProps<"/elenco/[slug]">) {
  const { slug } = await params;
  const j = jogadorPorSlug(slug)!;
  // Colocação com empate: 1 + quantos fizeram mais gols.
  const colocacao = j.gols ? 1 + elenco.filter((o) => (o.gols ?? 0) > j.gols!).length : undefined;
  const numeros = [
    { rotulo: "Gols", valor: j.gols ?? 0 },
    { rotulo: "Assistências", valor: j.assistencias ?? 0 },
    ...(j.nascimento ? [{ rotulo: "Anos", valor: <Idade nascimento={j.nascimento} dataBuild={dataBuild} /> }] : []),
    ...(colocacao ? [{ rotulo: "Na artilharia", valor: `${colocacao}º` }] : []),
  ];

  return (
    <section className="listras bg-grafite">
      <Container className="grid items-center gap-10 py-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16 md:py-20">
        <div className="mx-auto w-full max-w-[290px] md:max-w-[340px]">
          <CartaoFut jogador={j} />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amarelo">Elenco Thorck FC · {temporada.ano}</p>
          <h1 className="font-display text-7xl leading-[0.9] tracking-wide md:text-8xl">{j.nome}</h1>
          {j.posicao && <p className="mt-1 text-xl text-prata">{posicoes[j.posicao]}</p>}

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-10">
            {numeros.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse">
                <dt className="text-xs font-bold uppercase tracking-widest text-amarelo">{n.rotulo}</dt>
                <dd className="font-display text-6xl leading-none">{n.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 max-w-md">
            <Compartilhar nome={j.nome} slug={slug} variante="pagina" />
          </div>

          <div className="mt-8">
            <LinkSeta href="/elenco/">Ver o elenco completo</LinkSeta>
          </div>
        </div>
      </Container>
    </section>
  );
}
