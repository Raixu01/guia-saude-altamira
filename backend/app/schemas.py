from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field

# Base Schema com from_attributes
class SchemaBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

# --- Estabelecimentos ---
class EstabelecimentoBase(SchemaBase):
    nome: str
    tipo: str = "clinica"
    endereco: str
    bairro: str
    cidade: str = "Altamira - PA"
    telefone_fixo: Optional[str] = None
    whatsapp: Optional[str] = None
    google_maps_url: Optional[str] = None
    instagram_url: Optional[str] = None
    status_verificacao: str = "informado_planilha"
    data_ultima_verificacao: Optional[str] = None

class EstabelecimentoCreate(EstabelecimentoBase):
    pass

class EstabelecimentoResponse(EstabelecimentoBase):
    id: str

# --- Especialidades ---
class EspecialidadeBase(SchemaBase):
    nome: str
    slug: str
    descricao: Optional[str] = None
    icone: str = "medical_services"
    ordem: int = 0

class EspecialidadeCreate(EspecialidadeBase):
    pass

class EspecialidadeResponse(EspecialidadeBase):
    id: str
    total_profissionais: Optional[int] = 0

# --- Profissionais ---
class LocalAtendimentoResponse(SchemaBase):
    estabelecimento: EstabelecimentoResponse
    dias_atendimento: Optional[str] = None
    observacoes: Optional[str] = None

class ProfissionalBase(SchemaBase):
    nome: str
    registro_conselho: str
    subtitulo: Optional[str] = None
    avatar_url: Optional[str] = None
    especialidade_id: str
    status_verificacao: str = "informado_planilha"
    data_ultima_verificacao: Optional[str] = None
    ativo: bool = True

class ProfissionalCreate(ProfissionalBase):
    estabelecimento_ids: Optional[List[str]] = Field(default_factory=list)

class ProfissionalResponse(ProfissionalBase):
    id: str
    especialidade: Optional[EspecialidadeBase] = None
    locais_atendimento: List[LocalAtendimentoResponse] = Field(default_factory=list)

# --- Exames ---
class LocalExameResponse(SchemaBase):
    estabelecimento: EstabelecimentoResponse
    status_confirmacao: str = "a_confirmar"
    observacoes: Optional[str] = None

class ExameBase(SchemaBase):
    nome: str
    categoria: str = "geral"
    letra_inicial: str
    preparo_basico: Optional[str] = None

class ExameCreate(ExameBase):
    pass

class ExameResponse(ExameBase):
    id: str
    estabelecimentos: List[LocalExameResponse] = Field(default_factory=list)

# --- Serviços de Saúde ---
class ServicoSaudeBase(SchemaBase):
    categoria: str
    titulo: str
    responsavel: Optional[str] = None
    horario_funcionamento: Optional[str] = None
    endereco: Optional[str] = None
    bairro: Optional[str] = None
    whatsapp: str
    google_maps_url: Optional[str] = None
    atendimento_domiciliar: bool = False
    tags: Optional[str] = None
    status_verificacao: str = "informado_planilha"

class ServicoSaudeCreate(ServicoSaudeBase):
    pass

class ServicoSaudeResponse(ServicoSaudeBase):
    id: str

# --- Sugestões de Correção Cidadã ---
class SugestaoCorrecaoCreate(BaseModel):
    tipo_entidade: str = "outro"
    entidade_id: Optional[str] = None
    mensagem: str
    contato_colaborador: Optional[str] = None

class SugestaoCorrecaoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    tipo_entidade: str
    entidade_id: Optional[str]
    mensagem: str
    contato_colaborador: Optional[str]
    status: str
    created_at: datetime
