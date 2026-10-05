$ErrorActionPreference = 'Stop'

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$csvPath = Join-Path $root 'outputs\laboclin_exames.csv'
$outputPath = Join-Path $root 'outputs\laboclin_exames_padronizado.csv'
$culture = [System.Globalization.CultureInfo]::GetCultureInfo('pt-BR')

function ConvertTo-SentenceCase([string]$value) {
    $text = $value.Trim().ToLower($culture)
    if ($text.Length -eq 0) {
        return $text
    }

    return $text.Substring(0, 1).ToUpper($culture) + $text.Substring(1)
}

$rows = @(Import-Csv -LiteralPath $csvPath)
if ($rows.Count -ne 651) {
    throw "O CSV possui $($rows.Count) registros, mas são esperados 651."
}

foreach ($row in $rows) {
    $row.exame = ConvertTo-SentenceCase $row.exame
}

if (@($rows.codigo | Sort-Object -Unique).Count -ne 651) {
    throw 'Foram encontrados códigos duplicados. O arquivo não foi alterado.'
}
if (@($rows | Where-Object { $_.exame -ne (ConvertTo-SentenceCase $_.exame) }).Count -ne 0) {
    throw 'Falha na padronização dos nomes. O arquivo não foi alterado.'
}

$rows | Export-Csv -LiteralPath $outputPath -NoTypeInformation -Encoding utf8BOM

[pscustomobject]@{
    arquivo = $outputPath
    registros = $rows.Count
    exemplo = $rows[0].exame
} | Format-List
