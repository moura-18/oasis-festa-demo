import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Página de proposta comercial (Balmor → Oásis Festas BH), página autônoma
 * fora do AppShell, com a identidade visual da própria Balmor — cores e logo
 * reais (ver public/proposta/). Rota: /proposta (ver src/App.tsx). Ainda não
 * linkada em nenhuma navegação interna — é para compartilhar o link
 * diretamente.
 *
 * Paleta oficial Balmor (tema claro): Carbono #0D0F0F (texto), Mineral
 * #F3F2EB (fundo), Brasa #E9392F (destaque), Branco #FFFFFF (cartões).
 */

const WHATSAPP_NUMBER = "5531936182965";
const WHATSAPP_TEXT = encodeURIComponent(
  "Oi Balmor, vi a proposta interativa da Oásis Festas",
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

/**
 * Anima a entrada de uma seção quando ela cruza o viewport, via
 * IntersectionObserver + transição CSS (não Framer Motion/rAF) — mais
 * confiável em abas que não estão em primeiro plano, onde animações
 * dirigidas por requestAnimationFrame podem travar pela metade.
 */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Conteúdo que já está dentro da tela no carregamento fica visível na
    // hora, sem depender do primeiro callback do observer (que pode atrasar
    // — por exemplo, enquanto uma imagem ainda não terminou de definir seu
    // tamanho no layout).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#8a8680] uppercase">
      <span className="inline-block size-1.5 bg-[#e9392f]" />
      {children}
    </p>
  );
}

function BrowserFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#0d0f0f]/10 bg-white shadow-[0_30px_80px_-24px_rgba(13,15,15,0.25)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-[#0d0f0f]/10 bg-[#0d0f0f]/[0.03] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#0d0f0f]/10" />
        <span className="size-2.5 rounded-full bg-[#0d0f0f]/10" />
        <span className="size-2.5 rounded-full bg-[#0d0f0f]/10" />
      </div>
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-['Inter_Tight'] text-5xl font-bold text-[#e9392f] sm:text-6xl">
        {value}
      </p>
      <p className="mt-2 max-w-[22ch] text-[15px] leading-snug text-[#5a5651]">
        {label}
      </p>
    </div>
  );
}

function RedButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-6 py-4 text-[15px] font-medium transition-opacity hover:opacity-90",
        variant === "solid"
          ? "bg-[#e9392f] text-white"
          : "border border-[#0d0f0f]/20 text-[#0d0f0f]",
      )}
    >
      {children}
    </a>
  );
}

function BalmorLogo({ className }: { className?: string }) {
  return (
    <img
      src="/proposta/balmor-logo.png"
      alt="Balmor"
      className={cn("h-6 w-auto", className)}
    />
  );
}

const DIAGNOSTICO = [
  {
    n: "01",
    title: "Resposta fora de horário",
    body: "Cliente pergunta disponibilidade à noite. A resposta só sai no dia seguinte. Nesse tempo, ele já perguntou pra outro espaço.",
  },
  {
    n: "02",
    title: "Funil sem controle",
    body: "Saber quem já recebeu proposta e quem sumiu depende de abrir conversa por conversa no WhatsApp.",
  },
  {
    n: "03",
    title: "Contrato manual",
    body: "Nome, data, convidados e valor são copiados da conversa pro contrato à mão. Erro de digitação vira problema com o cliente.",
  },
];

const COMO_FALA = [
  "Chama o cliente pelo nome.",
  "Responde na hora, sem mensagem genérica.",
  "Confere disponibilidade sozinho antes de responder.",
  "Fechamento e desconto passam sempre pela atendente.",
  "Assina como equipe da Oásis.",
];

const FRENTES = [
  {
    n: "1",
    title: "Atendimento por IA",
    body: "Qualifica o lead, confere disponibilidade e tira dúvida. Escala pra atendente na hora de fechar.",
  },
  {
    n: "2",
    title: "CRM automático",
    body: "Funil atualizado sozinho conforme a conversa avança. Sem copiar nada pra planilha.",
  },
  {
    n: "3",
    title: "Agenda e contrato",
    body: "Disponibilidade sincronizada com o funil. Contrato pronto a partir dos dados do lead.",
  },
  {
    n: "4",
    title: "Painel de gestão",
    body: "Faturamento, conversão e origem dos leads numa tela só.",
  },
];

export default function PropostaPage() {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const prevHref = link?.href;
    if (link) link.href = "/proposta/balmor-favicon.png";
    return () => {
      if (link && prevHref) link.href = prevHref;
    };
  }, []);

  return (
    <div
      className="min-h-dvh bg-[#f3f2eb] text-[#0d0f0f]"
      style={{ fontFamily: "'Inter Tight', Inter, system-ui, sans-serif" }}
    >
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <BalmorLogo />
        <p className="text-xs font-medium tracking-[0.14em] text-[#8a8680] uppercase">
          Proposta · Oásis Festas
        </p>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-1 gap-12 px-6 pt-6 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:pb-32">
        <Reveal>
          <SectionTag>Proposta · Oásis Festas BH</SectionTag>
          <h1 className="mt-6 font-['Inter_Tight'] text-5xl leading-[1.05] font-bold sm:text-6xl">
            Atendimento automático pra Oásis Festas.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[#5a5651]">
            Sistema de atendimento, funil e contrato, rodando com dados reais
            da Oásis. Teste agora, do jeito que vai funcionar no dia a dia.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <RedButton href="#sistema">Ver o funil de leads</RedButton>
            <RedButton href="/inbox" variant="outline">
              Testar o sistema
            </RedButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <BrowserFrame
            src="/proposta/shot-inbox.png"
            alt="Conversa real do sistema: agente confere disponibilidade, consulta a base de conhecimento e escala para a atendente"
          />
        </Reveal>
      </section>

      {/* Diagnóstico */}
      <section className="border-t border-[#0d0f0f]/10 bg-white px-6 py-24 sm:px-10">
        <Reveal>
          <SectionTag>O problema</SectionTag>
          <h2 className="mt-4 max-w-[20ch] font-['Inter_Tight'] text-4xl leading-[1.1] font-bold sm:text-5xl">
            Atendimento de espaço de festa toma tempo todo dia.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {DIAGNOSTICO.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-[#0d0f0f]/10 bg-[#f3f2eb] p-6">
                <p className="text-sm text-[#8a8680]">
                  {item.n} <span className="text-[#e9392f]">/</span>
                </p>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5a5651]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Concierge / sistema em ação */}
      <section id="sistema" className="border-t border-[#0d0f0f]/10 px-6 py-24 sm:px-10">
        <Reveal>
          <SectionTag>O sistema</SectionTag>
          <h2 className="mt-4 max-w-[22ch] font-['Inter_Tight'] text-4xl leading-[1.1] font-bold sm:text-5xl">
            Responde a qualquer hora, com a voz da Oásis.
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[#5a5651]">
            A tela abaixo é o sistema real. O agente confere disponibilidade,
            responde com o valor do pacote e chama a atendente quando o
            cliente já quer fechar.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BrowserFrame
            src="/proposta/shot-inbox.png"
            alt="Inbox do sistema mostrando a conversa completa, do primeiro contato até a escalação para a atendente"
            className="mx-auto mt-12 max-w-3xl"
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-lg font-semibold">Como ele fala</h3>
            <ul className="mt-4 space-y-3">
              {COMO_FALA.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[#5a5651]">
                  <span className="mt-2.5 size-1.5 shrink-0 bg-[#e9392f]" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-8 border-t border-[#0d0f0f]/10 pt-8 sm:grid-cols-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              <StatBlock value="24h" label="agente disponível a qualquer hora" />
              <StatBlock value="3" label="sistemas conectados: conversa, funil e agenda" />
              <StatBlock value="0" label="mensagens sem resposta" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* As 4 frentes */}
      <section className="border-t border-[#0d0f0f]/10 bg-white px-6 py-24 sm:px-10">
        <Reveal>
          <SectionTag>O que está incluso</SectionTag>
          <h2 className="mt-4 max-w-[20ch] font-['Inter_Tight'] text-4xl leading-[1.1] font-bold sm:text-5xl">
            Quatro partes, um sistema só.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {FRENTES.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.06}>
              <div className="flex gap-5 border-t border-[#0d0f0f]/10 pt-6">
                <span className="font-['Inter_Tight'] text-3xl font-bold text-[#e9392f]">
                  {f.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5a5651]">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <BrowserFrame src="/proposta/shot-crm.png" alt="Funil de leads (CRM) do sistema, em formato Kanban" />
          </Reveal>
          <Reveal delay={0.1}>
            <BrowserFrame src="/proposta/shot-dashboard.png" alt="Painel de métricas: faturamento médio, conversão e origem dos leads" />
          </Reveal>
        </div>
      </section>

      {/* Impacto estimado */}
      <section className="border-t border-[#0d0f0f]/10 px-6 py-24 sm:px-10">
        <Reveal>
          <SectionTag>Estimativa</SectionTag>
          <h2 className="mt-4 max-w-[24ch] font-['Inter_Tight'] text-4xl leading-[1.1] font-bold sm:text-5xl">
            Tempo e faturamento, com números da própria Oásis.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[#5a5651]">
            Estimativa, não promessa. Cálculo simples com os dados que já
            estão no funil da Oásis.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-[#0d0f0f]/10 bg-white p-8">
              <p className="text-sm text-[#8a8680]">Tempo</p>
              <p className="mt-3 font-['Inter_Tight'] text-3xl font-bold">
                3 a 4h por semana
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5a5651]">
                Cada conversa nova exige checar disponibilidade e explicar o
                pacote na mão. Com 8 a 10 conversas novas por semana, isso já
                passa de 3 horas. O agente assume essa parte inicial.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-xl border border-[#0d0f0f]/10 bg-white p-8">
              <p className="text-sm text-[#8a8680]">Faturamento</p>
              <p className="mt-3 font-['Inter_Tight'] text-3xl font-bold">
                R$ 32.500 por evento
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5a5651]">
                Ticket médio da própria Oásis, direto do painel. Um casamento
                a mais por trimestre já cobre o investimento.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Investimento */}
      <section className="border-t border-[#0d0f0f]/10 bg-white px-6 py-24 sm:px-10">
        <Reveal>
          <SectionTag>Investimento</SectionTag>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-['Inter_Tight'] text-3xl text-[#8a8680] line-through">
              R$ 17.997
            </span>
            <span className="text-xs font-medium tracking-[0.14em] text-[#8a8680] uppercase">
              Valor de tabela
            </span>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#e9392f] to-[#a3241c] px-8 py-14 text-center">
            <div className="absolute inset-0 backdrop-blur-md" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-xs font-semibold tracking-[0.1em] text-white uppercase">
              Oferta exclusiva · revelada na conversa
            </span>
          </div>

          <div className="mt-8 rounded-xl border border-[#0d0f0f]/10 bg-[#f3f2eb] p-6">
            <h3 className="text-lg font-semibold">Licença de sustentação</h3>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-[#5a5651]">
              Mensalidade que mantém o sistema no ar. Suporte, ajuste e
              atualização inclusos.
            </p>
            <p className="mt-3 text-xs tracking-[0.1em] text-[#8a8680] uppercase">
              Suporte · Manutenção · Ajuste · Sustentação
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="border-t border-[#0d0f0f]/10 px-6 py-28 text-center sm:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] font-['Inter_Tight'] text-4xl leading-[1.1] font-bold sm:text-5xl">
            Vamos colocar isso pra rodar?
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-lg text-[#5a5651]">
            Atendimento rápido, funil organizado, contrato pronto.
          </p>
          <div className="mt-9">
            <RedButton href={WHATSAPP_HREF}>Falar com a Balmor</RedButton>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0d0f0f]/10 px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <BalmorLogo />
          <div className="text-sm text-[#8a8680]">
            <p>contato@balmor.com.br</p>
            <p>balmor.com.br · 31 93618-2965</p>
          </div>
        </div>
        <p className="mt-8 max-w-[70ch] text-xs leading-relaxed text-[#8a8680]">
          As telas desta página são do sistema real, com dados de
          demonstração. É a interface que a Oásis vai usar no dia a dia.
        </p>
      </footer>
    </div>
  );
}
