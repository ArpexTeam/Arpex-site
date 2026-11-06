"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileNav from "@/components/navigation/mobile-nav";
import { isActivePath, navLinks } from "@/components/navigation/nav-links";
import TransitionLink from "@/components/motion/transition-link";
import { cn } from "@/lib/cn";
import logo from "@/images/logo-oficial.png";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* O menu mobile fica fora do <header>, que é fixed e tem transições
          próprias; o painel não depende do containing block do cabeçalho. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          compact || open
            ? "border-b border-white/10 bg-ink/95"
            : "border-b border-transparent bg-transparent",
          // case de paleta clara: o topo é claro, então o cabeçalho já entra sólido
          // para o logo e o menu continuarem legíveis
          "[html:has(main[data-top=light])_&]:border-white/10 [html:has(main[data-top=light])_&]:bg-ink/95"
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[1440px] items-center justify-between gap-6 px-[var(--gutter)]">
          <TransitionLink href="/" className="focus-ring -m-2 flex items-center p-2" aria-label="ArpeX Technology — início">
            <Image
              src={logo}
              alt=""
              width={112}
              height={35}
              priority
              style={{ width: compact ? 100 : 112, height: "auto" }}
              className="transition-[width] duration-300"
            />
          </TransitionLink>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <TransitionLink
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="nav-link relative inline-flex h-10 items-center px-4 text-[14px] font-medium"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <TransitionLink
              href="/contato"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Conversar com a ArpeX
            </TransitionLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="btn btn-secondary h-11 min-h-11 w-11 px-0 lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-200",
                    open && "translate-y-[5.25px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-200",
                    open && "-translate-y-[5.25px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} returnFocusRef={toggleRef} />
    </>
  );
}
