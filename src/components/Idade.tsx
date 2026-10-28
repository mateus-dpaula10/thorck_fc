"use client";

import { useSyncExternalStore } from "react";
import { idadeEm } from "@/data/clube";

const nada = () => () => {};

// O HTML sai com a idade do dia do build (`dataBuild`); no navegador ela é recalculada com a data de hoje,
// então o card não envelhece parado entre um build e outro.
export function Idade({ nascimento, dataBuild }: { nascimento: string; dataBuild: string }) {
  const idade = useSyncExternalStore(
    nada,
    () => idadeEm(nascimento, new Date()),
    () => idadeEm(nascimento, new Date(`${dataBuild}T12:00:00`)),
  );
  return <>{idade}</>;
}
