import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TIME_RANGE_PRESETS,
  TIME_RANGE_PRESET_LABEL,
  type DashboardTimeRangePreset,
} from "../lib/time-filter";

interface TimeRangeFilterProps {
  preset: DashboardTimeRangePreset;
  onPresetChange: (preset: DashboardTimeRangePreset) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
}

/**
 * Filtro de período do Dashboard (Hoje / Esta semana / Este mês / Este ano /
 * Personalizado). Controla os dados exibidos no indicador de canal e no
 * gráfico de fluxo por dia da semana — ver `dashboard/lib/time-filter.ts` e
 * `dashboard/index.tsx`.
 */
export function TimeRangeFilter({
  preset,
  onPresetChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: TimeRangeFilterProps) {
  return (
    <div
      data-demo-id="dashboard-time-filter"
      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
    >
      <Tabs
        value={preset}
        onValueChange={(value) =>
          onPresetChange(value as DashboardTimeRangePreset)
        }
      >
        <TabsList data-demo-id="dashboard-time-filter-tabs">
          {TIME_RANGE_PRESETS.map((p) => (
            <TabsTrigger key={p} value={p} data-demo-id={`dashboard-time-filter-${p}`}>
              {TIME_RANGE_PRESET_LABEL[p]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {preset === "personalizado" && (
        <div
          data-demo-id="dashboard-time-filter-custom"
          className="flex items-center gap-2"
        >
          <input
            type="date"
            value={customFrom}
            max={customTo || undefined}
            onChange={(event) => onCustomFromChange(event.target.value)}
            data-demo-id="dashboard-time-filter-custom-from"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <span className="text-sm text-muted-foreground">até</span>
          <input
            type="date"
            value={customTo}
            min={customFrom || undefined}
            onChange={(event) => onCustomToChange(event.target.value)}
            data-demo-id="dashboard-time-filter-custom-to"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
