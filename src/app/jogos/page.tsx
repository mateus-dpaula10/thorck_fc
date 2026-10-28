import type { Metadata } from "next";
import { ProximoJogo, SemJogoMarcado } from "@/components/Jogos";
import { Container, JsonLd, TituloSecao, TopoPagina } from "@/components/ui";
import { clube, formatarAtualizacao, jogoMarcado, SITE_URL, temporada } from "@/data/clube";

export const metadata: Metadata = {
  title: "Próximo jogo e campanha",
  description: `Próximo jogo e campanha da temporada do Thorck FC na várzea de ${clube.cidade} - ${clube.estado}.`,
  alternates: { canonical: "/jogos/" },
  openGraph: { url: "/jogos/", title: "Próximo jogo e campanha | Thorck FC" },
};

export default function Jogos() {
  const proximo = jogoMarcado();
  const t = temporada;
  const campanha: [string, number, string?][] = [
    ["Jogos", t.jogos],
    ["Vitórias", t.vitorias, "bg-vitoria"],
    ["Empates", t.empates, "bg-cinza"],
    ["Derrotas", t.derrotas, "bg-derrota"],
    ["Gols pró", t.golsPro],
    ["Gols contra", t.golsContra],
    ["Pênaltis defendidos", t.penaltisDefendidos],
  ];

  // Eventos esportivos para o Google mostrar a agenda nos resultados de busca.
  const evento = proximo && {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: proximo.mandante ? `Thorck FC x ${proximo.adversario}` : `${proximo.adversario} x Thorck FC`,
    description: `${proximo.campeonato ?? "Jogo"} do Thorck FC — futebol de várzea em ${clube.cidade}`,
    startDate: `${proximo.data}:00-03:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Futebol",
    image: `${SITE_URL}/og.jpg`,
    location: {
      "@type": "Place",
      name: proximo.local,
      address: {
        "@type": "PostalAddress",
        ...(proximo.local === clube.campo.nome && { streetAddress: clube.campo.rua, postalCode: clube.campo.cep }),
        addressLocality: clube.cidade,
        addressRegion: clube.estado,
        addressCountry: "BR",
      },
    },
    homeTeam: { "@type": "SportsTeam", name: proximo.mandante ? clube.nome : proximo.adversario },
    awayTeam: { "@type": "SportsTeam", name: proximo.mandante ? proximo.adversario : clube.nome },
    organizer: { "@type": "SportsTeam", name: clube.nome, url: SITE_URL },
  };

  return (
    <>
      {evento && <JsonLd dados={evento} />}
      <TopoPagina
        sobre={`Temporada ${t.ano}`}
        titulo="Jogos"
        texto="O próximo compromisso e os números da temporada do Thorck FC. Cola no campo e apoia o time!"
      />

      <Container className="space-y-16 py-12 md:py-16">
        <section aria-labelledby="t-proximo">
          <TituloSecao id="t-proximo" sobre="Agenda" titulo="Próximo jogo" />
          <div className="max-w-2xl">{proximo ? <ProximoJogo jogo={proximo} /> : <SemJogoMarcado />}</div>
        </section>

        <section aria-labelledby="t-campanha">
          <TituloSecao id="t-campanha" sobre={`Temporada ${t.ano}`} titulo="Campanha" />
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {campanha.map(([nome, valor, cor]) => (
              <div key={nome} className="flex flex-col-reverse items-center justify-end gap-1 bg-carvao px-3 py-4 text-center last:col-span-2 sm:last:col-span-1">
                <dt className="text-xs font-bold uppercase tracking-widest text-cinza">{nome}</dt>
                <dd className="flex items-center gap-2 font-display text-5xl leading-none">
                  {cor && <span className={`inline-block size-2 ${cor}`} aria-hidden="true" />}
                  {valor}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-cinza">Atualizado em {formatarAtualizacao()}.</p>
        </section>
      </Container>
    </>
  );
}
