import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/page-intro";
import SolutionDemoView from "@/components/solutions/solution-demos";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
import { contactHref } from "@/data/contact";
import { getProjectBySlug, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import florLanding from "@/assets/projects/flor-de-maria-vip/landing.webp";
import crmModoFoco from "@/assets/projects/arpex-crm/modo-foco.webp";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Presença, atendimento e operação: sites, Perfil da Empresa no Google, placas de avaliação, organização de contatos, automações e sistemas sob medida. Comece pelo que pesa mais hoje.",
  alternates: { canonical: "/solucoes" },
};

/** Evidência visual de cada frente (a home usa as demonstrações das abas). */
function FrontVisual({ slug }: { slug: string }) {
  if (slug === "presenca") {
    return (
      <>
        <SolutionDemoView demo="local" active />
        <p className="mt-3 text-[length:var(--text-small)] text-fg-muted">
          Placas de avaliação com QR Code e NFC:{" "}
          <Link href="/placas" className="link link-inline">
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
      <figcaption className="font-label mt-3 text-fg-muted">{v.caption}</figcaption>
    </figure>
  );
}

/**
 * Abertura curta e índice colado à primeira frente. Cada frente agrupa, nesta
 * ordem: necessidade → evidência visual → entregas → próximo passo. No
 * desktop a evidência fica ao lado do texto; no celular, logo depois da
 * necessidade.
 */
export default function SolucoesPage() {
  return (
    <main>
      <PageIntro title="Soluções" lead="Comece pelo que mais precisa melhorar na sua empresa." className="pb-0!">
        <nav aria-label="Frentes nesta página" className="mt-8 border-y border-rule md:mt-10">
          <ul className="flex flex-wrap gap-x-2">
            {solutions.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="nav-link inline-flex min-h-12 items-baseline gap-2 px-2 pt-[0.85rem] text-[length:var(--text-body)] font-medium">
                  {/* no celular só os nomes, para o índice caber numa linha */}
                  <span className="font-label hidden text-accent sm:inline">{s.index}</span>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      {solutions.map((s, i) => {
        const light = i % 2 === 1;
        const examples = s.examples.map((slug) => getProjectBySlug(slug)).filter((p): p is Project => p !== undefined);
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={cn(
              light ? "surface-mineral" : "surface-ink",
              "relative scroll-mt-[var(--header-height)] py-16 md:py-24",
              i === 0 && "pt-12 md:pt-16"
            )}
          >
            {/* endereços da versão com quatro frentes continuam chegando aqui */}
            {s.legacyAnchors.map((a) => (
              <span key={a} id={a} aria-hidden className="absolute top-0 scroll-mt-[var(--header-height)]" />
            ))}
            <div className="mx-auto grid w-full max-w-[1440px] gap-x-6 gap-y-8 px-[var(--gutter)] md:grid-cols-12 md:grid-rows-[auto_auto_1fr]">
              <header className={cn("md:col-span-5 md:row-start-1", light && "md:col-start-8")}>
                <h2 id={`${s.slug}-title`} className="font-title flex items-baseline gap-3 text-[length:var(--text-h2)] text-fg">
                  {/* no celular só os nomes, para o índice caber numa linha */}
                  <span className="font-label hidden text-accent sm:inline">{s.index}</span>
                  {s.name}
                </h2>
                <p className="font-heading mt-4 text-balance text-[length:var(--text-h3)] text-fg">{s.promise}</p>
                <p className="mt-3 max-w-[50ch] text-pretty leading-relaxed text-fg-muted">{s.need}</p>
              </header>

              <div className={cn("md:col-span-6 md:row-span-3 md:row-start-1 md:self-start", light ? "md:col-start-1" : "md:col-start-7")}>
                <FrontVisual slug={s.slug} />
                <p className="mt-3 text-[length:var(--text-small)] text-fg-muted">
                  Veja em:{" "}
                  {examples.map((p, k) => (
                    <span key={p.slug}>
                      {k > 0 && (k === examples.length - 1 ? " e " : ", ")}
                      <Link href={`/projetos/${p.slug}`} className="link link-inline">
                        {p.title}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              </div>

              <div className={cn("md:col-span-5 md:row-start-2", light && "md:col-start-8")}>
                <h3 className="font-kicker text-accent">O que entregamos</h3>
                <ul className="mt-3 border-t border-rule">
                  {s.delivery.map((d) => (
                    <li key={d} className="border-b border-rule py-3 text-pretty leading-relaxed text-fg">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn("md:col-span-5 md:row-start-3", light && "md:col-start-8")}>
                {s.start && <p className="max-w-[50ch] text-pretty leading-relaxed text-fg-muted">{s.start}</p>}
                <Button href={contactHref(s.interest)} arrow className={s.start ? "mt-5" : undefined}>
                  {s.cta}
                </Button>
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
              Conte o que está acontecendo. Ajudamos a definir a primeira entrega.
            </p>
          </div>
          <Button href={contactHref("entender")}>Falar com a ArpeX</Button>
        </div>
      </section>
    </main>
  );
}
