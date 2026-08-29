import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { H1, Label, Sub } from "@/components/ui/heading";
import CrmShowcase from "@/components/ecosystem/crm-showcase";

export const metadata: Metadata = {
  title: "Ecossistema ArpeX",
  description:
    "Conheça o ArpeX CRM, produto próprio da ArpeX para pipeline, leads, cadência e follow-up em um único fluxo.",
  alternates: { canonical: "/ecossistema" },
};

export default function EcossistemaPage() {
  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-24 md:py-32">
        <Container>
          <Label>Ecossistema ArpeX</Label>
          <H1 className="mt-6 max-w-[22ch]">Produtos que a ArpeX constrói para si mesma.</H1>
          <Sub className="mt-6 max-w-[56ch]">
            Antes de vender sistema para o cliente, a ArpeX usa sistema. O ArpeX CRM é
            o primeiro produto do nosso próprio ecossistema.
          </Sub>
        </Container>
      </section>

      <CrmShowcase />
    </main>
  );
}
