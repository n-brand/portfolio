# Portfolio – Nicolas Brand

Persönliche Portfolio-Website (statisches HTML/CSS/JS), gehostet über GitHub Pages: https://n-brand.github.io/portfolio/

## Struktur

- `index.html` – Seite (Über mich, Projekte mit Filter, Kontakt)
- `css/styles.css` – Styles, Dark/Light-Mode über `prefers-color-scheme`
- `javascript/main.js` – Mobile-Navigation, Projektfilter
- Lokal testen: `npx serve .` oder `python -m http.server`

## Konventionen

- Inhalte auf Deutsch, Klassennamen und IDs auf Englisch.
- Nur strukturierende Kommentare (z.B. `/* --- Navigation --- */`).
- Neue Projekte als `.project-card` mit `data-category` = `current` | `school` | `official`.

## Git – WICHTIG

**Commits dürfen niemals mit Nicolas' echter E-Mail-Adresse gemacht werden** (weder privat noch geschäftlich).
Immer die GitHub-noreply-Adresse verwenden. Vor dem ersten Commit prüfen bzw. setzen:

```bash
git config user.name "Nicolas Brand"
git config user.email "227780975+n-brand@users.noreply.github.com"
```
