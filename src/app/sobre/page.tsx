import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Method from "@/components/method/method";
import { Button } from "@/components/ui/button";
import { contactHref } from "@/data/contact";
import cartaoQr from "@/assets/projects/chef-bruno/cartao-qr.webp";
import camadas from "@/assets/projects/carta-toricelli/sobremesa-camadas.webp";
import garrafa from "@/assets/projects/carta-toricelli/garrafa.webp";
import crmMobile from "@/assets/projects/arpex-crm/hoje-mobile.webp";
import luxConfig from "@/assets/projects/lux-bar/monte-seu-bar.webp";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A ArpeX conhece a rotina da empresa, identifica o que precisa melhorar e desenvolve a solução adequada ao negócio, de um site a um sistema sob medida.",
  alternates: { canonical: "/sobre" },
};

/** Trabalhos relacionados: o nome do projeto é o link; a legenda diz o que vale observar. */
const related = [
  { name: "Chef Bruno Sushi", href: "/projetos/chef-bruno", look: "o painel em que o próprio cliente atualiza cardápio, eventos e dúvidas." },
  { name: "Lux Bartenders", href: "/projetos/lux-bar", look: "o configurador que transforma a visita ao site em briefing para a equipe." },
  { name: "Flor de Maria VIP", href: "/projetos/flor-de-maria-vip", look: "o login, o painel administrativo e os lembretes pelo WhatsApp." },
  { name: "Carta de vinhos 3D", href: "/projetos/carta-toricelli", look: "o 3D em tempo real no navegador e o funcionamento sem internet." },
  { name: "ArpeX CRM", href: "/ecossistema", look: "o acompanhamento comercial, do contato recebido ao próximo retorno." },
];

/**
 * Abertura com material real de bastidor, o método uma vez (ligado a uma tela
 * testada e a uma peça entregue), uma seleção curta de trabalhos e uma única
 * ação de contato. Nada de equipe, escritório ou depoimentos inventados.
 */
export default function SobrePage() {
  return (
    <main>
      <section className="surface-ink pb-16 pt-[calc(var(--header-height)+56px)] md:pb-20 md:pt-[calc(var(--header-height)+88px)]">
        <div className="mx-auto grid w-full max-w-[1440px] items-end gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-7">
            <p className="font-kicker text-accent">Sobre a ArpeX</p>
            <h1 className="font-display mt-4 max-w-[16ch] text-balance text-[length:var(--text-display)] text-fg">
              Entendemos o negócio antes de construir.
            </h1>
            <p className="mt-5 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">
              Conhecemos a rotina da empresa, definimos o que melhorar primeiro e construímos do tamanho da necessidade.
            </p>
          </div>
          <figure className="md:col-span-4 md:col-start-9">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-frame)] bg-[#efe8db] md:aspect-[4/5]">
              <Image
                src={camadas}
                alt="Render da sobremesa cortada em camadas, gerado pela cena 3D da carta Toricelli"
                fill
                priority
                sizes="(min-width: 768px) 30vw, 92vw"
                className="object-contain p-4"
              />
              <Image src={garrafa} alt="" sizes="(min-width: 768px) 12vw, 26vw" className="absolute -left-4 bottom-0 h-auto w-[26%] md:w-[38%]" />
            </div>
            <figcaption className="mt-3 max-w-[40ch] text-[length:var(--text-small)] leading-relaxed text-fg-muted">
              Render feito para a carta Toricelli, a partir da mesma cena 3D que roda no tablet.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* "Como trabalhamos" uma vez, ligado a material concreto */}
      <Method surface="surface-paper">
        <div className="mt-14 grid gap-10 border-t border-rule pt-10 md:mt-20 md:grid-cols-12 md:gap-x-6">
          <figure className="md:col-span-6">
            <div className="flex items-end gap-4">
              <div className="frame relative aspect-[390/760] w-[34%] shrink-0">
                <Image src={crmMobile} alt="Tela Hoje do ArpeX CRM no celular, com 390 pixels de largura" fill sizes="(min-width: 768px) 14vw, 32vw" className="object-cover object-top" />
              </div>
              <div className="frame relative aspect-[16/10] flex-1">
                <Image src={luxConfig} alt="Configurador Monte seu bar do site Lux Bartenders" fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover object-top" />
              </div>
            </div>
            <figcaption className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-fg-muted">
              <span className="font-medium text-fg">Construir e validar.</span> As telas são conferidas em celular, tablet e
              computador antes da entrega.
            </figcaption>
          </figure>
          <figure className="md:col-span-4 md:col-start-9">
            <div className="frame relative mx-auto aspect-[3/4] max-w-[320px] bg-white md:mx-0">
              <Image src={cartaoQr} alt="Cartão com QR Code criado para o Chef Bruno Sushi" fill sizes="(min-width: 768px) 24vw, 80vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 max-w-[40ch] text-pretty leading-relaxed text-fg-muted">
              <span className="font-medium text-fg">Entregue junto com o site.</span> Cartão com QR Code para o balcão e os
              eventos do Chef Bruno Sushi.
            </figcaption>
          </figure>
        </div>
      </Method>

      <section aria-labelledby="relacionados-title" className="surface-ink py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="relacionados-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-4">
            Onde ver na prática
          </h2>
          <ul className="border-t border-rule md:col-span-8">
            {related.map((r) => (
              <li key={r.name} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-6">
                <Link href={r.href} className="link link-inline font-heading w-fit text-[length:var(--text-h3)]">
                  {r.name}
                </Link>
                <span className="text-pretty text-fg-muted">Observe {r.look}</span>
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
          <Button href={contactHref("entender")}>Falar com a ArpeX</Button>
        </div>
      </section>
    </main>
  );
}
