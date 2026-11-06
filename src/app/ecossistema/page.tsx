import type { Metadata } from "next";
import CrmStory from "@/components/crm/crm-story";
import CrmUses from "@/components/crm/crm-uses";
import ScreenDetail from "@/components/crm/screen-detail";
import { Button } from "@/components/ui/button";
import { CRM_LOGIN_URL, crmFlow } from "@/data/crm";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "ArpeX CRM",
  description:
    "ArpeX CRM, produto próprio da ArpeX para empresas que atendem e vendem pelo WhatsApp: contatos, oportunidades, retornos, prospecção, métricas e financeiro.",
  alternates: { canonical: "/ecossistema" },
};

/**
 * Três ritmos: a apresentação animada das telas (abertura), um fluxo curto com
 * o trecho de cada tela que faz a ação e os usos práticos num seletor. Termina
 * com um caminho para conhecer o produto e outro para quem já tem acesso.
 * Só a apresentação no institucional; a aplicação não é alterada.
 */
export default function EcossistemaPage() {
  return (
    <main>
      <div className="pt-[var(--header-height)] surface-ink-2" />
      <CrmStory headingLevel={1} />

      <section aria-labelledby="fluxo-title" className="surface-ink py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="fluxo-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Do contato ao próximo retorno
          </h2>
          <ol className="mt-10 grid gap-x-6 gap-y-12 md:mt-12 md:grid-cols-2 md:gap-y-16">
            {crmFlow.map((step, i) => (
              <li key={step.key}>
                <ScreenDetail detail={step} sizes="(min-width: 768px) 46vw, 92vw" />
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="font-label text-signal">0{i + 1}</span>
                  <span className="font-heading text-[length:var(--text-h3)] text-fg">{step.title}</span>
                </p>
                <p className="mt-1.5 max-w-[48ch] pl-8 text-pretty leading-relaxed text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[length:var(--text-small)] text-fg-muted">Telas reais do ArpeX CRM, com dados de demonstração.</p>
        </div>
      </section>

      <section aria-labelledby="usos-title" className="surface-mineral py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="usos-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            No dia a dia
          </h2>
          <div className="mt-8 md:mt-10">
            <CrmUses />
          </div>
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
