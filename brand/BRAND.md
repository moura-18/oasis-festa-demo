# Identidade Visual — Oásis Festas BH (cliente real do demo)

O demo está sendo construído com a identidade visual do cliente real: **Oásis Festas**,
espaço de eventos/casamentos em Belo Horizonte (site: oasisfestasbh.com.br).

Logo de referência: `brand/oasis-logo.png` (nesta pasta).

## Conceito
Tropical / natureza / elegante. Espaço de casamentos ao ar livre com área verde,
folhagens, cerimônia na natureza + salão de recepção. Tom romântico e acolhedor.

## Paleta de cores (extraída do logo e do site)
- **Verde escuro (primária/fundo de destaque)**: `#1B3B2E` (variar entre `#13291F` mais escuro
  e `#2A5240` mais claro para hover/estados)
- **Laranja (destaque/CTA, cor da marca "Oasis" no logo)**: `#F2921E` (variar `#E8871A` /
  `#FFA83D` para hover/estados)
- **Neutros de apoio**: branco/off-white (`#FBFAF7`) para fundos claros, cinza-verde escuro
  (`#1F2A24`) para texto em modo escuro
- Tema claro por padrão (fundo neutro/branco, texto escuro), com laranja como cor de ação
  (botões primários, badges de destaque) e verde escuro para headers/sidebar/elementos de
  marca. Dark mode: inverter para fundo verde bem escuro.

## Tipografia
- Títulos/logo: fonte script/cursiva elegante (como no logo) pode ser usada pontualmente em
  headers de marca, mas para UI de produto (dashboard, formulários) prefira uma sans-serif
  limpa e profissional (ex: Inter, já que é um sistema de gestão, não o site institucional).
- Corpo: sans-serif neutra e legível.

## Estilo geral
Profissional mas com um toque orgânico/tropical — cantos levemente arredondados, uso
pontual de motivos de folhagem/natureza em ilustrações ou ícones (sem exagerar, é um
painel de gestão, não o site de marketing). Fotos reais do espaço (quando usadas) mostram
vegetação, cerimônias ao ar livre, decoração romântica.

## Como usar neste projeto
Os design tokens do Tailwind (Fase 0) devem usar essa paleta como base — verde escuro e
laranja como cores de marca, aplicadas com moderação (ex: laranja para CTAs/estados de
destaque como "escalação para dona" ou "pronto para fechar"; verde escuro para
sidebar/header). O restante da UI deve ficar neutro para não cansar visualmente um painel
de uso diário. Todas as fases seguintes (Inbox, CRM, Agenda, Contratos, Dashboard, Demo)
devem consumir as cores via Tailwind config (não hardcode hex nos componentes) para manter
consistência.
