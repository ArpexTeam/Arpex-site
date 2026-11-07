import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlaqueStory from "@/components/plaque/plaque-story";
import PlaqueIntroPhoto from "@/components/plaque/plaque-intro-photo";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/contact-icons";
import { PLAQUE_BG, plaqueCustomization, plaqueFaq, plaqueHire, plaqueUses } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import { waLink } from "@/data/social-links";
import placaMao from "@/assets/plaque/placa-mao.webp";
import placaFrontal from "@/assets/plaque/placa-frontal.webp";

export const metadata: Metadata = {
  title: "Placa de avaliação com QR Code e NFC",
  description:
    "Placa de acrílico com a arte da sua empresa: o cliente aproxima o celular ou escaneia o QR Code, abre a página de avaliação e decide se publica.",
  alternates: { canonical: "/placas" },
};

const WA_PLACA = "Olá! Quero uma placa de avaliação com QR Code e NFC para minha empresa.";

/**
 * A placa como produto físico, em quatro momentos: o produto (a foto real,
 * recortada, entrando em foco), a demonstração (a cena com o celular, que só
 * entra quando precisa), o detalhe com a mão para dar a escala e a
 * contratação, com compatibilidade e dúvidas no fim.
 * O QR das placas fotografadas leva a destinos reais: o site não convida a
 * escanear as fotos como teste.
 */
export default function PlacasPage() {
  return (
    <main>
      {/* 1. Produto */}
      <section aria-labelledby="produto-title" className="surface-ink overflow-x-clip" style={{ background: PLAQUE_BG }}>
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
              <Button href={waLink(WA_PLACA)} target="_blank" rel="noopener noreferrer" variant="secondary">
                <WhatsAppIcon />
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
          <figure className="py-6 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <PlaqueIntroPhoto />
            <figcaption className="mt-10 text-center text-[length:var(--text-small)] text-fg-muted">Foto real da placa, em acrílico e sem base.</figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Demonstração: a cena 3D com as três legendas */}
      <PlaqueStory variant="page" />

      {/* 3. Detalhe e personalização: as fotos com a mão dão a escala */}
      <section aria-labelledby="personalizacao-title" className="surface-paper py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="grid grid-cols-[1.15fr_1fr] items-end gap-4 md:col-span-7 md:gap-6">
            <figure>
              <Image
                src={placaMao}
                alt="Mão segurando a placa de avaliação, levemente inclinada, contra uma parede escura."
                sizes="(min-width: 1440px) 420px, (min-width: 768px) 30vw, 52vw"
                className="h-auto w-full rounded-[var(--radius-frame)]"
              />
              <figcaption className="mt-3 text-pretty text-[length:var(--text-small)] text-fg-muted">Na mão, para dar a escala.</figcaption>
            </figure>
            <figure>
              <Image
                src={placaFrontal}
                alt="A placa de frente, segura pela ponta dos dedos: a chamada para avaliação, o ícone de aproximação (NFC) e o QR Code."
                sizes="(min-width: 1440px) 360px, (min-width: 768px) 26vw, 44vw"
                className="h-auto w-full rounded-[var(--radius-frame)]"
              />
              <figcaption className="mt-3 text-pretty text-[length:var(--text-small)] text-fg-muted">De frente: a chamada, a área de aproximação (NFC) e o QR Code.</figcaption>
            </figure>
          </div>
          <div className="md:col-span-4 md:col-start-9">
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
            <Button href={waLink(WA_PLACA)} target="_blank" rel="noopener noreferrer" variant="secondary">
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
