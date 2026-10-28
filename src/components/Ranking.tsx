import type { Jogador } from "@/data/clube";
import { Bandeira } from "./Bandeira";

// Lista com barra proporcional ao líder. Empatados dividem a mesma colocação.
export function Ranking({ jogadores, valor, unidade }: { jogadores: Jogador[]; valor: (j: Jogador) => number; unidade: string }) {
  const valores = jogadores.map(valor);
  const maximo = valores[0];
  const colocacoes = valores.map((v) => valores.indexOf(v) + 1);
  return (
    <ol className="chanfro overflow-hidden">
      {jogadores.map((j, i) => {
        const v = valores[i];
        const colocacao = colocacoes[i];
        return (
          <li key={j.nome} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-borda bg-grafite px-4 py-2.5 last:border-b-0">
            <span className={`font-display text-2xl leading-none ${colocacao <= 3 ? "text-amarelo" : "text-cinza"}`}>{colocacao}º</span>
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-display text-2xl leading-none tracking-wide">
                {j.nome}
                {j.pais && <Bandeira pais={j.pais} />}
              </p>
              <div className="mt-1.5 h-1.5 bg-carvao" aria-hidden="true">
                <div className={`h-full ${colocacao === 1 ? "bg-amarelo" : "bg-amarelo/50"}`} style={{ width: `${(v / maximo) * 100}%` }} />
              </div>
            </div>
            <span className="font-display text-3xl leading-none tabular-nums">
              {v}
              <span className="sr-only"> {unidade}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
