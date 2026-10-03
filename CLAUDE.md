# Portfolio – Nicolas Brand

Persönliche Portfolio-Website (statisches HTML/CSS/JS), gehostet über GitHub Pages: https://n-brand.github.io/portfolio/

## Struktur

- `index.html` – Sidebar (Profil, Navigation, GitHub, Footer) + Hauptbereich (Projekte mit Filter, Kontakt)
- `css/styles.css` – Styles, Dark/Light-Mode über `prefers-color-scheme`
- `javascript/main.js` – aktiver Navigationspunkt beim Scrollen, Projektfilter, Jahreszahl im Footer
- Lokal testen: Eintrag `portfolio` in `C:\Source\.claude\launch.json` → http://localhost:4176

## Konventionen

- **Desktop-first:** Basis-Styles gelten für große Bildschirme, Anpassungen per `max-width`-Media-Queries (1200px Laptop, 900px Tablet/Handy mit Tab-Leiste unten, 680px einspaltig) plus `min-width: 2000px` für sehr breite Monitore. Nicolas nutzt einen sehr breiten Monitor (ca. 2850px CSS-Breite bei 70 % Zoom) – leerer Platz soll vermieden werden, daher keine feste Maximalbreite.
- Mobile Navigation: Tab-Leiste unten im Stil von swancalisthenics.ch (Icon über Text, aktiver Punkt getönt hinterlegt).
- Inhalte auf Deutsch, Klassennamen und IDs auf Englisch.
- Nur strukturierende Kommentare (z.B. `/* --- Navigation --- */`).
- Neue Projekte als `.project-card` mit `data-category` = `current` | `school` | `official`; `.featured` belegt 2 Spalten.

## Aktueller Stand – IMMER AKTUELL HALTEN

**Nach jeder Änderung an diesem Repo diesen Abschnitt aktualisieren** (was gemacht wurde, was offen ist), damit der Stand jederzeit nachvollziehbar ist.

Stand: 2026-10-03

Erledigt:
- Vorlage (KI-generiert) durch echte Inhalte auf Deutsch ersetzt.
- Projekte: Swan Calisthenics (offiziell, hervorgehoben, https://swancalisthenics.ch/), Minecraft Skin Merger und JARVIS-Anleitung (aktuell), Escape Room, Textbased Game, Hofladen-Webshop, Influencer, Mediensammlung (Schule).
- Profilbild durch „NB“-Initialen ersetzt; FontAwesome entfernt (GitHub-Icon als Inline-SVG), da `assets/` nie im Repo war.
- Kontaktformular entfernt, stattdessen GitHub-Link.
- Layout desktop-first umgebaut: fixierte Sidebar links, Projekte füllen die volle Breite (getestet 2857px: 6 Spalten, 1920px: 3, 800px: 2, 375px: 1); auf ≤900px Tab-Leiste unten wie bei swancalisthenics.ch. Hamburger-Menü entfernt.
- Git-Historie lokal umgeschrieben: alle Commits nutzen die noreply-Adresse.

Offen:
- **Force-Push steht noch aus** (wurde durch Berechtigungen blockiert, GitHub hat noch die alte Historie mit Gmail-Adresse). Befehl: `git push --force-with-lease=main:e5d463ba931f3a6501298cd35dbb53598cc68cf3 origin main`
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
