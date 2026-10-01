import React from "react";
import { Stethoscope, FlaskConical } from "lucide-react";

export default function HomeTab({ onNavigate }) {
  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-8 max-w-lg mx-auto gap-6">
      {/* Título sem "?" e sem frase secundária */}
      <div className="flex flex-col pt-1">
        <h1 className="font-display font-bold text-[24px] sm:text-[26px] text-on-surface tracking-tight leading-tight">
          O que você precisa encontrar hoje
        </h1>
      </div>

      {/* 3 Cartões de Navegação com ícones de traçado preto e nomes exatos */}
      <div className="flex flex-col gap-3.5">
        {/* Opção 1: Consultas médicas */}
        <button
          onClick={() => onNavigate("medicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-primary text-white shadow-card active:scale-[0.98] transition-all overflow-hidden text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/30">
              <Stethoscope className="w-7 h-7 text-black stroke-[2.2]" />
            </div>
            <span className="font-display font-bold text-[19px] text-white leading-tight">
              Consultas médicas
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform z-10">
            <span className="material-symbols-outlined text-white text-[22px]">arrow_forward</span>
          </div>
        </button>

        {/* Opção 2: Exames */}
        <button
          onClick={() => onNavigate("exames")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/30">
              <FlaskConical className="w-7 h-7 text-black stroke-[2.2]" />
            </div>
            <span className="font-display font-bold text-[19px] text-on-surface leading-tight">
              Exames
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">arrow_forward</span>
          </div>
        </button>

        {/* Opção 3: Serviços */}
        <button
          onClick={() => onNavigate("servicos")}
          className="group relative flex items-center justify-between p-4 rounded-2xl bg-white text-on-surface shadow-card active:scale-[0.98] transition-all overflow-hidden border border-outline-variant/30 text-left"
          style={{ minHeight: "84px" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-black text-[30px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}
              >
                medical_services
              </span>
            </div>
            <span className="font-display font-bold text-[19px] text-on-surface leading-tight">
              Serviços
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">arrow_forward</span>
          </div>
        </button>
      </div>

      {/* Discagem Rápida de Emergência */}
      <div className="rounded-2xl bg-surface-container-low p-3.5 flex flex-col gap-2 border border-outline-variant/30 mt-2">
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

      {/* Honestidade Radical */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5">
          policy
        </span>
        <div className="flex flex-col text-[12px] text-on-surface-variant leading-relaxed">
          <span className="font-bold text-on-surface text-[13px] mb-0.5">
            Honestidade Radical
          </span>
          Este guia não promete agendamento automático nem mente sobre filas. Conectamos você diretamente ao WhatsApp do profissional ou clínica local para confirmação direta.
        </div>
      </div>
    </div>
  );
}
