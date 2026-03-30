import Section from "@/components/ui/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import bigLogo from "@/images/LOGOPNG 3.png";

const waLink = `https://wa.me/5519988935849?text=${encodeURIComponent(
  "Olá! Vim pelo site e quero conversar sobre a melhor solução para a operação do meu negócio."
)}`;

export default function CtaBand() {
  return (
    <Section className="relative overflow-hidden bg-bg py-16 md:py-24">
      <Image
        src={bigLogo}
        alt=""
        aria-hidden
        priority={false}
        className="pointer-events-none absolute bottom-0 left-0 select-none w-[520px] sm:w-[720px] lg:w-[1000px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="grid items-center gap-8 text-center md:grid-cols-2 md:text-left">
            <h2 className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
            Aqui nascem soluções que
            <br />
            fazem diferença na operação.
          </h2>

          <div className="md:justify-self-end">
            <p className="max-w-[38ch] text-white/80">
              Entendemos o contexto da empresa para construir a tecnologia certa
              com clareza, robustez e objetivo.
            </p>
            <div className="mt-4">
              <Button href={waLink} className="rounded-sm px-8 font-semibold" target="_blank">
                Falar com a ArpeX
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
