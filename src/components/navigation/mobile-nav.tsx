"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-links";
import { waLink, WHATSAPP_DISPLAY } from "@/data/social-links";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
};

export default function MobileNav({ open, onClose, returnFocusRef }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        returnFocusRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

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

  const isActive = (href: string) => pathname === href;

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 top-[72px] z-40 md:hidden ${open ? "block" : "hidden"}`}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="flex h-full flex-col justify-between bg-ink px-6 pb-10 pt-8"
      >
        <nav className="flex flex-col">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={onClose}
              className={`group flex items-baseline gap-4 border-b border-smoke py-5 font-heading text-3xl transition-colors ${
                isActive(link.href) ? "text-system" : "text-ivory hover:text-system"
              }`}
            >
              <span className="font-label text-muted">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={waLink("Olá! Vim pelo site e quero mapear a operação do meu negócio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-md border border-champagne/40 py-4 text-[15px] font-semibold text-ivory transition-colors hover:border-system/60 hover:text-system"
        >
          Mapear operação — {WHATSAPP_DISPLAY}
        </a>
      </div>
    </div>
  );
}
