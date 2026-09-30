import os
import sys

# Configura encoding UTF-8 no terminal Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.database import SessionLocal, Base, engine
from app.services.ingestion import (
    carregar_planilha_profissionais,
    carregar_planilha_exames,
    carregar_planilha_servicos,
)

def run_ingestion():
    print("=" * 60)
    print("[*] INICIANDO INGESTAO DE PLANILHAS - GUIA DE SAUDE ALTAMIRA")
    print("=" * 60)

    # Garante que as tabelas existem
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")

    csv_profissionais = os.path.join(data_dir, "sample_planilha_profissionais.csv")
    csv_exames = os.path.join(data_dir, "sample_planilha_exames.csv")
    csv_servicos = os.path.join(data_dir, "sample_planilha_servicos.csv")

    try:
        # 1. Profissionais
        if os.path.exists(csv_profissionais):
            print(f"\n[+] Ingestao de Profissionais: {csv_profissionais}")
            s_prof = carregar_planilha_profissionais(csv_profissionais, db)
            print(f"   [OK] Especialidades novas: {s_prof['especialidades']}")
            print(f"   [OK] Estabelecimentos novos: {s_prof['estabelecimentos']}")
            print(f"   [OK] Profissionais novos: {s_prof['profissionais']}")
            print(f"   [OK] Vinculos criados: {s_prof['vinculos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_profissionais}")

        # 2. Exames
        if os.path.exists(csv_exames):
            print(f"\n[+] Ingestao de Exames: {csv_exames}")
            s_exam = carregar_planilha_exames(csv_exames, db)
            print(f"   [OK] Exames novos: {s_exam['exames']}")
            print(f"   [OK] Estabelecimentos novos: {s_exam['estabelecimentos']}")
            print(f"   [OK] Vinculos exame-local: {s_exam['vinculos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_exames}")

        # 3. Serviços
        if os.path.exists(csv_servicos):
            print(f"\n[+] Ingestao de Servicos Comunitarios: {csv_servicos}")
            s_serv = carregar_planilha_servicos(csv_servicos, db)
            print(f"   [OK] Servicos de saude novos: {s_serv['servicos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_servicos}")

        print("\n" + "=" * 60)
        print("[SUCCESS] INGESTAO CONCLUIDA COM SUCESSO NO BANCO DE DADOS!")
        print("=" * 60)

    except Exception as e:
        print(f"\n[ERRO] DURANTE A INGESTAO: {e}", file=sys.stderr)
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_ingestion()
