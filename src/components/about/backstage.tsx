import Image from "next/image";
import cartaoQr from "@/assets/projects/chef-bruno/cartao-qr.webp";
import camadas from "@/assets/projects/carta-toricelli/sobremesa-camadas.webp";
import garrafa from "@/assets/projects/carta-toricelli/garrafa.webp";
import crmMobile from "@/assets/projects/arpex-crm/hoje-mobile.webp";
import luxConfig from "@/assets/projects/lux-bar/monte-seu-bar.webp";

/**
 * Bastidores com material real de trabalho — nada de equipe, escritório ou
 * depoimentos inventados. Fotos de pessoas entram aqui quando aprovadas.
 */
export default function Backstage({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <section aria-labelledby="bastidores-title" className="surface-mineral py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <div className="grid gap-6 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-8">
            <p className="font-kicker text-accent">Bastidores</p>
            <Title id="bastidores-title" className="font-title mt-3 text-balance text-[length:var(--text-h2)] text-fg">
              O trabalho por trás de cada entrega.
            </Title>
            <p className="mt-4 max-w-[56ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">
              Materiais reais do processo: o que vai junto da entrega, o que é renderizado e o que é testado.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-12 md:mt-14 md:gap-x-6">
          <figure className="col-span-12 sm:col-span-6 md:col-span-4">
            <div className="frame relative aspect-[3/4] bg-white">
              <Image src={cartaoQr} alt="Cartão com QR Code criado para o Chef Bruno Sushi" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 max-w-[38ch] leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Entregue junto com o site.</span> Cartão com QR Code para balcão e
              eventos do Chef Bruno Sushi.
            </figcaption>
          </figure>

          <figure className="col-span-12 sm:col-span-6 md:col-span-4 md:mt-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] bg-[#efe8db]">
              <Image src={camadas} alt="Render da sobremesa cortada em camadas, gerado pela cena 3D da carta Toricelli" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-contain p-4" />
              <Image src={garrafa} alt="" sizes="12vw" className="absolute -left-4 bottom-0 h-auto w-[38%]" />
            </div>
            <figcaption className="mt-4 max-w-[38ch] leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Renders da própria cena 3D.</span> As imagens estáticas da carta
              Toricelli saem do mesmo modelo que roda no tablet.
            </figcaption>
          </figure>

          <figure className="col-span-12 md:col-span-4">
            <div className="flex items-end gap-4">
              <div className="frame relative aspect-[390/760] w-[42%] shrink-0">
                <Image src={crmMobile} alt="Tela Hoje do ArpeX CRM no celular, com 390 pixels de largura" fill sizes="(min-width: 768px) 14vw, 40vw" className="object-cover object-top" />
              </div>
              <div className="frame relative aspect-[16/10] flex-1">
                <Image src={luxConfig} alt="Configurador Monte seu bar do site Lux Bartenders" fill sizes="(min-width: 768px) 18vw, 52vw" className="object-cover object-top" />
              </div>
            </div>
            <figcaption className="mt-4 max-w-[38ch] leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Testado em várias telas.</span> As telas são conferidas em celular,
              tablet e computador antes da entrega.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
