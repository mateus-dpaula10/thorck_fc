import type { Metadata } from "next";
import Image from "next/image";
import { Botao, Container, TituloSecao, TopoPagina } from "@/components/ui";
import { clube, historia, titulos } from "@/data/clube";

export const metadata: Metadata = {
  title: "História",
  description: `A história do Thorck FC, time de futebol de várzea de ${clube.cidade} - ${clube.estado}, fundado em ${clube.fundacao}: origem, conquistas e o escudo preto e amarelo.`,
  alternates: { canonical: "/historia/" },
  openGraph: { url: "/historia/", title: "História | Thorck FC" },
};

export default function Historia() {
  return (
    <>
      <TopoPagina
        sobre={`Desde ${clube.fundacao}`}
        titulo="Nossa história"
        texto="Do campinho do bairro aos torneios da cidade: a trajetória do Thorck FC na várzea de Indaiatuba."
      />

      <Container className="py-12 md:py-16">
        <ol className="relative ml-2 space-y-10 border-l-4 border-amarelo pl-8 md:ml-32 md:pl-12">
          {historia.map((m) => (
            <li key={m.ano} className="relative">
              <span className="absolute -left-[2.85rem] top-2 size-5 rotate-45 border-4 border-preto bg-amarelo md:-left-[3.85rem]" aria-hidden="true" />
              <p className="font-display text-5xl leading-none text-amarelo md:absolute md:-left-44 md:top-0 md:w-28 md:text-right">
                {m.ano}
              </p>
              <div className="chanfro mt-2 bg-carvao p-5 md:mt-0 md:p-6">
                <h2 className="font-display text-3xl tracking-wide md:text-4xl">{m.titulo}</h2>
                <p className="mt-2 text-lg text-prata">{m.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <section aria-labelledby="t-escudo" className="corte-cima bg-amarelo pb-16 pt-24 text-preto md:pb-20 md:pt-28">
        <Container className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Image src="/logo-256.webp" alt="Escudo do Thorck FC" width={256} height={256} className="mx-auto w-48 md:w-64" />
          <div>
            <TituloSecao id="t-escudo" sobre="Identidade" titulo="O escudo" escuro />
            <p className="text-lg font-bold leading-relaxed">
              As letras T e F entrelaçadas, cortadas em diagonal, dentro de um círculo com borda dourada. O preto representa a
              garra; o amarelo, a energia de quem entra em campo todo fim de semana pra honrar o bairro.
            </p>
          </div>
        </Container>
      </section>

      {titulos.length > 0 && (
        <section aria-labelledby="t-titulos" className="py-16 md:py-20">
          <Container>
            <TituloSecao id="t-titulos" sobre="Sala de troféus" titulo="Conquistas" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {titulos.map((t) => (
                <li key={t.ano + t.nome} className="chanfro flex items-center gap-4 border-l-8 border-ouro bg-carvao p-5">
                  <span className="font-display text-5xl leading-none text-ouro">{t.ano}</span>
                  <span className="font-display text-2xl leading-tight tracking-wide">{t.nome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Botao href="/elenco/">Conheça o elenco atual</Botao>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
