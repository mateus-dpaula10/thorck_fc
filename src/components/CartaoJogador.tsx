import Image from "next/image";
import { destaquesDaTemporada, type Jogador } from "@/data/clube";
import { Bandeira } from "./Bandeira";

// Camisas não são fixas: sem foto, o cartão mostra os gols (ou as assistências) em destaque sobre o escudo.
export function CartaoJogador({
  jogador,
  selo,
  destaque = "gols",
}: {
  jogador: Jogador;
  selo?: { texto: string; leitor: string }; // ex.: { texto: "1º", leitor: "1º na artilharia" }
  destaque?: "gols" | "assistencias";
}) {
  const { nome, gols = 0, assistencias = 0, pais, foto } = jogador;
  const [numero, rotulo] = destaque === "gols" ? [gols, "gols"] : [assistencias, "assist."];
  return (
    <article className="chanfro group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-carvao">
      {foto ? (
        <Image
          src={foto}
          alt={`${nome}, jogador do Thorck FC`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="listras absolute inset-0" aria-hidden="true" />
          <Image
            src="/logo-256.webp"
            alt=""
            width={256}
            height={256}
            className="absolute -right-10 top-4 w-3/4 opacity-10 grayscale"
          />
          <p
            className="absolute left-4 top-2 flex items-end gap-2 transition-transform duration-300 group-hover:-translate-y-1"
            aria-hidden="true"
          >
            <span className="numero-contorno font-display text-[7rem] leading-none md:text-[8.5rem]">{numero}</span>
            <span className="mb-4 font-display text-2xl tracking-wider text-amarelo md:mb-5">{rotulo}</span>
          </p>
        </>
      )}

      {selo && (
        <span className="absolute right-0 top-0 bg-amarelo px-3 py-1 font-display text-2xl leading-none text-preto">
          <span aria-hidden="true">{selo.texto}</span>
          <span className="sr-only">{selo.leitor}</span>
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-preto via-preto/80 to-transparent" aria-hidden="true" />

      <div className="relative p-4">
        <h3 className="flex items-center gap-2 font-display text-3xl leading-none tracking-wide md:text-4xl">
          {nome}
          {pais && <Bandeira pais={pais} />}
        </h3>
        <dl className="mt-3 flex gap-4 border-t border-white/10 pt-2 text-sm">
          <div className="flex gap-1">
            <dt className="text-cinza">Gols</dt>
            <dd className="font-bold">{gols}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-cinza">Assistências</dt>
            <dd className="font-bold">{assistencias}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

// Pódio da artilharia + o maior garçom fora dele (usado na home e no elenco).
export function GradeDestaques() {
  const { podio, garcom } = destaquesDaTemporada();
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
      {podio.map((j, i) => (
        <CartaoJogador key={j.nome} jogador={j} selo={{ texto: `${i + 1}º`, leitor: `${i + 1}º na artilharia` }} />
      ))}
      {garcom && (
        <CartaoJogador
          jogador={garcom}
          destaque="assistencias"
          selo={{ texto: "Garçom", leitor: "Destaque em assistências" }}
        />
      )}
    </div>
  );
}
