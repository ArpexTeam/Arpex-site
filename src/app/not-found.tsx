import Link from "next/link";
import Container from "@/components/ui/container";
import { H1, Label } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[92svh] items-center bg-ink pt-[72px]">
      <Container className="text-center">
        <Label>404</Label>
        <H1 className="mx-auto mt-6 max-w-[24ch]">
          Esse fragmento não faz parte do sistema.
        </H1>
        <p className="mx-auto mt-4 max-w-[46ch] text-muted">
          A página que você procura não existe ou foi movida. Volte para o início e
          encontre o caminho certo.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/">Voltar ao início</Button>
          <Link
            href="/projetos"
            className="inline-flex items-center text-sm font-semibold text-ivory transition-colors hover:text-system"
          >
            Ver projetos
          </Link>
        </div>
      </Container>
    </main>
  );
}
