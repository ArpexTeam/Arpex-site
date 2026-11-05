import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { contactHref } from "@/data/contact";

/** No máximo três situações: o visitante se reconhece sem ler uma lista de dores. */
const situations = [
  {
    title: "Você repete a mesma informação em vários lugares.",
    text: "Planilha, caderno e mensagem guardando o mesmo dado. Dá para reunir tudo em um lugar só.",
  },
  {
    title: "Os pedidos chegam, mas acompanhar tudo está ficando difícil.",
    text: "Cada contato com o próximo passo à vista, para nenhuma conversa ficar pelo caminho.",
  },
  {
    title: "As tarefas manuais estão tomando o tempo da equipe.",
    text: "Avisos, lembretes e mensagens que se repetem podem ser automatizados.",
  },
];

/** Reconhecimento da necessidade: logo depois da abertura, antes das soluções. */
export default function Need() {
  return (
    <section id="necessidade" aria-labelledby="necessidade-title" className="surface-mineral py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-7">
            <p className="font-kicker text-accent">Para quem é</p>
            <h2 id="necessidade-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              Sua empresa cresceu. O jeito de trabalhar precisa acompanhar.
            </h2>
          </div>
          <p className="max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg md:col-span-5 md:self-end">
            No começo, planilhas, anotações e mensagens ajudam a resolver o dia a dia. Com o crescimento, acompanhar tudo
            pode ficar mais difícil. A ArpeX identifica esses pontos e cria uma estrutura que acompanha a evolução do
            negócio.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-10 md:mt-20 md:grid-cols-3">
          {situations.map((s) => (
            <li key={s.title} className="border-t border-rule pt-6">
              <p className="font-heading text-balance text-[length:var(--text-h3)] text-fg">{s.title}</p>
              <p className="mt-3 max-w-[40ch] text-pretty leading-relaxed text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-4 rounded-[var(--radius-frame)] bg-paper px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:mt-20 md:px-8">
          <p className="max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg">
            E se você está planejando crescer, podemos construir essa base desde agora.
          </p>
          <Link
            href={contactHref("entender")}
            className="focus-ring group/btn inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-fg underline decoration-rule underline-offset-[6px] hover:decoration-fg"
          >
            Conversar sobre meu negócio
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
