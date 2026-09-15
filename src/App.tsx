import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import InboxPage from "@/features/inbox";
import CrmPage from "@/features/crm";
import AgendaPage from "@/features/agenda";
import ContratosPage from "@/features/contratos";
import DashboardPage from "@/features/dashboard";
import PropostaPage from "@/features/proposta";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de proposta comercial — fora do AppShell de propósito: é
            uma landing page autônoma (identidade da Balmor), não uma tela
            do produto interno. */}
        <Route path="proposta" element={<PropostaPage />} />
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/inbox" replace />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="crm" element={<CrmPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="contratos" element={<ContratosPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/inbox" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
