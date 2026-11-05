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
    "A ArpeX Technology faz estruturação digital sob medida para micro, pequenas e médias empresas: entende a rotina do negócio e indica a solução adequada, de um site a um sistema.",
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

const principles = [
  {
    t: "Entender antes de propor.",
    d: "A conversa começa pela rotina da empresa e pelo que precisa melhorar, não por um pacote pronto.",
  },
  {
    t: "Começar pelo que pesa mais.",
    d: "Uma necessidade específica pode ser a porta de entrada. As outras frentes entram só quando fizerem sentido.",
  },
  {
    t: "Construir com cuidado.",
    d: "Planejamento, validação com quem vai usar e testes antes da entrega, no tamanho de cada projeto.",
  },
];

export default function SobrePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Sobre a ArpeX"
        title="Entendemos o negócio antes de construir."
        lead="A ArpeX Technology faz estruturação digital sob medida para micro, pequenas e médias empresas: organiza a presença, o atendimento e os processos com sites, automações e sistemas pensados para a realidade de cada uma."
      />

      <section aria-labelledby="principios-title" className="surface-paper py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <div className="grid gap-6 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-8">
              <p className="font-kicker text-accent">Como pensamos</p>
              <h2 id="principios-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
                Uma atuação consultiva, do primeiro contato à evolução da solução.
              </h2>
            </div>
          </div>
          <ol className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.t} className="border-t border-rule pt-6">
                <p className="font-label text-accent">0{i + 1}</p>
                <h3 className="font-heading mt-4 text-[length:var(--text-h3)] text-fg">{p.t}</h3>
                <p className="mt-3 max-w-[40ch] text-pretty leading-relaxed text-fg-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Method surface="surface-mineral" />

      <section aria-labelledby="capacidade-title" className="surface-ink py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-3">
            <p className="font-kicker text-accent">O que já entregamos</p>
            <h2 id="capacidade-title" className="font-heading mt-4 text-balance text-[length:var(--text-h3)] text-fg">
              Cada item aponta para o trabalho que comprova.
            </h2>
          </div>
          <ul className="md:col-span-9">
            {capabilities.map((c) => (
              <li key={c.what} className="border-t border-rule last:border-b">
                <Link href={c.href} className="focus-ring group/cap grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
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

      <Backstage />

      <section className="surface-ink py-20 md:py-28">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-8 px-[var(--gutter)]">
          <h2 className="font-display max-w-[20ch] text-balance text-[length:var(--text-h2)] text-fg">
            Vamos entender o próximo passo do seu negócio?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={contactHref("entender")} arrow>
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
