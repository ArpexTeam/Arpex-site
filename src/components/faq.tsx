"use client";

import { useState } from "react";
import Section from "@/components/ui/section";
import { H2 } from "@/components/ui/heading";
import { faq } from "@/content/faq";

export default function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0, 3]));

  const toggle = (i: number) =>
    setOpen((s) => {
      const ns = new Set(s);
      if (ns.has(i)) {
        ns.delete(i);
      } else {
        ns.add(i);
      }
      return ns;
    });

  return (
    <Section className="relative overflow-hidden bg-bg py-18 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-surface)] to-[color:var(--color-bg)]" />
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <H2 className="mb-6 text-white">Duvidas frequentes</H2>

        <div className="rounded-2xl">
          {faq.map((f, i) => {
            const isOpen = open.has(i);
            const contentId = `faq-content-${i}`;

            return (
              <div key={f.q} className="px-5 py-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(i)}
                  className="w-full cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between gap-6">
                    <span className="cursor-pointer text-left font-semibold text-white">{f.q}</span>

                    <span
                      aria-hidden
                      className={`inline-block text-3xl leading-none transition-all duration-300 ${
                        isOpen ? "rotate-45 text-brand" : "rotate-0 text-white/80"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className={`mt-2 -ml-5 mr-14 h-px bg-[linear-gradient(to_right,currentColor,transparent)] transition-colors duration-300 ${
                    isOpen ? "text-brand" : "text-white/70"
                  }`}
                />

                <div
                  id={contentId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`mt-3 grid transition-[grid-template-rows,opacity,transform] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="leading-relaxed text-white/70">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
