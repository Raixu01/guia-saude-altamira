import React from "react";

export default function HomeTab({ onNavigate, onOpenComoFunciona }) {
  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-8 max-w-lg mx-auto gap-5 animate-tab-enter">
      {/* Título Oficial da Referência Stitch */}
      <div className="flex flex-col pt-1">
        <h2 className="font-display font-bold text-[24px] sm:text-[26px] text-on-surface tracking-tight leading-tight">
          O que você precisa encontrar hoje?
        </h2>
      </div>

      {/* 3 Cartões de Navegação com Família Visual Unificada Teal/Lavanda */}
      <div className="flex flex-col gap-3">
        {/* Opção 1: Consultas médicas (ÚNICO DOMINANTE EM TEAL) */}
        <button
          onClick={() => onNavigate("medicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-primary text-white shadow-card active:scale-[0.98] transition-all overflow-hidden text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-white text-[28px]">
                stethoscope
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-white leading-tight">
                Consultas médicas
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform z-10">
            <span className="material-symbols-outlined text-white text-[22px]">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 2: Exames (Fundo Branco + Bloco Lavanda Suave) */}
        <button
          onClick={() => onNavigate("exames")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-primary text-[28px]">
                science
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
                Exames
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 3: Serviços (Fundo Branco + Bloco Lavanda Suave) */}
        <button
          onClick={() => onNavigate("servicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-primary text-[28px]">
                medical_services
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
                Serviços
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">
              arrow_forward
            </span>
          </div>
        </button>
      </div>

      {/* Seção Compacta de Emergências em Altamira */}
      <div className="rounded-2xl bg-surface-container-low p-3.5 flex flex-col gap-2 border border-outline-variant/30">
        <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">
          Emergências em Altamira
        </span>
        <div className="flex gap-2">
          <a
            href="tel:192"
            className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-outline-variant/30 active:scale-[0.98] transition-all"
          >
            <span className="font-display font-bold text-[16px] text-error">192</span>
            <span className="text-[12px] font-semibold text-on-surface">SAMU</span>
          </a>
          <a
            href="tel:193"
            className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white rounded-xl shadow-sm border border-outline-variant/30 active:scale-[0.98] transition-all"
          >
            <span className="font-display font-bold text-[16px] text-primary">193</span>
            <span className="text-[12px] font-semibold text-on-surface">Bombeiros</span>
          </a>
        </div>
      </div>

      {/* Ação Compacta: Como Funciona Este Guia (Substitui o bloco longo anterior) */}
      <div className="flex justify-center pt-1">
        <button
          onClick={onOpenComoFunciona}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-[12px] transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>Como funciona este guia · Nossa transparência</span>
        </button>
      </div>
    </div>
  );
}
