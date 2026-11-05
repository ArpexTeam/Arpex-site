# Refatoração do site institucional — "ArpeX em ação"

> Atualizado depois pela rodada de posicionamento, conteúdo e tipografia: [../ajuste-posicionamento/README.md](../ajuste-posicionamento/README.md). Onde houver divergência (fontes, ordem da home, textos, cases da home), vale o documento novo.

Branch: `feat/crm-sticky-story`, enviada para a `master` em 05/11/2026 junto com o ajuste de posicionamento.
Stack mantida: Next.js 16.1 (App Router, Turbopack), React 19, Tailwind 4, GSAP 3.15 + `@gsap/react`.
Única dependência nova: `three@0.186.1` (+ `@types/three`), carregada sob demanda.

## 1. Ponto de partida (inventário)

- Rotas: `/`, `/solucoes`, `/projetos`, `/projetos/[slug]` (6 slugs), `/ecossistema`, `/sobre`, `/contato`; redirects `/contatos` e `/servicos`.
- Home anterior: hero com foto de banco de imagem, manifesto, "Fragment Flow" e "Pipeline Vivo" (cenas sticky abstratas), quatro frentes em lista, quatro projetos sendo três "Em curadoria".
- Assets reais no repositório: duas capturas (Honoratto, Flor de Maria), logo PNG e uma foto de letreiro que parece mockup.
- Assets reais encontrados fora do repositório, nos projetos da própria ArpeX:
  - sites publicados do Chef Bruno, da Lux, da Toricelli e do Honoratto (capturas feitas agora);
  - Chef Bruno: manual de entrega, checklist de Google/SEO e cartão com QR Code;
  - Lux: recortes dos drinks;
  - Toricelli: renders das garrafas e das sobremesas;
  - ArpeX CRM: capturas de QA com dados de demonstração.

## 2. Direção

- **Superfícies**: tinta (`ink #0b0e0c`) para os momentos imersivos e mineral/papel (`#e7e3da`/`#f2efe8`) para os trechos de leitura. Cada capítulo de projeto usa a paleta do próprio projeto. Os tokens ficam em `src/styles/tokens.css`. Cada superfície define `--fg/--fg-muted/--rule/--accent`, expostos como utilitários Tailwind (`text-fg`, `border-rule`…).
- **Verde**: `#00CF77` como preenchimento e sobre tinta (texto ink sobre verde: 9,4:1). Sobre fundo claro, o texto usa `signal-ink #006B3E` (5,2:1).
- **Tipografia**: Bricolage Grotesque nos títulos, com os eixos `opsz` e `wdth` (o encerramento anima `wdth` e o peso). Geist na leitura e Geist Mono só nos rótulos.
- **Motivo recorrente**: a "janela", uma moldura com bisel e luz de topo (`.frame`). Ela aparece na abertura, nos capítulos, nas demonstrações e, vazia, no encerramento.
- **Sem**: grade uniforme de cards, ícones genéricos, números inventados, neon/HUD e cursor customizado. O cursor "Abrir case" anterior escondia o cursor nativo e foi removido.

## 3. Storyboard da home

| # | Cena | O que acontece | Fora do modo completo* |
|---|---|---|---|
| A | Cabeçalho | Transparente sobre a abertura; compacta e ganha superfície ao rolar. Menu mobile em tela cheia, com foco preso e Esc. | igual |
| B | Abertura (`205svh`, sticky) | Três telas reais em 3D (Toricelli à frente, Chef Bruno e Lux atrás) com bisel metálico, reflexo de ambiente e brilho de vidro. Ao rolar ~1 viewport, a tela da frente se alinha e expande; a legenda "01 — Carta de vinhos 3D" e "Abrir o case" entram. | celular: texto + uma superfície (captura mobile) em perspectiva CSS |
| C | Projetos selecionados | 4 capítulos, cada um com cor e enquadramento próprios: tablet + recortes (Toricelli), cinema + celular + cartão QR (Chef Bruno), navegador + drinks flutuando (Lux), página inteira rolando dentro do quadro (Honoratto). Reenquadramento por escala, parallax de recortes e título revelado por máscara. | fluxo normal |
| D | Placas (`300svh`, sticky) | Placa de acrílico (sem base) entra pela borda, gira, recebe o celular (anéis NFC), a tela abre a página de avaliação de **demonstração** e o QR acende como alternativa. Os 3 passos em HTML avançam com a cena. | poster estático da composição final + passos |
| E | Soluções | Abas (setas/Home/End/toque) trocam a demonstração: página real rolando, tela do CRM com foco, fluxo de lembretes da Flor de Maria VIP e checklist real de entrega do Chef Bruno. | igual |
| F | CRM (`270svh`, sticky) | Pilha em perspectiva CSS de telas reais: Hoje → Modo foco → Pipeline, aproximando o trecho de cada ação. | sequência vertical (capturas mobile no celular) |
| G | Método, bastidores, encerramento | Linha de progresso dos 4 passos; materiais reais do processo; "Vamos construir seu próximo passo?" responde ao ponteiro (eixos variáveis). | igual (sem ponteiro: responde à rolagem) |

\* O modo completo exige `(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)`. A mesma condição está em `src/styles/motion.css` e em `FULL_SCENE_QUERY` (`src/lib/motion/queries.ts`); se uma mudar, a outra precisa mudar junto.

## 4. Sistema de movimento

| Momento | Movimento | Duração |
|---|---|---|
| Abertura | linhas do título por máscara, telas entram com stagger; depois scrub da expansão | 0,8–0,9 s; scrub |
| Projetos | escala do quadro 0,9→1, zoom interno 1,14→1, parallax, título por máscara | scrub; 0,9 s |
| Soluções | troca de painel (entrada curta), animações da demonstração | 420 ms |
| Placas | cena 3D por scrub; passos em HTML por limiar | scrub |
| CRM | pilha → alinhamento → zoom na ação → próxima tela | scrub |
| Navegação | botões e menus em 200 ms; View Transitions entre páginas, que só concluem quando a nova rota pinta (com teto de 1,5 s) | 200–520 ms |
| Encerramento | `wdth`/peso por proximidade do ponteiro | contínuo e interrompível |

- Com movimento reduzido, nenhuma seção fica alta ou sticky e todas mostram o estado final composto (validado).
- Nenhum preloader, intro obrigatória, som ou scrolljacking: a rolagem é nativa e o sticky é CSS.
- O conteúdo nunca depende de JS para existir: o texto é SSR, e o GSAP só esconde algo depois de carregar.

## 5. 3D: arquitetura e desempenho

- `src/lib/three/stage.ts` concentra o ciclo de vida das duas cenas WebGL (abertura e placa), que usam canvas independentes e nunca rodam juntas na tela:
  - DPR limitado (1,75 na abertura, 1,5 na placa) e reduzido para 1 se a média de quadro passar de 21 ms; na placa, isso também desliga a transmissão do acrílico;
  - render só com o canvas visível (IntersectionObserver) e a aba ativa;
  - ResizeObserver, que também cobre a orientação;
  - `webglcontextlost` volta ao poster e `webglcontextrestored` reconstrói a cena;
  - descarte de geometrias, materiais, texturas e listeners ao desmontar.
- Carregamento:
  - abertura: `import()` em `requestIdleCallback`;
  - placa: `import()` quando a seção está a 1,5 viewport;
  - as duas só no modo completo, com WebGL2 e dispositivo capaz (sem ponteiro grosso, mais de 4 núcleos, sem economia de dados).
- Poster imediato:
  - abertura: composição HTML com as mesmas poses da cena (`hero-layout.ts`), que também executa a passagem de rolagem quando não há WebGL;
  - placa: `public/placas/placa-demonstracao.webp`, renderizado da própria cena (script em `scripts/render-plaque-poster.mjs`).
- Placa parametrizada em `src/data/plaque.ts` (proporção, espessura, raio, face de impressão). Nenhuma medida aparece no texto.

## 6. Referências: o que foi aproveitado

- **Locomotive** (`/en/work`): a hierarquia de cada projeto (cliente → setor → descrição curta → serviços → "Case" e "Visitar site"). Ela foi seguida no arquivo e no case. Não usamos filtros: com 6 trabalhos, eles não ajudariam.
- **Immersive Garden / Cartier Watches & Wonders**: produto revelado em capítulos ao rolar, com o detalhe sob demanda. Isso foi aplicado à placa: entrada, rotação, aproximação e tela, com os passos sempre em HTML.
- **Three.js responsive**: canvas dimensionado pelo container, DPR limitado e resize sem esticar.
- **GSAP matchMedia**: cada cena registra a timeline completa só na query do modo completo e é revertida quando ela deixa de valer.
- **web.dev / Core Web Vitals**: metas e a diferença entre laboratório e campo (seção 8).
- **Solução própria**: a "janela" que nasce como vitrine 3D de projetos reais, vira capa do primeiro case e volta vazia no encerramento. Os capítulos herdam a cor de cada cliente.

## 7. Origem dos assets (`src/assets/projects/*`, `public/textures`, `public/placas`)

| Projeto | Origem | Observação |
|---|---|---|
| Carta de vinhos 3D (Toricelli) | capturas de `carta-vinhos-projeto.vercel.app` em 04/11/2026; renders de `carta-vinhos-projeto/public` | rótulos e garrafas são provisórios no próprio projeto, e o case diz isso |
| Chef Bruno Sushi | capturas de `chef-bruno-sushi.vercel.app`; cartão QR de `Bruno-sushi/documentação` | o topo da captura de página inteira foi trocado pela abertura nítida |
| Lux Bartenders | capturas de `lux-bar.vercel.app`; recortes de `Lux-bar/public/.../cutouts` | |
| Honoratto Tattoo | capturas de `honoratto.vercel.app` | |
| Flor de Maria VIP | captura existente no repositório | funcionalidades confirmadas no código (`FlorDeMaria/site/flor-de-maria`) |
| ArpeX CRM | `ArpeX-CRM/reports/*` (modo dev, dados de demonstração) | faixa "MODO DEV", indicador do Next e e-mail de dev foram cobertos |
| QR de demonstração | gerado com `qrcode@1.5.4` | aponta para `/placas?origem=qr-demonstracao`, a página da própria ArpeX |

As capturas foram feitas só com GET e rolagem, com POST bloqueado e o banner de cookies recusado.

## 8. Validações executadas

Ambiente: Windows 11, Chromium 1248 (Playwright 1.64) headless, servidor `next start` local. Telas validadas: 360, 390, 768, 1024×768, 1440×900, movimento reduzido e WebGL desativado.

- `tsc --noEmit`: ok · `eslint src`: ok · `npm run build`: ok (21 rotas estáticas).
- Testes funcionais (41/41), sem enviar nada (`window.open` interceptado, saída para fora do localhost bloqueada):
  - formulário: interesse e case vindos da URL, validação, texto composto e link `wa.me` no número configurado;
  - abas por teclado e toque;
  - menu mobile: abre, recebe o foco, fecha com Esc, devolve o foco e fica `inert`;
  - rotas e deep links: 14 rotas com 200 e um slug inexistente com 404;
  - redirects 308;
  - `dalury` com `noindex` e fora do sitemap.
- Overflow horizontal: nenhum em 360, 390, 768, 1024 e 1440.

**Medições de laboratório** (não substituem dados de campo; INP de campo não foi medido):

| Condição | LCP | CLS | INP (interação simulada) | Quadros na rolagem |
|---|---|---|---|---|
| Desktop 1440, GPU Intel Iris Xe (D3D11) | 0,20–0,95 s | 0 | < 16 ms | p95 17 ms em `/` e `/placas` (média 39–42 fps puxada por quadros longos de inicialização) |
| Celular 390, rede 4G lenta (1,6 Mbps, 150 ms) | 0,88–1,15 s | 0–0,028 | 32–72 ms | — |
| Celular 390, 4G lenta + CPU 4× mais lenta nesta máquina | 1,9–3,4 s | 0–0,003 | 80–440 ms | — |

O terceiro perfil passa de 2,5 s em parte das páginas e precisa ser conferido em aparelho real e em dados de campo.

## 9. Pendências de material

- **Placas**: medidas, espessura, acabamento e face de impressão; fotos frontal, lateral, de detalhe e instaladas; prazo, preço e entrega. A placa é parametrizada em `src/data/plaque.ts`; depois de mudar os parâmetros, regenere o poster.
- **Autorizações de exposição**:
  - Toricelli: a carta é um protótipo com licenciamento ainda em proposta;
  - confirmar com Chef Bruno, Lux, Honoratto e Flor de Maria o uso das capturas e dos recortes.
- **Flor de Maria VIP**: o domínio `flordemariavip.com.br` não respondeu em 04/11/2026. Confirmar a situação e, se voltar ao ar, adicionar `status.url` em `src/data/projects.ts`.
- **Dalury**: sem nenhum material. A página existe para preservar o link, mas fica fora do arquivo e do índice.
- **Pessoas e fundador**: não há fotos nem história aprovadas, por isso não aparece equipe. A foto de letreiro anterior foi removida por parecer mockup e não o escritório.
- **ArpeX CRM**: confirmar as condições comerciais de acesso. Hoje o site diz só "publicado, acesso com login".
- **Launch Kit**: os itens de entrega (manual, reunião, 30 dias de suporte) vêm do one-pager e do manual do Chef Bruno. Confirmar que valem para todos os projetos.
- **Logo**: só existe em PNG; o "LOGOPNG 5.svg" embute um bitmap. Um SVG vetorial melhoraria a nitidez.
- **Desempenho**: medir em aparelhos reais (Android médio) e acompanhar o CrUX ou RUM depois da publicação.

## 10. Capturas

Em `docs/refatoracao/capturas/`: desktop (abertura, expansão, capítulos, placas, soluções, CRM, encerramento), 1024×768 e celular. As telas do CRM usam dados de demonstração.
