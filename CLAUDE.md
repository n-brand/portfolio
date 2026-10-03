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

## Aktueller Stand – IMMER AKTUELL HALTEN

**Nach jeder Änderung an diesem Repo diesen Abschnitt aktualisieren** (was gemacht wurde, was offen ist), damit der Stand jederzeit nachvollziehbar ist.

Stand: 2026-10-03

Erledigt:
- Vorlage (KI-generiert) durch echte Inhalte auf Deutsch ersetzt.
- Projekte: Swan Calisthenics (offiziell, hervorgehoben, https://swancalisthenics.ch/), Minecraft Skin Merger und JARVIS-Anleitung (aktuell), Escape Room, Textbased Game, Hofladen-Webshop, Influencer, Mediensammlung (Schule).
- Profilbild durch „NB“-Initialen ersetzt; FontAwesome entfernt (GitHub-Icon als Inline-SVG), da `assets/` nie im Repo war.
- Kontaktformular entfernt, stattdessen GitHub-Link.
- Git-Historie umgeschrieben: alle Commits nutzen die noreply-Adresse (force-push).
- Lokaler Server: Eintrag `portfolio` in `C:\Source\.claude\launch.json` (http://localhost:4176).

Offen:
- Zeitleiste „Erfahrung & Ausbildung“: wartet auf Angaben von Nicolas (Abschnitt aktuell entfernt).
- `README.md` enthält noch den ursprünglichen KI-Prompt – evtl. durch Projektbeschreibung ersetzen.
- Beschreibungen von Escape Room, Textbased Game, Hofladen-Webshop, Influencer sind aus Repo-Namen abgeleitet – von Nicolas bestätigen lassen.
- Echtes Profilfoto (optional).

## Git – WICHTIG

**Commits dürfen niemals mit Nicolas' echter E-Mail-Adresse gemacht werden** (weder privat noch geschäftlich).
Immer die GitHub-noreply-Adresse verwenden. Vor dem ersten Commit prüfen bzw. setzen:

```bash
git config user.name "Nicolas Brand"
git config user.email "227780975+n-brand@users.noreply.github.com"
```
