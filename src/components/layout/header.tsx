"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/navigation/mobile-nav";
import { navLinks } from "@/components/navigation/nav-links";
import { waLink, WHATSAPP_DISPLAY } from "@/data/social-links";
import logo from "@/images/logo-oficial.png";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* MobileNav vive fora do <header> de propósito: o backdrop-blur do
          header cria um containing block para descendentes fixed, o que
          quebrava o inset-0/top-[72px] do menu mobile. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-smoke bg-black/95 backdrop-blur">
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image src={logo} alt="ArpeX Technology" width={124} height={38} priority />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive(link.href) ? "text-system" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href={waLink("Olá! Vim pelo site e quero mapear a operação do meu negócio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-ivory/80 transition-colors hover:text-system"
            >
              <svg fill="currentColor" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
              </svg>
              {WHATSAPP_DISPLAY}
            </a>

            <Button
              href={waLink("Olá! Vim pelo site e quero mapear a operação do meu negócio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[13px]"
            >
              Mapear operação
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-ivory transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-6 bg-ivory transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-6 bg-ivory transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </Container>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} returnFocusRef={toggleRef} />
    </>
  );
}
