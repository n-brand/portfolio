# Zerlegt das Swan-Logo (600x600, transparent) in Ebenen fuer die CSS-Klimmzug-Animation:
#   swan-bg.png    Kreis ohne Schwan (Schwan durch Rot ersetzt)
#   swan-body.png  Schwan ohne Faeuste (bewegt sich hoch), Stange am Hals ausgebessert
#   swan-bar.png   nur die Stange
#   swan-fists.png nur die Faeuste (bleiben an der Stange)
# Aufruf: powershell -ExecutionPolicy Bypass -File tools/split-swan.ps1
param(
    [string]$InputPath = "assets/images/swan-calisthenics.png",
    [string]$OutputDir = "assets/images"
)

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class SwanSplit {
    // Masse im 600x600-Bild: roter Kreis mit Radius 264, die Fuesse ragen unten in den weissen Ring
    const double Cx = 300, Cy = 300, RedRadius = 261;
    const int BarTop = 131, BarBottom = 151, BarLeft = 56, BarRight = 544, BarSample = 250;
    static readonly int[] Red = { 247, 63, 67 };
    static readonly int[] Navy = { 16, 46, 82 };
    static readonly int[][] Fists = { new[] { 104, 108, 178, 188 }, new[] { 426, 108, 499, 188 } };

    static byte[] Load(Bitmap b) {
        var d = b.LockBits(new Rectangle(0, 0, b.Width, b.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        var px = new byte[d.Stride * b.Height];
        Marshal.Copy(d.Scan0, px, 0, px.Length);
        b.UnlockBits(d);
        return px;
    }

    static void Save(byte[] px, int w, int h, string path) {
        var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
        var d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
        Marshal.Copy(px, 0, d.Scan0, px.Length);
        b.UnlockBits(d);
        b.Save(path, ImageFormat.Png);
        b.Dispose();
    }

    static bool InFist(int x, int y) {
        foreach (var f in Fists) if (x >= f[0] && x <= f[2] && y >= f[1] && y <= f[3]) return true;
        return false;
    }

    static double Clamp(double v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }

    static double Radius(int x, int y) { return Math.Sqrt((x - Cx) * (x - Cx) + (y - Cy) * (y - Cy)); }

    // Weisse Zwickel zwischen Ring und Stangen-Enden
    static bool InWedge(int x, int y) { return y <= BarBottom + 1 && (x < 104 || x > 499); }

    static bool InRed(int x, int y) { return Radius(x, y) < RedRadius && !InWedge(x, y); }

    // Wie stark ein Pixel zum Schwan gehoert (0 = Hintergrund)
    static double SwanAlpha(byte[] px, int x, int y, int w) {
        int i = (y * w + x) * 4;
        if (!InRed(x, y)) {
            // Fussspitzen auf dem weissen Ring: nur Gelb/Orange zaehlt
            if (y < 480 || x < 230 || x > 430 || px[i + 2] < 150) return 0;
            return Clamp((px[i + 1] - px[i] - 30) / 40.0);
        }
        double dr = px[i + 2] - Red[0], dg = px[i + 1] - Red[1], db = px[i] - Red[2];
        return Clamp((Math.Sqrt(dr * dr + dg * dg + db * db) - 20) / 60);
    }

    static void Put(byte[] o, int i, double r, double g, double b, double a) {
        o[i] = (byte)Math.Round(Math.Max(0, Math.Min(255, b)));
        o[i + 1] = (byte)Math.Round(Math.Max(0, Math.Min(255, g)));
        o[i + 2] = (byte)Math.Round(Math.Max(0, Math.Min(255, r)));
        o[i + 3] = (byte)Math.Round(Clamp(a) * 255);
    }

    // Farbe ohne den roten Hintergrund-Anteil (saubere Kanten)
    static void PutUnblended(byte[] o, byte[] px, int i, double a) {
        if (a <= 0) return;
        Put(o, i,
            (px[i + 2] - (1 - a) * Red[0]) / a,
            (px[i + 1] - (1 - a) * Red[1]) / a,
            (px[i] - (1 - a) * Red[2]) / a, a);
    }

    // Deckkraft der Stange pro Zeile, gemessen an einer Spalte mit rotem Hintergrund
    static double[] BarProfile(byte[] px, int w) {
        var p = new double[BarBottom + 3];
        for (int y = BarTop - 2; y <= BarBottom + 2; y++) {
            int i = (y * w + BarSample) * 4;
            p[y] = Clamp((Red[0] - Math.Max(px[i + 2], px[i + 1])) / (double)(Red[0] - 47));
        }
        return p;
    }

    static bool NearSwan(double[] alpha, int x, int y, int w, int h) {
        for (int dy = -2; dy <= 2; dy++)
            for (int dx = -2; dx <= 2; dx++) {
                int nx = x + dx, ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < w && ny < h && alpha[ny * w + nx] > 0.02 && !InWedge(nx, ny)) return true;
            }
        return false;
    }

    // Schwan aus dem Hintergrund entfernen: pro Zeile zwischen den Nachbarpixeln links und rechts auffuellen
    static void FillBackground(byte[] bg, byte[] px, double[] alpha, int w, int h) {
        for (int y = 0; y < h; y++) {
            int x = 0;
            while (x < w) {
                if (!NearSwan(alpha, x, y, w, h)) { x++; continue; }
                int start = x;
                while (x < w && NearSwan(alpha, x, y, w, h)) x++;
                int l = start - 1, r = x;
                for (int k = start; k < x; k++) {
                    int i = (y * w + k) * 4;
                    if (y > 450 && Radius(k, y) > 245 && FillAlongCircle(bg, px, alpha, k, y, w, h)) continue;
                    int il = (y * w + (l >= 0 ? l : r)) * 4, ir = (y * w + (r < w ? r : l)) * 4;
                    double t = (double)(k - l) / (r - l);
                    for (int c = 0; c < 3; c++) bg[i + c] = (byte)Math.Round(px[il + c] + (px[ir + c] - px[il + c]) * t);
                }
            }
        }
    }

    // Am Kreisrand entlang des Kreises auffuellen, damit Rot und Ring nicht ineinander verlaufen
    static bool FillAlongCircle(byte[] bg, byte[] px, double[] alpha, int x, int y, int w, int h) {
        double r = Radius(x, y), a0 = Math.Atan2(y - Cy, x - Cx), step = 1.0 / r;
        int[] found = new int[2], dist = new int[2];
        for (int d = 0; d < 2; d++) {
            found[d] = -1;
            for (int s = 1; s < 400; s++) {
                double a = a0 + (d == 0 ? -s : s) * step;
                int sx = (int)Math.Round(Cx + r * Math.Cos(a)), sy = (int)Math.Round(Cy + r * Math.Sin(a));
                if (sx < 0 || sy < 0 || sx >= w || sy >= h) break;
                if (!NearSwan(alpha, sx, sy, w, h)) { found[d] = (sy * w + sx) * 4; dist[d] = s; break; }
            }
        }
        if (found[0] < 0 || found[1] < 0) return false;
        double t = (double)dist[0] / (dist[0] + dist[1]);
        int i = (y * w + x) * 4;
        for (int c = 0; c < 3; c++) bg[i + c] = (byte)Math.Round(px[found[0] + c] + (px[found[1] + c] - px[found[0] + c]) * t);
        return true;
    }

    static void DrawBar(byte[] bg, double[] profile, int w) {
        for (int y = BarTop - 2; y <= BarBottom + 2; y++)
            for (int x = BarLeft; x <= BarRight; x++) {
                double pa = profile[y];
                if (pa <= 0) continue;
                int i = (y * w + x) * 4;
                Put(bg, i,
                    bg[i + 2] * (1 - pa) + Navy[0] * pa,
                    bg[i + 1] * (1 - pa) + Navy[1] * pa,
                    bg[i] * (1 - pa) + Navy[2] * pa, bg[i + 3] / 255.0);
            }
    }

    public static void Run(string input, string outDir) {
        var src = new Bitmap(input);
        int w = src.Width, h = src.Height;
        var px = Load(src);
        src.Dispose();

        var profile = BarProfile(px, w);
        var alpha = new double[w * h];
        for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) alpha[y * w + x] = SwanAlpha(px, x, y, w);
        var bg = (byte[])px.Clone();
        var body = new byte[px.Length];
        var bar = new byte[px.Length];
        var fists = new byte[px.Length];

        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                int i = (y * w + x) * 4;
                bool barRow = y >= BarTop && y <= BarBottom;
                double a = alpha[y * w + x];

                if (InFist(x, y)) {
                    PutUnblended(fists, px, i, a);
                } else if (barRow) {
                    double above = SwanAlpha(px, x, BarTop - 1, w), below = SwanAlpha(px, x, BarBottom + 1, w);
                    if (above > 0.5 && below > 0.5) {
                        // Hals hinter der Stange: zwischen den Zeilen ueber und unter der Stange auffuellen
                        double t = (double)(y - BarTop + 1) / (BarBottom - BarTop + 2);
                        int ia = ((BarTop - 1) * w + x) * 4, ib = ((BarBottom + 1) * w + x) * 4;
                        Put(body, i,
                            px[ia + 2] + (px[ib + 2] - px[ia + 2]) * t,
                            px[ia + 1] + (px[ib + 1] - px[ia + 1]) * t,
                            px[ia] + (px[ib] - px[ia]) * t, 1);
                    }
                } else {
                    PutUnblended(body, px, i, a);
                }


                // Stange: ueberall gleiches Profil, auch hinter Hals und Faeusten
                if (y >= BarTop - 2 && y <= BarBottom + 2 && x >= BarLeft && x <= BarRight && profile[y] > 0) {
                    double pa = profile[y];
                    Put(bar, i, Navy[0], Navy[1], Navy[2], pa);
                }
            }
        }

        FillBackground(bg, px, alpha, w, h);
        DrawBar(bg, profile, w);
        Save(bg, w, h, System.IO.Path.Combine(outDir, "swan-bg.png"));
        Save(body, w, h, System.IO.Path.Combine(outDir, "swan-body.png"));
        Save(bar, w, h, System.IO.Path.Combine(outDir, "swan-bar.png"));
        Save(fists, w, h, System.IO.Path.Combine(outDir, "swan-fists.png"));
    }
}
"@

$in = (Resolve-Path $InputPath).Path
$out = (Resolve-Path $OutputDir).Path
[SwanSplit]::Run($in, $out)
Get-ChildItem "$out\swan-*.png" | Where-Object Name -ne 'swan-calisthenics.png' | Select-Object Name, Length
