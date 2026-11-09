import type { Metadata } from "next";
import CrmStory from "@/components/crm/crm-story";
import CrmTaskRow from "@/components/crm/crm-task";
import Disclosure from "@/components/ui/disclosure";
import ScreenPan from "@/components/ui/screen-pan";
import { Button } from "@/components/ui/button";
import { CRM_LOGIN_URL, crmMore, crmTasks } from "@/data/crm";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "ArpeX CRM",
  description:
    "ArpeX CRM, produto próprio da ArpeX para empresas que atendem e vendem pelo WhatsApp: contatos, oportunidades, retornos, prospecção, métricas e financeiro.",
  alternates: { canonical: "/ecossistema" },
};

/**
 * A página conta o produto pelas tarefas, sem repetir telas: a abertura
 * mostra Hoje, Modo foco e Pipeline; depois, cada tarefa do contato ao
 * retorno com a tela que a resolve; métricas e financeiro ficam numa área
 * expansível. Termina com um caminho para conhecer o produto e outro para
 * quem já tem acesso. Só a apresentação no institucional; a aplicação não é
 * alterada.
 */
export default function EcossistemaPage() {
  return (
    <main>
      <div className="pt-[var(--header-height)] surface-ink-2" />
      <CrmStory headingLevel={1} />

      <section aria-labelledby="tarefas-title" className="surface-ink py-16 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="tarefas-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Do contato ao próximo retorno
          </h2>
          <p className="mt-3 max-w-[52ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">
            O que o CRM resolve no dia a dia, tarefa por tarefa.
          </p>
          <ol className="mt-10 space-y-16 md:mt-14 md:space-y-24">
            {crmTasks.map((task, i) => (
              <CrmTaskRow key={task.key} task={task} index={i} flip={i % 2 === 1} />
            ))}
          </ol>

          <div className="mt-16 border-t border-rule md:mt-24">
            <Disclosure
              className="border-b border-rule"
              summary={
                <span>
                  <span className="font-heading block text-[length:var(--text-h3)] text-fg">Também no CRM: métricas e financeiro</span>
                  <span className="mt-1 block text-[length:var(--text-small)] text-fg-muted">Para quem acompanha os números do comercial e do caixa.</span>
                </span>
              }
            >
              <ul className="grid gap-10 pb-10 pt-2 md:grid-cols-2 md:gap-x-6">
                {crmMore.map((m) => {
                  const alt = `${m.screen} — tela do ArpeX CRM (dados de demonstração)`;
                  return (
                    <li key={m.key}>
                      <ScreenPan spec={m.compact} aspect={4 / 5} live={false} alt={alt} sizes="(min-width: 768px) 1px, 250vw" className="mx-auto w-[min(100%,340px)] md:hidden" />
                      <ScreenPan spec={m.wide} aspect={1.6} live={false} alt={alt} sizes="(min-width: 768px) 60vw, 1px" className="hidden md:block" />
                      <p className="font-heading mt-4 text-fg">{m.title}</p>
                      <p className="mt-1 max-w-[48ch] text-pretty leading-relaxed text-fg-muted">{m.text}</p>
                    </li>
                  );
                })}
              </ul>
            </Disclosure>
          </div>
          <p className="mt-6 text-[length:var(--text-small)] text-fg-muted">Telas reais do ArpeX CRM, com dados de demonstração.</p>
        </div>
      </section>

      <section aria-labelledby="acesso-title" className="surface-ink-2 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-[var(--gutter)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="acesso-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
              Quer usar o CRM na sua empresa?
            </h2>
            <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">
              O produto está publicado, com acesso por login. Converse com a ArpeX para conhecer as condições de uso.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={contactHref("crm")}>Conversar sobre o CRM</Button>
            <Button href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="link" arrow>
              Já tenho acesso
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
