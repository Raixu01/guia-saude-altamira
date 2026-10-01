import React, { useState } from "react";
import { api } from "../api";

export default function ModalSugestao({ isOpen, onClose }) {
  const [mensagem, setMensagem] = useState("");
  const [contato, setContato] = useState("");
  const [tipo, setTipo] = useState("profissional");
  const [statusEnvio, setStatusEnvio] = useState(null); // 'enviando', 'sucesso', 'erro'

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!mensagem.trim()) return;

    setStatusEnvio("enviando");
    try {
      await api.enviarSugestao({
        tipo_entidade: tipo,
        mensagem: mensagem.trim(),
        contato_colaborador: contato.trim() || undefined,
      });
      setStatusEnvio("sucesso");
      setTimeout(() => {
        setStatusEnvio(null);
        setMensagem("");
        setContato("");
        onClose();
      }, 1500);
    } catch {
      setStatusEnvio("erro");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 max-h-[90vh] overflow-y-auto animate-tab-enter">
        {/* Topo do Modal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              campaign
            </span>
            <h3 className="font-display font-bold text-[19px] text-on-surface">
              Fale com a gente
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Mensagem de Apoio */}
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          Viu um contato errado ou conhece um serviço que falta aqui? Sua informação ajuda Altamira inteira.
        </p>

        {statusEnvio === "sucesso" ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">check_circle</span>
            <div className="flex flex-col">
              <span className="font-bold text-[14px]">Muito obrigado!</span>
              <span className="text-[12px]">Sua informação foi enviada para atualização.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-[12px] font-semibold text-on-surface mb-1">
                Tipo de informação
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="profissional">Médico / Especialidade</option>
                <option value="exame">Exame ou Laboratório</option>
                <option value="servico">Farmácia / Enfermagem / Cuidados</option>
                <option value="outro">Outra informação ou sugestão</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-on-surface mb-1">
                Qual é a correção ou novo contato? *
              </label>
              <textarea
                required
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Ex: O Dr. Fulano agora atende no Centro Médico e o WhatsApp é..."
                className="w-full p-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant/60"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-on-surface mb-1">
                Seu contato (opcional)
              </label>
              <input
                type="text"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                placeholder="Seu WhatsApp ou email caso precisemos tirar dúvidas"
                className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant/60"
              />
            </div>

            <button
              type="submit"
              disabled={statusEnvio === "enviando"}
              className="w-full h-12 mt-1 rounded-xl bg-[#005C55] hover:bg-[#0F766E] text-white font-bold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
            >
              {statusEnvio === "enviando" ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[19px]">send</span>
                  <span>Enviar Informação</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
