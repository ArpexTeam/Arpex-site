import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/components/navigation/nav-links";
import { CRM_LOGIN_URL } from "@/data/crm";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink, WHATSAPP_DISPLAY } from "@/data/social-links";
import logo from "@/images/logo-oficial.png";

const linkCls = "nav-link";

export default function Footer() {
  return (
    <footer className="surface-ink border-t border-rule">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-[var(--gutter)] py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Image src={logo} alt="ArpeX Technology" width={128} height={40} style={{ width: 128, height: "auto" }} />
          <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-fg-muted">
            Estruturação digital sob medida para micro, pequenas e médias empresas: presença, atendimento e operação.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="font-label text-fg-muted">Navegação</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <Link href="/" className={linkCls}>
                Início
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contato" className={linkCls}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-label text-fg-muted">Contato</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a
                href={waLink("Olá! Vim pelo site da ArpeX e quero conversar sobre o meu negócio.")}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
          <p className="mt-8 text-sm text-fg-muted">
            Já usa o ArpeX CRM?{" "}
            <a href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="link-inline">
              Entrar
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-rule px-[var(--gutter)] py-6 text-xs text-fg-muted">
        <span>ArpeX Technology © {new Date().getFullYear()}</span>
        <span>Feito pela própria ArpeX</span>
      </div>
    </footer>
  );
}
