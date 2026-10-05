$ErrorActionPreference = 'Stop'

$baseUrl = 'https://laboratoriolaboclin.com.br/instrucoes/index'
$outputDir = Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'outputs'
$outputPath = Join-Path $outputDir 'laboclin_exames.csv'
$records = [System.Collections.Generic.List[object]]::new()

for ($page = 1; $page -le 33; $page++) {
    $url = "${baseUrl}?page=$page"
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0' }
    $matches = [regex]::Matches($response.Content, '(?s)<tr data-key="(?<code>[^"]+)"><td>(?<name>.*?)</td>')

    if ($matches.Count -eq 0) {
        throw "Nenhum exame encontrado na página $page."
    }

    foreach ($match in $matches) {
        $name = [System.Net.WebUtility]::HtmlDecode($match.Groups['name'].Value)
        $name = [regex]::Replace($name, '<[^>]+>', '')
        $name = [regex]::Replace($name, '\s+', ' ').Trim()

        $records.Add([pscustomobject]@{
            codigo = [System.Net.WebUtility]::HtmlDecode($match.Groups['code'].Value).Trim()
            exame = $name
            pagina = $page
            url_instrucao = "https://laboratoriolaboclin.com.br/instrucoes/view?id=$([uri]::EscapeDataString($match.Groups['code'].Value))"
        })
    }
}

$duplicateCodes = $records | Group-Object codigo | Where-Object Count -gt 1
if ($records.Count -ne 651) {
    throw "Foram coletados $($records.Count) registros; o site informa 651. O CSV não foi gerado."
}
if ($duplicateCodes) {
    throw "Foram encontrados códigos duplicados: $($duplicateCodes.Name -join ', '). O CSV não foi gerado."
}

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
$records | Export-Csv -LiteralPath $outputPath -NoTypeInformation -Encoding utf8BOM

[pscustomobject]@{
    arquivo = $outputPath
    registros = $records.Count
    paginas = 33
    codigos_duplicados = $duplicateCodes.Count
} | Format-List
