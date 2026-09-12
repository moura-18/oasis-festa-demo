# ARCHITECTURE — Oásis Festas BH · demo do agente de IA

Demo **frontend-only** (sem backend real, tudo em mock data) de um sistema de
agente de IA que atende WhatsApp/Instagram de um espaço de eventos, qualifica
leads, checa disponibilidade, tira dúvidas e escala para a dona do espaço
quando o cliente está pronto para fechar (human-in-the-loop). Depois da
aprovação da dona, o sistema gera contrato e agenda o evento. Há também um CRM
(funil de leads) e um Dashboard de métricas.

Este documento é o mapa do projeto para os agentes que vão construir as telas
(Fase 1) em cima da fundação criada aqui (Fase 0).

## Stack

- **Vite + React 19 + TypeScript** — sem SSR, build rápido.
- **Tailwind CSS v4** (config CSS-first, sem `tailwind.config.js` — os tokens
  ficam em `src/index.css`) + **shadcn/ui** (`src/components/ui`).
- **Zustand** — estado global em memória (`src/store`).
- **React Router v7** — navegação entre as 5 telas.
- **Framer Motion** — já instalado, reservado para a Fase 2 (cursor virtual /
  animações do modo demo).

## Como rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # type-check (tsc -b) + build de produção
npm run lint       # eslint
```

## Estrutura de pastas

```
brand/                     Identidade visual do cliente real (não faz parte do build)
public/brand/               Logo servida pelo Vite (favicon + sidebar)
src/
  types/index.ts            Tipos centrais — o CONTRATO do projeto (ver abaixo)
  lib/
    mock-data/               Dados fake coerentes entre si (leads, mensagens, agenda, contratos, dashboard)
    utils.ts                 Helper `cn` (classnames + tailwind-merge)
  store/index.ts             Store Zustand — único lugar de estado do app
  components/
    layout/AppShell.tsx      Sidebar de navegação + área de conteúdo
    ui/                       Componentes shadcn/ui (Button, Card, Dialog, ...)
  features/
    inbox/index.tsx           Rota /inbox      (placeholder — Fase 1)
    crm/index.tsx              Rota /crm        (placeholder — Fase 1)
    agenda/index.tsx           Rota /agenda     (placeholder — Fase 1)
    contratos/index.tsx        Rota /contratos  (placeholder — Fase 1)
    dashboard/index.tsx        Rota /dashboard  (placeholder — Fase 1)
  App.tsx                     React Router — só as 5 rotas acima
  main.tsx                    Entry point
```

## Tipos centrais (`src/types/index.ts`)

Todos bem comentados no próprio arquivo; resumo:

- **`Lead`** — um lead do funil (nome, contato, `canal`, `estado` no funil,
  dados do evento desejado, timestamps).
- **`LeadFunilEstado`** — união fechada e EXATA dos 9 estados do funil:
  `"novo" | "qualificando" | "aguardando_disponibilidade" | "tirando_duvidas" |
  "pronto_para_fechar" | "aguardando_dona" | "contrato_enviado" | "confirmado" |
  "perdido"`. Também exportamos `ORDEM_FUNIL` com a ordem canônica das colunas
  do Kanban (exclui `"perdido"`, tratado à parte no CRM).
- **`Message`** — mensagem de uma conversa. `tipo` diferencia texto comum
  (`"texto"`) de ações do agente visíveis na conversa (`"acao_agente"`) e da
  escalação para a dona (`"escalacao"`). Quando `tipo` é `"acao_agente"` ou
  `"escalacao"`, o campo `acao` traz os detalhes estruturados.
- **`AgentAction`** — uma "tool call" do agente (`check_availability`,
  `search_knowledge_base`, `notify_owner`, `generate_contract_draft`), com
  parâmetros e resultado.
- **`CalendarEvent`** — um evento na agenda (`reservado` | `confirmado` |
  `bloqueado`), opcionalmente ligado a um `leadId`.
- **`Contract`** — contrato gerado por merge de variáveis a partir de um lead
  aprovado pela dona (`rascunho` | `enviado` | `assinado`).
- **`DashboardData`** — agregado consumido pelo Dashboard: `metricas`
  (6 KPIs — faturamento médio, taxa de conversão do funil, tempo médio até
  fechamento, dias ociosos, leads ativos, ticket médio), `funilConversao`
  (quantidade de leads por estado) e `fluxoPorDiaSemana` (eventos por dia da
  semana, para o gráfico de dias de maior fluxo).

## Mock data (`src/lib/mock-data/`)

Dados coerentes entre si e pensados para servir de material de demo real:

- **10 leads** (`leads.ts`), cobrindo os 9 estados do funil (2 em
  `"qualificando"`). `lead-06` (Juliana & Thiago) é a jornada mais completa —
  inclui checagem de disponibilidade, consulta à base de conhecimento e a
  escalação para a dona, útil como roteiro de referência para a Fase 2.
- **Mensagens** (`messages.ts`) por lead, condizentes com o estado de cada um
  — incluindo os 4 tipos de `AgentAction` e a escalação.
- **20 eventos de agenda** (`calendar-events.ts`) entre 11/set e 28/nov/2026.
  Coerentes com as conversas (ex.: o bloqueio em 14/11 é o motivo do
  `lead-03` não conseguir essa data). A maioria cai em sábado/domingo de
  propósito, para sustentar o insight de "dias de maior fluxo" no Dashboard.
- **3 contratos** (`contracts.ts`), um por status (`rascunho`, `enviado`,
  `assinado`), atrelados aos leads `lead-06`, `lead-07` e `lead-08`.
- **`dashboardData`** (`dashboard.ts`), calculado a partir da distribuição
  real dos leads/eventos acima.

Importe sempre pelo barrel `@/lib/mock-data` (ou, preferencialmente, pelo
store — ver abaixo), nunca pelos arquivos individuais.

## Store (`src/store/index.ts`)

Zustand store único, inicializado a partir do mock data. Ações disponíveis:
`moverLeadNoFunil`, `atualizarLead`, `adicionarMensagem`, `atualizarContrato`,
`adicionarContrato`, `adicionarEventoAgenda`. Tudo em memória — recarregar a
página reseta para o mock data original (esperado para uma demo).

```tsx
const leads = useAppStore((s) => s.leads);
const moverLeadNoFunil = useAppStore((s) => s.moverLeadNoFunil);
```

## Identidade visual

O demo usa a identidade real da **Oásis Festas BH** (ver `brand/BRAND.md` e
`brand/oasis-logo.png`, fornecidos pelo cliente): conceito tropical/natureza,
elegante e romântico. Os design tokens ficam em `src/index.css` (Tailwind v4,
CSS-first — não há `tailwind.config.js`):

- **Verde escuro** (`--brand-green-900` / `#1B3B2E`, escala `brand-green-50`
  a `brand-green-950`) — cor de marca, usada na sidebar/header
  (`--sidebar`, `--sidebar-accent`, etc.).
- **Laranja** (`--brand-orange-500` / `#F2921E`, escala `brand-orange-50` a
  `brand-orange-950`) — cor de ação/CTA (`--primary`), usada em botões
  primários e em estados de destaque (ex.: "pronto para fechar", escalação).
- Neutros (`--background`, `--foreground`, `--muted`, `--border`, ...) para o
  restante da UI, para não cansar visualmente um painel de uso diário.
- Tema claro por padrão; dark mode via classe `.dark` no root, invertendo
  para fundo verde bem escuro (`--brand-green-950`), conforme especificado
  pelo cliente.
- Tipografia: **Inter** (`font-sans`, UI de produto) e **Playfair Display**
  (`font-display`, uso pontual em elementos de marca, ex. nome na sidebar).

**Regra:** sempre consumir cor via classe Tailwind (`bg-primary`,
`text-brand-green-900`, `bg-sidebar`...), nunca hex cru em componentes — ver
CONTRIBUTING.md.

## Convenção `data-demo-id`

Documentada em detalhe em `CONTRIBUTING.md` (obrigatória para todo elemento
clicável/relevante — prepara o terreno para o modo de demo automática da
Fase 2).

---

## REGRAS PARA AGENTES DA FASE 1

Cada agente da Fase 1 constrói **uma** das 5 telas. Para o trabalho em
paralelo não gerar conflito nem inconsistência:

1. **Só edite dentro de `src/features/<sua-feature>/`.** Pode criar quantos
   arquivos/subpastas quiser ali dentro (componentes, hooks, helpers locais).
2. **Nunca edite:**
   - `src/types/` (tipos centrais)
   - `src/lib/mock-data/` (dados mockados)
   - `src/store/` (estado global)
   - `src/App.tsx` (rotas)
   - `src/components/layout/` (shell/sidebar)
   - `src/index.css`, `components.json` (design tokens / config do shadcn)
3. **Se precisar de um tipo novo** que não existe em `@/types` (ex.: um tipo
   de UI puramente local, tipo `KanbanColuna`), **crie dentro da sua própria
   feature** (ex.: `src/features/crm/types.ts`). Não estenda nem duplique os
   tipos centrais.
4. **Se precisar de mock data que não existe**, ou perceber que os dados
   atuais são insuficientes/inconsistentes para sua tela, **não edite
   `src/lib/mock-data/` diretamente** — crie mocks locais complementares
   dentro da sua feature (ex.: `src/features/dashboard/mock-extra.ts`) e
   **sinalize no README/PR** que falta algo na fundação, para uma correção
   centralizada depois.
5. **Use os componentes de `src/components/ui`** (shadcn/ui) como base;
   adicione novos com `npx shadcn@latest add <componente>` se precisar (isso
   só cria arquivos em `src/components/ui/`, não conflita com outras
   features).
6. **Leia e escreva dados via `@/store`** (Zustand) — não crie estado
   paralelo para leads/mensagens/eventos/contratos.
7. **Siga a convenção `data-demo-id`** em todo elemento clicável/relevante —
   ver CONTRIBUTING.md.
8. **Nunca hardcode cor em hex** — use os tokens Tailwind (`bg-primary`,
   `bg-brand-green-900`, etc.) — ver seção "Identidade visual" acima.
