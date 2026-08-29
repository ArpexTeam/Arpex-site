import Link from "next/link";
import Container from "@/components/ui/container";
import { H2, Label, Sub } from "@/components/ui/heading";
import { services } from "@/data/services";

export default function Solutions() {
  return (
    <section className="bg-graphite py-28 md:py-36">
      <Container>
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[52ch]">
            <Label>Soluções</Label>
            <H2 className="mt-4">Quatro frentes. Um sistema só.</H2>
          </div>
          <Sub className="max-w-[40ch]">
            Não vendemos serviços isolados — cada frente existe para se conectar às
            outras dentro da operação do cliente.
          </Sub>
        </div>

        <ul className="border-t border-smoke">
          {services.map((service) => (
            <li key={service.slug} className="group border-b border-smoke py-10 md:py-12">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr_1.2fr] md:items-baseline md:gap-10">
                <span className="font-label text-muted">{service.index}</span>

                <h3 className="font-heading text-2xl text-ivory transition-colors group-hover:text-system md:text-3xl">
                  {service.name}
                </h3>

                <div className="max-w-[56ch]">
                  <p className="text-[length:var(--text-body-lg)] leading-relaxed text-ivory">
                    {service.headline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/solucoes" className="text-sm font-semibold text-ivory transition-colors hover:text-system">
            Ver soluções em detalhe →
          </Link>
        </div>
      </Container>
    </section>
  );
}
