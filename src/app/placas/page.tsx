import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlaqueStory from "@/components/plaque/plaque-story";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/contact-icons";
import { PLAQUE_BG, plaqueCustomization, plaqueFaq, plaqueHire, plaqueUses } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import { waLink } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Placa de avaliação com QR Code e NFC",
  description:
    "Placa de acrílico com a arte da sua empresa: o cliente aproxima o celular ou escaneia o QR Code, abre a página de avaliação e decide se publica.",
  alternates: { canonical: "/placas" },
};

const WA_PLACA = "Olá! Quero uma placa de avaliação com QR Code e NFC para minha empresa.";

/**
 * A placa como produto físico, em quatro momentos: o produto (a placa em
 * foco), a demonstração (a cena 3D, com o celular entrando só quando precisa),
 * a personalização e a contratação, com compatibilidade e dúvidas no fim.
 * Sem fotos reais aprovadas, as imagens são renders identificados.
 */
export default function PlacasPage() {
  return (
    <main>
      {/* 1. Produto */}
      <section aria-labelledby="produto-title" className="surface-ink" style={{ background: PLAQUE_BG }}>
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-[var(--gutter)] pb-16 pt-[calc(var(--header-height)+40px)] md:grid-cols-12 md:gap-x-6 md:pb-20 md:pt-[calc(var(--header-height)+56px)]">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-kicker text-signal">Presença · produto físico</p>
            <h1 id="produto-title" className="font-display mt-4 max-w-[16ch] text-balance text-[length:var(--text-display)] text-fg">
              Placa de avaliação com QR Code e NFC
            </h1>
            <p className="mt-5 max-w-[42ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg">
              Um caminho curto do balcão até a página de avaliação da sua empresa.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={contactHref("placas")}>Solicitar uma placa</Button>
              <Button href={waLink(WA_PLACA)} target="_blank" rel="noopener noreferrer" variant="link">
                <WhatsAppIcon />
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
          <figure className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="relative mx-auto aspect-[1355/1543] w-full max-w-[460px]">
              <Image
                src="/placas/placa-render-frente.webp"
                alt="Placa de acrílico com a arte de demonstração: “Gostou do atendimento?”, QR Code e o símbolo de aproximação NFC"
                fill
                priority
                sizes="(min-width: 768px) 460px, 92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-[length:var(--text-small)] text-fg-muted">Render de demonstração, com arte ilustrativa.</figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Demonstração: a cena 3D com as três legendas */}
      <PlaqueStory variant="page" />

      {/* 3. Personalização */}
      <section aria-labelledby="personalizacao-title" className="surface-paper py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <figure className="md:col-span-5">
            <div className="relative mx-auto aspect-[1147/1737] w-full max-w-[360px] overflow-hidden rounded-[var(--radius-frame)]" style={{ background: PLAQUE_BG }}>
              <Image
                src="/placas/placa-render-angulo.webp"
                alt="A mesma placa vista de lado, mostrando a espessura do acrílico"
                fill
                sizes="(min-width: 768px) 360px, 80vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-[length:var(--text-small)] text-fg-muted">Render de demonstração.</figcaption>
          </figure>
          <div className="md:col-span-6 md:col-start-7">
            <h2 id="personalizacao-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
              A placa é da sua empresa.
            </h2>
            <dl className="mt-8 border-t border-rule">
              {plaqueCustomization.map((c) => (
                <div key={c.t} className="border-b border-rule py-4">
                  <dt className="font-heading text-fg">{c.t}</dt>
                  <dd className="mt-1 text-pretty leading-relaxed text-fg-muted">{c.d}</dd>
                </div>
              ))}
            </dl>
            <h3 className="font-kicker mt-10 text-accent">Onde usar</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {plaqueUses.map((u) => (
                <li key={u.place}>
                  <p className="font-heading text-fg">{u.place}</p>
                  <p className="mt-1 text-pretty text-fg-muted">{u.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Contratação, com compatibilidade e dúvidas perto do fim */}
      <section aria-labelledby="contratar-title" className="surface-ink py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="contratar-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Como contratar
          </h2>
          <ol className="mt-8 grid gap-x-6 gap-y-6 md:grid-cols-3">
            {plaqueHire.map((s, i) => (
              <li key={s.t} className="border-t border-rule pt-4">
                <p className="flex items-baseline gap-3">
                  <span className="font-label text-signal">0{i + 1}</span>
                  <span className="font-heading text-fg">{s.t}</span>
                </p>
                <p className="mt-2 text-pretty leading-relaxed text-fg-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={contactHref("placas")}>Solicitar uma placa</Button>
            <Button href={waLink(WA_PLACA)} target="_blank" rel="noopener noreferrer" variant="link">
              <WhatsAppIcon />
              Chamar no WhatsApp
            </Button>
          </div>

          <div className="mt-16 grid gap-10 border-t border-rule pt-10 md:mt-20 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-6">
              <h3 className="font-kicker text-accent">Compatibilidade e dúvidas</h3>
              <dl className="mt-4 space-y-5">
                {plaqueFaq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-heading text-fg">{f.q}</dt>
                    <dd className="mt-1 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <h3 className="font-kicker text-accent">Serviço relacionado, opcional</h3>
              <p className="font-heading mt-4 text-fg">Perfil da Empresa no Google</p>
              <p className="mt-1 max-w-[48ch] text-pretty leading-relaxed text-fg-muted">
                Organizamos categoria, descrição, horário, telefone, link e fotos. A placa funciona com a página de avaliação
                que você já tem. Serviço independente, sem vínculo com o Google; faz parte da frente de{" "}
                <Link href="/solucoes#presenca" className="link link-inline">
                  presença
                </Link>
                .
              </p>
              <Button href={contactHref("local")} variant="link" arrow className="mt-3">
                Quero revisar meu perfil
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
