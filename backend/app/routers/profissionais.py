from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Profissional, Especialidade, Estabelecimento, ProfissionalEstabelecimento
from app.schemas import (
    ProfissionalResponse,
    ProfissionalCreate,
    LocalAtendimentoResponse,
    EstabelecimentoResponse,
    EspecialidadeBase,
)

router = APIRouter(prefix="/profissionais", tags=["Profissionais"])

def _serializar_profissional(prof: Profissional) -> ProfissionalResponse:
    locais = []
    for pe in prof.locais_atendimento:
        if pe.estabelecimento:
            locais.append(
                LocalAtendimentoResponse(
                    estabelecimento=EstabelecimentoResponse.model_validate(pe.estabelecimento),
                    dias_atendimento=pe.dias_atendimento,
                    observacoes=pe.observacoes,
                )
            )
    
    esp_base = None
    if prof.especialidade:
        esp_base = EspecialidadeBase(
            nome=prof.especialidade.nome,
            slug=prof.especialidade.slug,
            descricao=prof.especialidade.descricao,
            icone=prof.especialidade.icone,
            ordem=prof.especialidade.ordem,
        )

    return ProfissionalResponse(
        id=prof.id,
        nome=prof.nome,
        registro_conselho=prof.registro_conselho,
        subtitulo=prof.subtitulo,
        avatar_url=prof.avatar_url,
        especialidade_id=prof.especialidade_id,
        status_verificacao=prof.status_verificacao,
        data_ultima_verificacao=prof.data_ultima_verificacao,
        ativo=prof.ativo,
        especialidade=esp_base,
        locais_atendimento=locais,
    )

@router.get("", response_model=List[ProfissionalResponse])
def listar_profissionais(
    especialidade_id: Optional[str] = Query(None, description="Filtrar por ID ou Slug da Especialidade"),
    busca: Optional[str] = Query(None, description="Buscar por nome do profissional ou CRM"),
    db: Session = Depends(get_db),
):
    query = (
        db.query(Profissional)
        .options(
            joinedload(Profissional.especialidade),
            joinedload(Profissional.locais_atendimento).joinedload(
                ProfissionalEstabelecimento.estabelecimento
            ),
        )
        .filter(Profissional.ativo == True)
    )

    if especialidade_id:
        # Permite passar tanto ID UUID quanto slug (ex: 'cardiologia')
        esp = (
            db.query(Especialidade)
            .filter((Especialidade.id == especialidade_id) | (Especialidade.slug == especialidade_id))
            .first()
        )
        if esp:
            query = query.filter(Profissional.especialidade_id == esp.id)
        else:
            return []

    if busca:
        termo = f"%{busca}%"
        query = query.filter(
            (Profissional.nome.ilike(termo)) | (Profissional.registro_conselho.ilike(termo))
        )

    profissionais = query.order_by(Profissional.nome).all()
    return [_serializar_profissional(p) for p in profissionais]

@router.get("/{id}", response_model=ProfissionalResponse)
def obter_profissional(id: str, db: Session = Depends(get_db)):
    prof = (
        db.query(Profissional)
        .options(
            joinedload(Profissional.especialidade),
            joinedload(Profissional.locais_atendimento).joinedload(
                ProfissionalEstabelecimento.estabelecimento
            ),
        )
        .filter(Profissional.id == id)
        .first()
    )
    if not prof:
        raise HTTPException(status_code=404, detail="Profissional não encontrado")
    return _serializar_profissional(prof)

@router.post("", response_model=ProfissionalResponse, status_code=201)
def criar_profissional(dados: ProfissionalCreate, db: Session = Depends(get_db)):
    esp = db.query(Especialidade).filter(Especialidade.id == dados.especialidade_id).first()
    if not esp:
        raise HTTPException(status_code=400, detail="Especialidade não encontrada")

    novo_prof = Profissional(
        nome=dados.nome,
        registro_conselho=dados.registro_conselho,
        subtitulo=dados.subtitulo,
        avatar_url=dados.avatar_url,
        especialidade_id=dados.especialidade_id,
        status_verificacao=dados.status_verificacao,
        data_ultima_verificacao=dados.data_ultima_verificacao,
        ativo=dados.ativo,
    )
    db.add(novo_prof)
    db.flush()

    for est_id in dados.estabelecimento_ids:
        est = db.query(Estabelecimento).filter(Estabelecimento.id == est_id).first()
        if est:
            pe = ProfissionalEstabelecimento(
                profissional_id=novo_prof.id,
                estabelecimento_id=est.id,
            )
            db.add(pe)

    db.commit()
    db.refresh(novo_prof)
    return obter_profissional(novo_prof.id, db)
