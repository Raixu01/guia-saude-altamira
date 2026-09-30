import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Boolean,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

class Especialidade(Base):
    __tablename__ = "especialidades"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    nome = Column(String(100), nullable=False, unique=True, index=True)
    slug = Column(String(100), nullable=False, unique=True, index=True)
    descricao = Column(Text, nullable=True)
    icone = Column(String(50), default="medical_services")
    ordem = Column(Integer, default=0)

    profissionais = relationship("Profissional", back_populates="especialidade")

class Estabelecimento(Base):
    __tablename__ = "estabelecimentos"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    nome = Column(String(150), nullable=False, index=True)
    tipo = Column(String(50), default="clinica")  # clinica, hospital, laboratorio, farmacia
    endereco = Column(Text, nullable=False)
    bairro = Column(String(100), nullable=False)
    cidade = Column(String(100), default="Altamira - PA")
    telefone_fixo = Column(String(30), nullable=True)
    whatsapp = Column(String(30), nullable=True)
    google_maps_url = Column(Text, nullable=True)
    instagram_url = Column(Text, nullable=True)
    status_verificacao = Column(String(50), default="informado_planilha")  # verificado, informado_planilha
    data_ultima_verificacao = Column(String(50), nullable=True)

    profissionais_associados = relationship(
        "ProfissionalEstabelecimento", back_populates="estabelecimento"
    )
    exames_oferecidos = relationship(
        "ExameEstabelecimento", back_populates="estabelecimento"
    )

class Profissional(Base):
    __tablename__ = "profissionais"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    nome = Column(String(150), nullable=False, index=True)
    registro_conselho = Column(String(50), nullable=False)  # ex: CRM-PA 5892
    subtitulo = Column(String(100), nullable=True)  # ex: Cardiologia Pediátrica
    avatar_url = Column(Text, nullable=True)
    especialidade_id = Column(String(36), ForeignKey("especialidades.id"), nullable=False)
    status_verificacao = Column(String(50), default="informado_planilha")  # verificado, informado_planilha
    data_ultima_verificacao = Column(String(50), nullable=True)
    ativo = Column(Boolean, default=True)

    especialidade = relationship("Especialidade", back_populates="profissionais")
    locais_atendimento = relationship(
        "ProfissionalEstabelecimento", back_populates="profissional"
    )

class ProfissionalEstabelecimento(Base):
    __tablename__ = "profissionais_estabelecimentos"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profissional_id = Column(String(36), ForeignKey("profissionais.id"), nullable=False)
    estabelecimento_id = Column(String(36), ForeignKey("estabelecimentos.id"), nullable=False)
    dias_atendimento = Column(String(150), nullable=True)
    observacoes = Column(Text, nullable=True)

    profissional = relationship("Profissional", back_populates="locais_atendimento")
    estabelecimento = relationship("Estabelecimento", back_populates="profissionais_associados")

class Exame(Base):
    __tablename__ = "exames"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    nome = Column(String(200), nullable=False, index=True)
    categoria = Column(String(50), default="geral")  # sangue, imagem, cardiologico
    letra_inicial = Column(String(1), nullable=False, index=True)  # A, B, C...
    preparo_basico = Column(Text, nullable=True)

    estabelecimentos = relationship("ExameEstabelecimento", back_populates="exame")

class ExameEstabelecimento(Base):
    __tablename__ = "exames_estabelecimentos"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    exame_id = Column(String(36), ForeignKey("exames.id"), nullable=False)
    estabelecimento_id = Column(String(36), ForeignKey("estabelecimentos.id"), nullable=False)
    status_confirmacao = Column(String(50), default="a_confirmar")  # confirmado, a_confirmar
    observacoes = Column(Text, nullable=True)

    exame = relationship("Exame", back_populates="estabelecimentos")
    estabelecimento = relationship("Estabelecimento", back_populates="exames_oferecidos")

class ServicoSaude(Base):
    """
    Serviços complementares de saúde em Altamira (conforme Screen 05 do Stitch):
    - Serviços Farmacêuticos (Farmácias 24h, injetáveis, nebulização)
    - Assistência de Enfermagem (Home care, curativos especiais, sondagem)
    - Cuidados & Acompanhamento (Cuidadores de idosos, fisioterapia domiciliar)
    """
    __tablename__ = "servicos_saude"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    categoria = Column(String(50), nullable=False, index=True)  # farmaceutico, enfermagem, cuidados
    titulo = Column(String(150), nullable=False, index=True)
    responsavel = Column(String(150), nullable=True)
    horario_funcionamento = Column(String(100), nullable=True)
    endereco = Column(Text, nullable=True)
    bairro = Column(String(100), nullable=True)
    whatsapp = Column(String(30), nullable=False)
    google_maps_url = Column(Text, nullable=True)
    atendimento_domiciliar = Column(Boolean, default=False)
    tags = Column(Text, nullable=True)  # Lista separada por vírgulas
    status_verificacao = Column(String(50), default="informado_planilha")

class SugestaoCorrecao(Base):
    __tablename__ = "sugestoes_correcao"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tipo_entidade = Column(String(50), default="outro")  # profissional, estabelecimento, exame, servico
    entidade_id = Column(String(36), nullable=True)
    mensagem = Column(Text, nullable=False)
    contato_colaborador = Column(String(100), nullable=True)
    status = Column(String(50), default="pendente")  # pendente, analisado, incorporado
    created_at = Column(DateTime, default=datetime.utcnow)
