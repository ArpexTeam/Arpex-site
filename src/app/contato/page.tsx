import type { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";
import FaqAccordion from "@/components/contact/faq-accordion";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/contact-icons";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink, WHATSAPP_DISPLAY } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a ArpeX sobre o seu negócio: presença digital, atendimento, automação de tarefas ou um sistema sob medida. Também para quem ainda não sabe por onde começar. WhatsApp e e-mail.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="surface-ink">
      <section className="pt-[calc(var(--header-height)+72px)] pb-24 md:pt-[calc(var(--header-height)+112px)] md:pb-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-x-6">
          {/* ordem no celular: título → formulário → canais diretos */}
          <div className="lg:col-span-5 lg:row-start-1">
            <p className="font-kicker text-accent">Contato</p>
            <h1 className="font-display mt-4 max-w-[14ch] text-balance text-[length:var(--text-display)] text-fg">
              Vamos falar do seu negócio.
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">
              Um site, uma placa ou a rotina que está pesando. Duas linhas bastam para começar.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="rounded-[var(--radius-frame)] border border-rule bg-ink-2 p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
          <div className="lg:col-span-5 lg:row-start-2">
            <dl className="space-y-0">
              <div className="grid grid-cols-[1.5rem_1fr] items-center gap-4 border-t border-rule py-4">
                <dt className="text-fg-muted">
                  <WhatsAppIcon className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </dt>
                <dd>
                  <a
                    href={waLink("Olá! Vim pelo site da ArpeX e quero conversar sobre o meu negócio.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-inline"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[1.5rem_1fr] items-center gap-4 border-t border-rule py-4">
                <dt className="text-fg-muted">
                  <MailIcon className="h-5 w-5" />
                  <span className="sr-only">E-mail</span>
                </dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link-inline break-all">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[1.5rem_1fr] items-center gap-4 border-y border-rule py-4">
                <dt className="text-fg-muted">
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </dt>
                <dd>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-inline">
                    {INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </section>

      <section aria-labelledby="faq-title" className="surface-paper py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="faq-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg md:col-span-4">
            Dúvidas frequentes
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </main>
  );
}
