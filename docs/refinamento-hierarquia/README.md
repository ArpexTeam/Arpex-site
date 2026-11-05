# Refinamento de hierarquia, conteúdo e ritmo visual

Esta rodada parte da versão em produção (commit `72a00c2`). Cenas Three.js, animações, transições,
identidade, fontes, URLs e contatos foram mantidos; o foco foi editar o texto e organizar a hierarquia.

## Registro

| Pasta | Conteúdo |
|---|---|
| `antes/`, `depois/` | `pagina-*`: páginas inteiras no desktop (1440) e no celular (390), em movimento reduzido para que todo o conteúdo apareça em fluxo, sem cena presa; `cena-*`: sete pontos fixos da abertura, da placa e do CRM, com GPU |
| `comparacao/` | antes/depois lado a lado das 8 rotas (desktop e celular) e das 7 posições de cena |
| `verificacoes/` | telas baixas (1024×640 e 1366×657), rolagem reversa e versão sem WebGL |

As duas pastas foram geradas pelo mesmo script, com as mesmas posições de rolagem.

## Quanto texto saiu

Palavras visíveis no `<main>` (sem cabeçalho e rodapé). A altura é a da página no desktop em
movimento reduzido.

| Página | Palavras antes | Palavras depois | Altura antes | Altura depois |
|---|---|---|---|---|
| Home | 1.171 | 750 (−36%) | 13.221 px | 11.445 px |
| Soluções | 697 | 433 (−38%) | 5.962 | 3.979 |
| Placas | 574 | 314 (−45%) | 4.675 | 2.827 |
| Projetos | 445 | 280 (−37%) | 4.259 | 4.185 |
| Sobre | 421 | 291 (−31%) | 4.790 | 3.793 |
| ArpeX CRM | 327 | 244 (−25%) | 6.392 | 5.201 |
| Case Chef Bruno | 243 | 228 | 6.517 | 6.507 |
| Contato | 174 | 152 | 2.436 | 2.338 |

## O que mudou, seção por seção

### Home

| Seção | Mensagem principal | Repetição removida ou consolidada |
|---|---|---|
| Abertura | título mantido; a descrição ficou mais curta: "Sites, automações e sistemas sob medida para organizar a presença, o atendimento e a operação da sua empresa." | a descrição usa os nomes das três frentes da seção seguinte |
| Para quem é | "Sua empresa cresceu. A rotina precisa acompanhar." + "Para quem já sente o peso do crescimento ou quer se preparar para ele." | saíram o parágrafo que antecipava as situações, o cartão "planejando crescer" e o CTA. As três situações viraram títulos curtos com uma linha cada: "Informações espalhadas", "Contatos sem acompanhamento", "Tarefas que se repetem" |
| Frentes | "Presença, atendimento e operação." + "Comece pela necessidade do seu negócio." | a introdução que redefinia as frentes e a faixa final "Não sabe por qual frente começar?" saíram. Cada aba mostra benefício, uma frase, três entregas e o próximo passo; o detalhe ficou em `/solucoes` |
| Placas | título mantido; o apoio diz só o que é a placa | o parágrafo que repetia o percurso saiu: a cena e as três etapas explicam. "Abrir o link não publica nada" aparece uma vez, na terceira etapa |
| CRM | para quem é (quem atende e vende pelo WhatsApp) e o que organiza | as etiquetas "Publicado · acesso com login" e "Telas reais · dados de demonstração" viraram uma legenda discreta junto das telas |
| Método | "Como trabalhamos" | saiu a frase que repetia planejamento, validação e testes; cada etapa ficou com uma frase |
| Projetos | "O que construímos e o que isso resolveu." | o parágrafo que repetia o título saiu. Cada capítulo mostra tipo, nome, desafio em uma frase, síntese e "Ver o case"; os blocos longos de desafio e solução ficaram no case |
| Encerramento | título mantido | a etiqueta "Próximo passo", que repetia o título, saiu; a descrição ficou em uma frase |

### Páginas internas

- **Soluções.** Antes, cada frente tinha cinco blocos: quando faz sentido, como ajudamos, o que
  podemos construir, por onde começar e exemplos. Agora são três:
  - necessidade (contexto);
  - "O que entregamos" (lista);
  - "Como começar" (texto e CTA).

  Os exemplos viraram legenda da imagem. A seção "Comece por uma necessidade" e o método repetido
  no fim saíram; no lugar entra um convite curto.
- **Placas.** Seis seções viraram cinco:
  - a cena;
  - "NFC ou QR Code: o mesmo destino" (compatibilidade);
  - "A placa é da sua empresa" (personalização, com "Onde usar" na mesma seção);
  - perfil no Google;
  - "Como contratar".

  O FAQ saiu: as quatro perguntas repetiam a cena, a compatibilidade e a personalização. O cartão
  com QR do Chef Bruno saiu desta página, para não parecer foto de placa instalada.
- **Sobre.** Abertura curta: "Conhecemos sua rotina, identificamos o que precisa melhorar e
  desenvolvemos a solução adequada ao seu negócio." As seções "Como pensamos" e "Como trabalhamos"
  viraram uma só:
  - as quatro etapas do método;
  - abaixo delas, "Critérios que seguimos": "Sem pacote pronto" e "Uma necessidade por vez", os
    pontos que as etapas não cobriam.

  Depois vêm os bastidores (introdução de uma linha), "O que já entregamos" e um convite curto.
- **ArpeX CRM (`/ecossistema`).**
  - A galeria mostra só as telas que a cena não mostra: retornos, prospecção, mensagens, métricas e
    financeiro.
  - "Publicado, com acesso por login" aparece uma vez, no bloco de acesso.
  - "Dados de demonstração" aparece uma vez, junto das telas.
- **Projetos.** Cada item mostra tipo de solução, nome, síntese, situação, imagem e acesso ao case.
  Os blocos "O que precisava resolver / O que construímos" saíram da lista.
- **Case.** Os rótulos agora são "Desafio" e "Solução". "Situação verificável" virou "Situação
  atual", sem "endereço verificado em…". As notas foram reescritas em linguagem natural, por exemplo
  "Os rótulos das garrafas são provisórios, até a chegada das artes oficiais.". A distinção entre
  protótipo, site publicado, sistema desenvolvido e produto publicado foi mantida.
- **Contato.** A introdução virou uma frase: "Um site, uma placa ou a rotina que está pesando. Duas
  linhas bastam para começar." O formulário não mudou. Saiu do FAQ a pergunta sobre a placa, que já
  é explicada na página dela.

## Hierarquia tipográfica

As famílias são as mesmas: Manrope nos títulos, Source Sans 3 nos textos. O que mudou foi a
distribuição de papéis.

| Papel | Estilo | 390 px | 1440 px |
|---|---|---|---|
| Título da página (abertura, h1, encerramento) | Manrope 700 | 34–36 | 57–64 |
| Título de seção (novo `.font-title`) | Manrope 650 | 28 | 37 (teto 40) |
| Título de item (abas, etapas, situações) | Manrope 600 | 19 | 23 |
| Texto de apoio | Source Sans 3 | 18 | 20 |
| Texto | Source Sans 3 | 16 | 18 |
| Legenda e rótulo | — | 15 / 12 | 15 / 12 |

Antes, os títulos de seção tinham 44 px e o mesmo peso dos títulos de página. Os títulos ficaram
mais curtos antes de ficarem menores, e o contraste dos textos foi mantido.

## Espaçamento e composição

- Títulos ficam junto do conteúdo: o intervalo entre título e conteúdo caiu de 80–96 px para 40–56 px.
- O espaçamento vertical das seções explicativas passou de 96–144 px para 80–112 px.
- Duas seções seguidas com o mesmo fundo ganharam fundos diferentes quando o assunto muda.
- A composição "título à esquerda, parágrafo à direita" deu lugar a outras organizações:
  - título com lista (Para quem é, Personalização, O que já entregamos);
  - título com etapas (Método);
  - título sozinho sobre o conteúdo (Frentes, Projetos);
  - abertura empilhada nas páginas internas;
  - convite em linha (Soluções, Sobre, CRM).
- Nenhum card, ícone ou efeito novo.

## Ajustes técnicos

- `Method` aceita `principles`, renderizados abaixo das etapas. A animação da linha não mudou.
- `ProjectChapter` aceita `first`, com menos espaço acima do primeiro capítulo. As animações de
  moldura, parallax, rolagem de página e máscara do título não mudaram.
- `src/data/solutions.ts` ganhou `summary` e `highlights` para a visão geral da home e perdeu
  `explanation`. `src/data/projects.ts` ganhou `type`; `categories` e `checkedAt` ficam como
  registro, mas não são mais exibidos.
- As colunas de placas e CRM ficaram mais baixas com o texto menor. A compactação para telas baixas
  (`scene-short`) continua igual, e não foi preciso mexer nos tempos das cenas.

## Verificações (build de produção local, 05/11/2026)

- `tsc --noEmit` ok; `eslint` sem erros; `npm run build` ok, 21 rotas.
- Testes funcionais: **57/57**. Cobrem formulário e WhatsApp (sem envio real), abas, menu mobile,
  rotas, redirecionamentos, ordem da home, âncoras novas e antigas, recarregar no meio da página e
  voltar de um case.
- Sem overflow horizontal e sem texto fora da viewport depois de a fonte carregar. Conferido em
  8 rotas e 9 tamanhos, de 360×780 a 1920×1080, incluindo celular na horizontal.
- Rolagem completa da home, ida e volta, em 1440×900 e 1024×640 com GPU: nenhum erro de página.
  As cenas voltam ao estado certo no sentido inverso e o texto da abertura reaparece no topo.
- Telas baixas (1024×640, 1366×657): abertura, placa e CRM cabem sem cortar nem sobrepor o 3D.
- Sem WebGL e com movimento reduzido: pôsteres e fluxo normal corretos.
- Medição de laboratório (Chromium headless, GPU Intel Iris Xe; celular com 4G lento e CPU 4×):

  | Métrica | Desktop | Celular |
  |---|---|---|
  | CLS | 0 em todas as rotas | 0 em todas as rotas |
  | LCP | 0,16–0,25 s | 0,97–1,30 s |

## Limitações reais

- **INP medido mais alto que na rodada anterior, na versão nova e na antiga.** A versão nova mediu
  208–280 ms. A versão anterior, em produção, medida na mesma sessão, deu desktop 240–424 ms e celular
  168–280 ms. A diferença em relação à rodada anterior (80 ms e 56 ms) vem da máquina, não desta
  rodada. Sem medição em aparelho real nem dados de campo.
- As capturas de página inteira usam movimento reduzido, porque com as cenas presas a captura não
  representa a página. As cenas estão nas capturas `cena-*` e em `verificacoes/`.
- Continuam valendo as pendências anteriores:
  - autorização de exposição dos clientes (principalmente Toricelli);
  - suporte pós-entrega;
  - escopo do Perfil no Google;
  - condições do CRM.
