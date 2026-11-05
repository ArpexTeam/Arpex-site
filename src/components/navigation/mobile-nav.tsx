"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActivePath, navLinks } from "./nav-links";
import { CONTACT_EMAIL, waLink, WHATSAPP_DISPLAY } from "@/data/social-links";

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
                  className={cn(
                    "focus-ring flex items-baseline gap-4 py-4 font-display text-[2rem] transition-colors",
                    active ? "text-signal" : "text-fg"
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
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
          className="focus-ring flex min-h-12 items-center justify-center rounded-full bg-signal text-[15px] font-semibold text-ink"
        >
          Conversar com a ArpeX
        </Link>
        <a
          href={waLink("Olá! Vim pelo site da ArpeX e quero conversar sobre o meu negócio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex min-h-12 items-center justify-center rounded-full border border-rule text-[15px] font-semibold text-fg"
        >
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
        <p className="pt-2 text-center text-sm text-fg-muted">{CONTACT_EMAIL}</p>
      </div>
    </div>
  );
}
