import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { H1, H2, Label } from "@/components/ui/heading";
import ContactForm from "@/components/contact/contact-form";
import FaqAccordion from "@/components/contact/faq-accordion";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte o momento da sua empresa e estruturamos a conversa certa. Fale com a ArpeX por WhatsApp ou e-mail.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-24 md:py-32">
        <Container>
          <Label>Contato</Label>
          <H1 className="mt-6 max-w-[26ch]">
            Conte o momento do seu negócio, e estruturamos a conversa certa.
          </H1>
          <p className="mt-6 max-w-[52ch] text-[length:var(--text-body-lg)] leading-relaxed text-muted">
            Diagnóstico claro, escopo objetivo e execução forte. Esse é o começo de um
            projeto com padrão ArpeX.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-muted">
            <li>WhatsApp — {WHATSAPP_DISPLAY}</li>
            <li>E-mail — {CONTACT_EMAIL}</li>
          </ul>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container className="max-w-[900px]">
          <div className="rounded-xl border border-smoke bg-graphite p-8 md:p-14">
            <ContactForm />
          </div>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container className="max-w-[900px]">
          <H2 className="mb-8">Dúvidas frequentes</H2>
          <FaqAccordion />
        </Container>
      </section>
    </main>
  );
}
