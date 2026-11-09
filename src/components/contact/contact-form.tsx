"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { buildContactMessage, contactInterests, isContactInterest, type ContactInterest } from "@/data/contact";
import { getProjectBySlug } from "@/data/projects";
import { CONTACT_EMAIL, waLink } from "@/data/social-links";
import { WhatsAppIcon } from "@/components/ui/contact-icons";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(2, "Diga como podemos chamar você."),
  company: z.string().trim().max(80).optional(),
  interest: z.enum(contactInterests.map((i) => i.value) as [ContactInterest, ...ContactInterest[]], {
    message: "Escolha uma solução.",
  }),
  details: z.string().trim().max(800, "Use até 800 caracteres.").optional(),
});

type FormValues = z.infer<typeof schema>;
type Mode = "entender" | "especifico";

// folga acima (cabeçalho) e abaixo (teclado virtual) quando o campo recebe foco
const fieldCls = "field scroll-mt-28 scroll-mb-6";

/**
 * Formulário curto: por onde começar, nome e, se quiser, empresa e detalhes.
 * "Quero entender por onde começar" já vem marcado; quem sabe o que precisa
 * escolhe a solução numa lista compacta, que só aparece nesse caso. O
 * interesse que chega pelo link de origem (?interesse=placas) já vem
 * escolhido. Abre o WhatsApp com a mensagem pronta — nada é enviado sem a
 * pessoa tocar em "enviar" no próprio WhatsApp.
 */
export default function ContactForm() {
  // Lido no cliente (não useSearchParams): o formulário sai pronto no HTML
  // estático e não há troca de conteúdo que desloque a página.
  const [projectSlug, setProjectSlug] = useState<string | null>(null);
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const [opened, setOpened] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("entender");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "entender" },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interesse");
    const slug = params.get("projeto");
    if (isContactInterest(interest) && interest !== "entender") {
      setMode("especifico");
      setValue("interest", interest);
    } else if (slug && getProjectBySlug(slug)) {
      setMode("especifico");
      setValue("interest", "outro");
    }
    setProjectSlug(slug);
  }, [setValue]);

  function chooseMode(next: Mode) {
    setMode(next);
    if (next === "entender") setValue("interest", "entender");
    else if (getValues("interest") === "entender") setValue("interest", "" as ContactInterest);
  }

  function onSubmit(data: FormValues) {
    const text = buildContactMessage({ ...data, project: project?.title });
    const url = waLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setOpened(text);
  }

  const mailBody = opened ?? "";
  const [understand, ...specific] = contactInterests;

  // disponível: anel vazio · selecionado: preenchido, com ✓ · foco: contorno verde
  const option = (value: Mode, label: React.ReactNode, className?: string) => (
    <label className={cn("choice", className)}>
      <input type="radio" name="start-mode" value={value} checked={mode === value} onChange={() => chooseMode(value)} className="sr-only" />
      <span aria-hidden className="choice-mark">
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label}
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8 sm:space-y-10">
      <fieldset>
        <legend className="font-heading text-[length:var(--text-h3)] text-fg">Por onde quer começar?</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1.4fr_1fr]">
          {option("entender", <span className="font-semibold">{understand.label}</span>, "min-h-12")}
          {option("especifico", "Já sei o que preciso", "min-h-12")}
        </div>

        {mode === "especifico" && (
          <div className="mt-4 motion-safe:animate-[panel-in_320ms_cubic-bezier(0.22,1,0.36,1)]">
            <label htmlFor="interest" className="mb-2 block font-semibold text-fg">
              Qual solução?
            </label>
            <div className="relative">
              <select
                id="interest"
                className={cn(fieldCls, "appearance-none pr-11")}
                aria-invalid={!!errors.interest}
                aria-describedby={errors.interest ? "interest-error" : undefined}
                {...register("interest")}
              >
                <option value="" disabled>
                  Escolha uma opção
                </option>
                {specific.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
              <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {errors.interest && (
              <p id="interest-error" role="alert" className="mt-2 text-sm text-[#ff8a7a]">
                {errors.interest.message}
              </p>
            )}
          </div>
        )}
      </fieldset>

      {project && (
        <p className="rounded-[var(--radius-control)] border border-rule px-4 py-3 text-sm text-fg-muted">
          A mensagem vai mencionar o case <span className="text-fg">{project.title}</span>.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-semibold text-fg">
            Seu nome
          </label>
          <input
            id="name"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            className={fieldCls}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-[#ff8a7a]">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block font-semibold text-fg">
            Empresa <span className="font-normal text-fg-muted">(opcional)</span>
          </label>
          <input id="company" autoComplete="organization" enterKeyHint="next" className={fieldCls} {...register("company")} />
        </div>
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block font-semibold text-fg">
          O que está acontecendo na sua empresa? <span className="font-normal text-fg-muted">(opcional)</span>
        </label>
        <textarea
          id="details"
          rows={4}
          placeholder="Ex.: os pedidos chegam pelo WhatsApp e está difícil acompanhar todos."
          className={cn(fieldCls, "resize-y")}
          aria-invalid={!!errors.details}
          {...register("details")}
        />
        {errors.details && <p className="mt-2 text-sm text-[#ff8a7a]">{errors.details.message}</p>}
      </div>

      <div className="flex flex-col items-stretch gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
        <p className="max-w-[40ch] text-[length:var(--text-small)] leading-relaxed text-fg-muted">
          O botão abre o WhatsApp com a mensagem pronta. Você revisa e envia de lá.
        </p>
        <Button type="submit" className="shrink-0 whitespace-nowrap">
          <WhatsAppIcon />
          Abrir no WhatsApp
        </Button>
      </div>

      <div role="status" aria-live="polite" className="text-sm">
        {opened && (
          <p className="text-fg-muted">
            Abrimos o WhatsApp em outra aba. Não abriu?{" "}
            <a href={waLink(opened)} target="_blank" rel="noopener noreferrer" className="link link-inline">
              Tente por este link
            </a>{" "}
            ou{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(mailBody)}`}
              className="link link-inline"
            >
              envie por e-mail
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
