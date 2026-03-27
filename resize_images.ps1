
$targetWidth = 960
$targetHeight = 1088
$images = @("hero-image2.png", "bottle-classic.png", "bottle-tropical.png")
$scriptPath = $MyInvocation.MyCommand.Path
$directory = Split-Path $scriptPath
$basePath = "$directory\public\images"

Add-Type -AssemblyName System.Drawing

foreach ($imgName in $images) {
    $path = Join-Path $basePath $imgName
    
    if (Test-Path $path) {
        Write-Host "Processing $imgName..."
        try {
            $img = [System.Drawing.Image]::FromFile($path)
            
            # Create a new bitmap with target dimensions
            $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
            $graph = [System.Drawing.Graphics]::FromImage($bmp)
            
            # High quality resizing
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            
            $graph.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
            
            # save to temp file to avoid locking
            $tempPath = $path + ".tmp.png"
            $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
            
            # Cleanup resources
            $graph.Dispose()
            $bmp.Dispose()
            $img.Dispose()
            
            # Replace original
            Remove-Item $path -Force
            Rename-Item $tempPath $imgName -Force
            
            Write-Host "Success: Resized $imgName to $targetWidth x $targetHeight"
        }
        catch {
            Write-Host "Error processing $imgName : $_"
        }
    }
    else {
        Write-Host "Error: File not found at $path"
    }
}
Write-Host "All done."
