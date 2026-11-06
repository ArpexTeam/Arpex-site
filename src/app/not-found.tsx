import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="surface-ink flex min-h-[92svh] items-center pt-[var(--header-height)]">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <p className="font-kicker text-accent">Erro 404</p>
        <h1 className="font-display mt-4 max-w-[16ch] text-balance text-[length:var(--text-display)] text-fg">
          Esta página não existe (ainda<span className="text-signal">)</span>.
        </h1>
        <p className="mt-6 max-w-[44ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">
          O endereço pode ter mudado. As soluções, os projetos e o contato continuam no mesmo lugar.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" arrow>
            Voltar ao início
          </Button>
          <Button href="/projetos" variant="link">
            Ver projetos
          </Button>
        </div>
      </div>
    </main>
  );
}
