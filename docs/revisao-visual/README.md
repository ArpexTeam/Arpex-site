# Revisão visual do site institucional

> Atualizado pela rodada [foto real das placas](../placa-real/README.md): a placa passou a usar fotos reais,
> o botão principal ganhou um preenchimento no hover e o secundário voltou ao lado do principal (WhatsApp).

Esta rodada parte da versão em produção (commit `4875660`). O site não foi refeito: rotas, cenas
Three.js, animações, versões em movimento reduzido e sem WebGL, contatos e o número do WhatsApp
foram mantidos. A aplicação ArpeX CRM não foi alterada. Mudou só a apresentação dela no site.

As quatro capturas citadas no pedido não chegaram. Por isso os comparativos usam 1920×1032 (o
tamanho da captura de tela enviada na rodada anterior) e 390×844 no celular.

## Registro

| Pasta | Conteúdo |
|---|---|
| `comparacao/` | antes (produção) e depois lado a lado. `01` a `03`: telas da home com movimento e GPU (abertura, seletor das frentes, capítulo do Chef Bruno). `04` a `08`: páginas inteiras em movimento reduzido, sem o rodapé (Soluções, Projetos, Placas, ArpeX CRM, Sobre). Cada uma em `-1920` e `-390` |
| `fonte/` | teste da fonte isolado: a versão em produção só com a fonte trocada. Em cima, as fontes anteriores; embaixo, Instrument Sans (espécime, abertura e frentes a 1920 px, abertura a 390 px) |
| `verificacoes/` | `estados-desktop`: os cinco controles em repouso, hover, pressionado, foco e selecionado. `toque-celular`: repouso e pressão no toque, mais as abas do CRM a 390 px. `placa-sem-webgl-1920`: o poster da placa sem WebGL antes e depois. `rolagem-volta-1920`: a home depois de rolar até o fim e voltar |

## Padrão visual

### Cabeçalho, botões e links

- **Cabeçalho:** o botão verde "Conversar com a ArpeX" virou o link "Contato →", no tamanho e no
  peso do menu. Na página de contato ele ganha o ponto verde de página atual, como os outros itens.
- **Botão principal (`btn`):**
  - preenchido na cor do texto da superfície: marfim com texto escuro no fundo escuro, grafite
    com texto claro no fundo claro;
  - 46 px de altura, cantos de 8 px, peso 500, largura do rótulo;
  - usado só nos pontos de decisão: abertura, fim de cada frente, placa, CRM, encerramento e
    contato.
- **Ação em texto (`link link-action`):** "Ver soluções", "Ver o case", "Conhecer a placa". O
  sublinhado de 1 px fica sempre visível, então o link é reconhecível também no toque.
- **Verde:** sai dos botões e fica para a marca e os indicadores pequenos: página atual, aba
  ativa, etapa da cena, foco e marcadores numéricos.
- **Botão secundário com borda:** deixou de existir. Onde havia dois botões lado a lado, o segundo
  virou ação em texto.

### Uma resposta por tipo de interação

Tudo está em `src/styles/controls.css`. As transições são de cor, fundo e borda, em 160 ms, e
nenhum controle muda de tamanho ou de posição. A única coisa que se move é a seta, que avança 2 px
dentro do botão.

| Controle | Hover (ponteiro) | Pressionado (toque e clique) | Foco (teclado) | Selecionado / atual |
|---|---|---|---|---|
| Botão principal `btn` | o tom fica 14% mais próximo do fundo | o tom fica 26% mais próximo do fundo, sem transição | contorno de 2 px afastado 3 px | — |
| Link `link` | o sublinhado fica pleno | o sublinhado fica pleno | contorno de 2 px | — |
| Menu `nav-link` | o texto clareia (64% → 92%) | texto pleno e fundo a 11% | contorno de 2 px | página atual: texto pleno e o ponto verde, que o hover nunca mostra |
| Abas `tab` | fundo a 6% e texto pleno | fundo a 11% | contorno interno de 2 px | linha de 2 px na cor de destaque sob a aba. Continua visível quando o ponteiro passa em outra aba |
| Seletor `choice` (assuntos do contato) | fundo a 6% | fundo a 11% | contorno de 2 px | borda a 60%, fundo a 8% e marcador ✓ preenchido |

O hover só existe com ponteiro (`@media (hover: hover)`). No celular, a resposta é a pressão, e
nada fica preso depois do toque. Ver `verificacoes/estados-desktop.webp` e `verificacoes/toque-celular.webp`.

## Tipografia

Uma família só: **Instrument Sans**, carregada por `next/font` e usada no lugar de Manrope
(títulos) e Source Sans 3 (texto).

| Nível | Uso | Peso |
|---|---|---|
| Título de página | abertura da home e de cada página | 600 |
| Título de seção | "Presença, atendimento e operação.", "Projetos selecionados" | 600 |
| Nome de projeto | capítulos da home e grade de projetos (`--text-project`) | 600 |
| Texto | parágrafos e listas | 400 |
| Legenda e rótulo | legendas de imagem, categoria, rótulos numéricos | 400 / 500 |
| Ações | botões, links de ação, abas | 500 |

Teste em composição real, na página em produção com só a fonte trocada: `fonte/especime-1920.webp`
traz títulos, texto com acentos, números e o endereço de e-mail. Em cima ficam as fontes anteriores
e embaixo Instrument Sans. Também há a abertura e as frentes a 1920 px e a abertura no celular.

- **Acentos do português:** ç, ã, õ, é, ê, ó, ú e à aparecem limpos e sem colisão com a linha de
  cima, também nas maiúsculas acentuadas.
- **Títulos:** ficam mais compactos.
- **Abertura:** fecha em três linhas no desktop ("Tecnologia / para organizar / seu negócio.").
- **Texto corrido:** é cerca de 10% mais largo que em Source Sans 3. Por isso algumas linhas
  quebram antes.
- **I maiúsculo e l minúsculo:** continuam parecidos, como nas fontes anteriores. O site não usa
  códigos em que isso confunda.

## O que mudou por página

### Home

- **Abertura:**
  - linha de apoio "Estruturação digital sob medida";
  - título "Tecnologia para organizar seu negócio.";
  - apoio "Criamos sites, automações e sistemas sob medida para empresas em crescimento.";
  - botão "Falar com a ArpeX" e, ao lado, o link "Ver soluções";
  - a cena com o cartão da carta de vinhos foi mantida.
- **Seletor das frentes:**
  - três abas compactas (Presença, Atendimento, Operação) acima do painel, alinhadas à esquerda;
  - o painel mostra primeiro a demonstração, depois a frase de benefício e o caminho "Conhecer
    Presença →";
  - as listas de entregas foram para `/solucoes`;
  - os painéis dividem a mesma célula da grade, então a troca não muda a altura da seção;
  - clique, toque e teclado funcionam (setas, Home e End).
- **Projetos selecionados:**
  - a imagem vem primeiro;
  - cada capítulo mostra nome, categoria e uma frase de contexto. Para o Chef Bruno: "Site com
    cardápio e pedido de orçamento para um chef de eventos.";
  - o "Desafio" ficou só no case.

### Soluções

- **Abertura:** "Soluções" e "Comece pelo que mais precisa melhorar na sua empresa.", com o índice
  das frentes logo abaixo. No celular o índice mostra só os nomes, para caber numa linha.
- **Cada frente, numa seção:** necessidade, evidência visual ao lado do texto, entregas e próximo
  passo com o botão.
- **Duplicações removidas:**
  - "Como começar" saiu de Presença, onde repetia as entregas;
  - nas outras duas frentes, virou uma frase antes do botão;
  - a introdução duplicada saiu, e a primeira frente começa mais cedo.
- **Demonstração de Presença:** o cartão com QR Code aparecia cortado nas laterais e agora aparece
  inteiro.

### Projetos e cases

- **Projetos:**
  - abertura curta;
  - Carta de vinhos 3D em destaque;
  - grade de 2 colunas no desktop e 1 no celular, todas as capas em 16:10;
  - em cada item, categoria, nome, uma frase e "Ver o case →";
  - a última célula da grade convida para a conversa;
  - a transição da capa para o case foi mantida.
- **Case:**
  - o topo usa a frase de contexto;
  - desafio e solução aparecem uma vez cada;
  - foram mantidos a situação de cada projeto (protótipo ou publicado) e os dados já verificados;
  - "Visitar o site" é o botão, e "Quero algo assim" virou link.

### Placas

A página foi reconstruída em quatro momentos:

1. **Produto:** "Placa de avaliação com QR Code e NFC", uma frase de benefício, a placa em foco e
   "Solicitar uma placa".
2. **Demonstração:**
   - a cena 3D existente;
   - três legendas sincronizadas com a rolagem: "Aproxime ou escaneie", "Abra a página" e
     "Deixe sua avaliação";
   - que quem publica é o cliente fica explicado uma vez só, na terceira legenda.
3. **Personalização:**
   - acrílico sem base, a arte da empresa e onde usar;
   - medidas e acabamento aparecem como "combinados na contratação", porque não estão definidos.
4. **Contratação:**
   - arte, destino do link e entrega;
   - perto do fim, a compatibilidade e duas dúvidas curtas;
   - o Perfil da Empresa no Google aparece como serviço relacionado e opcional.

**Imagens:** não há fotos reais aprovadas da placa. As imagens novas
(`public/placas/placa-render-*.webp`) foram geradas a partir da própria cena 3D e aparecem
identificadas como "Render de demonstração". O cartão com QR Code do Chef Bruno não é apresentado
como placa instalada.

### ArpeX CRM

1. **Abertura:** a apresentação animada das telas foi mantida.
2. **"Do contato ao próximo retorno":** quatro passos com o trecho de cada tela real ampliado e a
   ação marcada em verde:
   - o contato entra no pipeline;
   - a mensagem sai pronta;
   - o retorno entra na fila;
   - o dia começa pelo próximo retorno.
3. **"No dia a dia":** um seletor com três usos ("Organizar contatos e oportunidades",
   "Acompanhar retornos e propostas", "Conferir o andamento comercial"), cada um com duas telas.
4. **Fim:** "Conversar sobre o CRM" para quem quer conhecer e "Já tenho acesso" para quem já usa.

As telas são capturas reais com dados de demonstração, como diz a legenda. Os recortes são feitos
por CSS sobre as mesmas capturas, sem arquivos novos.

### Sobre

- **Abertura:** "Entendemos o negócio antes de construir.", uma frase de apoio e um render real de
  bastidor da carta Toricelli.
- **"Como trabalhamos":** aparece uma vez. São quatro etapas de uma frase, ligadas a material
  concreto:
  - telas conferidas no celular (ArpeX CRM) e no computador (Lux Bartenders);
  - o cartão com QR Code entregue ao Chef Bruno.
- **"Onde ver na prática":** cinco trabalhos. Em cada um, o nome do projeto é o link, e a legenda
  diz o que observar.
- **Contato:** uma única ação, "Falar com a ArpeX". O bloco de bastidores anterior
  (`backstage.tsx`) saiu, porque repetia o método.

### Texto e altura

Palavras visíveis no `<main>` e altura da página a 1920 px em movimento reduzido.

| Página | Palavras antes | Palavras depois | Altura antes | Altura depois |
|---|---|---|---|---|
| Home | 750 | 575 | 11.616 px | 11.290 px |
| Soluções | 433 | 383 | 4.061 | 3.628 |
| Projetos | 280 | 173 | 4.191 | 4.108 |
| Case Chef Bruno | 228 | 215 | 6.510 | 6.475 |
| Placas | 314 | 319 | 2.839 | 3.447 |
| ArpeX CRM | 244 | 292 | 5.212 | 5.529 |
| Sobre | 291 | 215 | 3.822 | 3.376 |
| Contato | 152 | 152 | 2.339 | 2.310 |

Placas e CRM cresceram de propósito, porque o pedido acrescentou os quatro momentos da placa e o
fluxo do CRM.

## Verificações

Rodadas no build de produção local (`next build` + `next start`), com o WhatsApp interceptado:
nenhuma mensagem real foi enviada.

| Verificação | Resultado |
|---|---|
| `tsc --noEmit`, `eslint src`, `next build` | sem erros; 21 rotas geradas |
| Testes funcionais (formulário, mensagens, abas, âncoras, menu, páginas reconstruídas) | 74 de 74 |
| Foco de teclado: Tab por 9 rotas, todo elemento focado com contorno visível | 177 elementos a 1920 px e 131 a 390 px, sem falha |
| Toque (iPhone 13, sem hover) | todos os controles respondem à pressão; depois do toque, a aba e o assunto ficam só selecionados, sem fundo de hover preso |
| Abas | troca sem salto de altura; a aba ativa continua marcada com o ponteiro em outra; as abas do CRM cabem a 390 px sem rolagem |
| Âncoras | "Ver soluções" leva ao seletor da home; o índice de Soluções leva à frente escolhida |
| Estouro horizontal | nenhum, nas 8 rotas, em 9 tamanhos de tela entre 360 e 1920 px (inclusive celular deitado) |
| Rolagem até o fim e de volta (home, 1920 e 390, com GPU) | sem erros de página; a abertura reaparece inteira no topo |
| Sem WebGL | a abertura, a placa e o CRM usam as alternativas existentes. O poster da placa, que a 1920 px cobria parte do texto (inclusive em produção), agora fica nas colunas da cena |
| Movimento reduzido | todas as páginas em fluxo, sem cena presa (comparativos `04` a `08`) |

## Pendências e limites

- **Capturas do pedido:** não foram recebidas. Se as larguras delas forem outras, os comparativos
  podem ser refeitos com `cmp-rv.mjs` (script de revisão, fora do repositório).
- **Fotos da placa:** falta foto real aprovada. Enquanto isso, a página usa renders identificados.
  Medidas e acabamento também não estão definidos.
- **Telas repetidas no CRM:** algumas aparecem em mais de um bloco (Hoje e Pipeline estão na
  abertura e no fluxo), porque não há outras capturas reais. Os recortes do fluxo mostram trechos
  diferentes.
- **Desempenho:** não foi medido nesta rodada. A troca de fonte reduz de duas para uma família
  carregada, mas o efeito não foi medido.
