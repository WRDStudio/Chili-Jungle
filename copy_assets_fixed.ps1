$sourceMap = @{
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1768467670736.jpg"   = "tamarindo_sunset.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_0_1768468235523.jpg" = "gallery_1.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1_1768468235523.jpg" = "gallery_2.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768468235523.jpg" = "gallery_3.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_3_1768468235523.jpg" = "gallery_4.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_4_1768468235523.jpg" = "gallery_5.jpg";
    "C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_0_1768469524364.png" = "logo_clean.png"
}

$destDir = "c:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images"

if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
    Write-Host "Created directory $destDir"
}

foreach ($key in $sourceMap.Keys) {
    $src = $key
    $destFile = $sourceMap[$key]
    $destPath = Join-Path -Path $destDir -ChildPath $destFile
    
    if (Test-Path -Path $src) {
        try {
            Copy-Item -Path $src -Destination $destPath -Force
            if (Test-Path -Path $destPath) {
                Write-Host "SUCCESS: Copied $destFile"
            }
            else {
                Write-Error "FAILED: Copied $destFile but file not found at destination."
            }
        }
        catch {
            Write-Error "ERROR: Failed to copy $destFile. $_"
        }
    }
    else {
        Write-Error "MISSING: Source file not found: $src"
    }
}
