param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$Size = 600
)

# --- Setup ---
Add-Type -AssemblyName System.Drawing
$inputFile = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($InputPath)
$outputFile = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputPath)
$src = [System.Drawing.Bitmap]::FromFile($inputFile)

# --- Find Ring ---
function Test-RingPixel([int]$x, [int]$y) {
    $c = $src.GetPixel($x, $y)
    return ($c.R -lt 80 -and $c.G -lt 90 -and $c.B -lt 130 -and $c.B -gt ($c.R + 25))
}

$cx = [int]($src.Width / 2)
$cy = [int]($src.Height / 2)
$left = -1; for ($x = 0; $x -lt $cx; $x++) { if (Test-RingPixel $x $cy) { $left = $x; break } }
$right = -1; for ($x = $src.Width - 1; $x -gt $cx; $x--) { if (Test-RingPixel $x $cy) { $right = $x; break } }
$top = -1; for ($y = 0; $y -lt $cy; $y++) { if (Test-RingPixel $cx $y) { $top = $y; break } }
$bottom = -1; for ($y = $src.Height - 1; $y -gt $cy; $y--) { if (Test-RingPixel $cx $y) { $bottom = $y; break } }

if (($left, $right, $top, $bottom) -contains -1) {
    $src.Dispose()
    throw "Ring nicht gefunden (links $left, rechts $right, oben $top, unten $bottom)"
}

$diameter = [Math]::Max($right - $left, $bottom - $top)
$srcX = ($left + $right) / 2 - $diameter / 2
$srcY = ($top + $bottom) / 2 - $diameter / 2

# --- Crop Circle ---
$frame = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$frameGraphics = [System.Drawing.Graphics]::FromImage($frame)
$frameGraphics.InterpolationMode = 'HighQualityBicubic'
$frameGraphics.PixelOffsetMode = 'HighQuality'
$frameGraphics.DrawImage($src, (New-Object System.Drawing.RectangleF 0, 0, $Size, $Size), (New-Object System.Drawing.RectangleF $srcX, $srcY, $diameter, $diameter), [System.Drawing.GraphicsUnit]::Pixel)

$out = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($out)
$graphics.SmoothingMode = 'AntiAlias'
$graphics.InterpolationMode = 'HighQualityBicubic'
$graphics.PixelOffsetMode = 'HighQuality'
$graphics.Clear([System.Drawing.Color]::Transparent)
$brush = New-Object System.Drawing.TextureBrush $frame
$graphics.FillEllipse($brush, 2, 2, $Size - 4, $Size - 4)
$out.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

# --- Cleanup ---
$brush.Dispose(); $graphics.Dispose(); $out.Dispose(); $frameGraphics.Dispose(); $frame.Dispose(); $src.Dispose()
"Ring: links $left, rechts $right, oben $top, unten $bottom -> $outputFile"
