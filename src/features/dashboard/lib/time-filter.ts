export type DashboardTimeRangePreset =
  | "hoje"
  | "semana"
  | "mes"
  | "ano"
  | "personalizado";

export interface DashboardDateRange {
  /** Data inicial, inclusive, `YYYY-MM-DD`. */
  from: string;
  /** Data final, inclusive, `YYYY-MM-DD`. */
  to: string;
}

export const TIME_RANGE_PRESET_LABEL: Record<DashboardTimeRangePreset, string> = {
  hoje: "Hoje",
  semana: "Esta semana",
  mes: "Este mês",
  ano: "Este ano",
  personalizado: "Personalizado",
};

export const TIME_RANGE_PRESETS: readonly DashboardTimeRangePreset[] = [
  "hoje",
  "semana",
  "mes",
  "ano",
  "personalizado",
];

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function startOfWeek(d: Date): Date {
  const r = new Date(d);
  r.setDate(r.getDate() - r.getDay());
  return r;
}

/** Resolve o range `[from, to]` (inclusive) de um preset fixo, relativo a `now` (default: data/hora atual do sistema). */
export function rangeForPreset(
  preset: Exclude<DashboardTimeRangePreset, "personalizado">,
  now: Date = new Date(),
): DashboardDateRange {
  switch (preset) {
    case "hoje": {
      const d = isoDate(now);
      return { from: d, to: d };
    }
    case "semana": {
      const start = startOfWeek(now);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { from: isoDate(start), to: isoDate(end) };
    }
    case "mes": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from: isoDate(start), to: isoDate(end) };
    }
    case "ano": {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      return { from: isoDate(start), to: isoDate(end) };
    }
  }
}

/** Testa se uma data (ISO `YYYY-MM-DD` ou datetime completo) cai dentro do range, inclusive. */
export function isWithinRange(dateIso: string, range: DashboardDateRange): boolean {
  const day = dateIso.slice(0, 10);
  return day >= range.from && day <= range.to;
}
