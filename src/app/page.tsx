import Image from "next/image";
import { GradeDestaques } from "@/components/CartaoJogador";
import { Icone } from "@/components/Icone";
import { ProximoJogo, ResumoCampanha, SemJogoMarcado } from "@/components/Jogos";
import { Botao, Container, LinkSeta, TituloSecao } from "@/components/ui";
import { clube, formatarAtualizacao, jogoMarcado, linkWhatsApp, redes, temporada } from "@/data/clube";

export default function Inicio() {
  const proximo = jogoMarcado();
  const saldo = temporada.golsPro - temporada.golsContra;
  const numeros = [
    { valor: temporada.jogos, rotulo: "Jogos" },
    { valor: temporada.vitorias, rotulo: "Vitórias" },
    { valor: temporada.golsPro, rotulo: "Gols marcados" },
    { valor: saldo > 0 ? `+${saldo}` : saldo, rotulo: "Saldo de gols" },
  ];

  return (
    <>
      {/* HERÓI */}
      <section className="listras corte-baixo relative overflow-hidden bg-grafite pb-24 pt-10 md:pb-36 md:pt-16">
        <div className="absolute -right-24 top-0 h-full w-1/2 -skew-x-[20deg] bg-amarelo/5" aria-hidden="true" />
        <Container className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="order-2 md:order-1">
            <p className="mb-3 inline-flex items-center gap-2 bg-amarelo px-3 py-1 text-sm font-bold uppercase tracking-[0.2em] text-preto">
              <Icone nome="local" className="size-4" /> Várzea de {clube.cidade} · {clube.estado}
            </p>
            <h1 className="font-display text-[5.5rem] leading-[0.85] tracking-wide sm:text-[7rem] md:text-[9rem]">
              Thorck
              <span className="block text-amarelo">FC</span>
            </h1>
            <p className="mt-4 max-w-md text-xl text-prata">{clube.slogan}. Desde {clube.fundacao} levando o preto e amarelo pros campos da cidade.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Botao href="/jogos/">Agenda de jogos</Botao>
              <Botao href="/elenco/" variante="contorno">
                Conheça o elenco
              </Botao>
            </div>
          </div>
          <div className="relative order-1 mx-auto w-56 sm:w-72 md:order-2 md:w-full md:max-w-md">
            {/* brilho em gradiente: mais leve de pintar que filter: drop-shadow */}
            <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(255,212,0,0.22),transparent_65%)]" aria-hidden="true" />
            <Image
              src="/logo-512.webp"
              alt="Escudo do Thorck FC"
              width={512}
              height={512}
              preload
              fetchPriority="high"
              sizes="(min-width: 768px) 448px, 288px"
              className="relative"
            />
          </div>
        </Container>
      </section>

      {/* NÚMEROS */}
      <section aria-label="Números da temporada" className="relative z-10 -mt-14 md:-mt-20">
        <Container>
          <dl className="chanfro grid grid-cols-2 bg-amarelo text-preto md:grid-cols-4">
            {numeros.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse items-center border-preto/10 py-5 odd:border-r md:border-r md:last:border-r-0">
                <dt className="text-sm font-bold uppercase tracking-widest">{n.rotulo}</dt>
                <dd className="font-display text-5xl leading-none md:text-6xl">{n.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-right text-xs text-cinza">
            Temporada {temporada.ano} · atualizado em {formatarAtualizacao()}
          </p>
        </Container>
      </section>

      {/* JOGOS */}
      <section aria-labelledby="t-jogos" className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <TituloSecao id="t-jogos" sobre="Agenda" titulo="Próximo jogo" />
            {proximo ? <ProximoJogo jogo={proximo} /> : <SemJogoMarcado />}
          </div>
          <div>
            <TituloSecao sobre={`Temporada ${temporada.ano}`} titulo="Campanha" />
            <ResumoCampanha />
            <div className="mt-6">
              <LinkSeta href="/jogos/">Ver jogos e campanha</LinkSeta>
            </div>
          </div>
        </Container>
      </section>

      {/* ELENCO */}
      <section aria-labelledby="t-elenco" className="listras bg-grafite py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <TituloSecao id="t-elenco" sobre={`Artilharia ${temporada.ano}`} titulo="Quem balança a rede" />
            <div className="mb-8 md:mb-10">
              <LinkSeta href="/elenco/">Artilharia completa</LinkSeta>
            </div>
          </div>
          <GradeDestaques />
        </Container>
      </section>

      {/* HISTÓRIA */}
      <section aria-labelledby="t-historia" className="corte-cima relative overflow-hidden bg-amarelo pb-16 pt-24 text-preto md:pb-24 md:pt-32">
        <span
          className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[12rem] leading-none text-preto/10 md:text-[20rem]"
          aria-hidden="true"
        >
          {clube.fundacao}
        </span>
        <Container className="relative max-w-3xl">
          <TituloSecao id="t-historia" sobre="Nossa história" titulo={`Desde ${clube.fundacao} na várzea`} escuro />
          <p className="text-xl font-bold leading-relaxed">
            O Thorck FC nasceu da amizade e da paixão pelo futebol de bairro em {clube.cidade}. De lá pra cá, cada domingo no
            campo virou capítulo de uma história escrita com suor, resenha e muito preto e amarelo.
          </p>
          <div className="mt-8">
            <LinkSeta href="/historia/" escuro>
              Conheça nossa história
            </LinkSeta>
          </div>
        </Container>
      </section>

      {/* CONTATO + REDES */}
      <section aria-labelledby="t-contato" className="py-16 md:py-24">
        <Container>
          <div className="listras relative overflow-hidden border-2 border-amarelo bg-grafite px-6 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h2 id="t-contato" className="font-display text-5xl leading-none tracking-wide md:text-6xl">
                  Bora marcar um <span className="text-amarelo">jogo?</span>
                </h2>
                <p className="mt-3 max-w-xl text-lg text-prata">
                  Amistoso, festival, patrocínio ou quer vestir a camisa? Chama a gente no WhatsApp e acompanha o dia a dia do time nas redes.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Botao href={linkWhatsApp("Olá, Thorck FC! Quero marcar um jogo.")} externo>
                  <Icone nome="whatsapp" /> Chamar no WhatsApp
                </Botao>
                {redes.map((r) => (
                  <Botao key={r.rede} href={r.url} variante="contorno" externo>
                    <Icone nome={r.rede} /> {r.usuario}
                  </Botao>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
