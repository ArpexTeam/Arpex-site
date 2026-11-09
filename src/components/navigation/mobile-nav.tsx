"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActivePath, navLinks } from "./nav-links";
import { CONTACT_EMAIL, waLink, WHATSAPP_DISPLAY } from "@/data/social-links";
import { MailIcon, WhatsAppIcon } from "@/components/ui/contact-icons";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
};

export default function MobileNav({ open, onClose, returnFocusRef }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) returnFocusRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      // inclui o botão de fechar no cabeçalho dentro do ciclo de foco
      if (returnFocusRef.current) focusable.unshift(returnFocusRef.current);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "surface-ink fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 flex flex-col overflow-y-auto px-[var(--gutter)] pb-8 pt-6 lg:hidden",
        "transition-[opacity,clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "visible opacity-100 [clip-path:inset(0_0_0_0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
      )}
    >
      <nav aria-label="Navegação principal (celular)">
        <ul>
          {[...navLinks, { label: "Contato", href: "/contato" }].map((link, i) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.href} className="border-b border-rule">
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn("nav-link flex items-baseline gap-4 rounded-none py-4 font-heading text-[1.25rem] font-medium", active ? "text-signal" : "text-fg")}
                >
                  <span className="font-label w-6 text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-3 pt-10">
        <Link
          href="/contato"
          onClick={onClose}
          className="btn w-full"
        >
          Falar com a ArpeX
        </Link>
        <a
          href={waLink("Olá! Vim pelo site da ArpeX e quero conversar sobre o meu negócio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary w-full"
        >
          <span className="btn-label">
            <WhatsAppIcon />
            <span className="sr-only">WhatsApp: </span>
            {WHATSAPP_DISPLAY}
          </span>
        </a>
        <p className="pt-2 text-center text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="nav-link inline-flex min-h-11 items-center gap-2 px-1 text-fg-muted">
            <MailIcon />
            <span className="link-label">
              <span className="sr-only">E-mail: </span>
              {CONTACT_EMAIL}
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}
