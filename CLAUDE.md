# Portfolio – Nicolas Brand

Persönliche Portfolio-Website (statisches HTML/CSS/JS), gehostet über GitHub Pages: https://n-brand.github.io/portfolio/

## Struktur

- `index.html` – Startseite: Sidebar + Projekte (Karten mit Filter)
- `kontakt.html` – eigene Kontaktseite (seit 2026-10-21, Wunsch von Nicolas; vorher Abschnitt auf der Startseite): Karte für GitHub (Swan-Karte auf Wunsch von Nicolas entfernt); Inhalte in `contactPage()` im Generator
- `ueber-mich.html` – Über-mich-Seite (Vorstellung, Steckbrief, Werdegang, Skills, Interessen); die Inhalte stehen als Daten in `aboutPage()` im Generator
- `projekte/<slug>.html` – eine Detailseite pro Projekt (Illustration, Lead, Zeitraum/Status/Tech, Über das Projekt, Features, Technik, Vor/Zurück)
- `css/styles.css` – alle Styles; Dark ist Standard (`:root`), Light über `:root[data-theme="light"]`
- `javascript/main.js` – Hell/Dunkel-Umschalter (Wahl in `localStorage` unter `theme`), aktiver Navigationspunkt beim Scrollen (nur Startseite), Projektfilter, Auslöser der Bild-Animationen auf Touch-Geräten, Jahreszahl
- `tools/build-pages.js` – **Generator**: enthält alle Projektdaten (Texte, Features, Tech, Links, Status) und die SVG-Illustrationen und erzeugt daraus die Projektkarten in `index.html`, alle `projekte/*.html`, `ueber-mich.html` sowie die Sidebar auf allen Seiten.
- `tools/crop-circle.ps1` – schneidet runde Motive (Kreis mit Navy-Ring, z.B. das Swan-Logo) aus einem Rohbild aus und speichert ein 600×600-PNG mit echter Transparenz (Befehl siehe `docs/bild-prompt.md`)
- `tools/split-swan.ps1` – zerlegt das Swan-Logo in vier Ebenen für die CSS-Klimmzug-Animation (`swan-bg`, `swan-body`, `swan-bar`, `swan-fists` in `assets/images/`); nach jeder Änderung am Swan-Bild neu ausführen: `powershell -ExecutionPolicy Bypass -File tools/split-swan.ps1`
- `swan-vergleich.html` – nicht verlinkte Vergleichsseite für den Swan-Klimmzug: A = Bild in Ebenen (**von Nicolas gewählt, auf der Seite**), B = Schwan aus reinem CSS (bleibt als Alternative erhalten, nicht löschen) (`css/swan-css.css`, Keyframes aus `tools/swan-css-keyframes.js`)
- **PWA:** `manifest.webmanifest`, `sw.js` (Service Worker) und `assets/icons/` (App-Icons). Die Liste der Offline-Dateien in `sw.js` (zwischen `PRECACHE-START`/`-END`) schreibt der Generator: alle Seiten, Styles, Skripte und alle Bilder unter `assets/`. Die PWA-Angaben im Kopf (Manifest, Icons, iPhone-Tags) kommen aus `appHead()` im Generator, in `index.html` werden sie einmalig eingefügt.
- `tools/make-icons.ps1` – erzeugt die App-Icons (gelbe „NB“-Kachel wie in der Sidebar, gedreht, mit dunkler Kante, auf Navy; Buchstaben als runde Linien statt Schrift): `apple-touch-icon.png` (180, iPhone), `icon-192/512.png`, `icon-maskable-512.png` (kleinere Kachel für runde Android-Masken), `icon-32.png`, `icon.svg`. Aufruf: `powershell -ExecutionPolicy Bypass -File tools/make-icons.ps1`
- `assets/images/` – fertige Projektbilder (PNG mit Transparenz), siehe „Bilder & Animationen“
- `originals/` – Rohbilder (z.B. von Gemini), **nicht in Git** (`.gitignore`); daraus werden die Bilder in `assets/images/` erzeugt
- `docs/bild-prompt.md` – Prompts für Bildmodelle (Bild im Art Style der Seite, zweite Pose für Animationen) und Anleitung zum Zuschneiden
- Lokal testen: Eintrag `portfolio` in `C:\Source\.claude\launch.json` → http://localhost:4176

## Seiten bearbeiten

- **Projekte, Sidebar, Über-mich-Seite: immer in `tools/build-pages.js` ändern** und danach `node tools/build-pages.js` ausführen. Nicht direkt in den erzeugten HTML-Dateien ändern – das wird beim nächsten Lauf überschrieben.
- In `index.html` von Hand gepflegt: `<head>`, Projekte-Überschrift + Filter. Der Generator ersetzt nur das `.projects-grid` und die `<aside>`.
- Neues Projekt: Eintrag im Array `projects` (slug, category, title, card, lead, period, status, live, code, about, features, tech, techNotes) + Illustration in `ART[slug]` + Farb-Theme `.theme-<slug>` in `styles.css`.

## Bilder & Animationen

- **Eigenes Bild statt SVG:** beim Projekt `image: 'assets/images/<datei>.png'` eintragen → ersetzt die SVG-Illustration auf Karte und Detailseite.
- **Animation aus Ebenen (nur CSS):** beim Projekt `layers: ['<name>', …]` eintragen (Dateien `assets/images/<name>.png`, alle gleich groß, übereinander gestapelt, Reihenfolge = Zeichenreihenfolge). Die Bewegung steht pro Projekt in `styles.css` (z.B. `.art-swan-calisthenics .layer-swan-body` mit `@keyframes swan-pullup`). Alle Ebenen brauchen `position: relative`, sonst landet die per `transform` bewegte Ebene über den anderen. Touch-Auslöser und reduzierte Bewegung wie bei Frames. Eine Ebene kann als `{ name, strips }` in 1 px breite senkrechte Streifen zerlegt werden (`armStrips()` im Generator): jeder Streifen ist dasselbe Bild mit `clip-path` und eigenem `--f` (Anteil Stauchen vs. Mitbewegen), so verformt sich der Übergang zwischen Arm und Körper fließend statt mit Schnittkante.
- **Animation aus mehreren Bildern:** stattdessen `frames: ['assets/images/<start>.png', 'assets/images/<zweite-pose>.png']` eintragen. Beim Hover über Karte bzw. Detail-Banner wechselt das Bild in einer Schleife (1,6 s) zur zweiten Pose und zurück, mit kurzem Federn (`frames-swap`, `frames-bounce` in `styles.css`). Auf Touch-Geräten spielt die Animation zwei Durchgänge, sobald das Bild ins Blickfeld scrollt (`main.js`, Klasse `.is-playing`). Bei „Bewegung reduzieren“ (`prefers-reduced-motion`) bleibt das Startbild stehen. Beide Frames müssen exakt gleich ausgerichtet sein → beide mit `tools/crop-circle.ps1` zuschneiden.
- **Rohbilder von Gemini:** Gemini liefert statt echter Transparenz oft ein aufgemaltes Schachbrett (JPG) oder einen schwarzen Hintergrund → Rohbild in `originals/` ablegen und mit `tools/crop-circle.ps1` zuschneiden. Neue Posen oder Varianten immer unter neuem Namen speichern, nie über das Basisbild.

## Konventionen

- **Design im Stil der Font-Awesome-Website** (Wunsch von Nicolas): hellgrauer Hintergrund, Navy-Text (#183153), runde Schrift (Nunito über Google Fonts), stark abgerundete Karten mit dickem dunklerem „Schatten-Rand“ unten (`box-shadow: 0 5px 0 …`), Badge oben mittig (LIVE / IN ARBEIT / PROTOTYP / FERTIG), unterstrichener Pfeil-Link „Mehr lesen →“, gelbe Buttons mit Schattenkante. Illustrationen im Flat-Design-Stil (flache Vektorgrafik, teils Pixel-Art).
- **Dark ist Standard**, unabhängig von der Systemeinstellung; Umschalter (Sonne/Mond) oben rechts in der Sidebar. Ein Inline-Skript im `<head>` setzt `data-theme="light"` vor dem Rendern, damit nichts aufblitzt.
- **Jede Projektkarte hat ein eigenes Farb-Theme und eine eigene SVG-Illustration passend zum Inhalt** (z.B. Klimmzugstange bei Swan, Pixel-Kopf bei Minecraft, Terminal beim Text-Adventure). Neue Projekte bekommen ebenfalls eine passende Illustration.
- **Desktop-first:** Basis-Styles gelten für große Bildschirme, Anpassungen per `max-width`-Media-Queries (1200px Laptop, 900px Tablet/Handy mit Tab-Leiste unten, 680px einspaltig) plus `min-width: 2000px` für sehr breite Monitore. Nicolas nutzt einen großen Monitor (ca. 2170px CSS-Breite, mit 70 % Zoom ca. 2850px) – leerer Platz soll vermieden werden, daher keine feste Maximalbreite. Er will **viele Projekte auf einmal sehen** (2026-10-21 nochmals verkleinert): Karten mindestens 250px breit (ab 2000px 240px), kompakte Abstände, Titel 1,35rem, keine größere Grundschrift. Ergibt 5 Spalten bei 1920px, 6 bei 2170px, 7 bei 2560px, 8 bei 2857px.
- **Handy (≤680px): zwei Karten pro Zeile, nur Bild, Badge und Titel** (2026-10-21, Wunsch von Nicolas; ein Ausklappen per Leiste hat ihm nicht gefallen und wurde entfernt). Beschreibung, Tags und Links (`.card-details`) sind dort ausgeblendet; die ganze Karte führt zur Detailseite (`.project-title-link::after` deckt die Karte ab, der Play/Pause-Knopf liegt mit `z-index` darüber). Das Hauptprojekt (featured) bleibt volle Breite. Damit man sieht, dass Karten anklickbar sind (Hinweis von Nicolas): runder Pfeil oben rechts in jeder Karte (`.card-go`, in der Linkfarbe der Karte getönt; neben dem Titel war zu wenig Platz) und die Karte wird beim Antippen kurz kleiner (`:active`).
- Mobile Navigation: Tab-Leiste unten im Stil von swancalisthenics.ch (Icon über Text, aktiver Punkt getönt hinterlegt).
- Inhalte auf Deutsch, Klassennamen und IDs auf Englisch.
- Nur strukturierende Kommentare (z.B. `/* --- Navigation --- */`).
- Texte über Projekte nur mit belegten Fakten (aus Code/Repo), nichts erfinden.
- **Persönliche Daten:** Wohnort und Lehrbetrieb nennt Nicolas bewusst nicht – nicht ergänzen. Keine Adresse, kein Geburtsdatum, keine Telefonnummer, keine private E-Mail auf der Seite.
- Infos von Nicolas einzeln abfragen (eine kurze Frage nach der anderen, mit Auswahlmöglichkeiten), nicht als langes Formular.

## Aktueller Stand – IMMER AKTUELL HALTEN

**Nach jeder Änderung an diesem Repo diesen Abschnitt aktualisieren** (was gemacht wurde, was offen ist), damit der Stand jederzeit nachvollziehbar ist.

Stand: 2026-10-21

Erledigt:
- Vorlage (KI-generiert) durch echte Inhalte auf Deutsch ersetzt; Profilbild durch „NB“-Kachel ersetzt; FontAwesome-Dateien entfernt (Icons als Inline-SVG), da `assets/` nie im Repo war; Kontaktformular durch GitHub-Link ersetzt.
- Layout desktop-first: fixierte Sidebar links, Projekte füllen die volle Breite; auf ≤900px Tab-Leiste unten.
- 12 Projekte mit eigener Detailseite („Mehr lesen“): Swan Calisthenics (offiziell, Code: https://github.com/swancalisthenics/home), Minecraft Skin Merger, Gamehub, StrategieSpiel, Watch-Shop, Jarvis Mobile, JARVIS-Anleitung (aktuell), Escape Room, Textbased Game, Hofladen-Webshop, Influencer, Mediensammlung (Schule). Inhalte aus dem jeweiligen Code recherchiert.
- Über-mich-Seite mit Nicolas' Angaben gefüllt (2026-10-04): Vorstellung, Steckbrief (Informatiker EFZ Applikationsentwicklung, Lehrbeginn 2025, Schwerpunkt Webentwicklung), Werdegang (Swan Calisthenics seit Juni 2026, Lehre seit 2025, Sekundarschule 2022–2025), Interessen (Calisthenics, Gaming, KI & neue Tools) als Karten mit Icon (`INTEREST_ICONS` im Generator; Calisthenics = Klimmzug-Figur, von Nicolas aus vier Varianten gewählt). Skills aus den Projekten abgeleitet. Platzhalter-Styles entfernt.
- Redesign im Font-Awesome-Stil mit Farb-Theme + Illustration pro Projekt.
- Dark als Standard-Design, Hell/Dunkel-Umschalter in der Sidebar (Wahl bleibt gespeichert).
- Kartenfuß vereinheitlicht: immer zuerst die Buttons (Live ansehen, Code) in einer Zeile, darunter „Mehr lesen →“ (`.card-footer`).
- Bild-Prompt für Illustrationen im Seiten-Stil unter `docs/bild-prompt.md` abgelegt.
- Swan Calisthenics nutzt Nicolas' eigenes Logo-Bild (Schwan an der Klimmzugstange, mit Gemini erstellt) statt der SVG. Am 2026-10-04 hat Nicolas das Basisbild bewusst durch eine neue, schärfere Version ersetzt (Rohbild 1254×1254 mit schwarzem Hintergrund in `originals/swan-calisthenics.png`, mit `tools/crop-circle.ps1` zugeschnitten → `assets/images/swan-calisthenics.png`). Das erste Gemini-Original (JPG mit aufgemaltem Schachbrett) liegt ungetrackt im Projektordner (`Gemini_Generated_Image_*` in `.gitignore`; ein versehentlich committetes Exemplar wurde per filter-branch aus der Historie entfernt).
- Dunkle Karten (Swan, Textbased Game) haben einen feinen hellen Rand über `--card-ring` im Theme; andere Karten ohne Rand.
- JARVIS-Karte hatte fast dieselbe Farbe wie der dunkle Hintergrund → neues Theme im Iron-Man-Stil (Rot #a51d2d, goldene Links), Cyan-Reaktor bleibt.
- Minecraft-Illustration: Pixel-Kopf halb Steve (links), halb Zombie (rechts), gelbe Merge-Linie in der Mitte. Farben pro Pixel aus echten Minecraft-Gesichtern übernommen (`STEVE_FACE`, `ZOMBIE_FACE` im Generator).
- Pixel-Art-Illustrationen: Pixel überlappen um 0.6px (kein crispEdges), damit beim Drehen/Skalieren keine Linien zwischen den Pixeln entstehen.
- Label über der Überschrift auf Über-mich- und Detailseiten (z.B. „ÜBER MICH“) klebte an der Überschrift, weil es inline war → `.detail-header .project-label` ist jetzt `inline-block` mit 18px Abstand.
- Große Bildschirme: statt 4 jetzt 5–7 Projekte pro Zeile (Grundschrift-Vergrößerung ab 2000px entfernt, Karten-Mindestbreite 360px → 270px, kompaktere Abstände).
- Hover-Klimmzug für Swan vorbereitet: Generator unterstützt `frames`, Animation (Hover, Touch-Auslöser, reduzierte Bewegung) ist gebaut und mit einem Test-Frame geprüft (Test-Frame wieder entfernt).
- Git-Historie umgeschrieben (alle Commits mit noreply-Adresse, Gemini-Original entfernt) und am 2026-10-04 von Nicolas per Force-Push auf GitHub gebracht. Ab jetzt reichen normale Pushes (Claude darf in dieser Umgebung nicht selbst pushen – Nicolas pusht).
- **StrategieSpiel** (2026-10-17) als aktuelles Projekt ergänzt: Nicolas' rundenbasiertes 4X-Strategiespiel in Low-Poly-3D (Three.js, PWA), Ordner `C:\Source\StrategieSpiel` (früher `C:\Source\3d-test`). Arbeitstitel war „Kleine Reiche“ – **nicht mehr verwenden**, der Name ist „StrategieSpiel“. Illustration: isometrische Insel mit Turm (aus dem App-Icon des Spiels übernommen, `tools/make-icons.mjs` dort) plus Segelboot; Theme Petrol #0b7285 mit gelben Links. Projekte ohne Live- und Code-Link zeigen eine gestrichelte Pille „Bald spielbar“ (`.project-link.soon`; `links()` im Generator). Repo https://github.com/n-brand/StrategieSpiel, live unter https://n-brand.github.io/StrategieSpiel/ (Pages über GitHub Actions, am 2026-10-17 geprüft: Spiel lädt ohne Fehler). Status „In Arbeit“; Fakten auf der Detailseite stammen aus der CLAUDE.md des Spiels vom 2026-10-17 – bei größeren Änderungen nachziehen.
- Gamehub-Illustration überarbeitet (2026-10-17): statt dünner Pixel-Schlange über Controller jetzt ein Browserfenster mit drei Spiel-Kacheln (Snake, 2048, Memory) und schräg davor ein Controller – zeigt „viele Spiele an einem Ort“.
- Hofladen- und Mediensammlung-Illustration überarbeitet (2026-10-17): Hofladen = Marktstand mit rot-weiß gestreiftem Dach, Apfelkiste, Eierkarton, Rüebli und gelbem „-20%“-Schild (Aktionspreise); Mediensammlung = drei aufgefächerte Film-Poster-Karten (wie auf der Seite), Popcorn und Kinoticket.
- Influencer-Illustration überarbeitet (2026-10-17): Handy mit Profil (Avatar, Folgen-Knopf, Beitragsraster), drumherum Like-Blase „12k“, Folgen-Blase, Kommentar-Blase und DE/US-Umschalter (wie der Filter der Seite).
- Escape-Room-Illustration überarbeitet (2026-10-17): Puppenhaus im Querschnitt mit vier Räumen; das Schlafzimmer ist gelb hervorgehoben, der Mauszeiger klickt darauf (wie der Prototyp: klickbare Räume mit Hover); dazu Schlüssel links, Vorhängeschloss rechts, Fragezeichen und Tür mit Schlüsselloch.
- **Swan-Hover-Klimmzug in reinem CSS** (2026-10-18, Wunsch von Nicolas statt zweitem Gemini-Bild): `tools/split-swan.ps1` zerlegt das Logo in Hintergrund (Schwan entfernt, Lücken zeilenweise aus den Nachbarpixeln aufgefüllt, Schatten unter den Füßen bleibt stehen), Körper (Stange am Hals ausgebessert), Stange und Fäuste. Beim Hover zieht sich der Körper um 12 % hoch (`swan-pullup`, 1,8 s Schleife), Fäuste und Stange bleiben stehen, die Stange liegt vor dem Hals, der Kopf ragt über den Kreis. Unterarme gleiten dabei hinter die Fäuste (wirkt wie Arme beugen).
- Swan-Klimmzug überarbeitet (2026-10-18): Arme sind eigene Ebenen (`swan-arm-left/right`), hängen an den Fäusten und werden beim Hochziehen gestaucht und breiter (Bizeps); Kanten mit Matting statt rosa Saum. Schwäche: senkrechte Schnittkanten der Arm-Ebenen sichtbar.
- **Version B: Swan aus reinem CSS** (2026-10-18, Wunsch von Nicolas zum Vergleich): Kreis, Stange, Flügel, Körper, Hals, Kopf, Beine aus CSS-Formen in `cqw`-Einheiten; Arme mit echtem Ellbogengelenk (Unterarm an der Faust, Oberarm am Ellbogen), Winkel per Kinematik berechnet (`tools/swan-css-keyframes.js`). Nur auf `swan-vergleich.html` eingebunden, noch nicht auf der Seite.
- **Entscheidung Swan-Klimmzug (2026-10-18): Nicolas nimmt A (Bild in Ebenen).** Danach rechte Flügelspitze repariert: sie ragte in Faust- und Arm-Ausschnitt und riss beim Hochziehen ab. Jetzt trennt eine schräge Linie Handgelenk und Feder (`InRightWing` in `split-swan.ps1`), Arm-Ausschnitte eng an den Armen (links x 106–178, rechts 412–499 ohne Feder). Rote Linien in der Ruheposition behoben: Browser verkleinert jede Ebene einzeln, an Schnittkanten schien Rot durch → Ebenen überlappen an senkrechten Kanten um 2 px (Körper über Arm, Faust über Feder).
- Swan-Klimmzug (2026-10-18, Wunsch von Nicolas): Die äußeren Flügel stauchen sich jetzt mit den Unterarmen mit. Arm-Ausschnitte reichen bis zu den Flügelspitzen (links x 55 bis zur Schulterlinie, rechts x 412–548 ab y 160); Innenkante links folgt der Schulter, die im Bild vor dem Arm liegt (Körper überlappt dort 16 px). Biceps-Verbreiterung 1.16 → 1.08, sonst passen die gestauchten Federn an der Unterkante nicht mehr. Körper wird an der Unterkante der Arme über 10 px weich eingeblendet (sonst heller Strich beim Verkleinern).
- Swan-Klimmzug nach Nicolas' Fehlerliste überarbeitet (2026-10-18): Körper steigt nur noch 40 px (vorher 60), Arme werden auf 64 % statt 46 % gestaucht – Unterarme bleiben sichtbar. Statt gerader Schnittkanten zerlegt der Generator die Arm-Ebenen in 1 px Streifen; zur Innenkante hin (links x 148→178, rechts 442→412) geht das Stauchen fließend ins normale Hochgehen über. Fäuste nicht mehr in der Arm-Ebene (sonst wanderte eine Kopie der Faustränder mit). Biceps-Verbreiterung entfernt (Streifen müssen bündig bleiben).
- Hals hinter der Stange (2026-10-18, Hinweis von Nicolas: „etwas sehr gerade“): wird nicht mehr spaltenweise senkrecht aufgefüllt, sondern Halskanten und Ende des hellblauen Schattenstreifens folgen je einer weichen Kurve (Hermite, Steigung aus 6 Zeilen über/unter der Stange); das Innere wird anteilig zwischen den Kanten verteilt (`InpaintNeck`). Dabei auch einen rosa Saum am Kopfumriss behoben (oben über dem weißen Ring sichtbar): als „voll Schwan“ zählen nur noch Pixel, die rundum Schwan sind (`Interior`), alle Randpixel werden aus Farbe des Innenpixels + Deckkraft berechnet.
- Weiße Linie über der Stange entfernt (2026-10-18): Die rot-navy gemischten Randpixel der Stange galten als „Schwan“, dadurch wurde die Hintergrund-Zeile mit dem Weiß des Rings aufgefüllt. In den Stangenzeilen zählen dunkle/rote Farben (G < 110, B < 130) jetzt nicht als Schwan.
- Äußere Finger beider Fäuste repariert (2026-10-18): sie reichen bis an den weißen Ring und wurden durch die verkleinerte Kreisgrenze (`RedRadius` 255, gegen den rosa Kopfrand) abgeschnitten. In den Faust-Bereichen gilt jetzt der volle Kreis (265); rund um die Fäuste wird der Hintergrund mit reinem Rot statt Rot/Weiß-Mischung gefüllt (`NearFist`).
- Stange nur noch in der Stangen-Ebene (2026-10-18): Sie war auch im Hintergrund enthalten, dadurch wurden die halbdurchsichtigen Ränder doppelt dunkel. `EraseBar` ersetzt die Stange im Hintergrund durch die Farbe darunter, nach Radius: Rot bis 264, weißer Ring bis 282, Navy-Ring bis 296. Rund um die Fäuste wird nur bis Radius 261 rot gefüllt, damit sich kein Rot in den Ring beißt. Ruheposition weicht nur noch in ~40 Einzelpixeln vom Original ab.
- Außenrand des Swan-Logos rund gemacht (2026-10-18, Wunsch von Nicolas): Links und rechts lag noch schwarzer Gemini-Hintergrund außerhalb des Navy-Rings, dadurch wirkte das Logo oval. `CleanRim` in `split-swan.ps1` malt dunkle Randpixel Navy und schneidet den Ring als sauberen Kreis bei Radius 297,5 ab (betrifft nur `swan-bg.png`).
- **Watch-Shop** (2026-10-21) als aktuelles Projekt ergänzt: Demo-Shop der erfundenen Uhrenmarke Orvane (Ordner `C:\Source\Watch-Shop`, Repo https://github.com/n-brand/Watch-Shop, erster Commit 2026-10-19). Fakten aus README und Code (3D-Uhr aus Code mit three.js, GSAP/Lenis, Konfigurator 3 Gehäuse × 3 Armbänder, Warenkorb ohne Zahlung, Modell-Verlauf, Logo-Seite, PWA). Illustration: goldene Uhr mit dunklem Zifferblatt auf 10:10 und Kristall-Logo, links drei Metall-Farbtupfer (Konfigurator), rechts Einkaufstüte mit CHF-Schild, Drehpfeil für 3D. Theme Uhrmachergrün #0f3d2e mit goldenen Links.
- **PWA** (2026-10-21, Wunsch von Nicolas): Seite lässt sich als App installieren (iPhone: Safari → Teilen → „Zum Home-Bildschirm“, Name „Nicolas B.“) und läuft offline. Service Worker: eigene Dateien Netz zuerst (4 s), sonst Speicher; Google Fonts aus dem Speicher; offline ohne Treffer → Startseite. Registrierung in `main.js` relativ zum Skript, funktioniert dadurch auch unter `/portfolio/` auf GitHub Pages. Lokal geprüft: Service Worker aktiv, 30 Dateien vorab gespeichert, Manifest und alle Icons laden.
- **Jarvis Mobile** (2026-10-21) als aktuelles Projekt ergänzt: Kopie von Nicolas' JARVIS-Fork (n-brand/jarvis, Original von adewaskar – auf der Seite steht, dass das Original nicht von ihm ist) als PWA fürs Handy, bewusst ohne Erinnerung (kein Kontext, Standort, N.O.R.A.). Repo https://github.com/n-brand/Jarvis-Mobile. Eigene Fork-Arbeit laut `CHANGELOG.md` dort (Personas, Einstellungs-Panel, Sprachbefehle, Anhänge, Electron). Illustration: Handy mit Arc-Reaktor und Sprach-Balken, Sprechblase „Hey Jarvis“, Installier-Symbol; Theme Iron-Man-Gold #f5b82e.
- **Play/Pause-Knopf am Swan** (2026-10-21, Wunsch von Nicolas): runder Knopf unten rechts am Bild (Karte und Detailseite), für alle Projekte mit `layers`. Schaltet die Dauerschleife (`.is-looping`) aus und an (Stand siehe unten: standardmässig an). Bild und Knopf liegen in `.art-stage`; auf der Karte ist `.card-art` dafür ein `div` mit Link (`.card-art-link`) und Knopf daneben, damit der Klick nicht die Detailseite öffnet. Bei „Bewegung reduzieren“ ausgeblendet.
- Handy-Ansicht mit zwei eingeklappten Karten pro Zeile und PC-Ansicht kompakter (2026-10-21, Wunsch von Nicolas), siehe Konventionen. Geprüft: keine Seitwärts-Scrollbalken, Buttons brechen bei keiner Breite um, Aufklappen/Zuklappen inkl. `aria-expanded`.
- **Swan-Klimmzug standardmässig an** (2026-10-21, Wunsch von Nicolas; Tempo 3 s pro Wiederholung, vorher 1,8 s): `.art-layers` startet mit `.is-looping`, der Knopf schaltet aus (Schwan zurück in die Ausgangsposition, kein Einfrieren) und wieder an. Kein Klimmzug mehr beim Hovern, kein Touch-Auslöser mehr für Ebenen (der IntersectionObserver gilt nur noch für `.art-frames`). Bei „Bewegung reduzieren“ läuft nichts, der Knopf ist ausgeblendet.
- Swan-Trainingszeiten aktualisiert (2026-10-21, Angabe von Nicolas): sonntags, im Sommer 18–20 Uhr draußen im Street Workout Park Horgen, im Herbst (früher dunkel) 17–19 Uhr, ab Dezember in einer Halle. Kartentext auf Wunsch von Nicolas nur noch „Website der Swan Calisthenics Community & Verein“; Lead nennt Sommer draußen / Winter Halle (Zeiten wechseln), die genauen Zeiten stehen nur im Text der Detailseite. „Kostenlos“ entfernt, weil für die Halle nicht bestätigt. Badges auf dem Handy wieder mittig auf der Kartenkante (`top: -10px`).
- Ideen & Inspiration von n1code.dev (Seite eines Kollegen) gesammelt.

Offen:
- **Swan-Klimmzug (optional):** Läuft jetzt per CSS mit Ebenen. Ein echtes zweites Gemini-Bild (Prompt in `docs/bild-prompt.md`) wäre nur noch nötig, wenn die Pose stärker wechseln soll (z.B. Brust deutlich über der Stange). Kleine Schwäche: auf Schulterhöhe ändert sich die Stauchung der Flügel sprunghaft (gestaucht oben, normal unten).
- **Watch-Shop live schalten:** https://n-brand.github.io/Watch-Shop/ zeigte am 2026-10-21 noch 404 (GitHub Pages im Repo nicht aktiv). Pfade sind relativ, daher reicht Settings → Pages → „Deploy from a branch“, `main`, Ordner `/ (root)`. Danach im Generator `live` eintragen.
- **Jarvis Mobile Live-Link** ist eingetragen (2026-10-21, auf Wunsch von Nicolas), die Seite bleibt aber weiß: GitHub Pages liefert die ungebaute `index.html` aus, die `/src/main.tsx` lädt (404). Lösung im Jarvis-Mobile-Repo: GitHub-Actions-Workflow (`npm ci`, `npm run build`, `dist/` veröffentlichen), Vite-`base` auf `/Jarvis-Mobile/`, Pages-Quelle „GitHub Actions“.
- **Über mich / Kontakt ergänzen (optional):** Nicolas wusste am 2026-10-21 noch nicht, was auf „Über mich“ dazukommen soll (Vorschläge: wie er zum Coden kam, was er gerade lernt, Ziele, mehr zu Swan). Kontakt hat nur GitHub – weitere Kanäle nur mit seiner Angabe, keine private E-Mail.
- **Über-mich-Seite (optional):** weitere Links (z.B. LinkedIn, Instagram) und ein echtes Profilfoto statt der „NB“-Kachel, falls Nicolas das möchte.
- **Gamehub** ist auf GitHub (https://github.com/n-brand/gamehub) und im Portfolio mit Live-Link (https://n-brand.github.io/gamehub/) eingetragen. GitHub Pages zeigt dort aber nur die README („gamehub“): Die App liegt in `public/`, und `public/index.html` nutzt absolute Pfade (`/css/…`, `/js/…`), die unter `/gamehub/` ins Leere zeigen. Lösung im Gamehub-Repo (nicht hier): Pfade relativ machen + GitHub-Actions-Workflow, der `public/` veröffentlicht (Pages-Quelle „GitHub Actions“).
- **Escape Room:** alle Commits stammen vom GitHub-Nutzer „Emi15454“ – mit Nicolas klären, ob Gruppenarbeit, und ggf. erwähnen.
- **Influencer:** Repo enthält noch Reste aus dem Webshop (Beschreibungen, Footer) und ein kaputtes `js/local.json` – evtl. aufräumen.
- `README.md` enthält noch den ursprünglichen KI-Prompt – evtl. durch Projektbeschreibung ersetzen.
- Echte Screenshots der Projekte (optional, zusätzlich zu den Illustrationen).

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
