import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import NetworkLines from "@/components/decor/network-lines";
import { waLink } from "@/data/social-links";

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface to-deep py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 hidden opacity-60 md:block">
        <NetworkLines strength="medium" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(0,207,119,0.22), transparent 70%)" }}
      />

      <Container className="relative text-center">
        <h2 className="font-display mx-auto max-w-[22ch] text-[length:var(--text-h1)] leading-[1.15] text-ivory">
          Talvez você não precise de mais tecnologia.
        </h2>
        <p className="mx-auto mt-4 max-w-[36ch] text-[length:var(--text-body-lg)] text-ivory/75">
          Talvez precise da tecnologia certa, no lugar certo.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            href={waLink("Olá! Vim pelo site e quero mapear uma oportunidade na minha operação.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Mapear uma oportunidade
          </Button>
        </div>
      </Container>
    </section>
  );
}
