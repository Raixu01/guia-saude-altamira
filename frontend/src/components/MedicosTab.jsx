import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function MedicosTab({ initialSearch = "", onOpenSugestao }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState(null);
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

  function buildWhatsappUrl(numero, nomeMedico) {
    const numLimpo = numero ? numero.replace(/\D/g, "") : "5593999990001";
    const msg = encodeURIComponent(
      `Olá! Encontrei o contato do ${nomeMedico} pelo Guia de Saúde de Altamira e gostaria de informações sobre agendamento de consulta.`
    );
    return `https://wa.me/${numLimpo}?text=${msg}`;
  }

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-12 max-w-lg mx-auto gap-4 animate-tab-enter">
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
          className="w-full h-12 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              buscarProfissionais(especialidadeAtiva, "");
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Visão 1: Catálogo de Especialidades (padrão Stitch) */}
      {!especialidadeAtiva && !busca && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pt-1">
            <h2 className="font-display font-bold text-[20px] text-on-surface">
              Especialidades Médicas
            </h2>
            <span className="text-[12px] font-semibold text-primary">
              {especialidades.length} áreas
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {especialidades.map((esp) => (
              <button
                key={esp.id}
                onClick={() => selecionarEspecialidade(esp)}
                className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-white shadow-soft hover:bg-surface-container-low transition-all active:scale-[0.98] border border-outline-variant/30 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {esp.icone || "medical_services"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-[16px] text-on-surface leading-snug">
                      {esp.nome}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">
                      {esp.total_profissionais === 1
                        ? "1 profissional disponível"
                        : `${esp.total_profissionais} profissionais disponíveis`}
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
        <div className="flex flex-col gap-3.5">
          {/* Topo de navegação / Voltar */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={voltarParaEspecialidades}
              className="inline-flex items-center gap-1 text-primary font-bold text-[13px] py-1 active:opacity-75"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Especialidades</span>
            </button>
            {especialidadeAtiva && (
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {especialidadeAtiva.nome}
              </span>
            )}
          </div>

          {/* Skeletons durante carregamento */}
          {carregando ? (
            <div className="flex flex-col gap-3.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-full bg-white rounded-3xl p-5 shadow-card border border-outline-variant/20 flex flex-col gap-3"
                >
                  <div className="w-28 h-5 rounded-full skeleton-box" />
                  <div className="w-48 h-6 rounded-lg skeleton-box" />
                  <div className="w-36 h-4 rounded skeleton-box" />
                  <div className="w-full h-16 rounded-2xl skeleton-box" />
                  <div className="w-full h-12 rounded-2xl skeleton-box" />
                </div>
              ))}
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
                Conhece algum médico atendendo nesta área em Altamira?
              </p>
              <button
                onClick={onOpenSugestao}
                className="mt-1 px-4 py-2 rounded-xl bg-primary text-white font-bold text-[13px] active:scale-[0.98]"
              >
                Indicar Médico
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {profissionais.map((prof) => {
                const local = prof.locais_atendimento?.[0]?.estabelecimento;
                const zapNumber = local?.whatsapp || "5593999990001";
                const telFixo = local?.telefone_fixo;
                const isVerificado = prof.status_verificacao === "verificado";

                return (
                  <article
                    key={prof.id}
                    className="w-full bg-white rounded-3xl p-4.5 sm:p-5 shadow-card border border-outline-variant/30 flex flex-col gap-3 transition-all"
                  >
                    {/* 1. Selo de Confirmação no Topo */}
                    <div className="flex items-center justify-between">
                      {isVerificado ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          Confirmado recentemente
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          Dado de planilha pública
                        </span>
                      )}
                    </div>

                    {/* 2. Nome e CRM */}
                    <div className="flex flex-col">
                      <h3 className="font-display font-bold text-[18px] text-on-surface leading-tight">
                        {prof.nome}
                      </h3>
                      <p className="text-[13px] text-primary font-semibold mt-0.5">
                        {prof.subtitulo || prof.especialidade?.nome} • {prof.registro_conselho}
                      </p>
                    </div>

                    {/* 3. Local de Atendimento */}
                    {local && (
                      <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-1 border border-outline-variant/20">
                        <div className="flex items-center gap-1.5 font-bold text-[13px] text-on-surface">
                          <span className="material-symbols-outlined text-[17px] text-primary">domain</span>
                          <span>{local.nome}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-[12px] text-on-surface-variant">
                          <span className="material-symbols-outlined text-[15px] text-primary flex-shrink-0 mt-0.5">
                            location_on
                          </span>
                          <span>{local.endereco}</span>
                        </div>
                      </div>
                    )}

                    {/* 4. Ação Dominante: WhatsApp */}
                    <a
                      href={buildWhatsappUrl(zapNumber, prof.nome)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[50px] rounded-2xl bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <span className="material-symbols-outlined text-[22px]">chat</span>
                      <span>Conversar no WhatsApp</span>
                    </a>

                    {/* 5. Ações Secundárias Compactas: Ligar, Maps, Instagram e Sugerir */}
                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/15 text-[12px]">
                      <div className="flex items-center gap-2">
                        {telFixo && (
                          <a
                            href={`tel:${telFixo.replace(/\D/g, "")}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:text-primary font-medium"
                          >
                            <span className="material-symbols-outlined text-[15px]">call</span>
                            <span>Ligar</span>
                          </a>
                        )}

                        {local?.google_maps_url && (
                          <a
                            href={local.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:text-primary font-medium"
                            title="Ver rota no Google Maps"
                          >
                            <span className="material-symbols-outlined text-[15px] text-primary">directions</span>
                            <span>Maps</span>
                          </a>
                        )}

                        {local?.instagram_url && (
                          <a
                            href={local.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:text-amber-700 font-medium"
                          >
                            <span className="material-symbols-outlined text-[15px] text-amber-600">photo_camera</span>
                            <span>Instagram</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={onOpenSugestao}
                        className="text-on-surface-variant hover:text-primary transition-colors text-[11px] underline py-1"
                      >
                        Sugerir correção
                      </button>
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
