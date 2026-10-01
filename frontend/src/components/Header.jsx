import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_10px_rgba(15,23,42,0.04)] pt-safe transition-all">
      <div className="h-16 px-5 flex items-center justify-between">
        {/* Composição Vertical: Símbolo + Marca "Pulso Saúde" + Subtítulo "Guia de Saúde de Altamira · PA" */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-outline-variant/30 flex items-center justify-center flex-shrink-0 p-1">
            <img
              src="/logo.svg"
              alt="Pulso Saúde"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0 justify-center">
            <h1 className="font-display font-bold text-[17px] text-on-surface tracking-tight leading-none">
              Pulso <span className="text-primary">Saúde</span>
            </h1>
            <div className="flex items-center gap-1 text-[11px] font-medium text-on-surface-variant mt-1 leading-none truncate">
              <span className="material-symbols-outlined text-[13px] text-primary flex-shrink-0">
                location_on
              </span>
              <span>Guia de Saúde de Altamira · PA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

