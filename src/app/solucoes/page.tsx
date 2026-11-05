import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/page-intro";
import SolutionDemoView from "@/components/solutions/solution-demos";
import { Arrow, Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
import { contactHref } from "@/data/contact";
import { getProjectBySlug } from "@/data/projects";
import florLanding from "@/assets/projects/flor-de-maria-vip/landing.webp";
import crmModoFoco from "@/assets/projects/arpex-crm/modo-foco.webp";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Presença, atendimento e operação: sites, Perfil da Empresa no Google, placas de avaliação, organização de contatos, automações e sistemas sob medida. Comece pelo que pesa mais hoje.",
  alternates: { canonical: "/solucoes" },
};

/** Visual de cada frente nesta página (a home usa as demonstrações das abas). */
function FrontVisual({ slug }: { slug: string }) {
  if (slug === "presenca") {
    return (
      <>
        <SolutionDemoView demo="local" active />
        <p className="mt-4 text-[length:var(--text-small)] text-fg-muted">
          Placas de avaliação com QR Code e NFC:{" "}
          <Link href="/placas" className="focus-ring text-fg underline decoration-rule underline-offset-4 hover:decoration-fg">
            veja como funcionam
          </Link>
          .
        </p>
      </>
    );
  }
  const v =
    slug === "atendimento"
      ? { src: crmModoFoco, alt: "Modo foco do ArpeX CRM com mensagem pronta para o WhatsApp (dados de demonstração)", caption: "ArpeX CRM · tela real, dados de demonstração" }
      : { src: florLanding, alt: "Página de apresentação do sistema Flor de Maria VIP", caption: "Sistema Flor de Maria VIP · página de apresentação" };
  return (
    <figure>
      <div className="frame relative aspect-[16/10]">
        <Image src={v.src} alt={v.alt} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-top" />
      </div>
      <figcaption className="font-label mt-4 text-fg-muted">{v.caption}</figcaption>
    </figure>
  );
}

export default function SolucoesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Soluções"
        title="Presença, atendimento e operação."
        lead="Você não precisa contratar tudo. Veja a necessidade que cada frente atende, o que entregamos e como começar."
      />

      <nav aria-label="Frentes" className="surface-ink border-y border-rule">
        <ul className="no-scrollbar mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-[var(--gutter)] py-4">
          {solutions.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-rule px-4 text-[length:var(--text-small)] text-fg transition-colors hover:border-fg">
                <span className="font-label text-signal">{s.index}</span>
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {solutions.map((s, i) => {
        const light = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={`${light ? "surface-mineral" : "surface-ink"} relative scroll-mt-[var(--header-height)] py-20 md:py-28`}
          >
            {/* endereços da versão com quatro frentes continuam chegando aqui */}
            {s.legacyAnchors.map((a) => (
              <span key={a} id={a} aria-hidden className="absolute top-0 scroll-mt-[var(--header-height)]" />
            ))}
            <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
              <div className={`md:col-span-6 lg:col-span-5 ${light ? "md:order-2 md:col-start-7 lg:col-start-8" : ""}`}>
                {/* necessidade (contexto) → entregas (lista) → como começar (ação) */}
                <p className="font-label text-accent">{s.index}</p>
                <h2 id={`${s.slug}-title`} className="font-title mt-3 text-balance text-[length:var(--text-h2)] text-fg">
                  {s.name}
                </h2>
                <p className="font-heading mt-3 text-balance text-[length:var(--text-h3)] text-fg">{s.promise}</p>
                <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">{s.need}</p>

                <h3 className="font-kicker mt-8 text-accent">O que entregamos</h3>
                <ul className="mt-3 space-y-2.5 leading-relaxed text-fg">
                  {s.delivery.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-current" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-rule pt-6">
                  <h3 className="font-kicker text-accent">Como começar</h3>
                  <p className="mt-2 max-w-[52ch] text-pretty leading-relaxed text-fg">{s.start}</p>
                  <div className="mt-5">
                    <Button href={contactHref(s.interest)} variant={light ? "solid" : "primary"} arrow>
                      {s.cta}
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`md:col-span-6 ${light ? "md:order-1 md:col-start-1" : "md:col-start-7"} md:self-start`}>
                <FrontVisual slug={s.slug} />
                <p className="mt-5 flex flex-wrap items-center gap-2 text-[length:var(--text-small)] text-fg-muted">
                  Exemplos:
                  {s.examples.map((slug) => {
                    const p = getProjectBySlug(slug);
                    if (!p) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projetos/${slug}`}
                        className="focus-ring group/btn inline-flex min-h-10 items-center gap-1.5 rounded-full border border-rule px-3.5 text-fg transition-colors hover:border-fg"
                      >
                        {p.title}
                        <Arrow className="h-3.5 w-3.5" />
                      </Link>
                    );
                  })}
                </p>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="comecar-title" className="surface-paper py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-[var(--gutter)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="comecar-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
              Não sabe por onde começar?
            </h2>
            <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">
              Conte o que está acontecendo. As frentes se conectam aos poucos: um formulário alimenta o acompanhamento de
              contatos, um cadastro dispara um lembrete.
            </p>
          </div>
          <Button href={contactHref("entender")} variant="solid" arrow>
            Conversar sobre meu negócio
          </Button>
        </div>
      </section>
    </main>
  );
}
