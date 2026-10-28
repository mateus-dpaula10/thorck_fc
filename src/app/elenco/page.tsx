import type { Metadata } from "next";
import Link from "next/link";
import { CartaoFut } from "@/components/CartaoFut";
import { Compartilhar } from "@/components/Compartilhar";
import { Ranking } from "@/components/Ranking";
import { Container, JsonLd, TituloSecao, TopoPagina } from "@/components/ui";
import { artilharia, clube, comissao, elenco, formatarAtualizacao, garcons, SITE_URL, slugDe, temporada } from "@/data/clube";

export const metadata: Metadata = {
  title: "Elenco e artilharia",
  description: `Elenco do Thorck FC, time de várzea de ${clube.cidade} - ${clube.estado}: artilharia, assistências e comissão técnica da temporada ${temporada.ano}.`,
  alternates: { canonical: "/elenco/" },
  openGraph: { url: "/elenco/", title: "Elenco e artilharia | Thorck FC" },
};

export default function Elenco() {
  const goleadores = artilharia();
  const passadores = garcons();
  // Cards na ordem de quem mais participou de gols (gols, depois assistências, depois nome).
  const porDesempenho = [...elenco].sort(
    (a, b) => (b.gols ?? 0) - (a.gols ?? 0) || (b.assistencias ?? 0) - (a.assistencias ?? 0) || a.nome.localeCompare(b.nome, "pt-BR"),
  );
  const treinador = comissao.find((c) => c.funcao === "Treinador");
  const dados = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: clube.nome,
    url: SITE_URL,
    ...(treinador && { coach: { "@type": "Person", name: treinador.nome } }),
    athlete: elenco.map((j) => ({ "@type": "Person", name: j.nome, ...(j.nascimento && { birthDate: j.nascimento }) })),
  };

  return (
    <>
      <JsonLd dados={dados} />
      <TopoPagina
        sobre={`Temporada ${temporada.ano}`}
        titulo="Elenco"
        texto={`Quem veste o preto e amarelo e defende o Thorck FC nos campos da várzea de ${clube.cidade}. Aqui a camisa não tem dono fixo: quem decide é a artilharia.`}
      />

      <Container className="space-y-16 py-12 md:py-16">
        <section aria-labelledby="t-cards">
          <TituloSecao id="t-cards" sobre={`${elenco.length} jogadores`} titulo="Os cards do Thorck" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {porDesempenho.map((j) => (
              <li key={j.nome}>
                <Link href={`/elenco/${slugDe(j.nome)}/`} aria-label={`Ver o card de ${j.nome}`} className="block">
                  <CartaoFut jogador={j} />
                </Link>
                <Compartilhar nome={j.nome} slug={slugDe(j.nome)} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="t-gols">
            <TituloSecao id="t-gols" sobre={`${goleadores.length} jogadores marcaram`} titulo="Gols" />
            <Ranking jogadores={goleadores} valor={(j) => j.gols ?? 0} unidade="gols" />
          </section>
          <section aria-labelledby="t-assistencias">
            <TituloSecao id="t-assistencias" sobre={`${passadores.length} garçons`} titulo="Assistências" />
            <Ranking jogadores={passadores} valor={(j) => j.assistencias ?? 0} unidade="assistências" />
          </section>
        </div>

        <section aria-labelledby="t-comissao" className="max-w-md">
          <TituloSecao id="t-comissao" sobre="Comissão técnica" titulo="No comando" />
          <ul className="space-y-3">
            {comissao.map((c) => (
              <li key={c.nome} className="chanfro border-l-8 border-amarelo bg-carvao p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amarelo">{c.funcao}</p>
                <p className="font-display text-4xl leading-none tracking-wide">{c.nome}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-cinza">Números atualizados em {formatarAtualizacao()}.</p>
      </Container>
    </>
  );
}
