import type { Metadata } from "next";
import Image from "next/image";
import CrmStory from "@/components/crm/crm-story";
import { Button } from "@/components/ui/button";
import { CRM_LOGIN_URL, crmScreens, crmStory } from "@/data/crm";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "ArpeX CRM",
  description:
    "ArpeX CRM, produto próprio da ArpeX para empresas que atendem e vendem pelo WhatsApp: contatos, oportunidades, retornos, prospecção, métricas e financeiro.",
  alternates: { canonical: "/ecossistema" },
};

// a cena de abertura já mostra Hoje, Modo foco e Pipeline; a galeria aprofunda o resto
const storyKeys = new Set(crmStory.map((s) => s.key));
const moreScreens = crmScreens.filter((s) => !storyKeys.has(s.key));

export default function EcossistemaPage() {
  return (
    <main>
      <div className="pt-[var(--header-height)] surface-ink-2" />
      <CrmStory headingLevel={1} />

      <section aria-labelledby="telas-title" className="surface-ink py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="telas-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Retornos, prospecção, mensagens e números.
          </h2>

          <ul className="mt-10 grid gap-x-6 gap-y-14 md:mt-14 md:grid-cols-2">
            {moreScreens.map((s, i) => (
              <li key={s.key} className={i % 2 === 1 ? "md:mt-20" : undefined}>
                <figure>
                  <div className="frame relative aspect-[16/10]">
                    <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-left-top" />
                  </div>
                  <figcaption className="mt-4">
                    <span className="font-heading block text-[length:var(--text-h3)] text-fg">{s.name}</span>
                    <span className="mt-1 block max-w-[46ch] text-pretty text-fg-muted">{s.text}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="acesso-title" className="surface-mineral py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-[var(--gutter)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="acesso-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
              Quer usar o CRM na sua empresa?
            </h2>
            <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">
              O produto está publicado, com acesso por login. Converse com a ArpeX para conhecer as condições de uso.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={contactHref("crm")} variant="solid" arrow>
              Conversar sobre o CRM
            </Button>
            <Button href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
              Já tenho acesso
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
