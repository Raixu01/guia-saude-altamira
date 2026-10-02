import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function ExamesTab({ initialSearch = "", onOpenSugestao }) {
  const [exames, setExames] = useState([]);
  const [letraAtiva, setLetraAtiva] = useState("");
  const [busca, setBusca] = useState(initialSearch);
  const [indiceAlfabetico, setIndiceAlfabetico] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [exameAbertoId, setExameAbertoId] = useState(null);

  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    carregarIndice();
    carregarExames("", initialSearch);
  }, []);

  async function carregarIndice() {
    try {
      const idx = await api.getIndiceAlfabeticoExames();
      setIndiceAlfabetico(idx || {});
    } catch (err) {
      console.error(err);
    }
  }

  async function carregarExames(letra = "", termo = "") {
    setCarregando(true);
    try {
      const data = await api.getExames(letra, termo);
      setExames(data);
      if (data.length > 0 && !exameAbertoId) {
        setExameAbertoId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  function handleLetraClick(letra) {
    if (letraAtiva === letra) {
      setLetraAtiva("");
      carregarExames("", busca);
    } else {
      setLetraAtiva(letra);
      carregarExames(letra, busca);
    }
  }

  function handleBuscaChange(e) {
    const val = e.target.value;
    setBusca(val);
    carregarExames(letraAtiva, val);
  }

  function toggleExame(id) {
    setExameAbertoId(exameAbertoId === id ? null : id);
  }

  function buildWhatsappExameUrl(numero, nomeExame, nomeLab) {
    const numLimpo = numero ? numero.replace(/\D/g, "") : "5593999999999";
    const msg = encodeURIComponent(
      `Olá! Encontrei o contato pelo Guia de Saúde de Altamira e gostaria de confirmar valores, preparo e agendamento para o exame: ${nomeExame}.`
    );
    return `https://wa.me/${numLimpo}?text=${msg}`;
  }

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-12 max-w-lg mx-auto gap-4 animate-tab-enter">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#005C55] text-[24px]">science</span>
          <h2 className="font-display font-bold text-[20px] text-on-surface">
            Catálogo de Exames
          </h2>
        </div>
      </div>

      {/* Campo de Busca Rápida */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={busca}
          onChange={handleBuscaChange}
          placeholder="Digite o nome do exame (ex: Ecocardiograma, Sangue...)"
          className="w-full h-12 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              carregarExames(letraAtiva, "");
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Seletor Alfabético A-Z Otimizado */}
      <div className="flex flex-col gap-1 -mx-4 px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => {
              setLetraAtiva("");
              carregarExames("", busca);
            }}
            className={`h-9 px-3 rounded-xl flex items-center justify-center font-display font-bold text-[12px] transition-all flex-shrink-0 ${
              !letraAtiva
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container"
            }`}
          >
            Todos
          </button>
          {alfabeto.map((letra) => {
            const isActive = letraAtiva === letra;
            const count = indiceAlfabetico[letra] || 0;
            const hasExams = count > 0;

            return (
              <button
                key={letra}
                disabled={!hasExams && !busca}
                onClick={() => handleLetraClick(letra)}
                className={`h-9 min-w-[34px] px-1.5 rounded-xl flex items-center justify-center font-display font-bold text-[13px] transition-all relative flex-shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-md ring-2 ring-primary/20 scale-105"
                    : hasExams
                    ? "bg-white text-on-surface shadow-sm border border-outline-variant/30 hover:bg-surface-container"
                    : "bg-surface-container/30 text-outline-variant opacity-30 cursor-not-allowed"
                }`}
              >
                {letra}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Exames em Acordeão */}
      {carregando ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="w-full h-18 bg-white rounded-2xl p-4 skeleton-box" />
          ))}
        </div>
      ) : exames.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-outline-variant/30 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
            manage_search
          </span>
          <span className="font-bold text-[16px] text-on-surface">
            Nenhum exame encontrado
          </span>
          <p className="text-[12px] text-on-surface-variant">
            Não encontrou o exame que procurava? Informe-nos para adicionarmos.
          </p>
          <button
            onClick={onOpenSugestao}
            className="mt-1 px-4 py-2 rounded-xl bg-primary text-white font-bold text-[13px] active:scale-[0.98]"
          >
            Sugerir Exame
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {exames.map((exame) => {
            const isOpen = exameAbertoId === exame.id;
            return (
              <div
                key={exame.id}
                className="bg-white rounded-2xl shadow-soft border border-outline-variant/30 overflow-hidden transition-all"
              >
                {/* Cabeçalho do Acordeão */}
                <button
                  type="button"
                  onClick={() => toggleExame(exame.id)}
                  className="flex items-center justify-between w-full p-4 text-left select-none hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#D7F8EE] text-[#005C55] flex items-center justify-center flex-shrink-0 font-display font-bold text-[15px]">
                      {exame.letra_inicial}
                    </div>
                    <span className="font-display font-bold text-[15px] text-on-surface leading-snug">
                      {exame.nome}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Conteúdo Expansível com Aviso Prévia e Locais */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-outline-variant/20 bg-surface/40">
                    {/* Aviso Obrigatório Antes da Lista de Laboratórios */}
                    <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-[12px] text-amber-900 flex items-start gap-2">
                      <span className="material-symbols-outlined text-[17px] text-amber-700 flex-shrink-0 mt-0.5">
                        info
                      </span>
                      <div className="leading-snug">
                        <strong className="font-semibold block mb-0.5">Confirmação Prévia:</strong>
                        Confirme valor, preparo, disponibilidade e horário diretamente com o local.
                        {exame.preparo_basico && (
                          <div className="mt-1 pt-1 border-t border-amber-200/60 text-[11.5px]">
                            <strong>Preparo padrão: </strong>{exame.preparo_basico}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lista de Estabelecimentos com Status Específico */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Onde realizar em Altamira:
                      </span>
                      {exame.estabelecimentos?.map((item, idx) => {
                        const est = item.estabelecimento;
                        const zapNumber = est?.whatsapp || "5593999999999";
                        const isConfirmado = item.status_confirmacao === "confirmado";

                        return (
                          <div
                            key={idx}
                            className="bg-white rounded-xl p-3.5 flex flex-col gap-2.5 border border-outline-variant/30 shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex flex-col">
                                <span className="font-display font-bold text-[14px] text-on-surface">
                                  {est.nome}
                                </span>
                                <div className="flex items-center gap-1 text-[12px] text-on-surface-variant mt-0.5">
                                  <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0">
                                    location_on
                                  </span>
                                  <span>{est.endereco}</span>
                                </div>
                              </div>
                              {isConfirmado ? (
                                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                                  Confirmado no local
                                </span>
                              ) : (
                                <span className="text-[10.5px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex-shrink-0">
                                  A confirmar
                                </span>
                              )}
                            </div>

                            {/* Botão de contato direto (Tom Teal da primeira tela) */}
                            <a
                              href={buildWhatsappExameUrl(zapNumber, exame.nome, est.nome)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => api.trackEvent("contact_clicked", { channel: "whatsapp", category: "exame", exame: exame.nome, estabelecimento: est.nome })}
                              className="w-full min-h-[44px] rounded-xl bg-[#005C55] hover:bg-[#0F766E] text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
                            >
                              <span className="material-symbols-outlined text-[18px]">chat</span>
                              <span>Falar com {est.nome}</span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
