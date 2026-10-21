# Erzeugt die App-Icons der Portfolio-Seite (PWA, iPhone-Home-Bildschirm, Browser-Tab).
# Motiv wie in der Sidebar: gelbe "NB"-Kachel, leicht gedreht, mit dunklerer Kante unten, auf Navy.
# Die Buchstaben sind dicke Linien mit runden Enden (aehnlich Nunito Black), damit keine Schrift noetig ist.
# Alle Masse in einem 100x100-Raster; daraus entstehen icon.svg und die PNG-Dateien.
# Aufruf: powershell -ExecutionPolicy Bypass -File tools/make-icons.ps1
param(
    [string]$OutputDir = "assets/icons"
)

Add-Type -AssemblyName System.Drawing

$navy = '#183153'
$bg = '#0d1a2d'
$glow = '#1b3558'
$yellow = '#ffd43b'
$yellowShade = '#e0a800'
$angle = -6
$stroke = 7.2

New-Item -ItemType Directory -Force $OutputDir | Out-Null
$out = (Resolve-Path $OutputDir).Path

function Color($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function RoundRect([single]$x, [single]$y, [single]$w, [single]$h, [single]$r) {
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $p.AddArc($x, $y, $d, $d, 180, 90)
    $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $p.CloseFigure()
    return $p
}

# $tile: Kantenlaenge der Kachel im 100er-Raster (kleiner fuer "maskable", damit nichts abgeschnitten wird)
# $full: Hintergrund randlos (iPhone, maskable) oder als abgerundetes Quadrat (Browser-Tab)
function Render([int]$size, [string]$file, [double]$tile, [bool]$full) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.PixelOffsetMode = 'HighQuality'
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.ScaleTransform($size / 100.0, $size / 100.0)

    if ($full) {
        $g.FillRectangle((New-Object System.Drawing.SolidBrush (Color $bg)), 0, 0, 100, 100)
    } else {
        $g.FillPath((New-Object System.Drawing.SolidBrush (Color $bg)), (RoundRect 0 0 100 100 22))
    }
    $g.FillEllipse((New-Object System.Drawing.SolidBrush (Color $glow)), 14, 12, 72, 72)

    # Kachel und Buchstaben drehen sich gemeinsam um die Bildmitte und werden auf $tile skaliert
    $k = $tile / 60.0
    $g.TranslateTransform(50, 48)
    $g.RotateTransform($angle)
    $g.ScaleTransform($k, $k)
    $g.TranslateTransform(-50, -48)

    $g.FillPath((New-Object System.Drawing.SolidBrush (Color $yellowShade)), (RoundRect 20 23 60 60 15))
    $g.FillPath((New-Object System.Drawing.SolidBrush (Color $yellow)), (RoundRect 20 18 60 60 15))

    $pen = New-Object System.Drawing.Pen (Color $navy), $stroke
    $pen.StartCap = 'Round'; $pen.EndCap = 'Round'; $pen.LineJoin = 'Round'

    # N
    $n = New-Object System.Drawing.Drawing2D.GraphicsPath
    $n.AddLines([System.Drawing.PointF[]]@(
        (New-Object System.Drawing.PointF 30.5, 60), (New-Object System.Drawing.PointF 30.5, 36),
        (New-Object System.Drawing.PointF 44.5, 60), (New-Object System.Drawing.PointF 44.5, 36)))
    $g.DrawPath($pen, $n)

    # B: Stamm, oberer Bogen (Radius 5.5), unterer Bogen (Radius 6.5)
    $b = New-Object System.Drawing.Drawing2D.GraphicsPath
    $b.AddLine(53.5, 60, 53.5, 36)
    $b.AddLine(53.5, 36, 61, 36)
    $b.AddArc(55.5, 36, 11, 11, -90, 180)
    $b.AddLine(61, 47, 53.5, 47)
    $g.DrawPath($pen, $b)
    $b2 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $b2.AddLine(53.5, 47, 62, 47)
    $b2.AddArc(55.5, 47, 13, 13, -90, 180)
    $b2.AddLine(62, 60, 53.5, 60)
    $g.DrawPath($pen, $b2)

    $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
}

Render 180 'apple-touch-icon.png' 60 $true
Render 192 'icon-192.png' 60 $true
Render 512 'icon-512.png' 60 $true
Render 512 'icon-maskable-512.png' 46 $true
Render 32 'icon-32.png' 66 $false

# Gleiches Motiv als SVG (Browser-Tab)
$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="$bg"/>
  <circle cx="50" cy="48" r="36" fill="$glow"/>
  <g transform="rotate($angle 50 48) translate(50 48) scale(1.1) translate(-50 -48)">
    <rect x="20" y="23" width="60" height="60" rx="15" fill="$yellowShade"/>
    <rect x="20" y="18" width="60" height="60" rx="15" fill="$yellow"/>
    <g fill="none" stroke="$navy" stroke-width="$stroke" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30.5 60V36L44.5 60V36"/>
      <path d="M53.5 60V36H61A5.5 5.5 0 0 1 61 47H53.5"/>
      <path d="M53.5 47H62A6.5 6.5 0 0 1 62 60H53.5"/>
    </g>
  </g>
</svg>
"@
[System.IO.File]::WriteAllText((Join-Path $out 'icon.svg'), $svg)

Get-ChildItem $out | Select-Object Name, Length
