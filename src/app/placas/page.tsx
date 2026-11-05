import type { Metadata } from "next";
import Link from "next/link";
import PlaqueStory from "@/components/plaque/plaque-story";
import { Button } from "@/components/ui/button";
import { plaqueCustomization, plaqueUses } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import { waLink } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Placas de avaliação com QR Code e NFC",
  description:
    "Placa de acrílico com a identidade da sua empresa: o cliente aproxima o celular ou escaneia o QR Code e chega à página de avaliação, onde escolhe a nota e decide se publica.",
  alternates: { canonical: "/placas" },
};

const hireSteps = [
  "Fale com a ArpeX pelo formulário ou pelo WhatsApp.",
  "Definimos juntos a arte e o endereço para onde a placa leva.",
  "Combinamos produção, prazo e entrega na mesma conversa.",
];

/**
 * A cena e as três etapas explicam o percurso (inclusive que abrir o link não
 * publica nada). As seções abaixo só acrescentam o que a cena não mostra:
 * compatibilidade, personalização e uso, perfil no Google e contratação.
 */
export default function PlacasPage() {
  return (
    <main>
      <PlaqueStory variant="page" />

      <section aria-labelledby="compatibilidade-title" className="surface-mineral py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="compatibilidade-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-5">
            NFC ou QR Code: o mesmo destino.
          </h2>
          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-7">
            <div className="border-t border-rule pt-5">
              <dt className="font-heading text-[length:var(--text-h3)] text-fg">Aproximar</dt>
              <dd className="mt-2 text-pretty leading-relaxed text-fg-muted">
                Em celulares com NFC ativado, basta encostar na placa. Sem câmera e sem digitar nada.
              </dd>
            </div>
            <div className="border-t border-rule pt-5">
              <dt className="font-heading text-[length:var(--text-h3)] text-fg">Escanear</dt>
              <dd className="mt-2 text-pretty leading-relaxed text-fg-muted">
                Em qualquer celular com câmera, pelo QR Code impresso. Por isso a placa tem os dois.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="personalizacao-title" className="surface-paper py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
            <h2 id="personalizacao-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-5">
              A placa é da sua empresa.
            </h2>
            <ul className="md:col-span-7">
              {plaqueCustomization.map((c) => (
                <li key={c} className="border-t border-rule py-4 text-pretty leading-relaxed text-fg last:border-b">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 md:mt-16">
            <h3 className="font-kicker text-accent">Onde usar</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {plaqueUses.map((u) => (
                <li key={u.place}>
                  <p className="font-heading text-fg">{u.place}</p>
                  <p className="mt-1 text-fg-muted">{u.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="google-title" className="surface-mineral py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="google-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-5">
            A placa rende mais com o perfil completo.
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-[56ch] text-pretty leading-relaxed text-fg">
              Se quiser, também organizamos o Perfil da Empresa no Google: categoria, descrição, horário, telefone, link e
              fotos. É opcional: a placa funciona com a página de avaliação que você já tem.
            </p>
            <p className="mt-3 text-[length:var(--text-small)] text-fg-muted">
              Serviço independente, sem vínculo com o Google. Faz parte da frente de{" "}
              <Link href="/solucoes#presenca" className="focus-ring text-fg underline decoration-rule underline-offset-4 hover:decoration-fg">
                presença
              </Link>
              .
            </p>
            <div className="mt-6">
              <Button href={contactHref("local")} variant="solid" arrow>
                Quero revisar meu perfil
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contratar-title" className="surface-ink py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="contratar-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Como contratar
          </h2>
          <ol className="mt-8 grid gap-x-6 gap-y-4 md:grid-cols-3">
            {hireSteps.map((t, i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] border-t border-rule pt-4">
                <span className="font-label pt-1 text-signal">0{i + 1}</span>
                <span className="text-pretty leading-relaxed text-fg">{t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={contactHref("placas")} arrow>
              Quero uma placa para minha empresa
            </Button>
            <Button
              href={waLink("Olá! Quero uma placa de avaliação com QR Code e NFC para minha empresa.")}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
