$url = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/240px-Flag_of_Costa_Rica.svg.png"
$output = "public\images\costa_rica_flag_round.png"

try {
    Invoke-WebRequest -Uri $url -OutFile $output
    Write-Host "Download successful to $output"
} catch {
    Write-Error "Download failed: $_"
    exit 1
}
