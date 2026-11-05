"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { buildContactMessage, contactInterests, isContactInterest, type ContactInterest } from "@/data/contact";
import { getProjectBySlug } from "@/data/projects";
import { CONTACT_EMAIL, waLink } from "@/data/social-links";

const schema = z.object({
  name: z.string().trim().min(2, "Diga como podemos chamar você."),
  company: z.string().trim().max(80).optional(),
  interest: z.enum(contactInterests.map((i) => i.value) as [ContactInterest, ...ContactInterest[]], {
    message: "Escolha um assunto.",
  }),
  details: z.string().trim().max(800, "Use até 800 caracteres.").optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldCls =
  "block w-full rounded-xl border border-rule bg-transparent px-4 py-3.5 text-[16px] text-fg placeholder:text-fg-muted/70 outline-none transition-colors duration-200 focus:border-fg";

/**
 * Formulário curto: nome, assunto e, se quiser, empresa e detalhes.
 * Abre o WhatsApp com a mensagem pronta — nada é enviado sem a pessoa tocar
 * em "enviar" no próprio WhatsApp.
 */
export default function ContactForm() {
  // Lido no cliente (não useSearchParams): o formulário sai pronto no HTML
  // estático e não há troca de conteúdo que desloque a página.
  const [projectSlug, setProjectSlug] = useState<string | null>(null);
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const [opened, setOpened] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interesse");
    const slug = params.get("projeto");
    if (isContactInterest(interest)) setValue("interest", interest);
    else if (slug && getProjectBySlug(slug)) setValue("interest", "outro");
    setProjectSlug(slug);
  }, [setValue]);

  const interest = watch("interest");

  function onSubmit(data: FormValues) {
    const text = buildContactMessage({ ...data, project: project?.title });
    const url = waLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setOpened(text);
  }

  const mailBody = opened ?? "";
  // quem ainda não sabe o que precisa tem a primeira opção; quem já sabe escolhe uma das outras
  const [understand, ...specific] = contactInterests;

  const chip = (i: (typeof contactInterests)[number], className?: string) => (
    <label
      key={i.value}
      className={cn(
        "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
        interest === i.value ? "border-signal bg-signal text-ink" : "border-rule text-fg hover:border-fg",
        className
      )}
    >
      <input type="radio" value={i.value} className="sr-only" {...register("interest")} />
      {i.label}
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      <fieldset>
        <legend className="font-heading text-[length:var(--text-h3)] text-fg">Sobre o que quer conversar?</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {chip(understand, "w-full justify-center font-semibold sm:w-auto")}
          <p className="w-full pt-3 text-[length:var(--text-small)] text-fg-muted">Ou escolha uma solução específica:</p>
          {specific.map((i) => chip(i))}
        </div>
        {errors.interest && (
          <p role="alert" className="mt-3 text-sm text-[#ff8a7a]">
            {errors.interest.message}
          </p>
        )}
      </fieldset>

      {project && (
        <p className="rounded-xl border border-rule px-4 py-3 text-sm text-fg-muted">
          A mensagem vai mencionar o case <span className="text-fg">{project.title}</span>.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-semibold text-fg">
            Seu nome
          </label>
          <input id="name" autoComplete="name" className={fieldCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
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
          <input id="company" autoComplete="organization" className={fieldCls} {...register("company")} />
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

      <div className="flex flex-col items-start gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-[length:var(--text-small)] leading-relaxed text-fg-muted">
          O botão abre o WhatsApp com a mensagem pronta. Você revisa e envia de lá.
        </p>
        <button
          type="submit"
          className="focus-ring inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-signal px-7 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-signal-soft"
        >
          Abrir no WhatsApp
        </button>
      </div>

      <div role="status" aria-live="polite" className="text-sm">
        {opened && (
          <p className="text-fg-muted">
            Abrimos o WhatsApp em outra aba. Não abriu?{" "}
            <a href={waLink(opened)} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
              Tente por este link
            </a>{" "}
            ou{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(mailBody)}`}
              className="text-fg underline underline-offset-4"
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
