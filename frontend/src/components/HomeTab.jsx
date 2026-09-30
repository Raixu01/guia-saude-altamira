import React, { useState } from "react";

export default function HomeTab({ onNavigate, onSearchGlobal }) {
  const [termoBusca, setTermoBusca] = useState("");

  function handleBuscaSubmit(e) {
    e.preventDefault();
    if (termoBusca.trim()) {
      onSearchGlobal(termoBusca.trim());
    }
  }

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-8 max-w-lg mx-auto gap-5">
      {/* Título Acolhedor */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-bold text-[24px] sm:text-[26px] text-on-surface tracking-tight leading-tight">
          O que você precisa encontrar hoje?
        </h1>
        <p className="text-[13px] text-on-surface-variant">
          Contatos diretos, especialidades e locais de exames em Altamira-PA.
        </p>
      </div>

      {/* Campo de Busca Rápida */}
      <form onSubmit={handleBuscaSubmit} className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Busque médico, especialidade ou exame..."
          className="w-full h-13 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {termoBusca && (
          <button
            type="button"
            onClick={() => setTermoBusca("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </form>

      {/* 3 Cartões Táteis de Alto Contraste (Consultas, Exames, Serviços) */}
      <div className="flex flex-col gap-3">
        {/* Card Consultas */}
        <button
          onClick={() => onNavigate("medicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-primary text-white shadow-card active:scale-[0.98] transition-all overflow-hidden text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="text-[28px]" role="img" aria-label="Estetoscópio">🩺</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-white leading-tight">
                Consultas Médicas
              </span>
              <span className="text-[12px] text-white/80 mt-0.5">
                Cardiologia, Pediatria, Ortopedia e mais
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform z-10">
            <span className="material-symbols-outlined text-white text-[20px]">arrow_forward</span>
          </div>
        </button>

        {/* Card Exames */}
        <button
          onClick={() => onNavigate("exames")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0">
              <span className="text-[28px]" role="img" aria-label="Microscópio">🔬</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
                Exames & Laboratórios
              </span>
              <span className="text-[12px] text-on-surface-variant mt-0.5">
                Catálogo A-Z, ultrassom, sangue e imagem
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_forward</span>
          </div>
        </button>

        {/* Card Serviços de Saúde */}
        <button
          onClick={() => onNavigate("servicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-[28px]">medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
                Serviços de Saúde
              </span>
              <span className="text-[12px] text-on-surface-variant mt-0.5">
                Farmácias 24h, home care e cuidadores
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_forward</span>
          </div>
        </button>
      </div>

      {/* Discagem Rápida de Emergência (1 toque) */}
      <div className="rounded-2xl bg-surface-container-low p-3.5 flex flex-col gap-2 border border-outline-variant/30">
        <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">
          Emergências em Altamira
        </span>
        <div className="flex gap-2">
          <a
            href="tel:192"
            className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-outline-variant/30 active:scale-98 transition-all"
          >
            <span className="font-display font-bold text-[16px] text-error">192</span>
            <span className="text-[12px] font-semibold text-on-surface">SAMU</span>
          </a>
          <a
            href="tel:193"
            className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-outline-variant/30 active:scale-98 transition-all"
          >
            <span className="font-display font-bold text-[16px] text-primary">193</span>
            <span className="text-[12px] font-semibold text-on-surface">Bombeiros</span>
          </a>
        </div>
      </div>

      {/* Manifesto de Honestidade Radical */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5">
          policy
        </span>
        <div className="flex flex-col text-[12px] text-on-surface-variant leading-relaxed">
          <span className="font-bold text-on-surface text-[13px] mb-0.5">
            Honestidade Radical
          </span>
          Este guia não promete agendamento automático nem mente sobre filas. Conectamos você diretamente ao WhatsApp do profissional ou clínica local para que você confirme horários com clareza.
        </div>
      </div>
    </div>
  );
}
