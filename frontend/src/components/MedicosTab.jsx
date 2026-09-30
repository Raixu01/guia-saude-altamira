import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function MedicosTab({ initialSearch = "", onOpenSugestao }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState(null); // objeto ou null
  const [profissionais, setProfissionais] = useState([]);
  const [busca, setBusca] = useState(initialSearch);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  useEffect(() => {
    if (initialSearch) {
      setBusca(initialSearch);
      buscarProfissionais(null, initialSearch);
    }
  }, [initialSearch]);

  async function carregarEspecialidades() {
    try {
      const data = await api.getEspecialidades();
      setEspecialidades(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function selecionarEspecialidade(esp) {
    setEspecialidadeAtiva(esp);
    setCarregando(true);
    try {
      const data = await api.getProfissionais(esp.slug, busca);
      setProfissionais(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  async function buscarProfissionais(esp, termo) {
    setCarregando(true);
    try {
      const slug = esp ? esp.slug : "";
      const data = await api.getProfissionais(slug, termo);
      setProfissionais(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  function handleBuscaChange(e) {
    const val = e.target.value;
    setBusca(val);
    buscarProfissionais(especialidadeAtiva, val);
  }

  function voltarParaEspecialidades() {
    setEspecialidadeAtiva(null);
    setProfissionais([]);
    if (!busca) {
      carregarEspecialidades();
    }
  }

  // Monta link oficial do WhatsApp com mensagem contextualizada
  function buildWhatsappUrl(numero, nomeMedico) {
    const numLimpo = numero.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá! Encontrei o contato do ${nomeMedico} pelo Guia de Saúde de Altamira e gostaria de informações sobre agendamento de consulta.`
    );
    return `https://wa.me/${numLimpo}?text=${msg}`;
  }

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-12 max-w-lg mx-auto gap-4">
      {/* Barra de Busca de Médicos */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={busca}
          onChange={handleBuscaChange}
          placeholder="Buscar médico por nome ou CRM..."
          className="w-full h-12 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              buscarProfissionais(especialidadeAtiva, "");
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Visão 1: Se não escolheu especialidade e não está buscando, mostra catálogo de especialidades */}
      {!especialidadeAtiva && !busca && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-[20px] text-on-surface">
              Especialidades Médicas
            </h2>
            <span className="text-[12px] font-semibold text-primary">
              {especialidades.length} disponíveis
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {especialidades.map((esp) => (
              <button
                key={esp.id}
                onClick={() => selecionarEspecialidade(esp)}
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-white shadow-soft hover:bg-surface-container-low transition-all active:scale-[0.98] border border-outline-variant/30 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {esp.icone || "medical_services"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-[16px] text-on-surface">
                      {esp.nome}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">
                      {esp.total_profissionais === 1
                        ? "1 profissional cadastrado"
                        : `${esp.total_profissionais} profissionais cadastrados`}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Visão 2: Lista de Médicos (quando especialidade selecionada ou busca ativa) */}
      {(especialidadeAtiva || busca) && (
        <div className="flex flex-col gap-4">
          {/* Topo de navegação / Voltar */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={voltarParaEspecialidades}
              className="inline-flex items-center gap-1.5 text-primary font-bold text-[14px] py-1 active:opacity-75"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span>Todas as Especialidades</span>
            </button>
            {especialidadeAtiva && (
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {especialidadeAtiva.nome}
              </span>
            )}
          </div>

          {carregando ? (
            <div className="py-12 flex flex-col items-center justify-center text-on-surface-variant gap-2">
              <span className="material-symbols-outlined animate-spin text-[32px] text-primary">
                progress_activity
              </span>
              <span className="text-[13px]">Buscando profissionais...</span>
            </div>
          ) : profissionais.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-outline-variant/30 flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
                person_search
              </span>
              <span className="font-bold text-[16px] text-on-surface">
                Nenhum profissional encontrado
              </span>
              <p className="text-[12px] text-on-surface-variant">
                Conhece algum médico atendendo nesta especialidade em Altamira?
              </p>
              <button
                onClick={onOpenSugestao}
                className="mt-1 px-4 py-2 rounded-xl bg-primary text-white font-bold text-[13px]"
              >
                Indicar Médico
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {profissionais.map((prof) => {
                const local = prof.locais_atendimento?.[0]?.estabelecimento;
                const zapNumber = local?.whatsapp || "5593999990001";
                const isVerificado = prof.status_verificacao === "verificado";

                return (
                  <article
                    key={prof.id}
                    className="w-full bg-white rounded-3xl p-5 shadow-card border border-outline-variant/30 flex flex-col gap-3.5 transition-all"
                  >
                    {/* Cabeçalho do Card */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Selo de Verificação / Incerteza */}
                        <div className="mb-1.5">
                          {isVerificado ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                              <span className="material-symbols-outlined text-[13px]">verified</span>
                              Confirmado {prof.data_ultima_verificacao && `(${prof.data_ultima_verificacao})`}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                              <span className="material-symbols-outlined text-[13px]">info</span>
                              Dado de planilha pública
                            </span>
                          )}
                        </div>

                        <h3 className="font-display font-bold text-[18px] text-on-surface leading-tight">
                          {prof.nome}
                        </h3>
                        <p className="text-[13px] text-primary font-semibold mt-0.5">
                          {prof.subtitulo || prof.especialidade?.nome} • {prof.registro_conselho}
                        </p>
                      </div>

                      {/* Avatar / Foto */}
                      <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/40 shadow-inner">
                        {prof.avatar_url ? (
                          <img
                            src={prof.avatar_url}
                            alt={prof.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[28px]">person</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Local de Atendimento e Endereço */}
                    {local && (
                      <div className="bg-surface-container-low rounded-2xl p-3.5 flex flex-col gap-1.5 border border-outline-variant/20">
                        <div className="flex items-center gap-1.5 font-bold text-[13px] text-on-surface">
                          <span className="material-symbols-outlined text-[18px] text-primary">domain</span>
                          <span>{local.nome}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-[12px] text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0 mt-0.5">
                            location_on
                          </span>
                          <span>{local.endereco}</span>
                        </div>
                      </div>
                    )}

                    {/* Ações: WhatsApp + Maps + Instagram */}
                    <div className="flex flex-col gap-2 pt-1">
                      {/* Botão Oficial WhatsApp */}
                      <a
                        href={buildWhatsappUrl(zapNumber, prof.nome)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[50px] rounded-2xl bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
                      >
                        <span className="material-symbols-outlined text-[22px]">chat</span>
                        <span>Conversar no WhatsApp</span>
                      </a>

                      {/* Botões Secundários: Google Maps & Instagram */}
                      <div className="grid grid-cols-2 gap-2">
                        {local?.google_maps_url ? (
                          <a
                            href={local.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] rounded-xl bg-surface-container text-on-surface font-semibold text-[13px] flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px] text-primary">directions</span>
                            <span>Ver no Maps</span>
                          </a>
                        ) : (
                          <div className="min-h-[44px] rounded-xl bg-surface-container/50 text-on-surface-variant text-[12px] flex items-center justify-center">
                            Altamira - PA
                          </div>
                        )}

                        {local?.instagram_url ? (
                          <a
                            href={local.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] rounded-xl bg-surface-container text-on-surface font-semibold text-[13px] flex items-center justify-center gap-1.5 active:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px] text-amber-600">photo_camera</span>
                            <span>Instagram</span>
                          </a>
                        ) : (
                          <button
                            onClick={onOpenSugestao}
                            className="min-h-[44px] rounded-xl bg-surface-container text-on-surface-variant text-[12px] flex items-center justify-center gap-1 hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            <span>Sugerir Correção</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
