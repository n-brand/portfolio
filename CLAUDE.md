# Portfolio – Nicolas Brand

Persönliche Portfolio-Website (statisches HTML/CSS/JS), gehostet über GitHub Pages: https://n-brand.github.io/portfolio/

## Struktur

- `index.html` – Startseite: Sidebar + Projekte (Karten mit Filter) + Kontakt
- `ueber-mich.html` – Über-mich-Seite (Steckbrief, Werdegang, Skills, Interessen – noch mit Platzhaltern)
- `projekte/<slug>.html` – eine Detailseite pro Projekt (Illustration, Lead, Zeitraum/Status/Tech, Über das Projekt, Features, Technik, Vor/Zurück)
- `css/styles.css` – alle Styles; Dark ist Standard (`:root`), Light über `:root[data-theme="light"]`
- `javascript/main.js` – Hell/Dunkel-Umschalter (Wahl in `localStorage` unter `theme`), aktiver Navigationspunkt beim Scrollen (nur Startseite), Projektfilter, Jahreszahl
- `tools/build-pages.js` – **Generator**: enthält alle Projektdaten (Texte, Features, Tech, Links, Status) und die SVG-Illustrationen und erzeugt daraus die Projektkarten in `index.html`, alle `projekte/*.html`, `ueber-mich.html` sowie die Sidebar auf allen Seiten.
- `docs/bild-prompt.md` – Prompt für Bildmodelle, um ein Bild im Art Style der Seite (Flat Design, PNG ohne Hintergrund) zu erzeugen
- Lokal testen: Eintrag `portfolio` in `C:Source.claudelaunch.json` → http://localhost:4176

## Seiten bearbeiten

- **Projekte, Sidebar, Über-mich-Seite: immer in `tools/build-pages.js` ändern** und danach `node tools/build-pages.js` ausführen. Nicht direkt in den erzeugten HTML-Dateien ändern – das wird beim nächsten Lauf überschrieben.
- In `index.html` von Hand gepflegt: `<head>`, Projekte-Überschrift + Filter, Kontakt-Abschnitt. Der Generator ersetzt nur das `.projects-grid` und die `<aside>`.
- Neues Projekt: Eintrag im Array `projects` (slug, category, title, card, lead, period, status, live, code, about, features, tech, techNotes) + Illustration in `ART[slug]` + Farb-Theme `.theme-<slug>` in `styles.css`.

## Konventionen

- **Design im Stil der Font-Awesome-Website** (Wunsch von Nicolas): hellgrauer Hintergrund, Navy-Text (#183153), runde Schrift (Nunito über Google Fonts), stark abgerundete Karten mit dickem dunklerem „Schatten-Rand“ unten (`box-shadow: 0 5px 0 …`), Badge oben mittig (LIVE / IN ARBEIT / PROTOTYP / FERTIG), unterstrichener Pfeil-Link „Mehr lesen →“, gelbe Buttons mit Schattenkante. Illustrationen im Flat-Design-Stil (flache Vektorgrafik, teils Pixel-Art).
- **Dark ist Standard**, unabhängig von der Systemeinstellung; Umschalter (Sonne/Mond) oben rechts in der Sidebar. Ein Inline-Skript im `<head>` setzt `data-theme="light"` vor dem Rendern, damit nichts aufblitzt.
- **Jede Projektkarte hat ein eigenes Farb-Theme und eine eigene SVG-Illustration passend zum Inhalt** (z.B. Klimmzugstange bei Swan, Pixel-Kopf bei Minecraft, Terminal beim Text-Adventure). Neue Projekte bekommen ebenfalls eine passende Illustration.
- **Desktop-first:** Basis-Styles gelten für große Bildschirme, Anpassungen per `max-width`-Media-Queries (1200px Laptop, 900px Tablet/Handy mit Tab-Leiste unten, 680px einspaltig) plus `min-width: 2000px` für sehr breite Monitore. Nicolas nutzt einen sehr breiten Monitor (ca. 2850px CSS-Breite bei 70 % Zoom) – leerer Platz soll vermieden werden, daher keine feste Maximalbreite.
- Mobile Navigation: Tab-Leiste unten im Stil von swancalisthenics.ch (Icon über Text, aktiver Punkt getönt hinterlegt).
- Inhalte auf Deutsch, Klassennamen und IDs auf Englisch.
- Nur strukturierende Kommentare (z.B. `/* --- Navigation --- */`).
- Texte über Projekte nur mit belegten Fakten (aus Code/Repo), nichts erfinden.

## Aktueller Stand – IMMER AKTUELL HALTEN

**Nach jeder Änderung an diesem Repo diesen Abschnitt aktualisieren** (was gemacht wurde, was offen ist), damit der Stand jederzeit nachvollziehbar ist.

Stand: 2026-10-03

Erledigt:
- Vorlage (KI-generiert) durch echte Inhalte auf Deutsch ersetzt; Profilbild durch „NB“-Kachel ersetzt; FontAwesome-Dateien entfernt (Icons als Inline-SVG), da `assets/` nie im Repo war; Kontaktformular durch GitHub-Link ersetzt.
- Layout desktop-first: fixierte Sidebar links, Projekte füllen die volle Breite; auf ≤900px Tab-Leiste unten.
- 9 Projekte mit eigener Detailseite („Mehr lesen“): Swan Calisthenics (offiziell, Code: https://github.com/swancalisthenics/home), Minecraft Skin Merger, Gamehub, JARVIS-Anleitung (aktuell), Escape Room, Textbased Game, Hofladen-Webshop, Influencer, Mediensammlung (Schule). Inhalte aus dem jeweiligen Code recherchiert.
- Über-mich-Seite angelegt (Platzhalter für persönliche Infos, Skills aus den Projekten abgeleitet).
- Redesign im Font-Awesome-Stil mit Farb-Theme + Illustration pro Projekt.
- Dark als Standard-Design, Hell/Dunkel-Umschalter in der Sidebar (Wahl bleibt gespeichert).
- Kartenfuß vereinheitlicht: immer zuerst die Buttons (Live ansehen, Code) in einer Zeile, darunter „Mehr lesen →“ (`.card-footer`).
- Bild-Prompt für Illustrationen im Seiten-Stil unter `docs/bild-prompt.md` abgelegt.
- Git-Historie lokal umgeschrieben: alle Commits nutzen die noreply-Adresse.
- Ideen & Inspiration von n1code.dev (Seite eines Kollegen) gesammelt.

Offen:
- **Force-Push steht noch aus** (durch Berechtigungen blockiert; GitHub hat noch die alte Historie mit Gmail-Adresse). Befehl: `git push --force-with-lease=main:e5d463ba931f3a6501298cd35dbb53598cc68cf3 origin main`
- **Über-mich-Seite:** Nicolas liefert noch Infos (Vorstellung, Wohnort, Ausbildung, Werdegang, Interessen) – Platzhalter (`.placeholder`) dann in `aboutPage()` ersetzen.
- **Gamehub** ist nur lokal (`C:Sourcegamehub`) fertig, das GitHub-Repo ist noch leer → Code-Link zeigt auf leeres Repo, bis dort gepusht wird. Live-Link ergänzen, sobald gehostet.
- **Escape Room:** alle Commits stammen vom GitHub-Nutzer „Emi15454“ – mit Nicolas klären, ob Gruppenarbeit, und ggf. erwähnen.
- **Influencer:** Repo enthält noch Reste aus dem Webshop (Beschreibungen, Footer) und ein kaputtes `js/local.json` – evtl. aufräumen.
- `README.md` enthält noch den ursprünglichen KI-Prompt – evtl. durch Projektbeschreibung ersetzen.
- Echte Screenshots der Projekte (optional, zusätzlich zu den Illustrationen); echtes Profilfoto (optional).

## Ideen & Inspiration

Sammlung von Ideen für spätere Erweiterungen. Nichts davon ist umgesetzt – vor dem Umsetzen mit Nicolas absprechen.

### Von n1code.dev (Seite eines Kollegen, angeschaut 2026-10-03)

Nur als Inspiration – kein Design oder Text 1:1 kopieren.

- **Mehrere Unterseiten statt einer langen Seite:** About (Link-Hub), Projects, Stack, Setup, Interests, Contact – jede Seite mit eigenem Hero (Icon-Kachel, Titel mit farbig hervorgehobenem zweiten Wort, z.B. „Project **Showcase**“, kurzer Untertitel).
- **Link-Hub als Startseite (wie Linktree):** zentrale Karte mit Profilbild, Name, Kurz-Tagline mit Emojis und einer Liste von Link-Buttons (Icon + Titel + kleine Beschreibung), z.B. GitHub, swancalisthenics.ch, Discord, YouTube.
- **Setup-Seite („My Command Center“):** Karten pro Kategorie (PC-Specs, Peripherie, Development Setup); jeder Eintrag mit Produktname fett, Kategorie klein in Monospace darunter und Link-Pfeil rechts.
- **Tech-Stack-Seite:** Gruppen (Sprachen, Frontend, Backend, Datenbanken, Tools) mit kleinen Kacheln: Icon, Name und farbiges Level-Badge (z.B. Fortgeschritten / Experte / Mittel).
- **Interessen-Seite:** Tabs (z.B. Gaming / Anime), Filter- und Sortier-Dropdown, Bibliothek mit Favoriten; dort sogar per Steam-Sync bzw. Admin-Panel befüllt (für uns statisch reicht).
- **Projektkarten:** längere Beschreibung inkl. Tech-Stack, Tags in Akzentfarbe, Platz für Vorschaubild oben.
- **Kontaktseite:** großes Formular in einer Karte (Name, E-Mail nebeneinander, Nachricht darunter, Senden-Button mit Icon) – falls wir wieder ein Formular wollen.
- **Look:** dunkles Navy mit Cyan/Türkis-Akzent, sanfter Glow hinter dem Hero, dezentes Raster/Muster im Hintergrund, abgerundete Karten mit feinem Rand, Display-Schrift für Überschriften und Monospace für Labels.
- **Navigation:** schwebende, abgerundete Pill-Leiste unten (auch auf Desktop) mit Icon + kleinem Label in Großbuchstaben; aktiver Punkt in Akzentfarbe.

## Git – WICHTIG

**Commits dürfen niemals mit Nicolas' echter E-Mail-Adresse gemacht werden** (weder privat noch geschäftlich).
Immer die GitHub-noreply-Adresse verwenden. Vor dem ersten Commit prüfen bzw. setzen:

```bash
git config user.name "Nicolas Brand"
git config user.email "227780975+n-brand@users.noreply.github.com"
```
