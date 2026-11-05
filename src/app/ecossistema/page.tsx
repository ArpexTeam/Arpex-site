import type { Metadata } from "next";
import Image from "next/image";
import CrmStory from "@/components/crm/crm-story";
import { Button } from "@/components/ui/button";
import { CRM_LOGIN_URL, crmScreens } from "@/data/crm";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "ArpeX CRM",
  description:
    "ArpeX CRM, produto próprio da ArpeX para organizar contatos, oportunidades e acompanhamento comercial: tela Hoje, modo foco com mensagem pronta para o WhatsApp, pipeline, follow-ups, prospecção, métricas e financeiro.",
  alternates: { canonical: "/ecossistema" },
};

export default function EcossistemaPage() {
  return (
    <main>
      <div className="pt-[var(--header-height)] surface-ink-2" />
      <CrmStory headingLevel={1} />

      <section aria-labelledby="telas-title" className="surface-ink py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <div className="grid gap-6 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-8">
              <p className="font-kicker text-accent">Todas as telas</p>
              <h2 id="telas-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
                O que existe hoje no ArpeX CRM.
              </h2>
              <p className="mt-6 max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">
                Capturas reais do produto publicado, com dados de demonstração. Só aparece aqui o que já funciona.
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2">
            {crmScreens.map((s, i) => (
              <li key={s.key} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <figure>
                  <div className="frame relative aspect-[16/10]">
                    <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-left-top" />
                  </div>
                  <figcaption className="mt-5 grid grid-cols-[2.5rem_1fr] gap-x-2">
                    <span className="font-label pt-1 text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-heading block text-[length:var(--text-h3)] text-fg">{s.name}</span>
                      <span className="mt-1.5 block max-w-[46ch] text-pretty text-fg-muted">{s.text}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="acesso-title" className="surface-mineral py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-6">
            <h2 id="acesso-title" className="font-display text-balance text-[length:var(--text-h2)] text-fg">
              Quer usar o CRM na sua empresa?
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <dl className="space-y-5">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-t border-rule pt-4">
                <dt className="font-label pt-1 text-fg-muted">Situação</dt>
                <dd className="text-fg">Produto publicado, com acesso por login.</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-t border-rule pt-4">
                <dt className="font-label pt-1 text-fg-muted">Telas</dt>
                <dd className="text-fg">Capturas reais com dados de demonstração.</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-y border-rule py-4">
                <dt className="font-label pt-1 text-fg-muted">Acesso</dt>
                <dd className="text-fg">Converse com a ArpeX para conhecer as condições de uso.</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactHref("crm")} variant="solid" arrow>
                Conversar sobre o CRM
              </Button>
              <Button href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
                Já tenho acesso
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
