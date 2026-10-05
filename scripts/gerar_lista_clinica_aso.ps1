$ErrorActionPreference = 'Stop'

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$outputDir = Join-Path $root 'outputs'
$outputPath = Join-Path $outputDir 'clinica_aso_altamira_exames_confirmados.csv'

$fonteCnes = 'https://cnes2.datasus.gov.br/Mod_Ind_Clientela_Listar.asp?VComp=&VEstado=15&VListar=1&VMun=150060&VTipo=01'
$fonteCadastro = 'https://unisus.com.br/cnes/estabelecimento/7217706-clinica-aso'

$exames = @(
    [pscustomobject]@{
        exame = 'Radiografia (raio-x)'
        categoria = 'Diagnóstico por imagem'
        status = 'Confirmado em cadastro público'
        base_da_confirmacao = 'Equipamento de raio X digital listado para a Clínica ASO'
        fonte = $fonteCadastro
    }
    [pscustomobject]@{
        exame = 'Eletrocardiograma (ecg)'
        categoria = 'Cardiologia'
        status = 'Confirmado em cadastro público'
        base_da_confirmacao = 'Eletrocardiógrafo listado para a Clínica ASO'
        fonte = $fonteCadastro
    }
    [pscustomobject]@{
        exame = 'Eletroencefalograma (eeg)'
        categoria = 'Neurologia'
        status = 'Confirmado em cadastro público'
        base_da_confirmacao = 'Eletroencefalógrafo listado para a Clínica ASO'
        fonte = $fonteCadastro
    }
    [pscustomobject]@{
        exame = 'Ultrassonografia'
        categoria = 'Diagnóstico por imagem'
        status = 'Confirmado em cadastro público'
        base_da_confirmacao = 'Serviço de diagnóstico por imagem com classificação ultrassonografia'
        fonte = $fonteCadastro
    }
)

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
$exames | Export-Csv -LiteralPath $outputPath -NoTypeInformation -Encoding utf8BOM

[pscustomobject]@{
    arquivo = $outputPath
    exames_confirmados = $exames.Count
    cnes = '7217706'
    fonte_identificacao = $fonteCnes
} | Format-List
