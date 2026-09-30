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
      }, 1600);
    } catch {
      setStatusEnvio("erro");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
            <h3 className="font-display font-bold text-[18px] text-on-surface">
              Colaboração Cidadã
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          Encontrou algum número desatualizado, novo médico ou exame em Altamira?
          Ajude a manter este guia comunitário 100% confiável.
        </p>

        {statusEnvio === "sucesso" ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">check_circle</span>
            <div className="flex flex-col">
              <span className="font-bold text-[14px]">Muito obrigado!</span>
              <span className="text-[12px]">Sua contribuição foi registrada com sucesso.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-on-surface mb-1">
                Sobre o que é a sua contribuição?
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="profissional">Médico / Profissional de Saúde</option>
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
                placeholder="Ex: O Dr. Fulano agora atende no Centro Médico Xingu e o WhatsApp é (93) 99123-4567..."
                className="w-full p-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-[14px] text-on-surface border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={statusEnvio === "enviando"}
              className="w-full h-12 mt-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[14px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            >
              {statusEnvio === "enviando" ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Enviar Contribuição</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
