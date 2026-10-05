import os
import re
import unicodedata
import pandas as pd
from typing import Dict, Any, Optional
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
    "clinica-geral": "medical_services",
    "pediatria": "child_care",
    "ginecologia-e-obstetricia": "female",
    "ortopedia-e-traumatologia": "format_h4",
    "dermatologia": "face",
    "oftalmologia": "visibility",
    "neurologia": "psychology",
    "psiquiatria": "psychology",
    "psicologia": "self_improvement",
    "endocrinologia": "vaccines",
    "nefrologia": "water_drop",
    "urologia": "healing",
    "cirurgia-geral": "health_and_safety",
    "cirurgia-vascular": "cardiology",
    "gastroenterologia-e-proctologia": "gastroenterology",
    "otorrinolaringologia": "hearing",
    "pneumologia": "air",
    "infectologia": "coronavirus",
    "reumatologia": "accessibility_new",
    "hematologia": "bloodtype",
    "alergologia-e-imunologia": "allergy",
    "radiologia-e-imagem": "image",
    "nutricao": "nutrition",
    "fisioterapia": "physical_therapy",
    "enfermagem": "vaccines",
    "fonoaudiologia": "record_voice_over",
    "odontologia": "dentistry",
    "terapias-integrativas": "spa",
    "anestesiologia": "syringe",
    "cirurgia-plastica": "auto_fix_high",
}

ESTABELECIMENTOS_ALIASES = {
    "maxxi saude": "Clínica Médica Maxxi Saúde",
    "clinica medica maxxi saude": "Clínica Médica Maxxi Saúde",
    "maxxi": "Clínica Médica Maxxi Saúde",
    "clinica da familia": "Clínica da Família",
    "viver centro de saude": "Viver Centro de Saúde",
    "viver": "Viver Centro de Saúde",
    "pilar clinica": "Pilar Clínica",
    "cdc saude": "CDC Saúde",
    "clinvida": "ClinVida",
    "clinica cemear saude": "Clínica Cemear Saúde",
    "cemear": "Clínica Cemear Saúde",
    "clinica ideally": "Clínica Ideally",
    "ideally": "Clínica Ideally",
    "policlinica aso": "Policlínica ASO",
    "policlinica aso altamira": "Policlínica ASO",
    "aso": "Policlínica ASO",
    "clinica do coracao": "Clínica do Coração",
    "coracao": "Clínica do Coração",
    "clinica laboclin": "Clínica Laboclin",
    "laboclin": "Clínica Laboclin",
    "diagmed": "Diagmed",
    "humani clinica especializada": "Humani Clinica Especializada",
    "humani": "Humani Clinica Especializada",
    "hospital geral altamira": "Hospital Geral Altamira",
    "hga": "Hospital Geral Altamira",
    "clinica orogastro saude": "Clínica Orogastro Saúde",
    "orogastro saude": "Clínica Orogastro Saúde",
    "orogastro": "Clínica Orogastro Saúde",
    "climet clinica de medicina do trabalho": "Climet Clinica de Medicina do Trabalho",
    "climet": "Climet Clinica de Medicina do Trabalho",
    "mais saude diagnosticos": "Mais Saúde Diagnósticos",
    "mais saude": "Mais Saúde Diagnósticos",
    "evoluir centro medico": "Evoluir Centro Médico",
    "evoluir": "Evoluir Centro Médico",
    "clinica acolher": "Clínica Acolher",
    "acolher": "Clínica Acolher",
    "clinica de olhos dra deibi oliveira": "Clínica de Olhos Dra Deibi Oliveira",
    "deibi oliveira": "Clínica de Olhos Dra Deibi Oliveira",
    "simboli centro medico": "Simboli Centro Médico",
    "instituto medico vida": "Instituto Médico Vida",
    "instituto vida": "Instituto Médico Vida",
    "lca clinica": "LCA Clínica",
    "laboratorio central de altamira": "LCA Clínica",
    "laboratorio popular de altamira": "Laboratório Popular de Altamira",
    "popular": "Laboratório Popular de Altamira",
    "hospital cirurgico de altamira": "Hospital Cirúrgico de Altamira",
    "norte vitta clinica de saude integrada": "Norte Vitta Clinica de Saúde Integrada",
    "norte vitta": "Norte Vitta Clinica de Saúde Integrada",
    "cardiolife": "Cardiolife",
}

MAPA_ESPECIALIDADES = {
    "clinica geral": ("Clínica Geral", "clinica-geral"),
    "cirurgia geral/ urologia": ("Cirurgia Geral", "cirurgia-geral"),
    "cirurgia geral/proctologia": ("Gastroenterologia & Proctologia", "gastroenterologia-e-proctologia"),
    "cirurgia geral/ gastroenterologista": ("Gastroenterologia & Proctologia", "gastroenterologia-e-proctologia"),
    "dermatologia": ("Dermatologia", "dermatologia"),
    "dermatologista": ("Dermatologia", "dermatologia"),
    "neurologia": ("Neurologia", "neurologia"),
    "neurocirurgiao": ("Neurologia", "neurologia"),
    "neuropediatra": ("Pediatria", "pediatria"),
    "neuropediatria": ("Pediatria", "pediatria"),
    "ortopedia/traumatologia": ("Ortopedia & Traumatologia", "ortopedia-e-traumatologia"),
    "ortopedia": ("Ortopedia & Traumatologia", "ortopedia-e-traumatologia"),
    "ortopedista": ("Ortopedia & Traumatologia", "ortopedia-e-traumatologia"),
    "pediatria": ("Pediatria", "pediatria"),
    "ginecologista": ("Ginecologia & Obstetrícia", "ginecologia-e-obstetricia"),
    "ginecologia": ("Ginecologia & Obstetrícia", "ginecologia-e-obstetricia"),
    "ginecologia e obstetricia": ("Ginecologia & Obstetrícia", "ginecologia-e-obstetricia"),
    "ginecologia/mastologia": ("Ginecologia & Obstetrícia", "ginecologia-e-obstetricia"),
    "cardiologia": ("Cardiologia", "cardiologia"),
    "cardiologista": ("Cardiologia", "cardiologia"),
    "radiologia": ("Radiologia & Imagem", "radiologia-e-imagem"),
    "ultrassonografia": ("Radiologia & Imagem", "radiologia-e-imagem"),
    "oftalmologia": ("Oftalmologia", "oftalmologia"),
    "pneumologista": ("Pneumologia", "pneumologia"),
    "pneumologia": ("Pneumologia", "pneumologia"),
    "psiquiatria": ("Psiquiatria", "psiquiatria"),
    "endocrinologia": ("Endocrinologia", "endocrinologia"),
    "nefrologia": ("Nefrologia", "nefrologia"),
    "nefrologista": ("Nefrologia", "nefrologia"),
    "cirurgiao vascular": ("Cirurgia Vascular", "cirurgia-vascular"),
    "cirurgia vascular": ("Cirurgia Vascular", "cirurgia-vascular"),
    "enfermeiro": ("Enfermagem", "enfermagem"),
    "enfermeira": ("Enfermagem", "enfermagem"),
    "enfermeira integrativa": ("Enfermagem", "enfermagem"),
    "enfermagem": ("Enfermagem", "enfermagem"),
    "nutricionista": ("Nutrição", "nutricao"),
    "nutricao": ("Nutrição", "nutricao"),
    "psicologia": ("Psicologia", "psicologia"),
    "psicologa": ("Psicologia", "psicologia"),
    "neuropsicopedagoga": ("Psicologia", "psicologia"),
    "infectologista": ("Infectologia", "infectologia"),
    "infectologia": ("Infectologia", "infectologia"),
    "otorrinolaringologia": ("Otorrinolaringologia", "otorrinolaringologia"),
    "otorrinolaringologista": ("Otorrinolaringologia", "otorrinolaringologia"),
    "alergologia": ("Alergologia & Imunologia", "alergologia-e-imunologia"),
    "alergologia/imunologia": ("Alergologia & Imunologia", "alergologia-e-imunologia"),
    "terapeuta emocional": ("Terapias Integrativas", "terapias-integrativas"),
    "terapeuta": ("Terapias Integrativas", "terapias-integrativas"),
    "massoterapeuta": ("Terapias Integrativas", "terapias-integrativas"),
    "fisioterapeuta": ("Fisioterapia", "fisioterapia"),
    "fisioterapia": ("Fisioterapia", "fisioterapia"),
    "fisioterapia pelvica e obstetrica": ("Fisioterapia", "fisioterapia"),
    "cirurgiao dentista": ("Odontologia", "odontologia"),
    "periodontista e estematologista": ("Odontologia", "odontologia"),
    "cirurgiao plastico": ("Cirurgia Plástica", "cirurgia-plastica"),
    "urologista": ("Urologia", "urologia"),
    "urologia": ("Urologia", "urologia"),
    "reumatologista": ("Reumatologia", "reumatologia"),
    "reumatologia": ("Reumatologia", "reumatologia"),
    "cirurgiao bariatrico": ("Cirurgia Geral", "cirurgia-geral"),
    "cirurgiao geral": ("Cirurgia Geral", "cirurgia-geral"),
    "cirurgia geral": ("Cirurgia Geral", "cirurgia-geral"),
    "hematologista": ("Hematologia", "hematologia"),
    "hematologia": ("Hematologia", "hematologia"),
    "anestesiologia": ("Anestesiologia", "anestesiologia"),
    "fonoaudiologia": ("Fonoaudiologia", "fonoaudiologia"),
    "coloproctologia": ("Gastroenterologia & Proctologia", "gastroenterologia-e-proctologia"),
    "clinico geral/transplante capilar": ("Clínica Geral", "clinica-geral"),
}

def remover_acentos(texto: str) -> str:
    if not texto:
        return ""
    return "".join(
        c for c in unicodedata.normalize("NFD", texto)
        if unicodedata.category(c) != "Mn"
    ).lower().strip()

def normalizar_slug(texto: str) -> str:
    texto = remover_acentos(texto)
    texto = re.sub(r"[^a-z0-9]+", "-", texto).strip("-")
    return texto

def normalizar_telefone(contato: str) -> str:
    if not contato:
        return ""
    digitos = re.sub(r"\D", "", str(contato))
    if not digitos:
        return ""
    if len(digitos) in [10, 11] and not digitos.startswith("55"):
        return f"55{digitos}"
    if len(digitos) in [8, 9]:
        return f"5593{digitos}"
    return digitos

def resolver_estabelecimento_nome(nome_raw: str) -> str:
    nome_limpo = remover_acentos(nome_raw)
    return ESTABELECIMENTOS_ALIASES.get(nome_limpo, str(nome_raw).strip())

def normalizar_registro_conselho(crm: str, rqe: str = "") -> str:
    crm_str = str(crm).strip() if crm and str(crm).lower() != "nan" else ""
    rqe_str = str(rqe).strip() if rqe and str(rqe).lower() != "nan" else ""

    partes = []
    if crm_str:
        if not crm_str.upper().startswith("CRM"):
            partes.append(f"CRM-PA {crm_str}")
        else:
            partes.append(crm_str.upper())
    if rqe_str:
        if not rqe_str.upper().startswith("RQE"):
            partes.append(f"RQE {rqe_str}")
        else:
            partes.append(rqe_str.upper())

    if not partes:
        return "Registro não informado"
    return " | ".join(partes)

def categorizar_exame(nome_exame: str) -> str:
    n = remover_acentos(nome_exame)
    if any(k in n for k in ["eco", "eletro", "holter", "mapa", "ergometrico", "cardio"]):
        return "cardiologico"
    if any(k in n for k in ["tomografia", "ressonancia", "ultrassom", "usg", "raio-x", "radiografia", "mamografia", "densitometria"]):
        return "imagem"
    if any(k in n for k in ["hemograma", "glicose", "colesterol", "urina", "fezes", "laboratorial", "sangue", "sorologia", "cultura", "pcr", "tsh", "t4", "psa", "vitamina", "hormonio", "analise clinica"]):
        return "sangue"
    if any(k in n for k in ["pccu", "colposcopia", "biopsia", "citopatologico", "preventivo", "transvaginal", "fraxx"]):
        return "ginecologico"
    return "geral"

def carregar_estabelecimentos(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"estabelecimentos_novos": 0, "estabelecimentos_atualizados": 0}

    for _, row in df.iterrows():
        nome_raw = str(row.get("local", "")).strip()
        if not nome_raw:
            continue

        nome_canônico = resolver_estabelecimento_nome(nome_raw)
        contato_tel = normalizar_telefone(row.get("contato", ""))
        endereco = str(row.get("endereco", "Altamira - PA")).strip()
        link_instagram = str(row.get("link", "")).strip()

        est = db.query(Estabelecimento).filter(Estabelecimento.nome == nome_canônico).first()
        if not est:
            est = Estabelecimento(
                nome=nome_canônico,
                tipo="clinica",
                endereco=endereco,
                bairro="Centro",
                cidade="Altamira - PA",
                whatsapp=contato_tel,
                instagram_url=link_instagram,
                status_verificacao="verificado",
                data_ultima_verificacao="2026-10-05",
            )
            db.add(est)
            stats["estabelecimentos_novos"] += 1
        else:
            if endereco and endereco != "Altamira - PA":
                est.endereco = endereco
            if contato_tel:
                est.whatsapp = contato_tel
            if link_instagram:
                est.instagram_url = link_instagram
            stats["estabelecimentos_atualizados"] += 1

    db.commit()
    return stats

def carregar_profissionais_real(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"especialidades": 0, "profissionais": 0, "vinculos": 0}

    for _, row in df.iterrows():
        nome_medico = str(row.get("Nome", "")).strip()
        if not nome_medico:
            continue

        local_raw = str(row.get("local", "")).strip()
        nome_est = resolver_estabelecimento_nome(local_raw)

        # 1. Estabelecimento
        est = db.query(Estabelecimento).filter(Estabelecimento.nome == nome_est).first()
        if not est:
            est = Estabelecimento(
                nome=nome_est,
                tipo="clinica",
                endereco="Altamira - PA",
                bairro="Centro",
                cidade="Altamira - PA",
                status_verificacao="informado_planilha",
            )
            db.add(est)
            db.flush()

        # 2. Especialidade
        esp_raw = str(row.get("Especialidade", "Clínica Geral")).strip()
        esp_chave = remover_acentos(esp_raw)
        nome_esp, slug_esp = MAPA_ESPECIALIDADES.get(esp_chave, (esp_raw.title(), normalizar_slug(esp_raw)))
        icone_esp = ICONES_ESPECIALIDADES.get(slug_esp, "medical_services")

        esp = db.query(Especialidade).filter(Especialidade.slug == slug_esp).first()
        if not esp:
            esp = Especialidade(
                nome=nome_esp,
                slug=slug_esp,
                icone=icone_esp,
                ordem=10,
            )
            db.add(esp)
            db.flush()
            stats["especialidades"] += 1

        # 3. Profissional
        crm = normalizar_registro_conselho(row.get("crm", ""), row.get("rqe", ""))
        prof = (
            db.query(Profissional)
            .filter(Profissional.nome == nome_medico, Profissional.especialidade_id == esp.id)
            .first()
        )
        if not prof:
            prof = Profissional(
                nome=nome_medico,
                registro_conselho=crm,
                subtitulo=esp_raw if esp_raw != nome_esp else "",
                especialidade_id=esp.id,
                status_verificacao="verificado",
                data_ultima_verificacao="2026-10-05",
                ativo=True,
            )
            db.add(prof)
            db.flush()
            stats["profissionais"] += 1
        else:
            if crm != "Registro não informado":
                prof.registro_conselho = crm
            if esp_raw != nome_esp and not prof.subtitulo:
                prof.subtitulo = esp_raw

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

def carregar_exames_real(caminho_csv: str, db: Session) -> Dict[str, int]:
    df = pd.read_csv(caminho_csv, encoding="utf-8").fillna("")
    stats = {"exames": 0, "vinculos": 0}

    for _, row in df.iterrows():
        nome_exame = str(row.get("exame", "")).strip()
        if not nome_exame:
            continue

        # Correção pontual de digitação comum
        if nome_exame.lower() == "eltrocardiograma":
            nome_exame = "Eletrocardiograma (ECG)"

        local_raw = str(row.get("local", "")).strip()
        nome_est = resolver_estabelecimento_nome(local_raw)

        est = db.query(Estabelecimento).filter(Estabelecimento.nome == nome_est).first()
        if not est:
            est = Estabelecimento(
                nome=nome_est,
                tipo="laboratorio",
                endereco="Altamira - PA",
                bairro="Centro",
                cidade="Altamira - PA",
                status_verificacao="informado_planilha",
            )
            db.add(est)
            db.flush()

        categoria = categorizar_exame(nome_exame)
        # Primeira letra válida A-Z
        letras = [c.upper() for c in remover_acentos(nome_exame) if c.isalnum()]
        letra_inicial = letras[0] if letras else "A"

        exame = db.query(Exame).filter(Exame.nome == nome_exame).first()
        if not exame:
            exame = Exame(
                nome=nome_exame,
                categoria=categoria,
                letra_inicial=letra_inicial,
            )
            db.add(exame)
            db.flush()
            stats["exames"] += 1

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
                status_confirmacao="confirmado",
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
                whatsapp=normalizar_telefone(row.get("whatsapp", "")),
                google_maps_url=str(row.get("maps_url", "")).strip(),
                atendimento_domiciliar=domiciliar,
                tags=str(row.get("tags", "")).strip(),
                status_verificacao="verificado",
            )
            db.add(servico)
            stats["servicos"] += 1
        else:
            servico.responsavel = str(row.get("responsavel", "")).strip()
            servico.horario_funcionamento = str(row.get("horario_funcionamento", "")).strip()
            servico.endereco = str(row.get("endereco", "")).strip()
            servico.bairro = str(row.get("bairro", "")).strip()
            servico.whatsapp = normalizar_telefone(row.get("whatsapp", ""))
            servico.google_maps_url = str(row.get("maps_url", "")).strip()
            servico.atendimento_domiciliar = domiciliar
            servico.tags = str(row.get("tags", "")).strip()
            servico.status_verificacao = "verificado"
            stats["servicos"] += 1

    db.commit()
    return stats
