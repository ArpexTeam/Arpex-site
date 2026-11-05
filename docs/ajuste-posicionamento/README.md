# Ajuste de posicionamento, conteúdo e tipografia

Rodada feita sobre a versão aprovada da refatoração ([../refatoracao/README.md](../refatoracao/README.md)).
As cenas 3D, a rolagem, as transições e as microinterações foram mantidas. O que mudou foram
os textos, a hierarquia, a tipografia e a ordem da home. Os ajustes técnicos de dimensão
listados abaixo foram feitos só onde os textos novos exigiram.

As duas rodadas (refatoração e este ajuste) foram enviadas juntas para a branch `master` em 05/11/2026, a pedido, para publicação em produção. As gravações `.webm` ficam só na máquina local.

## Registro antes/depois

| Pasta | Conteúdo |
|---|---|
| `antes/` | capturas da versão aprovada (build de produção local, antes de qualquer edição) e `gravacao-home-desktop.webm` (rolagem completa da home, ida e volta, 1440×900, GPU; fica só na máquina local, fora do Git) |
| `antes/fontes-trocadas-*` | a versão aprovada com Manrope + Source Sans 3 injetadas **sem** mudar escala: o título invade a cena 3D, ou seja, trocar o nome da fonte não resolvia |
| `depois/` | as mesmas capturas e a mesma gravação na versão nova; `cenas-*` mostra as cenas em telas baixas, sem WebGL, com movimento reduzido e em 1440 |
| `comparacao/` | lado a lado: abertura (desktop e celular), seção explicativa (desktop e celular) e as três etapas da tipografia |

As gravações têm o mesmo percurso (`scratchpad/ref.mjs video`): carregamento, rolagem contínua até o rodapé e volta ao topo.

## Home: ordem de leitura

| Pergunta | Seção | Situação |
|---|---|---|
| O que a ArpeX faz? | Abertura | texto novo; a cena 3D e a expansão no projeto em destaque seguem iguais |
| Isso se aplica ao meu negócio? | **Necessidade** (nova) | título, apoio, três situações e uma linha para quem está se preparando para crescer |
| Como ela pode me ajudar? | Frentes: Presença, Atendimento, Operação | as mesmas abas, agora com 3 frentes no lugar de 4 |
| | Placas (cena 3D) | ligada à frente Presença |
| | ArpeX CRM (sequência de telas) | ligado à frente Atendimento |
| Como funciona o trabalho? | Método | Entender, Definir, Construir e validar, Acompanhar |
| O que já entregou? | Cases | "O que construímos e o que isso resolveu." Três capítulos |
| Como começar? | Encerramento | texto novo, a mesma resposta ao ponteiro |

Decisões:

- **A carta Toricelli fica só na abertura.** Antes, a tela da frente se expandia direto no capítulo
  Toricelli. Agora a expansão termina com a legenda "Em destaque · Abrir o case". Os três capítulos
  da home são Chef Bruno, Lux e Honoratto: sites publicados com material completo. A carta, a Flor
  de Maria e o CRM continuam no arquivo (`/projetos`) e nas páginas próprias.
- **Bastidores saíram da home** e ficaram em `/sobre`, junto da forma de trabalhar. Isso evita
  repetir prova de qualidade entre o método e os cases.
- **Navegação:** "Ecossistema" virou "ArpeX CRM", porque é o que a página mostra. O endereço
  `/ecossistema` foi mantido. "Soluções" passou a ser o primeiro item. O botão do topo agora diz
  "Conversar com a ArpeX".

## Textos aplicados

A abertura, a necessidade, o método e o encerramento usam literalmente a base do briefing.

- Abertura: "Estruturação digital sob medida" · "Tecnologia para seu negócio funcionar melhor e
  crescer." · descrição do briefing · botões "Conversar sobre meu negócio" (abre o contato com
  "Quero entender por onde começar" selecionado) e "Conhecer as soluções" (vai para `#solucoes`).
- Necessidade, situações:
  - "Você repete a mesma informação em vários lugares."
  - "Os pedidos chegam, mas acompanhar tudo está ficando difícil."
  - "As tarefas manuais estão tomando o tempo da equipe."
- Frentes (`src/data/solutions.ts`). Cada uma tem promessa, quando faz sentido, como ajudamos, o que
  podemos construir, por onde começar e exemplos reais. Só entrou o que algum projeto já
  comprova:

  | Frente | Itens | Exemplos que comprovam |
  |---|---|---|
  | Presença | site, Perfil da Empresa no Google, placa, QR Code | Chef Bruno, Lux, Honoratto |
  | Atendimento | contatos e oportunidades, lembretes de retorno, mensagens prontas para o WhatsApp, formulários de orçamento | CRM, Chef Bruno, Lux |
  | Operação | sistema com login, painel, avisos automáticos, aplicativo instalável | Flor de Maria, carta Toricelli |

  "IA" saiu da oferta, porque nenhum projeto publicado a comprova.
- Método: "Método, cuidado e tecnologia na medida do seu negócio." Os quatro passos do briefing.
  O "Acompanhar" diz "conforme o projeto e o suporte contratado". Os 30 dias de suporte deixaram
  de ser apresentados como regra; só aparecem no case Chef Bruno, onde estão documentados. A FAQ
  foi ajustada do mesmo jeito.
- Cases: "O que precisava resolver" / "O que construímos" no lugar de "Desafio" / "Solução", na
  home, no case e em `/projetos`. Na lista também entra uma frase de problema por projeto
  (`problem`), tirada do desafio já documentado. Nenhum resultado numérico foi adicionado.
- Encerramento: título, descrição e botão do briefing. O WhatsApp continua como segunda opção, com
  o mesmo número.

Páginas internas:

- `/solucoes` — organizada pelas três frentes, com âncoras `#presenca`, `#atendimento` e
  `#operacao`. As âncoras antigas (`#presenca-digital`, `#presenca-local`, `#sistemas-e-produtos`,
  `#automacao-e-ia`) continuam chegando à frente correspondente. A demonstração real de entrega de
  presença (cartão QR + checklist do Chef Bruno) aparece aqui.
- `/projetos` e `/projetos/[slug]` — cada trabalho ligado ao problema atendido.
- `/placas` — a placa apresentada como parte da presença e da reputação. Deixa explícito que o
  cliente escolhe a nota, escreve e decide se envia.
- `/sobre` — atuação consultiva ("Entendemos o negócio antes de construir."), princípios, método,
  entregas comprovadas e bastidores. Não há pessoas, rostos, anos de experiência nem selos.
- `/ecossistema` — título "ArpeX CRM", com o escopo real das telas.
- `/contato`:
  - Título "Vamos falar do seu negócio."
  - A primeira opção é "Quero entender por onde começar"; abaixo vem "Ou escolha uma solução
    específica".
  - Rótulos em caixa normal e um exemplo de preenchimento sobre rotina.
  - Na conversa, o formulário abre o WhatsApp com a mensagem pronta e não envia nada sozinho.
- Metadados (título, descrição e imagem de compartilhamento) refletem o posicionamento novo.

## Tipografia

| Papel | Antes | Depois |
|---|---|---|
| Títulos | Bricolage Grotesque 620, largura 92%, entrelinha 0,98 | **Manrope 700** (seção) / **600** (subtítulos), entrelinha 1,08 / 1,18, espaçamento −0,022em / −0,012em |
| Texto | Geist | **Source Sans 3** 400, com 600 em ênfases e rótulos de campo |
| Rótulos | Geist Mono em caixa alta (inclusive frases longas) | identificadores de seção em caixa normal (Manrope 600, 15px, cor de destaque); caixa alta só em índices e tags curtas |

- Escala (`src/styles/tokens.css`):

  | Elemento | 390 px | 1440 px | Teto |
  |---|---|---|---|
  | Abertura | 36 | 64 | 72 |
  | Títulos de seção | 28 | 44 | 48 |
  | Texto | 16 | 18 | — |
  | Apoio | 18 | 21 | — |

  Parágrafos limitados a cerca de 60 caracteres por linha. Textos de apoio deixaram o cinza
  apagado e usam a cor principal da superfície.
- Carregamento: `next/font` com um arquivo variável por família, só o subconjunto latin, sem itálico.
  A Geist e a Geist Mono saíram.
- Comparação em `comparacao/05-tipografia-*`. A troca de nome sozinha estoura a composição; a
  escala nova cabe sem sobrepor a cena.

## Ajustes técnicos para acomodar texto e fonte

- **Título da abertura sem quebras fixas.** Cada palavra tem a própria máscara de revelação. As
  palavras de uma mesma linha, medidas na largura real, sobem juntas, como as linhas subiam antes.
- **Largura do texto da abertura** (`--hero-copy-max`, em `motion.css`). É calculada pela mesma
  fórmula que posiciona a tela principal em `hero-layout.ts`, em degraus de proporção de tela
  arredondados para o lado seguro. Os botões ficam abaixo da tela e usam a largura natural.
- **Tela de trás (Chef Bruno) da abertura**, deslocada ~3–6% para a direita e um pouco para cima.
  Com o título mais longo, ela encostava no texto em 1280×720. A cena WebGL e o pôster usam a mesma
  função, então continuam iguais entre si.
- **Telas baixas** (variante `scene-short`: modo completo com altura entre 620 e 780px, como
  notebooks 1366×768). Placas e CRM mostram só a explicação do passo da vez. Escondem o parágrafo
  de apoio e as etiquetas, que continuam no fluxo normal e na página própria. A linha "Projeto em
  destaque" da abertura também sai.
- **Coluna de texto das placas** limitada a 32vw entre 1024 e 1279px, onde a placa entra perto.
- **Máscaras de revelação** com folga vertical de 0,16em, para acentos e descendentes da Manrope.
- **Encerramento.** A resposta ao ponteiro passou do eixo de largura (só a Bricolage tinha) para o
  eixo de peso da Manrope (640 → 800). Cada palavra reserva a largura do peso máximo com um
  `::after` invisível, então nenhuma palavra empurra as outras nem muda a quebra de linha.
- **Recálculo da rolagem após a fonte.** `ScrollTrigger.refresh()` roda uma única vez, quando
  `document.fonts.ready` resolve, e só se a fonte ainda estava carregando
  (`motion-provider.tsx`). Não há refresh por quadro nem listeners novos por resize.
- **Arte da placa.** O canvas usa as fontes da página e o título passou para o peso 700. O pôster
  `public/placas/placa-demonstracao.webp` foi regenerado com `scripts/render-plaque-poster.mjs`,
  para a troca pôster → 3D não mudar a arte.

## Validações (build de produção local, 04/11/2026)

- `tsc --noEmit` ok. `eslint .` sem erros (só o aviso antigo de `postcss.config.mjs`).
  `npm run build` ok, com 21 rotas estáticas.
- Testes funcionais: **57/57**, rodados de novo no build final. Nenhuma mensagem real foi enviada: `window.open` é interceptado
  e saídas para fora do localhost são bloqueadas. Cobrem:
  - formulário com interesse e case vindos da URL;
  - opção "entender" e texto composto para `wa.me/5519988935849`;
  - abas por teclado e toque (3 frentes);
  - menu mobile com foco, Esc e `inert`;
  - 18 rotas e 2 redirecionamentos; `dalury` fora do índice;
  - título e botões da abertura visíveis sem rolar;
  - ordem da home e três cases;
  - âncora `#solucoes` a partir da cena sticky;
  - recarregar no meio da página e voltar de um case para a home, sem erros;
  - âncoras novas e antigas de `/solucoes`.
- Sem overflow horizontal e sem texto fora da viewport, com a fonte já carregada. Conferido em 8
  rotas e 9 tamanhos: 360×780, 390×844, 844×390 (celular na horizontal), 768×1024, 1024×768,
  1024×640, 1366×657, 1440×900 e 1920×1080.
- Cenas conferidas em 1024×640, 1280×720, 1366×657 e 1440×900: abertura no início e no fim da
  expansão, placa em quatro pontos, CRM em duas etapas, método, cases e encerramento. O texto não
  sobrepõe nenhum objeto 3D e as colunas cabem na altura.
- Movimento reduzido e sem WebGL: pôsteres, layout de fluxo e textos completos.

## Medições de laboratório

Chromium 1248 headless, `next start` local, após o carregamento completo da fonte. Não substituem
medição em aparelho real nem dados de campo.

| Condição | Rotas | LCP | CLS | INP (1 interação) | Quadros na rolagem |
|---|---|---|---|---|---|
| Desktop 1440×900, GPU Intel Iris Xe | `/`, `/solucoes`, `/contato`, `/placas` | 0,08–0,26 s | 0 | 0–80 ms | p95 17 ms |
| Celular 390×844, 4G lento | `/`, `/solucoes`, `/contato` | 0,81–0,98 s | 0 | 16–32 ms | p95 17 ms |
| Celular 390×844, 4G lento + CPU 4× | `/`, `/solucoes`, `/contato` | 1,12–1,40 s | 0 | 48–56 ms | p95 17 ms |

A troca de fonte não gerou deslocamento de layout: o `next/font` cria um fallback com métricas
ajustadas, e a página não troca conteúdo após hidratar.

## Pendências de material e conteúdo

As pendências da refatoração continuam valendo (medidas e fotos da placa, autorizações de exposição,
domínio da Flor de Maria, Dalury, pessoas, condições do CRM). Desta rodada:

- Confirmar se o suporte pós-entrega tem um padrão comercial. Hoje o site diz "conforme o suporte
  contratado"; os 30 dias só aparecem no case Chef Bruno.
- Confirmar o escopo de "estruturação do Perfil da Empresa no Google". O texto descreve a revisão
  de categoria, descrição, horário, link e fotos, que é o que o checklist do Chef Bruno comprova.
- Confirmar se a ArpeX oferece o CRM como ponto de partida da frente Atendimento e em que condições.
  O texto diz que o caminho "pode ser" o CRM, um formulário mais completo ou uma automação.
- O título do contato foi encurtado para "Vamos falar do seu negócio.". A versão "Vamos conversar
  sobre o seu negócio." deixava um "o" isolado em uma linha no desktop.
