from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import Especialidade, Profissional
from app.schemas import EspecialidadeResponse, EspecialidadeCreate

router = APIRouter(prefix="/especialidades", tags=["Especialidades"])

@router.get("", response_model=List[EspecialidadeResponse])
def listar_especialidades(
    busca: Optional[str] = Query(None, description="Filtrar por nome da especialidade"),
    db: Session = Depends(get_db),
):
    """
    Retorna a lista de especialidades médicas ordenadas alfabeticamente ou por relevância,
    com a contagem de profissionais disponíveis em cada uma.
    """
    query = db.query(Especialidade)
    if busca:
        query = query.filter(Especialidade.nome.ilike(f"%{busca}%"))
    
    especialidades = query.order_by(Especialidade.ordem, Especialidade.nome).all()
    
    # Adicionar contagem de profissionais
    resultado = []
    for esp in especialidades:
        count = (
            db.query(func.count(Profissional.id))
            .filter(Profissional.especialidade_id == esp.id, Profissional.ativo == True)
            .scalar()
            or 0
        )
        item = EspecialidadeResponse(
            id=esp.id,
            nome=esp.nome,
            slug=esp.slug,
            descricao=esp.descricao,
            icone=esp.icone,
            ordem=esp.ordem,
            total_profissionais=count,
        )
        resultado.append(item)
    return resultado

@router.get("/{slug_ou_id}", response_model=EspecialidadeResponse)
def obter_especialidade(slug_ou_id: str, db: Session = Depends(get_db)):
    esp = (
        db.query(Especialidade)
        .filter((Especialidade.id == slug_ou_id) | (Especialidade.slug == slug_ou_id))
        .first()
    )
    if not esp:
        raise HTTPException(status_code=404, detail="Especialidade não encontrada")
    
    count = (
        db.query(func.count(Profissional.id))
        .filter(Profissional.especialidade_id == esp.id, Profissional.ativo == True)
        .scalar()
        or 0
    )
    return EspecialidadeResponse(
        id=esp.id,
        nome=esp.nome,
        slug=esp.slug,
        descricao=esp.descricao,
        icone=esp.icone,
        ordem=esp.ordem,
        total_profissionais=count,
    )

@router.post("", response_model=EspecialidadeResponse, status_code=201)
def criar_especialidade(dados: EspecialidadeCreate, db: Session = Depends(get_db)):
    existente = db.query(Especialidade).filter(Especialidade.slug == dados.slug).first()
    if existente:
        raise HTTPException(status_code=400, detail="Especialidade com este slug já existe")
    
    nova = Especialidade(**dados.model_dump())
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return EspecialidadeResponse(
        id=nova.id,
        nome=nova.nome,
        slug=nova.slug,
        descricao=nova.descricao,
        icone=nova.icone,
        ordem=nova.ordem,
        total_profissionais=0,
    )
