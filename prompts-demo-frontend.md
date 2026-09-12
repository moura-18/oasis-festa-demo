# Prompts — Demo Frontend (Agente IA para Espaços de Festas)

Stack recomendada pra esse demo (só front, sem backend real):
- **Vite + React + TypeScript** (mais rápido de bootar que Next.js, e você não precisa de SSR num demo)
- **Tailwind CSS + shadcn/ui** (componentes prontos, consistência visual rápida)
- **Zustand** (estado global leve — conversas, leads, agenda, tudo mockado em memória)
- **React Router** (páginas: Inbox, CRM, Agenda, Contrato, Dashboard)
- **Framer Motion** (animações — inclusive o cursor virtual do modo demo)
- Dados 100% mockados em JSON/TS, nada de API real.

---

## Como rodar isso no overclock.sh (recomendação)

1. Rode a **Fase 0 sozinha, sem paralelismo**. É a fundação — se ela sair errada ou inconsistente, todo o resto herda o problema.
2. Depois de revisar o resultado da Fase 0 (dá uma olhada rápida nos arquivos gerados antes de seguir), abra as panes da **Fase 1 em paralelo** — recomendo no máximo 4-5 simultâneas pra conseguir acompanhar o output de cada uma. Cada pane deve **só criar/editar arquivos dentro da sua própria pasta de feature** (ex: `src/features/inbox/`) e **nunca tocar** em `src/shared`, `src/types`, `src/lib/mock-data`, `src/App.tsx` ou nos arquivos de rota — só leitura.
3. Depois que todas as panes da Fase 1 terminarem, rode a **Fase 2 sozinha**.

Isso te dá o ganho de velocidade do paralelismo (5 telas construídas ao "mesmo tempo") sem o custo de retrabalho por inconsistência.

---

## FASE 0 — Prompt para o agente "Arquiteto" (rodar sozinho, primeiro)

```
Você vai montar a fundação de um projeto frontend-only em React + Vite + TypeScript que
será uma DEMO de um sistema de agente de IA para espaços de festas/eventos corporativos/
casamentos. Não haverá backend real — tudo em mock data. Outros agentes vão construir as
telas específicas depois de você, usando o que você criar aqui como contrato. Por isso,
sua entrega precisa ser estável, bem tipada e documentada.

ESCOPO DO PRODUTO (contexto para você tomar decisões de modelagem):
Um agente de IA atende Instagram e WhatsApp de um espaço de eventos. Ele qualifica o lead,
checa disponibilidade de data, tira dúvidas via base de conhecimento, e quando o cliente
está pronto pra fechar, ele ESCALA para a dona do espaço (human-in-the-loop) — o agente
nunca fecha venda, negocia desconto fora de faixa, ou lida com cancelamento sozinho. Depois
da confirmação da dona, o sistema gera um contrato (template com merge de variáveis) e
agenda o evento. Há também um CRM (funil de leads) e um dashboard de métricas.

Estados do funil do lead (usar exatamente esses, como union type):
"novo" | "qualificando" | "aguardando_disponibilidade" | "tirando_duvidas" |
"pronto_para_fechar" | "aguardando_dona" | "contrato_enviado" | "confirmado" | "perdido"

O QUE VOCÊ DEVE CRIAR:

1. Scaffold do projeto (Vite + React + TS + Tailwind + shadcn/ui instalado e configurado).

2. Design tokens em Tailwind config (paleta de cores, tipografia) — algo neutro e
   profissional, tema claro por padrão, mas com suporte a dark mode via classe.

3. `src/types/index.ts` com os tipos centrais, bem comentados:
   - `Lead` (id, nome, contato, canal: "whatsapp"|"instagram", estado do funil acima,
     evento: tipo, data desejada, convidados, valor estimado, criadoEm, ultimaMensagemEm)
   - `Message` (id, leadId, autor: "cliente"|"agente"|"dona", canal, texto, timestamp,
     tipo: "texto"|"acao_agente" — para renderizar chamadas de tool de forma visível,
     tipo "escalacao" quando o agente aciona a dona)
   - `AgentAction` (representando uma "tool call" visível na conversa: nome da ação —
     ex: "check_availability", "search_knowledge_base", "notify_owner",
     "generate_contract_draft" — parâmetros, resultado, timestamp)
   - `CalendarEvent` (id, leadId, data, tipo de evento, status: "reservado"|"confirmado"|
     "bloqueado")
   - `Contract` (id, leadId, dados do evento, status: "rascunho"|"enviado"|"assinado",
     texto/preview)
   - `DashboardMetric` — pense em 4-6 métricas relevantes (faturamento médio, dias de
     maior fluxo, taxa de conversão do funil, tempo médio até fechamento, dias ociosos)

4. `src/lib/mock-data/` — dados fake realistas e coerentes entre si (uns 8-10 leads em
   estados diferentes do funil, mensagens de conversa condizentes com cada estado, uns
   15-20 eventos na agenda ao longo de 2 meses, 2-3 contratos, métricas de dashboard
   plausíveis). Isso é o que as outras telas vão consumir — capriche na coerência.

5. `src/store/` — um Zustand store simples expondo os mocks acima como "estado do app",
   com actions básicas (ex: moverLeadNoFunil, adicionarMensagem) mesmo que só mexam em
   memória. As telas de outras fases vão ler/escrever aqui.

6. Layout base: `src/App.tsx` com React Router configurado, e um shell de layout
   (`src/components/layout/AppShell.tsx`) com sidebar de navegação fixa (ícones + labels:
   Inbox, CRM, Agenda, Contratos, Dashboard) e área de conteúdo. Crie as 5 rotas já
   apontando para componentes placeholder simples (`<div>Em construção: Inbox</div>` etc)
   em `src/features/{inbox,crm,agenda,contratos,dashboard}/index.tsx` — são esses
   arquivos que os próximos agentes vão substituir.

7. CONVENÇÃO OBRIGATÓRIA para o modo demo (fase futura): todo elemento clicável ou
   relevante para a jornada guiada (botões, cards de lead, itens de menu, campos de
   formulário) deve ter um atributo `data-demo-id="algo-descritivo-e-unico"`. Documente
   essa convenção num arquivo `CONTRIBUTING.md` na raiz, com uma lista dos data-demo-id
   que você já criou no shell (ex: "nav-inbox", "nav-crm", "nav-agenda", "nav-contratos",
   "nav-dashboard") para os próximos agentes seguirem o padrão.

8. Um arquivo `ARCHITECTURE.md` na raiz explicando: estrutura de pastas, como rodar o
   projeto, os tipos centrais, e uma seção clara "REGRAS PARA AGENTES DA FASE 1" dizendo:
   só editar dentro de `src/features/<sua-feature>/`, nunca editar `src/types`,
   `src/lib/mock-data`, `src/store`, `src/App.tsx`, `src/components/layout` — se precisar
   de um tipo ou mock novo, criar localmente dentro da própria feature ou sinalizar no
   README que falta algo lá.

Ao final, rode o projeto e confirme que builda sem erro e que a navegação entre as 5
rotas placeholder funciona.
```

---

## FASE 1 — Prompts para as panes paralelas (rodar DEPOIS da Fase 0 pronta)

Cada prompt abaixo é para uma pane separada. Cole o `ARCHITECTURE.md` e o conteúdo de
`src/types/index.ts` (ou peça pro agente ler esses arquivos primeiro) no início de cada
sessão, se o overclock.sh não injetar contexto de arquivo automaticamente.

### Pane B — Inbox unificado

```
Leia src/ARCHITECTURE.md e src/types/index.ts antes de começar. Você só pode criar/editar
arquivos dentro de src/features/inbox/ — não edite nada fora dessa pasta.

Construa a tela de Inbox unificado: lista de conversas à esquerda (mostrando canal via
ícone WhatsApp/Instagram, nome do lead, última mensagem, badge do estado do funil),
e a conversa selecionada à direita como um chat.

Pontos importantes de UX que tornam isso uma boa DEMO do produto (não só um chat comum):
- Mensagens do tipo "acao_agente" (tool calls) devem aparecer visualmente DIFERENTES de
  mensagens de texto normais — um card discreto tipo "🔍 Agente verificou disponibilidade
  para 15/12 → Disponível" ou "📋 Agente consultou base de conhecimento". Isso é o que
  mostra o "trabalho" do agente, não só a resposta final.
- Mensagens do tipo "escalacao" (quando o agente aciona a dona) devem ter destaque visual
  forte (cor de alerta, ícone), com um texto tipo "🔔 Agente escalou para [dona]: lead
  pronto para fechar, evento em 15/12, R$X".
- Cada card de conversa e cada tipo de mensagem/ação precisa de data-demo-id (siga a
  convenção do CONTRIBUTING.md), pois esta tela vai ser usada no modo demo automático.
- Use os dados do Zustand store (mock) — não invente state paralelo.

Capriche na diferenciação visual entre "cliente falando", "agente respondendo",
"agente executando ação/tool call" e "agente escalando para humano" — esses 4 estados
visuais são o coração da demo.
```

### Pane C — CRM (funil de leads)

```
Leia src/ARCHITECTURE.md e src/types/index.ts antes de começar. Você só pode criar/editar
arquivos dentro de src/features/crm/ — não edite nada fora dessa pasta.

Construa a tela de CRM como um Kanban board, uma coluna por estado do funil (use a union
type Lead.estado de types/index.ts, na ordem: novo, qualificando,
aguardando_disponibilidade, tirando_duvidas, pronto_para_fechar, aguardando_dona,
contrato_enviado, confirmado — mostre "perdido" como uma coluna colapsável à parte ou um
filtro, para não poluir o board principal).

Cada card de lead mostra: nome, canal (ícone), tipo de evento, data desejada, valor
estimado, tempo desde a última interação. Cards devem ser arrastáveis entre colunas
(drag and drop) atualizando o estado no Zustand store — mesmo sendo mock, isso deixa a
demo interativa.

Ao clicar num card, abra um painel/modal lateral com detalhe do lead (histórico resumido,
dados do evento) e um botão de atalho "Ver conversa" (pode só navegar para a rota do
Inbox passando o leadId, mesmo que a integração completa entre features não seja seu
foco — um link simples já resolve).

Todo elemento relevante (colunas, cards, botão de detalhe) precisa de data-demo-id.
```

### Pane D — Agenda

```
Leia src/ARCHITECTURE.md e src/types/index.ts antes de começar. Você só pode criar/editar
arquivos dentro de src/features/agenda/ — não edite nada fora dessa pasta.

Construa uma visão de calendário mensal usando os CalendarEvent do mock data. Cada dia
com evento mostra um indicador colorido por status (reservado/confirmado/bloqueado). Dias
sem eventos ficam neutros. Ao clicar num dia com evento, mostra um popover/modal com os
detalhes (tipo de evento, lead vinculado, status).

Adicione também uma pequena visão auxiliar (pode ser um toggle "mês/lista") mostrando os
próximos eventos confirmados em formato de lista — isso ajuda tanto a demo quanto o uso
real por uma pessoa não-técnica.

Todo elemento relevante precisa de data-demo-id, incluindo cada dia clicável do
calendário (ex: "agenda-dia-2026-09-15").
```

### Pane E — Contract maker

```
Leia src/ARCHITECTURE.md e src/types/index.ts antes de começar. Você só pode criar/editar
arquivos dentro de src/features/contratos/ — não edite nada fora dessa pasta.

Construa a tela de geração de contrato em duas partes lado a lado:
1. Um formulário à esquerda com os dados do evento (pré-preenchido a partir de um Lead
   selecionado via dropdown ou state) — nome do cliente, tipo de evento, data, número de
   convidados, valor, forma de pagamento, cláusulas opcionais (checkbox: "inclui buffet",
   "inclui decoração" etc, mockado).
2. Uma preview do contrato à direita, em formato de documento (fonte serifada, layout de
   papel), que atualiza em tempo real conforme o formulário muda — simulando o "merge de
   variáveis" no texto template do contrato.

Adicione um botão "Enviar para assinatura" que simula o envio (muda o status do Contract
no store para "enviado" e mostra um toast/confirmação) — não precisa gerar PDF real nem
integrar e-signature de verdade, é só a simulação visual do fluxo.

Todo elemento relevante precisa de data-demo-id.
```

### Pane F — Dashboard

```
Leia src/ARCHITECTURE.md e src/types/index.ts antes de começar. Você só pode criar/editar
arquivos dentro de src/features/dashboard/ — não edite nada fora dessa pasta.

Construa o dashboard de métricas usando os DashboardMetric do mock data. Inclua pelo
menos: faturamento médio (com tendência), taxa de conversão do funil (novo → confirmado,
como um funil visual), dias da semana com maior fluxo de eventos (gráfico de barras),
dias ociosos no período, e tempo médio até fechamento.

Antes de escolher cores e construir os gráficos, use a skill "dataviz" se ela estiver
disponível no seu ambiente (ela define paleta e padrões de gráfico consistentes) — se não
estiver disponível, mantenha os gráficos na mesma paleta de cor do resto do app (definida
no Tailwind config da Fase 0), sem introduzir cores novas.

Layout em grid de cards/KPIs no topo + 2-3 gráficos maiores abaixo. Todo elemento
relevante precisa de data-demo-id.
```

---

## FASE 2 — Prompt para o motor de Demo Automática (rodar sozinho, por último)

```
Leia src/ARCHITECTURE.md, src/types/index.ts e percorra as pastas de
src/features/{inbox,crm,agenda,contratos,dashboard}/ para levantar todos os data-demo-id
já existentes no projeto antes de começar. Você pode criar arquivos novos em
src/features/demo/ e em src/components/demo/, e pode editar src/App.tsx e o AppShell
APENAS para adicionar o botão/entrada do modo demo e o overlay global — não altere a
lógica interna das outras features.

OBJETIVO: criar um modo "Iniciar Demo" que reproduz automaticamente uma jornada guiada
pelo sistema inteiro, com um cursor virtual se movendo na tela, cliques simulados, e
modais explicativos pausando em pontos-chave — como um tour guiado que "se dirige
sozinho".

COMO CONSTRUIR:

1. `src/features/demo/script.ts` — um roteiro declarativo (array de "steps"), cada step
   com um shape tipo:
   { type: "navigate", to: "/inbox" } |
   { type: "moveCursorTo", target: "[data-demo-id=...]", duration: 800 } |
   { type: "click", target: "[data-demo-id=...]" } |
   { type: "highlight", target: "[data-demo-id=...]" } |
   { type: "explain", title: string, text: string, position?: "top"|"bottom"|"center" } |
   { type: "wait", ms: number }

   Escreva um roteiro de uns 15-20 steps contando a jornada completa: começa no Inbox
   mostrando uma conversa com o agente qualificando um lead (destaca mensagens de tool
   call), mostra a checagem de disponibilidade, mostra a escalação para a dona, navega
   pro CRM e mostra o card se movendo para "aguardando_dona" (ou já mostra o estado
   final, já que drag real automatizado é mais complexo — tudo bem simplificar aqui),
   navega pra tela de Contrato mostrando o preview sendo preenchido, navega pra Agenda
   mostrando o evento confirmado aparecendo, e termina no Dashboard mostrando as métricas.
   Cada "explain" deve ter um texto curto (1-3 frases) em português explicando o que está
   acontecendo E por que aquilo importa pro negócio (não só descrever a tela).

2. `src/components/demo/VirtualCursor.tsx` — um elemento posicionado com position:fixed,
   animado via Framer Motion (layout animation ou animate com x/y) que se move até a
   posição (getBoundingClientRect) do elemento alvo de cada step. Inclua uma pequena
   animação de "clique" (escala/ripple) no momento do type "click".

3. `src/components/demo/DemoOverlay.tsx` — camada global (só visível quando o demo está
   ativo) que: escurece levemente o fundo fora do elemento em destaque (spotlight/highlight
   no elemento do data-demo-id atual), renderiza os modais do tipo "explain" com botões
   "Pausar/Continuar", "Pular", "Anterior", e uma barra de progresso mostrando em que
   step da jornada o usuário está. Steps do tipo "explain" pausam o avanço automático até
   o usuário clicar "Continuar" (ou avançam sozinhos depois de N segundos, configurável).

4. `src/features/demo/useDemoPlayer.ts` — hook/máquina de estados que percorre o
   script.ts sequencialmente, disparando navegação real via React Router quando o step é
   "navigate", aplicando classe de highlight no elemento certo, e coordenando timing
   entre os steps.

5. Adicione um botão "▶ Iniciar Demo" bem visível no AppShell (topo ou sidebar) que
   inicia o player a partir do step 0, e um botão flutuante "Sair do modo demo" visível
   enquanto o demo roda.

IMPORTANTE: se algum data-demo-id referenciado no seu script.ts não existir de fato no
DOM (elemento não encontrado), o player deve pular esse step silenciosamente (com um
console.warn) em vez de travar — telas construídas por outros agentes podem ter usado
IDs um pouco diferentes do esperado, então torne o player resiliente a isso.

Ao final, teste rodando o demo do início ao fim e ajuste os IDs que não baterem.
```
