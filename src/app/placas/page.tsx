import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlaqueStory from "@/components/plaque/plaque-story";
import { Button } from "@/components/ui/button";
import { plaqueCustomization, plaqueUses } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import { waLink } from "@/data/social-links";
import cartaoQr from "@/assets/projects/chef-bruno/cartao-qr.webp";

export const metadata: Metadata = {
  title: "Placas de avaliação com QR Code e NFC",
  description:
    "Placa de acrílico com a identidade da sua empresa: o cliente aproxima o celular ou escaneia o QR Code e chega à página de avaliação, onde escolhe a nota e decide se envia. Parte da presença digital da empresa.",
  alternates: { canonical: "/placas" },
};

const faq = [
  {
    q: "Funciona em qualquer celular?",
    a: "Por aproximação, em celulares com NFC ativado. Em qualquer celular com câmera, pelo QR Code — por isso a placa tem os dois.",
  },
  { q: "O cliente precisa instalar um aplicativo?", a: "Não. A leitura abre uma página no navegador do próprio celular." },
  {
    q: "A placa publica avaliações sozinha?",
    a: "Não. Ela só abre a página de avaliação. A avaliação existe apenas quando o cliente escreve e publica.",
  },
  {
    q: "Para onde a placa leva?",
    a: "Para o endereço que você aprovar: normalmente a página de avaliação da sua empresa. Definimos isso juntos antes da produção.",
  },
];

export default function PlacasPage() {
  return (
    <main>
      <PlaqueStory variant="page" />

      <section aria-labelledby="funcionamento-title" className="surface-mineral py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <p className="font-kicker text-accent">Como funciona</p>
            <h2 id="funcionamento-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              Duas formas de chegar ao mesmo lugar.
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7">
            <div className="border-t border-rule pt-6">
              <p className="font-label text-accent">NFC</p>
              <h3 className="font-heading mt-3 text-[length:var(--text-h3)] text-fg">Aproximar</h3>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                Um chip NFC na placa guarda o endereço. O cliente encosta o celular e a página abre, sem câmera e sem
                digitar nada.
              </p>
            </div>
            <div className="border-t border-rule pt-6">
              <p className="font-label text-accent">QR Code</p>
              <h3 className="font-heading mt-3 text-[length:var(--text-h3)] text-fg">Escanear</h3>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                Para quem não tem NFC ou prefere a câmera: o código impresso leva ao mesmo endereço.
              </p>
            </div>
            <p className="text-pretty leading-relaxed text-fg-muted sm:col-span-2">
              Abrir a página não publica nada. Nenhuma nota é preenchida automaticamente e não há promessa de avaliações
              positivas: o cliente escolhe a nota, escreve e decide se envia. A placa só facilita o caminho.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="personalizacao-title" className="surface-paper py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-6">
            <p className="font-kicker text-accent">Personalização</p>
            <h2 id="personalizacao-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              A placa é da sua empresa, não da ArpeX.
            </h2>
            <ul className="mt-10 space-y-0">
              {plaqueCustomization.map((c, i) => (
                <li key={c} className="grid grid-cols-[3rem_1fr] border-t border-rule py-5 last:border-b">
                  <span className="font-label pt-1 text-fg-muted">0{i + 1}</span>
                  <span className="text-pretty leading-relaxed text-fg">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="md:col-span-4 md:col-start-9">
            <div className="frame relative aspect-[3/4] bg-white">
              <Image src={cartaoQr} alt="Cartão com QR Code criado pela ArpeX para o Chef Bruno Sushi" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 text-[length:var(--text-small)] leading-relaxed text-fg-muted">
              Peça real com QR Code feita para um cliente (cartão do Chef Bruno Sushi). Fotos das placas instaladas serão
              publicadas assim que aprovadas.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="usos-title" className="surface-ink py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <div className="md:max-w-[70%]">
            <p className="font-kicker text-accent">Onde usar</p>
            <h2 id="usos-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              No momento em que o cliente acabou de ser atendido.
            </h2>
          </div>
          <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {plaqueUses.map((u) => (
              <li key={u.place} className="border-t border-rule pt-6">
                <p className="font-heading text-[length:var(--text-h3)] text-fg">{u.place}</p>
                <p className="mt-2 text-fg-muted">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="google-title" className="surface-mineral py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-6">
            <p className="font-kicker text-accent">Presença e reputação</p>
            <h2 id="google-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              A placa rende mais com o perfil completo.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">
              A placa faz parte da presença digital da empresa. Se você quiser, também estruturamos o Perfil da Empresa no
              Google: categoria, descrição, horário, telefone, link do site e fotos. É opcional: a placa funciona com a
              página de avaliação que você já tem.
            </p>
            <p className="mt-4 text-[length:var(--text-small)] text-fg-muted">Serviço independente, sem vínculo com o Google.</p>
            <div className="mt-8">
              <Button href={contactHref("local")} variant="solid" arrow>
                Quero revisar meu perfil
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contratar-title" className="surface-ink py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <p className="font-kicker text-accent">Como contratar</p>
            <h2 id="contratar-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              Uma conversa curta resolve.
            </h2>
            <ol className="mt-10">
              {[
                "Fale com a ArpeX pelo formulário ou pelo WhatsApp.",
                "Definimos juntos a arte e o endereço para onde a placa leva.",
                "Combinamos produção, prazo e entrega na mesma conversa.",
              ].map((t, i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] border-t border-rule py-5 last:border-b">
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
          <div className="md:col-span-6 md:col-start-7">
            <h3 className="font-kicker text-accent">Dúvidas sobre a placa</h3>
            <dl className="mt-6">
              {faq.map((f) => (
                <div key={f.q} className="border-t border-rule py-6 last:border-b">
                  <dt className="font-heading text-[1.25rem] text-fg">{f.q}</dt>
                  <dd className="mt-2 text-pretty leading-relaxed text-fg-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[length:var(--text-small)] text-fg-muted">
              A placa é uma das soluções de{" "}
              <Link href="/solucoes#presenca" className="focus-ring text-fg underline decoration-rule underline-offset-4 hover:decoration-fg">
                presença
              </Link>
              , junto com site, perfil no Google e QR Code para cartão e balcão.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
