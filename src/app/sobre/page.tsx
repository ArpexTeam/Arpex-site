// app/sobre/page.tsx
import Image from "next/image";
import Section from "@/components/ui/section";
import { H1, H2, Sub } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import signage from "@/images/signage.jpg"; // troque pela sua imagem
import mosaic from "@/images/Formas.png";
import arpexFachada from "@/images/aboutusarpex 1.png";

export default function AboutPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-surface to-bg">
        <div className="mx-auto flex justify-between w-full max-w-[1200px] items-center md:gap-10 px-4 mt-10 md:mt-0">
          <div className="w-[400px] md:w-auto">
            <p className="mb-4 text-xs uppercase tracking-widest text-white">
              Agência de desenvolvimento de sites
            </p>
            <H1 className="text-white">
              Muito mais do que uma
              <br /> agência!
            </H1>
          </div>

          {/* mosaico verde à direita */}
          <div className="relative h-[300px] w-[400px] md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px]">
            <Image src={mosaic} alt="Formas" className="h-full w-auto"/>
          </div>
        </div>
      </Section>

      {/* SOBRE + FOTO */}
      <Section className="relative overflow-hidden py-22 md:py-44 bg-gradient-to-r from-[#1A1A1A] to-black">
        {/* fundo com gradiente radial sutil como no mock */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 70% 20%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(180deg, #0f0f0f, #0b0b0b)",
          }}
        />

        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-10 px-4 md:grid-cols-2">
          {/* texto à esquerda */}
          <div className="max-w-[56ch]">
            <H2 className="text-white">Um pouco sobre nós</H2>

            <p className="mt-4 text-white/80">
              Bem-vindo à Arpex Technology! Somos uma equipe apaixonada por
              inovação e excelência, dedicada a transformar ideias em sites
              funcionais e esteticamente impactantes.
            </p>
            <p className="mt-4 text-white/80">
              Combinamos nossa expertise técnica com atenção cuidadosa às
              necessidades de cada cliente, criando soluções que superam
              expectativas e refletem a essência de cada marca.
            </p>
            <p className="mt-4 text-white/80">
              Valorizamos a confiança e a proximidade com nossos clientes,
              trabalhando lado a lado para garantir que cada detalhe do projeto
              seja exatamente como você imagina.
            </p>

            <div className="mt-6">
<Button
  href={`https://wa.me/5519988935849?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`}
  className="px-8 font-semibold rounded-sm"
  target="_blank"
>
  Faça um orçamento
</Button>
            </div>
          </div>

          {/* imagem à direita */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-white/[0.06]">
              <Image
                src={arpexFachada}
                alt="Placa externa com a marca ArpeX"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 560px, 92vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
