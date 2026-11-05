import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/layout/page-intro";
import TransitionLink from "@/components/motion/transition-link";
import { Arrow, Button } from "@/components/ui/button";
import { listedProjects } from "@/data/projects";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "O que a ArpeX construiu e o que isso resolveu: sites para Chef Bruno Sushi, Lux Bartenders e Honoratto Tattoo, a carta de vinhos 3D da Toricelli, o sistema Flor de Maria VIP e o ArpeX CRM.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Projetos"
        title="O que construímos e o que isso resolveu."
        lead="Sites, sistemas, uma carta digital em 3D e o nosso próprio CRM. As imagens são capturas das entregas; o detalhe de cada uma está no case."
      />

      <section aria-label="Arquivo de projetos" className="surface-ink pb-20 md:pb-28">
        <ol className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          {listedProjects.map((p, i) => (
            <li key={p.slug} className="border-t border-rule last:border-b">
              <TransitionLink
                href={`/projetos/${p.slug}`}
                className="focus-ring group/row relative grid grid-cols-12 items-center gap-x-6 gap-y-5 py-8 md:py-10"
              >
                {/* cor do projeto entra discretamente no hover/foco */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -inset-x-[var(--gutter)] opacity-0 transition-opacity duration-500 group-hover/row:opacity-100 group-focus-visible/row:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${p.palette.accent}14, transparent 70%)` }}
                />
                <span className="font-label relative col-span-12 text-fg-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="relative col-span-12 md:col-span-5">
                  {/* lista para comparar: nome, tipo, síntese, situação; o resto fica no case */}
                  <p className="font-kicker text-signal">{p.type}</p>
                  <h2 className="font-title mt-2 text-[length:var(--text-h2)] text-fg">{p.title}</h2>
                  {p.client !== p.title && <p className="mt-1 text-fg-muted">{p.client}</p>}
                  <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-fg-muted">{p.summary}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[length:var(--text-small)] text-fg">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: p.palette.accent === "#121212" ? "#00cf77" : p.palette.accent }} />
                    {p.status.label}
                  </p>
                </div>
                <div className="relative col-span-12 md:col-span-6">
                  {p.cover && (
                    <div
                      className="frame relative aspect-[16/10] origin-right transition-transform duration-500 ease-out md:scale-[0.92] md:group-hover/row:scale-100 md:group-focus-visible/row:scale-100"
                      style={{ viewTransitionName: `case-${p.slug}` }}
                    >
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 768px) 46vw, 92vw"
                        priority={i < 2}
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover/row:scale-[1.03]"
                      />
                    </div>
                  )}
                  <span className="font-label absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-ivory backdrop-blur md:opacity-0 md:transition-opacity md:duration-300 md:group-hover/row:opacity-100 md:group-focus-visible/row:opacity-100">
                    Abrir case
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </div>
              </TransitionLink>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-16 flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 px-[var(--gutter)]">
          <p className="max-w-[52ch] text-pretty text-fg">Tem uma necessidade parecida? Conte o que está acontecendo.</p>
          <Button href={contactHref("entender")} arrow>
            Conversar sobre meu negócio
          </Button>
        </div>
      </section>
    </main>
  );
}
