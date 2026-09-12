# CONTRIBUTING — convenções do projeto

Este projeto é uma demo de um sistema de agente de IA para a **Oásis Festas BH**
(espaço de eventos/casamentos em BH). Ver `ARCHITECTURE.md` para a estrutura de
pastas e as regras de quem pode editar o quê.

## Convenção obrigatória: `data-demo-id`

Uma fase futura do projeto ("Fase 2 — Demo Automática") vai construir um modo
de tour guiado que localiza elementos na tela via `document.querySelector`,
move um cursor virtual até eles, simula cliques e destaca conteúdo. Para isso
funcionar, **todo elemento clicável ou relevante para a jornada guiada precisa
ter um atributo `data-demo-id`**.

### O que precisa de `data-demo-id`

- Botões e links clicáveis (inclusive itens de menu/navegação)
- Cards (de lead, de conversa, de evento, de contrato, de métrica...)
- Campos de formulário relevantes para o roteiro da demo
- Qualquer elemento que um passo do roteiro (`type: "click"`, `"highlight"`,
  `"moveCursorTo"`) precise localizar

Elementos puramente decorativos ou sem relevância para a narrativa da demo
(um ícone dentro de um botão, um divisor visual) não precisam do atributo.

### Formato do valor

`data-demo-id="algo-descritivo-e-unico"` — kebab-case, em português ou inglês
(siga o que já existe na mesma feature), único dentro da página. Prefira o
padrão `<contexto>-<elemento>` ou `<contexto>-<elemento>-<identificador>`:

- Nav global: `nav-inbox`, `nav-crm`, `nav-agenda`, `nav-contratos`, `nav-dashboard`
- Card de lead no Kanban do CRM: `crm-card-lead-06`
- Dia do calendário: `agenda-dia-2026-09-15`
- Botão de enviar contrato: `contrato-btn-enviar-assinatura`

IDs que incorporam o id do dado (ex.: `crm-card-lead-06`, `agenda-dia-<data>`)
são preferíveis a IDs genéricos repetidos — o player da demo (Fase 2) precisa
achar um alvo específico, não "o primeiro card da lista".

### Resiliência esperada da Fase 2

O player de demo (Fase 2) foi projetado para **pular silenciosamente** (com
`console.warn`) qualquer passo cujo `data-demo-id` não seja encontrado no DOM,
em vez de travar. Ainda assim, capriche na consistência: quanto mais fiéis os
IDs forem ao que o roteiro espera, melhor a experiência da demo final.

### `data-demo-id` já existentes (criados na Fase 0 — fundação)

| `data-demo-id`         | Elemento                                          |
| ----------------------- | -------------------------------------------------- |
| `sidebar-logo`          | Logo/nome da marca na sidebar (link para `/inbox`) |
| `nav-inbox`              | Item de navegação → Inbox                          |
| `nav-crm`                | Item de navegação → CRM                            |
| `nav-agenda`             | Item de navegação → Agenda                         |
| `nav-contratos`          | Item de navegação → Contratos                      |
| `nav-dashboard`          | Item de navegação → Dashboard                      |
| `page-inbox-placeholder` | Placeholder da rota `/inbox` (a ser substituído)   |
| `page-crm-placeholder`   | Placeholder da rota `/crm` (a ser substituído)     |
| `page-agenda-placeholder`| Placeholder da rota `/agenda` (a ser substituído)  |
| `page-contratos-placeholder` | Placeholder da rota `/contratos` (a ser substituído) |
| `page-dashboard-placeholder` | Placeholder da rota `/dashboard` (a ser substituído) |

Os `*-placeholder` somem naturalmente quando cada feature for construída —
não precisam ser preservados, mas os `nav-*` e `sidebar-logo` sim, pois
pertencem ao shell (Fase 0, não editável pelas fases seguintes).

## Cores e identidade visual

**Nunca use hex cru (`#1B3B2E`, `#F2921E`, etc.) direto em componentes.** Toda
cor vem dos design tokens do Tailwind, definidos em `src/index.css` a partir
da identidade da Oásis Festas BH (ver `brand/BRAND.md` e a seção "Identidade
visual" em `ARCHITECTURE.md`). Use as classes utilitárias normalmente:

```tsx
// ✅ correto
<div className="bg-brand-green-900 text-sidebar-foreground" />
<Button className="bg-primary text-primary-foreground" />

// ❌ errado
<div style={{ backgroundColor: "#1B3B2E" }} />
```

Isso garante que qualquer ajuste futuro de paleta (ex.: alinhar dark mode)
se propague para todas as telas automaticamente.

## Outras convenções

- Componentes de UI genéricos (não específicos de uma feature) vêm de
  `src/components/ui` (shadcn/ui). Rode `npx shadcn@latest add <componente>`
  para adicionar mais — os arquivos caem em `src/components/ui/*.tsx`
  automaticamente.
- Estado do app vem de `@/store` (Zustand) — não crie estado paralelo em
  `useState` para dados que já existem no store (leads, mensagens, eventos,
  contratos).
- Tipos centrais vêm de `@/types` — não redeclare `Lead`, `Message`, etc.
  dentro de uma feature.
