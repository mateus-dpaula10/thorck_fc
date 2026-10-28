import type { Metadata } from "next";
import { Botao, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="numero-contorno font-display text-[10rem] leading-none">404</p>
      <h1 className="font-display text-5xl tracking-wide">Bola fora!</h1>
      <p className="mt-3 text-lg text-prata">Essa página não existe. Bora voltar pro jogo.</p>
      <div className="mt-8">
        <Botao href="/">Voltar ao início</Botao>
      </div>
    </Container>
  );
}
