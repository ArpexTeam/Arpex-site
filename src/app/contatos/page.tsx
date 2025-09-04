"use client";

import { useState } from "react";
import Section from "@/components/ui/section";
import { H2 } from "@/components/ui/heading";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 5.svg";

const field =
  "h-10 w-full rounded-sm border-0 border-b border-b-white/40 bg-[#161616] px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand/70";

// CONFIG — ajuste se precisar
const WA_NUMBER_E164 = "5519989812774"; // sem +, sem espaços
const MAIL_TO = "contatoarpextech@gmail.com.br";
const MAIL_SUBJECT = "Novo contato do site";

export default function ContatoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");

    const texto =
      `Olá! Vim pelo site e gostaria de um orçamento.\n\n` +
      `Nome: ${get("nome")} ${get("sobrenome")}\n` +
      `E-mail: ${get("email")}\n` +
      `Telefone: ${get("telefone")}\n` +
      `Necessidade: ${get("necessidade")}\n` +
      `Observações: ${get("observacoes")}`;

    const waUrl = `https://wa.me/${WA_NUMBER_E164}?text=${encodeURIComponent(texto)}`;

    try {
      // tenta abrir em nova aba
      const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
      // se bloqueado, abre na mesma aba
      if (!opened) window.location.href = waUrl;

      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      // fallback: mailto
      const mailto =
        `mailto:${MAIL_TO}` +
        `?subject=${encodeURIComponent(MAIL_SUBJECT)}` +
        `&body=${encodeURIComponent(texto)}`;
      window.location.href = mailto;
      setOk(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-dvh bg-gradient-to-r from-[#1A1A1A] to-black pt-12 overflow-hidden">
      <Image src={bigLogo} alt="Arpex BigLogo" className="absolute max-w-[1000px]" />
      <Section className="relative py-16">
        <div className="mx-auto w-full max-w-[900px] px-4">
          <div className="text-center mb-6">
            <H2 className="text-white">
              Preencha seus dados, que
              <br /> retornaremos em breve!
            </H2>
          </div>

          {/* CARD */}
          <div className="rounded-xl bg-black/60 py-14 px-10 mt-18 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Nome / Sobrenome */}
              <div>
                <label className="mb-1 block text-xs text-white/70">Nome</label>
                <input name="nome" required placeholder="Seu nome" className={field} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Sobrenome</label>
                <input name="sobrenome" required placeholder="Seu sobrenome" className={field} />
              </div>

              {/* Email / Telefone */}
              <div>
                <label className="mb-1 block text-xs text-white/70">E-mail</label>
                <input type="email" name="email" required placeholder="voce@empresa.com" className={field} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Telefone com DDD</label>
                <input name="telefone" placeholder="(11) 90000-0000" className={field} />
              </div>

              {/* Select / Observações */}
              <div className="relative">
                <label className="mb-1 block text-xs text-white/70">Você precisa de...</label>
                <select name="necessidade" className={`${field} appearance-none pr-8`} defaultValue="">
                  <option value="" disabled>
                    Selecionar
                  </option>
                  <option value="website">Website institucional</option>
                  <option value="loja">Loja virtual</option>
                  <option value="landing">Landing page</option>
                  <option value="plataforma">Plataforma / sistema</option>
                  <option value="outro">Outro</option>
                </select>
                <span
                  className="pointer-events-none absolute right-3 top-9 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-white/60 md:top-[42px]"
                  aria-hidden
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Observações</label>
                <input name="observacoes" placeholder="Conte um pouco do seu projeto" className={field} />
              </div>

              {/* Botão */}
              <div className="md:col-span-2 mt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center bg-brand text-sm text-white hover:opacity-90 disabled:opacity-60 px-12 font-semibold rounded-sm"
                >
                  {loading ? "Enviando..." : "Enviar via WhatsApp"}
                </button>
              </div>

              {/* feedback */}
              <div className="md:col-span-2 text-center text-sm" aria-live="polite">
                {ok === true && (
                  <span className="text-emerald-400">
                    Abrimos sua mensagem no WhatsApp (ou e-mail). Obrigado!
                  </span>
                )}
                {ok === false && <span className="text-red-400">Não foi possível enviar agora. Tente novamente.</span>}
              </div>
            </form>
          </div>

          {/* Rodapé da seção */}
          <div className="mt-18 mb-18 text-center text-white text-xl">
            <p className="font-semibold">Tudo pronto para começar?</p>
            <p className="font-semibold">Seu projeto está prestes a ganhar forma!</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
