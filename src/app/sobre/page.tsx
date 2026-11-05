import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/layout/page-intro";
import Method from "@/components/method/method";
import Backstage from "@/components/about/backstage";
import { Button } from "@/components/ui/button";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A ArpeX conhece a rotina da empresa, identifica o que precisa melhorar e desenvolve a solução adequada ao negócio, de um site a um sistema sob medida.",
  alternates: { canonical: "/sobre" },
};

/** Capacidades comprovadas por entregas publicadas — cada uma aponta para a prova. */
const capabilities = [
  { what: "Site com painel para o cliente atualizar o conteúdo", proof: "Chef Bruno Sushi", href: "/projetos/chef-bruno" },
  { what: "Perfil no Google, SEO básico e QR Code", proof: "Chef Bruno Sushi", href: "/projetos/chef-bruno" },
  { what: "Configurador que vira briefing para a equipe", proof: "Lux Bartenders", href: "/projetos/lux-bar" },
  { what: "Sistema com login, painel administrativo e lembretes", proof: "Flor de Maria VIP", href: "/projetos/flor-de-maria-vip" },
  { what: "Organização de contatos e acompanhamento comercial", proof: "ArpeX CRM", href: "/ecossistema" },
  { what: "Aplicativo instalável que funciona sem internet", proof: "Carta de vinhos 3D", href: "/projetos/carta-toricelli" },
  { what: "3D em tempo real no navegador", proof: "Carta de vinhos 3D", href: "/projetos/carta-toricelli" },
];

/** Critérios de decisão — o que as etapas do método não dizem. */
const principles = [
  { t: "Sem pacote pronto.", d: "A proposta parte da rotina da empresa, não de um catálogo." },
  { t: "Uma necessidade por vez.", d: "A primeira entrega já precisa fazer diferença; as outras frentes entram quando fizerem sentido." },
];

export default function SobrePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Sobre a ArpeX"
        title="Entendemos o negócio antes de construir."
        lead="Conhecemos sua rotina, identificamos o que precisa melhorar e desenvolvemos a solução adequada ao seu negócio."
      />

      {/* método (etapas) e critérios (decisões) na mesma seção, sem duas introduções */}
      <Method surface="surface-paper" principles={principles} />

      <Backstage />

      <section aria-labelledby="capacidade-title" className="surface-ink py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="capacidade-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-4">
            O que já entregamos
          </h2>
          <ul className="md:col-span-8">
            {capabilities.map((c) => (
              <li key={c.what} className="border-t border-rule last:border-b">
                <Link href={c.href} className="focus-ring group/cap grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <span className="font-heading text-[length:var(--text-h3)] text-fg transition-colors group-hover/cap:text-signal">{c.what}</span>
                  <span className="text-[length:var(--text-small)] text-fg-muted">
                    Veja em: <span className="text-fg underline decoration-rule underline-offset-4">{c.proof}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-mineral py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-6 px-[var(--gutter)]">
          <h2 className="font-title max-w-[22ch] text-balance text-[length:var(--text-h2)] text-fg">
            Quer conversar sobre o seu negócio?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={contactHref("entender")} variant="solid" arrow>
              Conversar com a ArpeX
            </Button>
            <Button href="/solucoes" variant="secondary">
              Ver as soluções
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
