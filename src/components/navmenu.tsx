"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import logo from "@/images/logo-oficial.png";
import Image from "next/image";


export default function NavMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "HOME", href: "/" },
    { label: "SERVIÇOS", href: "/servicos" },
    { label: "PROJETOS", href: "/projetos" },
    { label: "SOBRE NÓS", href: "/sobre" },
    { label: "CONTATO", href: "/contatos" },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => { window.removeEventListener("keydown", onKey); root.style.overflow = ""; };
  }, [open]);

  // Número exibido e número E.164 (usado no wa.me) — ambos alinhados
  const waDisplay = "(19) 98893-5849";
  const waNumberE164 = "5519988935849";
  const waText = encodeURIComponent("Olá! Vim pelo site e gostaria de um orçamento.");
  const waLink = `https://wa.me/${waNumberE164}?text=${waText}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/95 backdrop-blur">
      <Container className="h-18 flex justify-around items-center gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={logo} alt="ArpeX Technology" width={120} height={28} priority />
        </div>

        {/* Menu central (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-[12px] font-semibold uppercase tracking-wide">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${isActive(l.href) ? "text-[color:var(--color-brand)]" : "text-white/85 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp à direita (desktop) */}
        <div className="hidden md:flex items-center justify-end">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-white hover:bg-[color:var(--color-brand)]/10"
          >
<svg fill="white" className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>            {waDisplay}
          </a>
        </div>

        {/* Botão hambúrguer (mobile) */}
        <div className="flex md:hidden items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-brand/70"
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </Container>

      <div className="h-[2px] w-full bg-white/[0.05]" />

      {/* ===== Mobile Drawer ===== */}
      <div id="mobile-menu" className={`md:hidden ${open ? "fixed" : "hidden"} inset-0 z-40 top-18`}>
        <div
          className="absolute right-0 h-auto w-full bg-black border-l border-white/10 p-6 flex flex-col gap-6"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-2 transition ${isActive(l.href) ? "text-[color:var(--color-brand)]" : "text-white/90 hover:text-white"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-white/10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[14px] text-white bg-white/5 hover:bg-white/10"
            >
<svg className="w-7" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>              {waDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
