# Recorte de capturas de Instagram en la galeria de resultados
# Mejora 08 - reunion cliente 30/06/2026. Ejecutar una sola vez.
# Uso: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/crop-resultados-2026-07-03.ps1

Add-Type -AssemblyName System.Drawing

$dir = Join-Path $PSScriptRoot "..\public\images\resultados"

function Crop-Jpeg {
  param(
    [string]$Name,
    [int]$X, [int]$Y, [int]$W, [int]$H
  )
  $path = Join-Path $dir $Name
  $src = [System.Drawing.Image]::FromFile($path)
  try {
    if ($X + $W -gt $src.Width -or $Y + $H -gt $src.Height) {
      throw "Recorte fuera de limites en $Name ($($src.Width)x$($src.Height))"
    }
    $dst = New-Object System.Drawing.Bitmap($W, $H)
    $g = [System.Drawing.Graphics]::FromImage($dst)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $rectDst = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
    $rectSrc = New-Object System.Drawing.Rectangle($X, $Y, $W, $H)
    $g.DrawImage($src, $rectDst, $rectSrc, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
  } finally {
    $src.Dispose()
  }

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $dst.Save($path, $codec, $params)
  $dst.Dispose()
  Write-Host "OK $Name -> ${W}x${H}"
}

# 1. result-cejas-01 (1000x1245): quitar badge "1/8" arriba y texto inferior
Crop-Jpeg -Name "result-cejas-01.jpg" -X 0 -Y 95 -W 1000 -H 1015

# 2. result-cejas-02 (1000x1778): quitar texto de story inferior
Crop-Jpeg -Name "result-cejas-02.jpg" -X 0 -Y 0 -W 1000 -H 1555

# 3. result-cejas-06 (943x2048): captura iPhone -> solo la foto, sin barra de estado,
#    sin caja de texto blanca y sin tira de miniaturas
Crop-Jpeg -Name "result-cejas-06.jpg" -X 20 -Y 145 -W 903 -H 1320

# 4. result-cicatrizado-cejas (900x1955): quitar barra de estado, miniaturas y caption;
#    se conserva el circulo "Antes" (contenido antes/despues)
Crop-Jpeg -Name "result-cicatrizado-cejas.jpg" -X 15 -Y 130 -W 870 -H 1285

# 5. result-mirada-02 (1000x1778): quitar sticker "Palma de Mallorca" y emojis
#    quedandose con la mitad inferior (resultado despues)
Crop-Jpeg -Name "result-mirada-02.jpg" -X 0 -Y 870 -W 1000 -H 908

# 6. result-labios-02 (1000x1331): quitar linea superior e icono de mute inferior derecho
Crop-Jpeg -Name "result-labios-02.jpg" -X 0 -Y 57 -W 1000 -H 1080

Write-Host "Recortes completados."
