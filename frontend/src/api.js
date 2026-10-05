const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://guia-saude-api.onrender.com/api"
    : "http://localhost:8000/api");

// Dados locais de fallback caso a API não esteja ligada no momento
const FALLBACK_DATA = {
  especialidades: [
    { id: "1", nome: "Cardiologia", slug: "cardiologia", icone: "favorite", total_profissionais: 3 },
    { id: "2", nome: "Pediatria", slug: "pediatria", icone: "child_care", total_profissionais: 1 },
    { id: "3", nome: "Ortopedia", slug: "ortopedia", icone: "format_h4", total_profissionais: 1 },
    { id: "4", nome: "Ginecologia", slug: "ginecologia", icone: "female", total_profissionais: 1 },
    { id: "5", nome: "Clínica Geral", slug: "clinica-geral", icone: "medical_services", total_profissionais: 1 },
    { id: "6", nome: "Oftalmologia", slug: "oftalmologia", icone: "visibility", total_profissionais: 1 },
  ],
  profissionais: [
    {
      id: "p1",
      nome: "Dr. Francisco Schucrutz",
      registro_conselho: "CRM-PA 5892",
      subtitulo: "Cardiologia Geral",
      avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
      especialidade_id: "1",
      status_verificacao: "verificado",
      data_ultima_verificacao: "2026-09-28",
      locais_atendimento: [
        {
          estabelecimento: {
            nome: "Clínica do Coração",
            tipo: "clinica",
            endereco: "Av. Djalma Dutra 1420 - Centro (Próximo à Praça da Bíblia)",
            bairro: "Centro",
            whatsapp: "5593999990001",
            google_maps_url: "https://maps.google.com/?q=Av.+Djalma+Dutra+1420+Altamira+PA",
            instagram_url: "https://instagram.com/clinicadocoracao.atm"
          }
        }
      ]
    },
    {
      id: "p2",
      nome: "Dra. Renata Vasconcelos",
      registro_conselho: "CRM-PA 7310",
      subtitulo: "Cardiologista Pediátrica",
      avatar_url: "https://images.unsplash.com/photo-1594824813572-c518cf59600e?w=150&auto=format&fit=crop&q=80",
      especialidade_id: "1",
      status_verificacao: "verificado",
      data_ultima_verificacao: "2026-09-28",
      locais_atendimento: [
        {
          estabelecimento: {
            nome: "Centro Médico Xingu",
            tipo: "clinica",
            endereco: "Rua 7 de Setembro 385 - Sudam I",
            bairro: "Sudam I",
            whatsapp: "5593999990002",
            google_maps_url: "https://maps.google.com/?q=Rua+7+de+Setembro+385+Altamira+PA",
            instagram_url: "https://instagram.com/drarenatavasconcelos"
          }
        }
      ]
    },
    {
      id: "p3",
      nome: "Dr. Carlos Eduardo Meireles",
      registro_conselho: "CRM-PA 8421",
      subtitulo: "Cardiologia Geral",
      avatar_url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
      especialidade_id: "1",
      status_verificacao: "informado_planilha",
      data_ultima_verificacao: "2026-09-15",
      locais_atendimento: [
        {
          estabelecimento: {
            nome: "Hospital Santo Agostinho",
            tipo: "hospital",
            endereco: "Rua Cel. José Porfírio 1120 - Centro",
            bairro: "Centro",
            whatsapp: "5593999990003",
            google_maps_url: "https://maps.google.com/?q=Rua+Cel+Jose+Porfirio+1120+Altamira+PA"
          }
        }
      ]
    }
  ],
  exames: [
    {
      id: "e1",
      nome: "Ecocardiograma Transtorácico com Doppler",
      categoria: "cardiologico",
      letra_inicial: "E",
      preparo_basico: "Não requer jejum prévio para Doppler. Trazer exames anteriores.",
      estabelecimentos: [
        {
          estabelecimento: {
            nome: "Centro Médico Xingu",
            bairro: "Sudam I",
            whatsapp: "5593999990002",
            google_maps_url: "https://maps.google.com/?q=Rua+7+de+Setembro+385+Altamira+PA",
            instagram_url: "https://instagram.com/centromedicoxingu"
          },
          status_confirmacao: "confirmado"
        },
        {
          estabelecimento: {
            nome: "Hospital Santo Agostinho",
            bairro: "Centro",
            whatsapp: "5593999990003",
            google_maps_url: "https://maps.google.com/?q=Rua+Cel+Jose+Porfirio+1120+Altamira+PA"
          },
          status_confirmacao: "confirmado"
        }
      ]
    },
    {
      id: "e2",
      nome: "Eletrocardiograma (ECG)",
      categoria: "cardiologico",
      letra_inicial: "E",
      preparo_basico: "Repouso de 10 minutos antes. Não usar cremes no peito.",
      estabelecimentos: [
        {
          estabelecimento: {
            nome: "Clínica do Coração",
            bairro: "Centro",
            whatsapp: "5593999990001"
          },
          status_confirmacao: "confirmado"
        }
      ]
    },
    {
      id: "e3",
      nome: "Hemograma Completo",
      categoria: "sangue",
      letra_inicial: "H",
      preparo_basico: "Jejum recomendado de 4 a 8 horas.",
      estabelecimentos: [
        {
          estabelecimento: {
            nome: "Laboratório Biomédico Altamira",
            bairro: "Centro",
            whatsapp: "5593999999999"
          },
          status_confirmacao: "confirmado"
        }
      ]
    }
  ],
  servicos: [
    {
      id: "s1",
      categoria: "farmaceutico",
      titulo: "Farmácia São Lucas",
      responsavel: null,
      horario_funcionamento: null,
      endereco: "Av. Djalma Dutra 840 - Centro",
      bairro: "Centro",
      whatsapp: "5593991234567",
      tags: null,
      status_verificacao: null
    },
    {
      id: "s2",
      categoria: "farmaceutico",
      titulo: "Drogaria Rio Xingu",
      responsavel: null,
      horario_funcionamento: null,
      endereco: "Rua 7 de Setembro 1205 - Sudam I",
      bairro: "Sudam I",
      whatsapp: "5593992345678",
      tags: null,
      status_verificacao: null
    },
    {
      id: "s3",
      categoria: "enfermagem",
      titulo: "Equipe Cuidar Xingu",
      responsavel: "COREN-PA 218.440",
      horario_funcionamento: null,
      endereco: "Atendimento domiciliar em Altamira",
      bairro: "Sudam I",
      whatsapp: "5593981122334",
      atendimento_domiciliar: true,
      tags: null,
      status_verificacao: null
    },
    {
      id: "s4",
      categoria: "cuidados",
      titulo: "Viver Bem Idosos",
      responsavel: null,
      horario_funcionamento: null,
      endereco: "Atendimento em domicílio em Altamira",
      bairro: "Altamira",
      whatsapp: "5593984567890",
      atendimento_domiciliar: true,
      tags: null,
      status_verificacao: null
    }
  ]
};

async function fetchWithFallback(endpoint, fallbackKey, filterFn) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API retornou erro");
  } catch (err) {
    console.warn(`[API Fallback] Falha ao conectar em ${API_URL}${endpoint}. Usando dados locais.`, err);
    let data = FALLBACK_DATA[fallbackKey] || [];
    if (filterFn) {
      data = data.filter(filterFn);
    }
    return data;
  }
}

export const api = {
  async getEspecialidades(busca = "") {
    const query = busca ? `?busca=${encodeURIComponent(busca)}` : "";
    return fetchWithFallback(`/especialidades${query}`, "especialidades", (item) => {
      if (!busca) return true;
      return item.nome.toLowerCase().includes(busca.toLowerCase());
    });
  },

  async getProfissionais(especialidadeSlugOuId = "", busca = "") {
    const params = new URLSearchParams();
    if (especialidadeSlugOuId) params.append("especialidade_id", especialidadeSlugOuId);
    if (busca) params.append("busca", busca);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    return fetchWithFallback(`/profissionais${queryString}`, "profissionais", (item) => {
      let match = true;
      if (busca) {
        match = item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                item.registro_conselho.toLowerCase().includes(busca.toLowerCase());
      }
      return match;
    });
  },

  async getExames(letra = "", busca = "", categoria = "") {
    const params = new URLSearchParams();
    if (letra) params.append("letra", letra);
    if (busca) params.append("busca", busca);
    if (categoria) params.append("categoria", categoria);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    return fetchWithFallback(`/exames${queryString}`, "exames", (item) => {
      let match = true;
      if (letra) match = match && item.letra_inicial.toUpperCase() === letra.toUpperCase();
      if (busca) match = match && item.nome.toLowerCase().includes(busca.toLowerCase());
      if (categoria) match = match && item.categoria.toLowerCase() === categoria.toLowerCase();
      return match;
    });
  },

  async getIndiceAlfabeticoExames() {
    try {
      const res = await fetch(`${API_URL}/exames/indice-alfabetico`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { A: 1, B: 1, C: 1, D: 1, E: 3, G: 1, H: 2, M: 1, P: 1, R: 2, T: 2, U: 2 };
  },

  async getServicos(categoria = "", busca = "") {
    const params = new URLSearchParams();
    if (categoria && categoria !== "todos") params.append("categoria", categoria);
    if (busca) params.append("busca", busca);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    return fetchWithFallback(`/servicos${queryString}`, "servicos", (item) => {
      let match = true;
      if (categoria && categoria !== "todos") match = match && item.categoria === categoria;
      if (busca) {
        const b = busca.toLowerCase();
        match = match && (
          item.titulo.toLowerCase().includes(b) ||
          (item.tags && item.tags.toLowerCase().includes(b))
        );
      }
      return match;
    });
  },

  async enviarSugestao(payload) {
    try {
      const res = await fetch(`${API_URL}/sugestoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
      throw new Error("Erro ao enviar sugestão");
    } catch {
      return { id: "local-ack", status: "registrado_localmente" };
    }
  },

  trackEvent(eventName, properties = {}) {
    const timestamp = new Date().toISOString();
    const eventPayload = { eventName, properties, timestamp };
    try {
      const history = JSON.parse(localStorage.getItem("pulso_telemetry_events") || "[]");
      history.push(eventPayload);
      if (history.length > 50) history.shift();
      localStorage.setItem("pulso_telemetry_events", JSON.stringify(history));
    } catch {
      // Ignora erro de storage
    }
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent("pulso_telemetry", { detail: eventPayload }));
    }
    console.debug(`[Telemetry] ${eventName}`, properties);
  }
};

