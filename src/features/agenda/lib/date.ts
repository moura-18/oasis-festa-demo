/**
 * Helpers de data para a Agenda. Trabalha sempre com ano/mês/dia como
 * inteiros (não `Date.toISOString()`) para evitar bugs de fuso horário ao
 * converter de/para as strings `YYYY-MM-DD` usadas em `CalendarEvent.data`.
 */

export const NOMES_MES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export const DIAS_SEMANA_ABREV = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Formata ano/mês(1-indexado)/dia como `YYYY-MM-DD`. */
export function toISODate(year: number, month1: number, day: number): string {
  return `${year}-${pad2(month1)}-${pad2(day)}`;
}

/** Extrai `{ year, month0, day }` (mês 0-indexado) de uma string `YYYY-MM-DD`. */
export function parseISODate(iso: string): { year: number; month0: number; day: number } {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month0: month - 1, day };
}

export interface CalendarDayCell {
  year: number;
  /** Mês 1-indexado (compatível com `toISODate`). */
  month1: number;
  day: number;
  iso: string;
  /** `false` para dias de preenchimento do mês anterior/seguinte. */
  isCurrentMonth: boolean;
  isToday: boolean;
}

/**
 * Monta a grade do calendário mensal (semanas começando no domingo),
 * incluindo dias de preenchimento do mês anterior/seguinte para completar
 * semanas de 7 dias.
 */
export function buildMonthGrid(year: number, month0: number): CalendarDayCell[][] {
  const firstOfMonth = new Date(year, month0, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month0, 0).getDate();

  const today = new Date();
  const todayIso = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < startWeekday; i++) {
    const day = daysInPrevMonth - startWeekday + 1 + i;
    const prevMonth0 = month0 === 0 ? 11 : month0 - 1;
    const prevYear = month0 === 0 ? year - 1 : year;
    const iso = toISODate(prevYear, prevMonth0 + 1, day);
    cells.push({
      year: prevYear,
      month1: prevMonth0 + 1,
      day,
      iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toISODate(year, month0 + 1, day);
    cells.push({
      year,
      month1: month0 + 1,
      day,
      iso,
      isCurrentMonth: true,
      isToday: iso === todayIso,
    });
  }

  const remainder = cells.length % 7;
  if (remainder !== 0) {
    const nextMonth0 = month0 === 11 ? 0 : month0 + 1;
    const nextYear = month0 === 11 ? year + 1 : year;
    const daysToAdd = 7 - remainder;
    for (let day = 1; day <= daysToAdd; day++) {
      const iso = toISODate(nextYear, nextMonth0 + 1, day);
      cells.push({
        year: nextYear,
        month1: nextMonth0 + 1,
        day,
        iso,
        isCurrentMonth: false,
        isToday: iso === todayIso,
      });
    }
  }

  const weeks: CalendarDayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
