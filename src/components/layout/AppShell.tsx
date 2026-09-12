import { NavLink, Outlet } from "react-router-dom";
import {
  Inbox,
  KanbanSquare,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Play,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/features/demo/useDemoPlayer";
import { DemoOverlay } from "@/components/demo/DemoOverlay";
import { VirtualCursor } from "@/components/demo/VirtualCursor";

/**
 * Itens da navegação principal. `demoId` segue a convenção documentada em
 * CONTRIBUTING.md — novas seções de navegação devem seguir o mesmo padrão
 * `nav-<slug>`.
 */
const NAV_ITEMS = [
  { to: "/inbox", label: "Inbox", icon: Inbox, demoId: "nav-inbox" },
  { to: "/crm", label: "CRM", icon: KanbanSquare, demoId: "nav-crm" },
  { to: "/agenda", label: "Agenda", icon: CalendarDays, demoId: "nav-agenda" },
  {
    to: "/contratos",
    label: "Contratos",
    icon: FileText,
    demoId: "nav-contratos",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    demoId: "nav-dashboard",
  },
] as const;

/**
 * Shell de layout fixo do app: sidebar de navegação (verde escuro da marca)
 * + área de conteúdo (`<Outlet />`, onde o React Router renderiza a rota
 * ativa). Editado apenas na Fase 0 — ver regras em ARCHITECTURE.md.
 */
export function AppShell() {
  const demoActive = useDemoStore((s) => s.active);
  const startDemo = useDemoStore((s) => s.start);
  const exitDemo = useDemoStore((s) => s.exit);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <aside className="flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <NavLink
          to="/inbox"
          data-demo-id="sidebar-logo"
          className="flex items-center gap-2 px-5 py-5"
        >
          <img
            src="/brand/oasis-logo.png"
            alt="Oásis Festas"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-display text-lg leading-tight text-sidebar-foreground">
            Oásis Festas
          </span>
        </NavLink>

        <div className="px-3">
          <button
            type="button"
            data-demo-id="demo-iniciar"
            onClick={startDemo}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <Play className="size-4 fill-current" />
            Iniciar Demo
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon, demoId }) => (
            <NavLink
              key={to}
              to={to}
              data-demo-id={demoId}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-foreground/60">
          Agente de IA — demo interna
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>

      {demoActive && (
        <button
          type="button"
          data-demo-id="demo-sair"
          onClick={exitDemo}
          className="fixed right-5 top-5 z-[97] flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          <X className="size-4" />
          Sair do modo demo
        </button>
      )}

      <DemoOverlay />
      <VirtualCursor />
    </div>
  );
}
