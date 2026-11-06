# Refinamento de botões, links e seletores

Esta rodada parte da versão em produção (commit `1a61d95`). Mantivemos identidade, fontes, cenas,
animações e textos. O que mudou foi a forma, a cor e os estados dos controles.

## Onde fica

Tudo está em `src/styles/controls.css`. Os componentes só escolhem a classe, e o `Button`
(`src/components/ui/button.tsx`) tem três variantes: `primary`, `secondary` e `link`.

| Token | Valor | Uso |
|---|---|---|
| `--radius-control` | 8 px | botões e campos |
| `--radius-choice` | 6 px | seletores, atalhos, itens do menu e rótulos de ação ("Abrir case") |
| `--dur-control` | 180 ms | cor, fundo e borda |
| `--default-transition-duration` | 180 ms | qualquer `transition-*` do Tailwind sem duração explícita (antes, 150 ms) |
| `--color-signal-hover` / `--color-signal-press` | `#26D68B` / `#00B669` | verde da marca no hover e na pressão |
| `--control-line` / `--control-line-hover` | 28% / 60% da cor do texto | borda do secundário e do seletor |
| `--control-fill-hover` / `--control-fill-press` | 7% / 12% da cor do texto | preenchimento no hover e na pressão |
| `--fg-inverse` (em cada superfície) | cor do fundo | texto do seletor marcado |

Linhas e preenchimentos usam a cor do texto (`currentColor`). Por isso o mesmo controle funciona
no fundo escuro, no claro e nas paletas dos cases, sem variante por fundo.

## Estados

| Controle | Repouso | Hover (ponteiro) | Pressionado (toque e clique) | Foco (teclado) | Selecionado / atual |
|---|---|---|---|---|---|
| Botão principal `btn btn-primary` | verde `#00CF77`, texto ink, 48 px (cabeçalho: 40 px, `btn-sm`) | `#26D68B`; a seta avança 2 px | `#00B669` | contorno de 2 px afastado 3 px, na cor de destaque da superfície | — |
| Botão secundário `btn btn-secondary` | transparente, borda a 28%, mesma caixa do principal | borda a 60% e preenchimento a 7% | preenchimento a 12% | idem | — |
| Link autônomo `link` (ação com seta, voltar, destaque) | sem sublinhado; seminegrito, seta | sublinhado de 1 px afastado 0,3em; a seta avança 2 px | sublinhado | contorno de 2 px | — |
| Link em texto corrido `link-inline` | sublinhado a 45%, sempre visível (também no celular) | sublinhado pleno | sublinhado pleno | contorno colado (1 px) para não cobrir a palavra vizinha | — |
| Menu `nav-link` | texto a 66% | texto a 90% | texto pleno e fundo a 8% | contorno de 2 px | página atual: texto pleno e o ponto verde |
| Seletor `choice` | borda a 28%, cantos de 6 px, anel vazio | borda a 60% e preenchimento a 7% | preenchimento a 12% | contorno de 2 px afastado 2 px | preenchido na cor do texto (marfim no escuro, grafite no claro), com ✓ |
| Campo `field` | borda de linha, cantos de 8 px | borda a 28% | — | borda plena e contorno de 2 px | — |

- O hover só existe com ponteiro (`@media (hover: hover)`, como o `hover:` do Tailwind 4), então
  nada fica preso depois de um toque.
- A pressão entra sem transição, para aparecer até num toque curto, e volta em 180 ms.
- A pílula fica para etiquetas curtas de status ou categoria, e hoje nenhuma está em uso. Os
  únicos elementos ainda arredondados não são controles:
  - os pontos decorativos;
  - as barras de navegador simuladas nas demonstrações;
  - os círculos das etapas do método.

## Onde foi aplicado

- **Cabeçalho:**
  - CTA "Conversar com a ArpeX";
  - itens do menu;
  - botão do menu no celular (8 px, com borda e resposta do secundário);
  - atalho "Pular para o conteúdo".
- **Menu do celular:** links com resposta ao toque e os dois botões.
- **Home:**
  - abertura: principal e secundário, link do projeto em destaque, "Abrir o case";
  - frentes: abas, "Ver as soluções em detalhe", CTA e exemplos;
  - placa e CRM: principal e link;
  - capítulos de projetos: "Ver o case" e "Ver todos os projetos";
  - encerramento.
- **Projetos:**
  - lista: rótulo "Abrir case";
  - case: voltar, botão do endereço ("Visitar", "Abrir a carta"), "Quero algo assim" e o endereço
    em texto.
- **Placas, ArpeX CRM e Contato:**
  - seletores de assunto, campos, envio e canais;
  - ícone do FAQ, que reage ao hover.
- **Também:** Soluções (atalhos das frentes e exemplos), Sobre, rodapé e 404, que já usavam os
  componentes compartilhados.

## Ícones dos canais de contato

Os nomes "WhatsApp", "E-mail" e "Instagram" foram trocados por ícones (`src/components/ui/contact-icons.tsx`):

- **Rodapé:** ícone seguido do número, do endereço ou do perfil.
- **Lista de canais do Contato:** o ícone ocupa o lugar do rótulo.
- **Menu do celular:** o botão do WhatsApp mostra ícone e número; o e-mail ganhou ícone e passou a ser
  um link (antes era só texto).

Os ícones usam a cor do texto e seguem o hover de cada link. Para leitor de tela, o nome do canal
continua em texto escondido ("WhatsApp: (19) 98893-5849").

Nos botões "Chamar no WhatsApp" e "Abrir no WhatsApp" o texto foi mantido e o ícone entrou ao lado.
Só com o ícone, o botão não diria a ação ("Chamar no" + ícone). Comparativos em
`08-icones-desktop.webp` e `09-icones-celular.webp`.

## Decisões

1. **O botão principal é verde em todos os fundos.** Saiu a variante grafite usada nos fundos
   claros (Soluções, Placas, CRM, Sobre e frentes da home).
2. **O seletor marcado não usa verde.** O verde ficou reservado para a ação principal e para o
   foco. Assim, foco e seleção não se confundem no mesmo controle, e o ✓ indica a seleção sem
   depender de cor. O anel vazio indica que a escolha é única.
3. **"Ver o case" virou link de texto com seta.** Antes era uma pílula preenchida na cor do
   capítulo. A capa ao lado já é o alvo grande (ver `07-link-de-case-no-capitulo.webp`). Para mais
   peso, basta trocar a classe por `btn btn-secondary` em `CaseLink`
   (`src/components/projects/project-chapter.tsx`).

## Problemas encontrados e corrigidos

- **Cabeçalho nos cases de paleta clara** (Toricelli, Honoratto Tattoo, Flor de Maria). No topo da
  página, o cabeçalho transparente deixava o logo e o menu claros sobre o fundo creme. Nessas
  páginas ele agora entra sólido (`main[data-top="light"]`). Ver `06-cabecalho-case-claro.webp`.
- **Botão do endereço nos cases.** Um conflito de classes deixava o texto branco sobre o verde
  (cerca de 2:1). Agora o texto é ink sobre verde (9,4:1).
- **Campos do Contato.** O foco por teclado só mudava uma borda de 1 px. Agora mostram o mesmo
  contorno de 2 px dos outros controles.
- **"Ver todos os projetos".** O rodapé da seção de projetos agora recebe as variáveis da paleta do
  último capítulo, então texto, borda e foco seguem o fundo claro.

## Comparativos

| Arquivo | Conteúdo |
|---|---|
| `01-comparativo-pedido.webp` | CTA do cabeçalho, botão secundário (fundo escuro e claro) e link de case (capítulo escuro e claro), em repouso, hover e foco |
| `02-principal-menu-link.webp` | botão principal em fundo claro, menu (atual × hover × foco) e link em texto corrido |
| `03-seletor.webp` | assuntos do formulário: repouso, hover, foco e selecionado |
| `04-toque-celular.webp` | celular: repouso × pressionado em principal, secundário, link, aba, seletor e menu |
| `05-seletores-celular.webp` | celular: assunto marcado, abas das frentes e atalhos de Soluções |
| `06-cabecalho-case-claro.webp` | topo do case Toricelli, antes e depois |
| `07-link-de-case-no-capitulo.webp` | "Ver o case" no capítulo Chef Bruno, antes e depois |
| `08-icones-desktop.webp` | ícones dos canais: rodapé, lista do Contato, botões de WhatsApp em Placas e no formulário |
| `09-icones-celular.webp` | ícones dos canais no celular: lista do Contato, menu e rodapé |

O "antes" foi capturado do build em produção e o "depois" do build local, com o mesmo script: hover
com o mouse e foco por teclado (`:focus-visible` conferido).

## Verificações (build de produção local, 06/11/2026)

- `tsc --noEmit` e `eslint` sem erros; `npm run build` ok, com 21 rotas.
- **Testes funcionais:** 57/57. Formulário e WhatsApp testados sem envio real.
- **Teclado:** percorri 9 rotas com Tab. Foram 179 elementos em 1440×900 e 133 em 390×844, todos com
  `:focus-visible` e contorno de 2 px.
- **Celular (iPhone 13 emulado):** `(hover: hover)` é falso e nenhum estado fica preso depois do
  toque. A pressão muda fundo, borda ou sublinhado em todos os controles.
- **Overflow:** nenhum overflow horizontal em 8 rotas e 9 tamanhos.
- **Rolagem da home:** ida e volta completas em 1440×900, com GPU, sem erro de página. A abertura
  volta visível no topo.
- **Contraste:**

  | Par | Contraste |
  |---|---|
  | texto ink sobre verde: repouso, hover, pressionado | 9,4 / 10,2 / 7,3 : 1 |
  | seletor marcado no escuro / no claro | 15,1 / 14,0 : 1 |
  | foco verde sobre ink | 9,4 : 1 |
  | foco verde-escuro sobre mineral / papel | 5,2 / 5,8 : 1 |

## Limitações

- O toque foi testado em emulação do Chromium, não em aparelho. No iOS, o `:active` depende de um
  ouvinte de toque na página; o React registra esse ouvinte, mas vale conferir num iPhone real.
- A resposta ao hover e ao foco foi medida em Chromium headless. Safari e Firefox não foram
  testados nesta rodada; `color-mix()` e `:has()` estão dentro dos navegadores que o Tailwind 4 já
  exige.
