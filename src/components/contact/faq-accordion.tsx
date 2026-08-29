"use client";

import { useState } from "react";
import { faq } from "@/data/faq";

export default function FaqAccordion() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  return (
    <div className="border-t border-smoke">
      {faq.map((item, i) => {
        const isOpen = open.has(i);
        const contentId = `faq-content-${i}`;

        return (
          <div key={item.q} className="border-b border-smoke py-6">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(i)}
              className="focus-ring flex w-full items-center justify-between gap-6 text-left"
            >
              <span className="font-heading text-lg text-ivory">{item.q}</span>
              <span
                aria-hidden
                className={`shrink-0 text-2xl leading-none transition-transform ${
                  isOpen ? "rotate-45 text-system" : "text-muted"
                }`}
              >
                +
              </span>
            </button>

            <div
              id={contentId}
              role="region"
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[64ch] leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
