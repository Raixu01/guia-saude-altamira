import React from "react";

export default function ModalComoFunciona({ isOpen, onClose, onOpenSugestao }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 max-h-[85vh] overflow-y-auto">
        {/* Topo com Logo PNG */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-center p-1 shadow-xs flex-shrink-0">
              <img
                src="/logo.png"
                alt="Pulso Saúde"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-display font-bold text-[18px] text-on-surface leading-tight">
                Como Funciona o Guia
              </h3>
              <span className="text-[11px] text-on-surface-variant font-medium">
                Pulso Saúde • Altamira · PA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Conteúdo com os 4 Princípios de Honestidade Radical */}
        <div className="flex flex-col gap-3.5 text-[13px] text-on-surface-variant leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1">
            <span className="font-bold text-[14px] text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              1. Honestidade Radical
            </span>
            <p className="text-[12px] text-on-surface-variant">
              Não fazemos promessas irreais de agendamento automático nem mentimos sobre disponibilidade. Nosso papel é fornecer a informação mais correta possível e colocar você em contato direto com o prestador.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1">
            <span className="font-bold text-[14px] text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">chat</span>
              2. Conexão Direta via WhatsApp
            </span>
            <p className="text-[12px] text-on-surface-variant">
              Ao tocar no botão de contato, você abre uma conversa oficial no WhatsApp da clínica, do laboratório ou do médico, com uma mensagem inicial já contextualizada para agilizar o atendimento.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1">
            <span className="font-bold text-[14px] text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              3. Selos de Confirmação
            </span>
            <p className="text-[12px] text-on-surface-variant">
              Sinalizamos com clareza quais informações foram <strong className="text-emerald-700 font-semibold">confirmadas recentemente com o local</strong> e quais vieram de <strong className="text-amber-800 font-semibold">planilhas públicas ou dados em checagem</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1">
            <span className="font-bold text-[14px] text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">group</span>
              4. Construção Comunitária
            </span>
            <p className="text-[12px] text-on-surface-variant">
              Altamira é dinâmica: médicos chegam, horários mudam e novos serviços surgem. Este guia conta com a colaboração de todos para manter os dados vivos.
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
          <button
            onClick={() => {
              onClose();
              if (onOpenSugestao) onOpenSugestao();
            }}
            className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Sugerir Correção ou Novo Contato</span>
          </button>

          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] transition-all active:scale-[0.98] shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
