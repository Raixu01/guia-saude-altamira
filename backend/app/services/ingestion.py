import os
import re
import pandas as pd
from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models import (
    Especialidade,
    Estabelecimento,
    Profissional,
    ProfissionalEstabelecimento,
    Exame,
    ExameEstabelecimento,
    ServicoSaude,
)

ICONES_ESPECIALIDADES = {
    "cardiologia": "favorite",
    "pediatria": "child_care",
    "ortopedia": "format_h4",
    "ginecologia": "female",
    "clinica geral": "medical_services",
    "oftalmologia": "visibility",
    "dermatologia": "face",
    "neurologia": "psychology",
    "urologia": "healing",
}

def normalizar_slug(texto: str) -> str:
    texto = texto.lower().strip()
    texto = re.sub(r"[àáâãä]", "a", texto)
    texto = re.sub(r"[èéêë]", "e", texto)
    texto = re.sub(r"[ìíîï]", "i", texto)
    texto = re.sub(r"[òóôõö]", "o", texto)
    texto = re.sub(r"[ùúûü]", "u", texto)
    texto = re.sub(r"[ç]", "c", texto)
    texto = re.sub(r"[^a-z0-9]+", "-", texto).strip("-")
    return texto

def normalizar_crm(crm: str) -> str:
    crm = str(crm).strip()
    if not crm or crm.lower() == "nan":
        return "CRM Não informado"
    if not crm.upper().startswith("CRM"):
        return f"CRM-PA {crm}"
    return crm.upper()

def carregar_planilha_profissionais(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"especialidades": 0, "estabelecimentos": 0, "profissionais": 0, "vinculos": 0}

    for _, row in df.iterrows():
        nome_medico = str(row["nome_medico"]).strip()
        if not nome_medico:
            continue

        nome_esp = str(row["especialidade"]).strip()
        slug_esp = normalizar_slug(nome_esp)
        icone_esp = ICONES_ESPECIALIDADES.get(nome_esp.lower(), "medical_services")

        # 1. Especialidade
        esp = db.query(Especialidade).filter(Especialidade.slug == slug_esp).first()
        if not esp:
            esp = Especialidade(nome=nome_esp, slug=slug_esp, icone=icone_esp, ordem=10)
            db.add(esp)
            db.flush()
            stats["especialidades"] += 1

        # 2. Estabelecimento
        nome_est = str(row["estabelecimento"]).strip()
        est = db.query(Estabelecimento).filter(Estabelecimento.nome == nome_est).first()
        if not est:
            est = Estabelecimento(
                nome=nome_est,
                tipo=str(row.get("tipo_estabelecimento", "clinica")).strip() or "clinica",
                endereco=str(row.get("endereco", "Altamira - PA")).strip(),
                bairro=str(row.get("bairro", "Centro")).strip(),
                cidade="Altamira - PA",
                whatsapp=str(row.get("whatsapp", "")).strip(),
                google_maps_url=str(row.get("maps_url", "")).strip(),
                instagram_url=str(row.get("instagram_url", "")).strip(),
                status_verificacao=str(row.get("status_verificacao", "verificado")).strip(),
                data_ultima_verificacao=str(row.get("data_verificacao", "")).strip(),
            )
            db.add(est)
            db.flush()
            stats["estabelecimentos"] += 1

        # 3. Profissional
        crm = normalizar_crm(row.get("crm", ""))
        prof = (
            db.query(Profissional)
            .filter(Profissional.nome == nome_medico, Profissional.especialidade_id == esp.id)
            .first()
        )
        if not prof:
            prof = Profissional(
                nome=nome_medico,
                registro_conselho=crm,
                subtitulo=str(row.get("subtitulo", "")).strip(),
                especialidade_id=esp.id,
                status_verificacao=str(row.get("status_verificacao", "verificado")).strip(),
                data_ultima_verificacao=str(row.get("data_verificacao", "")).strip(),
                ativo=True,
            )
            db.add(prof)
            db.flush()
            stats["profissionais"] += 1

        # 4. Vínculo Profissional <-> Estabelecimento
        vinculo = (
            db.query(ProfissionalEstabelecimento)
            .filter(
                ProfissionalEstabelecimento.profissional_id == prof.id,
                ProfissionalEstabelecimento.estabelecimento_id == est.id,
            )
            .first()
        )
        if not vinculo:
            vinculo = ProfissionalEstabelecimento(
                profissional_id=prof.id,
                estabelecimento_id=est.id,
            )
            db.add(vinculo)
            stats["vinculos"] += 1

    db.commit()
    return stats

def carregar_planilha_exames(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"exames": 0, "estabelecimentos": 0, "vinculos": 0}

    for _, row in df.iterrows():
        nome_exame = str(row["nome_exame"]).strip()
        if not nome_exame:
            continue

        letra = str(row.get("letra_inicial", "")).strip().upper()
        if not letra:
            letra = nome_exame[0].upper()

        exame = db.query(Exame).filter(Exame.nome == nome_exame).first()
        if not exame:
            exame = Exame(
                nome=nome_exame,
                categoria=str(row.get("categoria", "geral")).strip().lower(),
                letra_inicial=letra,
                preparo_basico=str(row.get("preparo_basico", "")).strip(),
            )
            db.add(exame)
            db.flush()
            stats["exames"] += 1

        # Estabelecimentos separados por ponto e vírgula
        estabelecimentos_raw = str(row.get("estabelecimentos", "")).split(";")
        status_conf = str(row.get("status_confirmacao", "confirmado")).strip()

        for est_nome in estabelecimentos_raw:
            est_nome = est_nome.strip()
            if not est_nome:
                continue

            est = db.query(Estabelecimento).filter(Estabelecimento.nome == est_nome).first()
            if not est:
                est = Estabelecimento(
                    nome=est_nome,
                    tipo="laboratorio",
                    endereco="Altamira - PA",
                    bairro="Centro",
                    cidade="Altamira - PA",
                    whatsapp="5593999999999",
                    status_verificacao="verificado",
                )
                db.add(est)
                db.flush()
                stats["estabelecimentos"] += 1

            vinculo = (
                db.query(ExameEstabelecimento)
                .filter(
                    ExameEstabelecimento.exame_id == exame.id,
                    ExameEstabelecimento.estabelecimento_id == est.id,
                )
                .first()
            )
            if not vinculo:
                vinculo = ExameEstabelecimento(
                    exame_id=exame.id,
                    estabelecimento_id=est.id,
                    status_confirmacao=status_conf,
                )
                db.add(vinculo)
                stats["vinculos"] += 1

    db.commit()
    return stats

def carregar_planilha_servicos(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"servicos": 0}

    for _, row in df.iterrows():
        titulo = str(row["titulo"]).strip()
        if not titulo:
            continue

        servico = db.query(ServicoSaude).filter(ServicoSaude.titulo == titulo).first()
        domiciliar = str(row.get("atendimento_domiciliar", "false")).lower() in [
            "true",
            "1",
            "sim",
        ]

        if not servico:
            servico = ServicoSaude(
                categoria=str(row.get("categoria", "farmaceutico")).strip().lower(),
                titulo=titulo,
                responsavel=str(row.get("responsavel", "")).strip(),
                horario_funcionamento=str(row.get("horario_funcionamento", "")).strip(),
                endereco=str(row.get("endereco", "")).strip(),
                bairro=str(row.get("bairro", "")).strip(),
                whatsapp=str(row.get("whatsapp", "")).strip(),
                google_maps_url=str(row.get("maps_url", "")).strip(),
                atendimento_domiciliar=domiciliar,
                tags=str(row.get("tags", "")).strip(),
                status_verificacao=str(row.get("status_verificacao", "verificado")).strip(),
            )
            db.add(servico)
            stats["servicos"] += 1

    db.commit()
    return stats
