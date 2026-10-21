const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const CATEGORY_LABELS = { official: 'Offizielles Projekt', current: 'Aktuelles Projekt', school: 'Schulprojekt' };

// Arm-Ebene in senkrechte Streifen zerlegen: voll gestaucht (f = 1) ab "full", zur Innenkante "edge" hin
// schrittweise weniger (f -> 0, bewegt sich wie der Körper). So entsteht keine sichtbare Schnittkante.
function armStrips(x1, x2, full, edge) {
    const step = 1, dir = Math.sign(edge - full), strips = [];
    const core = dir > 0 ? [x1, full] : [full, x2];
    strips.push([core[0], core[1], 1]);
    for (let x = full; dir > 0 ? x < edge : x > edge; x += dir * step) {
        const a = Math.min(x, x + dir * step), b = Math.max(x, x + dir * step);
        const f = 1 - (Math.abs((a + b) / 2 - full) / Math.abs(edge - full));
        strips.push([a, b, +f.toFixed(3)]);
    }
    return strips;
}

const projects = [
    {
        slug: 'swan-calisthenics', category: 'official', featured: true, image: 'assets/images/swan-calisthenics.png',
        layers: [
            'swan-bg',
            { name: 'swan-arm-left', strips: armStrips(55, 178, 148, 178) },
            { name: 'swan-arm-right', strips: armStrips(412, 548, 442, 412) },
            'swan-body', 'swan-bar', 'swan-fists',
        ],
        title: 'Swan Calisthenics',
        card: 'Website der Swan Calisthenics Community – offene Outdoor-Trainings im Street Workout Park Horgen, jeden Sonntag 18–20 Uhr.',
        lead: 'Die offizielle Website der Swan Calisthenics Community: kostenlose Outdoor-Trainings für alle Niveaus im Street Workout Park in Horgen – mit Mitgliederbereich, Blog und Vereinsseiten.',
        period: 'Juni 2026 – heute', status: 'Live',
        live: 'https://swancalisthenics.ch/', code: 'https://github.com/swancalisthenics/home',
        about: [
            'Swan Calisthenics ist eine offene Community, die sich jeden Sonntag von 18 bis 20 Uhr zum gemeinsamen Bodyweight-Training trifft. Die Website stellt die Community vor, zeigt Trainingslevels, Galerie, Standort und FAQ und informiert über den Verein.',
            'Im Team bin ich für die Webentwicklung verantwortlich. Die Seite ist aus einem Schulprojekt (Modul 293) entstanden und wurde seitdem stark ausgebaut und auf Ladezeit optimiert.',
        ],
        features: [
            'Mitgliederbereich mit Login, Profil und Avatar-Upload',
            'Trainings-Anmeldung mit Zu- und Absage für den nächsten Sonntag',
            'Kontaktformular mit Postfach für den Vorstand',
            'Blog mit Kategorie-Filter und Detailseiten',
            'Dark Mode mit gespeicherter Auswahl',
            'Lightbox mit Zoom und Swipe, FAQ-Akkordeon, Community-Slider',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Web Components'],
        techNotes: [
            'Vanilla JavaScript ohne Build-Schritt',
            'Topbar und Modals als Web Components',
            'Supabase für Login und Daten, mit Row-Level Security',
            'Responsive Bilder, Sitemap und eigene Domain',
        ],
    },
    {
        slug: 'minecraft-skin-merger', category: 'current',
        title: 'Minecraft Skin Merger',
        card: 'Browser-Tool, das zwei Minecraft-Java-Skins zusammenführt – Körperteile und Layer lassen sich pro Skin auswählen.',
        lead: 'Ein Browser-Tool, das zwei Minecraft-Java-Skins zu einem neuen Skin kombiniert – Körperteil für Körperteil, mit Live-Vorschau und Download.',
        period: 'September 2026', status: 'Live',
        live: 'https://n-brand.github.io/minecraft-skinmerger/', code: 'https://github.com/n-brand/minecraft-skinmerger',
        about: [
            'Man lädt zwei Skins (64×64 PNG) hoch und entscheidet für jedes Körperteil, ob es von Skin A oder Skin B kommen soll – getrennt für die Basis- und die Overlay-Ebene. Das Ergebnis wird sofort angezeigt und lässt sich als PNG herunterladen.',
            'Alles läuft direkt im Browser, ohne Server und ohne Upload ins Internet.',
        ],
        features: [
            'Upload von zwei Skins mit Prüfung auf 64×64 Pixel',
            'Auswahl für Kopf, Torso, Arme und Beine',
            'Basis- und Overlay-Ebene getrennt wählbar, Overlay auch abschaltbar',
            'Schnellauswahl „Körper von B, Kopf von A“',
            'Live-Vorschau und PNG-Download',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
        techNotes: [
            'HTML5 Canvas ohne Bildglättung für pixelgenaue Skins',
            'Feste UV-Regionen pro Körperteil',
            'Keine Libraries, kein Build, läuft auf GitHub Pages',
        ],
    },
    {
        slug: 'gamehub', category: 'current',
        title: 'Gamehub',
        card: 'Browser-Spieleplattform: Spiele direkt im Browser spielen – mit Kategorien, Suche, Favoriten und Highscores.',
        lead: 'Eine Spieleplattform im Browser: Spiele starten sofort, ohne Installation und ohne Login – mit Katalog, Suche, Favoriten und Highscores.',
        period: 'Oktober 2026 – heute', status: 'In Arbeit',
        live: 'https://n-brand.github.io/gamehub/', code: 'https://github.com/n-brand/gamehub',
        about: [
            'Gamehub ist eine Sammlung kleiner Browser-Spiele unter einem Dach. Die Startseite zeigt alle Spiele als Kacheln, jedes Spiel hat eine eigene Seite mit Vollbild-Modus, Steuerung und Vorschlägen für ähnliche Spiele.',
            'Das erste fertige Spiel ist Snake. Weitere Spiele wie 2048 oder Memory sind geplant, später auch Accounts und Bestenlisten.',
        ],
        features: [
            'Spiele-Katalog mit Kategorie-Filter und Suche',
            '„Zuletzt gespielt“ und Favoriten',
            'Spieleseite mit Vollbild, Beschreibung und ähnlichen Spielen',
            'Snake mit Tastatur-, Wisch- und Touch-Steuerung, Pause und Highscore',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        techNotes: [
            'Single Page mit Hash-Routing',
            'Jedes Spiel als eigenes JavaScript-Modul',
            'Favoriten und Highscores im localStorage',
            'Kleiner Node.js-Server für die lokale Entwicklung',
        ],
    },
    {
        slug: 'strategiespiel', category: 'current',
        title: 'StrategieSpiel',
        card: 'Rundenbasiertes Strategiespiel in Low-Poly-3D: Stamm wählen, Städte gründen, forschen und die Karte erobern – direkt im Browser.',
        lead: 'Ein eigenes rundenbasiertes 4X-Strategiespiel im Browser: erkunden, ausbauen, forschen und erobern auf einer Low-Poly-3D-Insel – auch als App installierbar.',
        period: 'Oktober 2026 – heute', status: 'In Arbeit',
        live: 'https://n-brand.github.io/StrategieSpiel/', code: 'https://github.com/n-brand/StrategieSpiel',
        about: [
            'Das Spiel ist inspiriert von Polytopia, aber komplett selbst gebaut: eigene Stämme, eigene Grafik, eigene Töne und eigene Namen. Man startet mit einer Stadt, erkundet die Karte im Nebel, gründet weitere Städte und kämpft gegen Computer-Gegner.',
            'Es läuft im Browser in 3D und lässt sich als App aufs Handy installieren. Es ist spielbar, wird aber noch weiterentwickelt.',
        ],
        features: [
            '4 Stämme mit eigenem Look (Nordlinge, Steinvolk, Ebenenreich, Sandreiter)',
            'Forschungsbaum mit 25 Techniken als Stern, mit eigenen Icons',
            'Städte mit Stufen, Ruinen, Straßen, Häfen und Schiffe',
            'Computer-Gegner in vier Stufen (Leicht bis Verrückt)',
            'Spielarten „30 Runden“ und „Eroberung“ auf 4 Kartentypen',
            'Töne und Musik pro Stamm, als App installierbar und offline spielbar',
        ],
        tech: ['JavaScript', 'Three.js', 'PWA'],
        techNotes: [
            '3D-Ansicht mit Three.js, ohne Build-Schritt',
            'Spiellogik ohne DOM, getrennt von der 3D-Ansicht',
            'Töne per Web Audio API, ohne Audiodateien',
            'Service Worker für Offline-Betrieb',
            'Über 120 Unit-Tests und eine KI-gegen-KI-Simulation',
        ],
    },
    {
        slug: 'watch-shop', category: 'current',
        title: 'Watch-Shop',
        card: 'Demo-Shop der erfundenen Uhrenmarke Orvane: fotorealistische 3D-Uhr zum Drehen, Konfigurator und Warenkorb.',
        lead: 'Ein Demo-Shop für die erfundene Uhrenmarke Orvane: Die Uhr Meridian ist ein fotorealistisches 3D-Modell, das man drehen und im Konfigurator anpassen kann.',
        period: 'Oktober 2026 – heute', status: 'In Arbeit',
        live: '', code: 'https://github.com/n-brand/Watch-Shop',
        about: [
            'Der Shop stellt die Meridian vor: Beim Scrollen erzählt die Seite in Animationen vom Gehäuse, dem Saphirglas und dem Uhrwerk. Im Konfigurator wählt man Gehäuse und Armband, der Preis passt sich an, und die Uhr landet im Warenkorb – bezahlt wird nichts.',
            'Die Uhr ist komplett im Code gebaut, nicht aus einer fertigen 3D-Datei. Marke, Logo und Bilder sind frei erfunden bzw. Platzhalter.',
        ],
        features: [
            'Meridian als fotorealistisches 3D-Modell, mit der Maus drehbar',
            'Scroll-Animationen zu Gehäuse, Saphirglas und Kaliber',
            'Konfigurator: 3 Gehäuse (Roségold, Gelbgold, Edelstahl) und 3 Armbänder, Preis in CHF',
            'Kollektion mit vier Modellen und Warenkorb ohne Zahlung',
            'Modell-Verlauf aller gespeicherten Uhrenversionen und Logo-Entwürfe in 2D und 3D',
            'Hell- und Dunkelmodus, offline nutzbar als App (PWA)',
        ],
        tech: ['JavaScript', 'Three.js', 'GSAP', 'PWA'],
        techNotes: [
            'Gehäuse, Zifferblatt, Zeiger, Armband und Materialien aus Code erzeugt',
            'Studio-Licht und Kamera mit three.js, Scroll-Animationen mit GSAP und Lenis',
            'Gespeicherte Modelle als glb, mit Meshopt und WebP komprimiert',
            'Service Worker für Offline-Betrieb',
            'Kleiner Node.js-Server speichert lokal neue Modellversionen',
        ],
    },
    {
        slug: 'jarvis-mobile', category: 'current',
        title: 'Jarvis Mobile',
        card: 'Mein JARVIS-Sprachassistent als installierbare Web-App fürs Handy – bewusst ohne Erinnerung.',
        lead: 'Ein Ableger meines JARVIS-Forks: dieselbe holografische Iron-Man-Oberfläche als Web-App fürs Handy, die sich nichts über den Nutzer merkt.',
        period: 'Oktober 2026 – heute', status: 'In Arbeit',
        live: 'https://n-brand.github.io/Jarvis-Mobile/', code: 'https://github.com/n-brand/Jarvis-Mobile',
        about: [
            'JARVIS ist ein Open-Source-Sprachassistent im Browser, dessen „Gehirn“ Claude Code ist; das Original stammt nicht von mir. In meinem eigenen Fork habe ich ihn stark erweitert: weitere Personas wie EDITH, FRIDAY und KAREN mit eigenem Weckwort und eigener Persönlichkeit, ein Einstellungs-Panel, Sprachbefehle für fast alle Einstellungen, Anhänge und eine Desktop-App mit Electron.',
            'Jarvis Mobile ist die Kopie davon fürs Handy, als installierbare Web-App (PWA) gedacht. Bewusst ohne Erinnerung: kein persönlicher Kontext, kein Standort, kein Notizblock – jedes Gespräch beginnt leer, gespeichert werden nur Einstellungen im Browser. Die Oberfläche läuft im Browser, das Gehirn (die Bridge) weiterhin auf dem eigenen Rechner.',
        ],
        features: [
            'Holografische Iron-Man-Oberfläche mit Arc-Reaktor (Three.js und eigene Shader)',
            'Weckwort „Hey Jarvis“, Sprache rein und raus, Unterbrechen mitten im Satz',
            'Mehrere Personas mit eigenem Weckwort und eigener Persönlichkeit',
            'Ohne Erinnerung: jedes Gespräch beginnt leer',
            'Steuert die eigene Oberfläche per Sprache (Farben, Reaktor, Effekte)',
            'Schreibende Aktionen sind standardmässig gesperrt',
        ],
        tech: ['React', 'TypeScript', 'Three.js', 'Node.js', 'PWA'],
        techNotes: [
            'Oberfläche mit React, Vite, Three.js und eigenen GLSL-Shadern',
            'Bridge in Node.js mit dem Claude Agent SDK, verbunden per WebSocket',
            'Spracherkennung und Stimme im Browser, optional ElevenLabs',
            'Sicherheits-Filter für Werkzeuge: lesend erlaubt, schreibend nur nach Freigabe',
        ],
    },
    {
        slug: 'jarvis-anleitung', category: 'current',
        title: 'JARVIS-Anleitung',
        card: 'Schritt-für-Schritt-Anleitung zum Einrichten von JARVIS, einem Sprachassistenten im Browser auf Basis von Claude Code.',
        lead: 'Eine deutschsprachige Schritt-für-Schritt-Anleitung, mit der man den Open-Source-Sprachassistenten JARVIS unter Windows einrichtet.',
        period: 'September 2026', status: 'Live',
        live: 'https://n-brand.github.io/jarvis-Anleitung/', code: 'https://github.com/n-brand/jarvis-Anleitung',
        about: [
            'JARVIS ist ein Open-Source-Sprachassistent im Browser, der Claude Code als „Gehirn“ nutzt. Ich habe dazu eine verständliche Anleitung geschrieben, damit auch Einsteiger ihn zum Laufen bringen.',
            'Die Anleitung führt durch alle Schritte von PowerShell und Node.js bis zum Start im Browser. Das Projekt JARVIS selbst stammt nicht von mir und wird auf der Seite verlinkt.',
        ],
        features: [
            '10 nummerierte Schritte für Windows',
            'Installation von Node.js und Claude Code CLI',
            'Repo klonen, Abhängigkeiten installieren, App starten',
            'Optionaler Schritt für eine ElevenLabs-Stimme',
            'Hell- und Dunkel-Design, responsives Layout',
        ],
        tech: ['HTML', 'CSS'],
        techNotes: [
            'Eine einzelne, statische HTML-Seite',
            'Farben über CSS-Variablen',
            'Gehostet auf GitHub Pages',
        ],
    },
    {
        slug: 'escape-room', category: 'school',
        title: 'Escape Room',
        card: 'Prototyp eines Point-and-Click-Spiels: ein Haus mit klickbaren Räumen.',
        lead: 'Der Prototyp eines Point-and-Click-Abenteuers: Man sieht ein Haus und kann einzelne Räume anklicken und betreten.',
        period: 'Juni 2026', status: 'Prototyp',
        live: null, code: 'https://github.com/n-brand/escape-room',
        about: [
            'Das Spiel zeigt ein Haus, dessen Räume als klickbare Bereiche über dem Bild liegen. Ein Klick öffnet die Detailansicht des Raums, über „Zurück“ geht es wieder zum Haus.',
            'Der Prototyp legt die Grundlage für Navigation und Raumansichten; Rätsel und ein Spielziel sind noch nicht umgesetzt.',
        ],
        features: [
            'Hausansicht mit klickbaren Räumen',
            'Hover-Effekt auf den Räumen',
            'Detailansicht für das Schlafzimmer',
            'Zurück-Navigation zur Hausansicht',
        ],
        tech: ['HTML', 'CSS', 'JavaScript'],
        techNotes: [
            'Räume absolut über einem Hintergrundbild positioniert',
            'Ansichtswechsel mit Vanilla JavaScript',
        ],
    },
    {
        slug: 'textbased-game', category: 'school',
        title: 'Textbased Game',
        card: 'Text-Adventure im Browser: In einer Höhle entscheidest du zwischen Schleichen und Kämpfen.',
        lead: 'Ein kleines Text-Adventure im Browser: Als Abenteurer in einer Höhle triffst du Entscheidungen, die Punkte bringen oder Leben kosten.',
        period: 'Juni 2026', status: 'Fertig',
        live: null, code: 'https://github.com/n-brand/textbased-game',
        about: [
            'In einer Höhle stehen eine verschlossene Schatztruhe und eine schlafende Wache. Du entscheidest, ob du dich vorbeischleichst oder kämpfst – jede Wahl hat Folgen für deine Lebenspunkte und deinen Punktestand.',
            'Erreichst du 50 Punkte, gewinnst du. Verlierst du alle Leben, ist das Spiel vorbei und du kannst neu starten.',
        ],
        features: [
            'Statusleiste mit Leben, Punkten und Ziel',
            'Entscheidungs-Buttons für jede Szene',
            'Optionen geben Punkte oder kosten Leben',
            'Sieg- und Niederlage-Ende mit Neustart',
        ],
        tech: ['HTML', 'JavaScript'],
        techNotes: [
            'Story als Datenstruktur in einer eigenen Datei',
            'Szenen und Buttons werden dynamisch erzeugt',
        ],
    },
    {
        slug: 'hofladen-webshop', category: 'school',
        title: 'Hofladen-Webshop',
        card: 'Produktkatalog für einen Hofladen mit Kategorie-Filter, Detailansicht und Aktionspreisen.',
        lead: 'Ein Produktkatalog für einen Hofladen – frische Produkte vom Bauernhof mit Kategorien, Detailansicht und Aktionspreisen.',
        period: 'Juni 2026', status: 'Fertig',
        live: null, code: 'https://github.com/n-brand/Hofladen-Webshop',
        about: [
            'Der Katalog zeigt 18 Produkte vom Hof – von Äpfeln und Eiern bis zu Kürbis und Bratwurst – mit Preisen in CHF. Über Filter-Buttons lässt sich nach Kategorie sortieren, ein Klick auf ein Produkt zeigt die ausführliche Beschreibung.',
            'Das Projekt entstand gemeinsam mit Emilijan Russ.',
        ],
        features: [
            '18 Produkte aus einer JSON-Datei',
            'Kategorie-Filter (Früchte, Beeren, Gemüse, Tierprodukte, Nüsse)',
            'Detailansicht mit langer Beschreibung',
            'Aktionspreise mit automatisch berechnetem Rabatt',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'JSON'],
        techNotes: [
            'Produktdaten per fetch aus JSON geladen',
            'Produktkarten aus einem HTML-Template geklont',
            'Filter-Buttons werden dynamisch erzeugt',
        ],
    },
    {
        slug: 'influencer', category: 'school',
        title: 'Influencer',
        card: 'Übersicht bekannter Influencer mit Filter nach Herkunft und Detailansicht.',
        lead: 'Eine Übersichtsseite mit bekannten deutschen und amerikanischen Influencern, als Karten mit Filter und Detailansicht.',
        period: 'Mai – Juni 2026', status: 'Prototyp',
        live: null, code: 'https://github.com/n-brand/Influencer',
        about: [
            'Die Seite zeigt 19 Influencer als Karten in einem Grid. Über einen Filter lässt sich zwischen deutschen und amerikanischen Creatorn wechseln, ein Klick öffnet die Detailansicht.',
            'Technisch baut das Projekt auf dem Code des Hofladen-Katalogs auf und überträgt das Prinzip auf ein neues Thema.',
        ],
        features: [
            '19 Einträge aus einer JSON-Datei',
            'Filter nach Kategorie: Deutsch oder Amerikanisch',
            'Detailansicht mit Bild und Beschreibung',
            'Responsives Grid',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'JSON'],
        techNotes: [
            'Daten per fetch aus JSON geladen',
            'Karten aus einem HTML-Template geklont',
        ],
    },
    {
        slug: 'mediensammlung', category: 'school',
        title: 'Mediensammlung',
        card: 'Meine Lieblingsfilme und -serien als Karten mit Poster, Jahr und IMDb-Link.',
        lead: 'Eine kleine Website mit meinen Lieblingsfilmen und -serien – als Karten mit Poster, Erscheinungsjahr und Kurzbeschreibung.',
        period: 'Juni 2026', status: 'Live',
        live: 'https://n-brand.github.io/Mediensammlung/', code: 'https://github.com/n-brand/Mediensammlung',
        about: [
            'Die Seite zeigt neun Filme und Serien, darunter die Dark-Knight-Trilogie, Iron Man, Snowden und Lucifer. Jede Karte hat Poster, Titel, Jahr, eine kurze Beschreibung und einen Link zu IMDb.',
        ],
        features: [
            'Karten mit Poster, Titel, Jahr und Beschreibung',
            'Link „Auf IMDb ansehen“',
            'Responsives Grid',
        ],
        tech: ['HTML', 'CSS', 'JavaScript'],
        techNotes: [
            'Filmdaten als JavaScript-Modul',
            'Karten werden per ES-Module-Import gerendert',
            'Gehostet auf GitHub Pages',
        ],
    },
];

const THEME_SCRIPT = `    <script>try { if (localStorage.getItem('theme') === 'light') document.documentElement.dataset.theme = 'light'; } catch (e) {}</script>`;

const FONT_LINKS = `${THEME_SCRIPT}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap">`;

// PWA: Manifest, Icons und iPhone-Angaben (Home-Bildschirm-App) für jede Seite
const appHead = prefix => `    <link rel="manifest" href="${prefix}manifest.webmanifest">
    <meta name="theme-color" content="#0d1a2d">
    <link rel="icon" href="${prefix}assets/icons/icon.svg" type="image/svg+xml">
    <link rel="icon" href="${prefix}assets/icons/icon-32.png" sizes="32x32" type="image/png">
    <link rel="apple-touch-icon" href="${prefix}assets/icons/apple-touch-icon.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Nicolas B.">`;

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ext = 'target="_blank" rel="noopener"';

const GITHUB_PATH = 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z';

const STEVE_FACE = [
    ['#2f2010', '#2b1e0e', '#2f2010', '#281c0b', '#271a0a', '#271a0a', '#2b1e0d', '#2b1e0d'],
    ['#2f2010', '#2b1e0e', '#2b1e0e', '#332410', '#422a12', '#3f2a15', '#2b1e0e', '#271c0b'],
    ['#2b1e0d', '#b6896c', '#bd8e72', '#c69680', '#bd8b72', '#bd8e74', '#ac765a', '#342512'],
    ['#aa7d66', '#b4846d', '#aa7d66', '#ad806d', '#9c725c', '#bb8972', '#9c694c', '#9c694c'],
    ['#b4846d', '#ffffff', '#2a28b0', '#b57b67', '#bb8972', '#2a28b0', '#ffffff', '#aa7d66'],
    ['#9c6346', '#b4846d', '#b78272', '#6a4030', '#6a4030', '#be886c', '#a26a47', '#805334'],
    ['#90583c', '#965f40', '#412110', '#8a4a3a', '#8a4a3a', '#412110', '#905e43', '#815539'],
    ['#6f452c', '#6d432a', '#412110', '#3f2010', '#3f2010', '#412110', '#815539', '#815539'],
];

const ZOMBIE_FACE = [
    ['#487a36', '#3f6b2e', '#4a7535', '#3a6630', '#345e29', '#3a6030', '#426d34', '#416232'],
    ['#466e36', '#436c34', '#436c34', '#4a7a3a', '#5a9640', '#5a8d44', '#456c33', '#3a6830'],
    ['#476e36', '#6a9a59', '#6c9a5c', '#7c9e68', '#72995e', '#72975e', '#5f8a4a', '#4a7a3a'],
    ['#628a52', '#6a9658', '#618a52', '#6a8c5c', '#577a48', '#6e995e', '#4e7a3a', '#4e7a3a'],
    ['#6a8f58', '#1c1c1c', '#1c1c1c', '#6a8f50', '#72995e', '#1c1c1c', '#1c1c1c', '#628652'],
    ['#4a7a36', '#6a9658', '#7a9060', '#344f22', '#344f22', '#6a9658', '#4a7a36', '#386a2c'],
    ['#456c33', '#466e30', '#3a6028', '#4a6a30', '#4a6a30', '#345222', '#3f6b2e', '#3a5e2a'],
    ['#345222', '#2e4e20', '#345222', '#345222', '#3c5e2a', '#335826', '#3e6230', '#3a5a2a'],
];

const mergeFaces = (left, right) => left.map((row, y) => [...row.slice(0, 4), ...right[y].slice(4)]);

const colorGrid = (rows, size, x0, y0) => rows.flatMap((row, y) => row.map((color, x) => (
    `<rect x="${x0 + x * size}" y="${y0 + y * size}" width="${size + 0.6}" height="${size + 0.6}" fill="${color}"/>`
))).join('');

const pixels = (rows, palette, size, x0, y0) => rows.flatMap((row, y) => [...row].map((c, x) => (
    palette[c] ? `<rect x="${x0 + x * size}" y="${y0 + y * size}" width="${size + 0.6}" height="${size + 0.6}" fill="${palette[c]}"/>` : ''
))).join('');

const ART = {
    'swan-calisthenics': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <defs><radialGradient id="glow-swan"><stop offset="0" stop-color="#ff6b6b" stop-opacity=".55"/><stop offset="1" stop-color="#ff6b6b" stop-opacity="0"/></radialGradient></defs>
        <circle cx="120" cy="62" r="62" fill="url(#glow-swan)"/>
        <rect x="46" y="22" width="10" height="112" rx="5" fill="#8fa4c4"/>
        <rect x="184" y="22" width="10" height="112" rx="5" fill="#8fa4c4"/>
        <rect x="40" y="20" width="160" height="10" rx="5" fill="#e9eef6"/>
        <path d="M104 25 L112 52 M136 25 L128 52" stroke="#ffd43b" stroke-width="9" stroke-linecap="round"/>
        <circle cx="120" cy="46" r="11" fill="#ffd43b"/>
        <rect x="108" y="56" width="24" height="38" rx="12" fill="#e63946"/>
        <path d="M113 92 L108 124 M127 92 L132 124" stroke="#e9eef6" stroke-width="9" stroke-linecap="round"/>
    </svg>`,
    'minecraft-skin-merger': `<svg viewBox="0 0 240 140" aria-hidden="true">
        ${colorGrid(mergeFaces(STEVE_FACE, ZOMBIE_FACE), 13, 68, 18)}
        <rect x="117" y="10" width="6" height="120" fill="#ffd43b"/>
    </svg>`,
    gamehub: `<svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="36" y="19" width="168" height="104" rx="12" fill="#4a1fbf"/>
        <rect x="36" y="14" width="168" height="104" rx="12" fill="#f8f6ff"/>
        <circle cx="50" cy="28" r="3.5" fill="#ff6b6b"/><circle cx="61" cy="28" r="3.5" fill="#ffd43b"/><circle cx="72" cy="28" r="3.5" fill="#a9e34b"/>
        <rect x="84" y="24" width="106" height="8" rx="4" fill="#e2d9ff"/>
        <rect x="46" y="44" width="44" height="60" rx="8" fill="#183153"/>
        ${pixels([
            '......',
            '.....a',
            '......',
            'sss..h',
            '..s..s',
            '..ssss',
        ], { s: '#a9e34b', h: '#d8f5a2', a: '#ff6b6b' }, 6, 50, 56)}
        <rect x="98" y="44" width="44" height="60" rx="8" fill="#ffd43b"/>
        <rect x="104" y="52" width="14" height="14" rx="3" fill="#fff3bf"/><rect x="122" y="52" width="14" height="14" rx="3" fill="#ffa94d"/>
        <rect x="104" y="70" width="14" height="14" rx="3" fill="#ffa94d"/><rect x="122" y="70" width="14" height="14" rx="3" fill="#fff3bf"/>
        <text x="120" y="98" text-anchor="middle" font-family="Nunito, sans-serif" font-size="11" font-weight="900" fill="#183153">2048</text>
        <rect x="150" y="44" width="44" height="60" rx="8" fill="#ff6b6b"/>
        <rect x="158" y="54" width="28" height="40" rx="5" fill="#ffffff"/>
        <text x="172" y="83" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="900" fill="#ff6b6b">?</text>
        <g transform="rotate(-10 196 114)">
            <rect x="164" y="103" width="64" height="30" rx="15" fill="#c7b8ff"/>
            <rect x="164" y="99" width="64" height="30" rx="15" fill="#ffffff"/>
            <rect x="174" y="111" width="14" height="5" rx="2" fill="#6c3ce9"/>
            <rect x="178.5" y="106.5" width="5" height="14" rx="2" fill="#6c3ce9"/>
            <circle cx="210" cy="110" r="4" fill="#ff6b6b"/>
            <circle cx="218" cy="118" r="4" fill="#ffd43b"/>
        </g>
        <path d="M24 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd43b"/>
        <path d="M214 22l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#ffffff" opacity=".8"/>
    </svg>`,
    strategiespiel: `<svg viewBox="0 0 240 140" aria-hidden="true">
        <g fill="#a5e0f2" opacity=".5">
            <path d="M16 40l6-3 6 3v1.5l-6-3-6 3z"/><path d="M200 30l6-3 6 3v1.5l-6-3-6 3z"/><path d="M214 116l5-2.5 5 2.5v1.5l-5-2.5-5 2.5z"/>
        </g>
        <g transform="translate(18 110)">
            <path d="M0 0h26l-5 7H5z" fill="#8b5a2b"/>
            <path d="M13 -1V-26" stroke="#2b3445" stroke-width="1.6"/>
            <path d="M13.8 -25L25 -4H13.8z" fill="#f1f3f5"/><path d="M12.2 -21L4 -4H12.2z" fill="#c5ccd6"/>
        </g>
        <g transform="translate(37.5 -13.5) scale(1.65)">
            <path d="M8 62L50 83L50 88L8 67Z" fill="#23709d"/>
            <path d="M50 83L92 62L92 67L50 88Z" fill="#1b5a80"/>
            <path d="M8 62L50 41L92 62L50 83Z" fill="#2f8fc6"/>
            <path d="M19 64L50 48.5L81 64L50 79.5Z" fill="#5cc3dd"/>
            <path d="M24 57L50 70L50 77L24 64Z" fill="#7a5839"/>
            <path d="M50 70L76 57L76 64L50 77Z" fill="#5f4430"/>
            <path d="M24 57L50 44L76 57L50 70Z" fill="#8cc657"/>
            <path d="M47.5 55L55 58.75L55 39.75L47.5 36Z" fill="#f1f3f5"/>
            <path d="M55 58.75L62.5 55L62.5 36L55 39.75Z" fill="#c5ccd6"/>
            <path d="M50.05 48.3L52.45 49.5L52.45 44.18L50.05 42.98Z" fill="#3d4a5c"/>
            <path d="M57.25 57.63L59.65 56.43L59.65 49.58L57.25 50.79Z" fill="#6b4a2b"/>
            <path d="M45.25 36L55 40.88L55 23Z" fill="#f59f00"/>
            <path d="M55 40.88L64.75 36L55 23Z" fill="#c77700"/>
            <path d="M54.45 24L55.55 24L55.55 13L54.45 13Z" fill="#2b3445"/>
            <path d="M55.55 13L64.5 15.4L55.55 17.8Z" fill="#f03e3e"/>
            <path d="M30 57.5L36 60.2L36 45.94Z" fill="#58a64b"/><path d="M36 60.2L42 57.5L36 45.94Z" fill="#3c8c3c"/>
            <path d="M31.56 51.04L36 53.04L36 40.5Z" fill="#58a64b"/><path d="M36 53.04L40.44 51.04L36 40.5Z" fill="#3c8c3c"/>
            <path d="M62.5 59.5L67 61.53L67 51.34Z" fill="#58a64b"/><path d="M67 61.53L71.5 59.5L67 51.34Z" fill="#3c8c3c"/>
            <path d="M63.67 54.94L67 56.44L67 47.5Z" fill="#58a64b"/><path d="M67 56.44L70.33 54.94L67 47.5Z" fill="#3c8c3c"/>
            <path d="M38 63L43 65.25L43 54.16Z" fill="#58a64b"/><path d="M43 65.25L48 63L43 54.16Z" fill="#3c8c3c"/>
            <path d="M39.3 58.06L43 59.73L43 50Z" fill="#58a64b"/><path d="M43 59.73L46.7 58.06L43 50Z" fill="#3c8c3c"/>
        </g>
    </svg>`,
    'watch-shop': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <path d="M100 6h40l-4 30h-32zM104 104h32l4 30h-40z" fill="#b8913f"/>
        <path d="M104 12h32M104 22h32M106 114h28M105 124h30" stroke="#8a6a26" stroke-width="2"/>
        <circle cx="120" cy="74" r="40" fill="#8a6a26"/>
        <circle cx="120" cy="70" r="40" fill="#e2c07a"/>
        <rect x="158" y="65" width="8" height="10" rx="2" fill="#b8913f"/>
        <circle cx="120" cy="70" r="32" fill="#1c1914"/>
        <g stroke="#e2c07a" stroke-width="3" stroke-linecap="round">
            <path d="M120 44v5M120 91v5M94 70h5M141 70h5"/>
            <path d="M133 47.5l-1.5 2.6M143.5 57l-2.6 1.5M143.5 83l-2.6-1.5M133 92.5l-1.5-2.6M107 92.5l1.5-2.6M96.5 83l2.6-1.5M96.5 57l2.6 1.5M107 47.5l1.5 2.6" stroke-width="2"/>
        </g>
        <path d="M120 52l2.5 5-2.5 5-2.5-5z" fill="#74c0fc"/>
        <path d="M120 70L106 62" stroke="#f1e3c2" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M120 70L136 58" stroke="#f1e3c2" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M120 70v20" stroke="#ff6b6b" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="120" cy="70" r="3" fill="#e2c07a"/>
        <path d="M84 118a50 12 0 0 0 72 0" fill="none" stroke="#a9e34b" stroke-width="3" stroke-linecap="round"/>
        <path d="M156 118l-7-2 3 7z" fill="#a9e34b"/>
        <circle cx="42" cy="44" r="9" fill="#d9a383"/><circle cx="42" cy="70" r="9" fill="#e2c07a"/><circle cx="42" cy="96" r="9" fill="#c9ccd0"/>
        <circle cx="42" cy="70" r="13" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <path d="M184 62h34l-4 42h-26z" fill="#ffffff"/>
        <path d="M193 62v-6a8 8 0 0 1 16 0v6" fill="none" stroke="#ffffff" stroke-width="3"/>
        <rect x="190" y="76" width="22" height="12" rx="3" fill="#e2c07a"/>
        <text x="201" y="85.5" text-anchor="middle" font-family="Nunito, sans-serif" font-size="8" font-weight="900" fill="#1c1914">CHF</text>
    </svg>`,
    'jarvis-mobile': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <defs><radialGradient id="glow-jarvis-mobile"><stop offset="0" stop-color="#4dd4ff" stop-opacity=".75"/><stop offset="1" stop-color="#4dd4ff" stop-opacity="0"/></radialGradient></defs>
        <rect x="92" y="12" width="56" height="124" rx="12" fill="#c98a12"/>
        <rect x="92" y="8" width="56" height="124" rx="12" fill="#16202c"/>
        <rect x="97" y="15" width="46" height="110" rx="7" fill="#0a1018"/>
        <rect x="112" y="18" width="16" height="3.5" rx="1.75" fill="#16202c"/>
        <circle cx="120" cy="62" r="24" fill="url(#glow-jarvis-mobile)"/>
        <circle cx="120" cy="62" r="16" fill="none" stroke="#4dd4ff" stroke-width="3" stroke-dasharray="7 4"/>
        <circle cx="120" cy="62" r="10" fill="none" stroke="#a5ecff" stroke-width="2.5"/>
        <circle cx="120" cy="62" r="5" fill="#e9fbff"/>
        <g fill="#4dd4ff">
            <rect x="104" y="98" width="4" height="8" rx="2"/><rect x="110" y="94" width="4" height="16" rx="2"/><rect x="116" y="96" width="4" height="12" rx="2"/>
            <rect x="122" y="92" width="4" height="20" rx="2"/><rect x="128" y="96" width="4" height="12" rx="2"/><rect x="134" y="99" width="4" height="6" rx="2"/>
        </g>
        <rect x="10" y="26" width="74" height="28" rx="14" fill="#ffffff"/>
        <path d="M72 52l14 8-4-12z" fill="#ffffff"/>
        <text x="47" y="44.5" text-anchor="middle" font-family="Nunito, sans-serif" font-size="11" font-weight="900" fill="#3a2200">Hey Jarvis</text>
        <circle cx="190" cy="96" r="20" fill="#ffffff"/>
        <path d="M190 84v15M183.5 92.5l6.5 6.5 6.5-6.5" fill="none" stroke="#3a2200" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M181 103.5h18" stroke="#3a2200" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M200 32l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffffff" opacity=".85"/>
    </svg>`,
    'jarvis-anleitung': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <defs><radialGradient id="glow-jarvis"><stop offset="0" stop-color="#4dd4ff" stop-opacity=".7"/><stop offset="1" stop-color="#4dd4ff" stop-opacity="0"/></radialGradient></defs>
        <circle cx="120" cy="70" r="66" fill="url(#glow-jarvis)"/>
        <circle cx="120" cy="70" r="40" fill="none" stroke="#4dd4ff" stroke-width="4" stroke-dasharray="16 8"/>
        <circle cx="120" cy="70" r="26" fill="none" stroke="#a5ecff" stroke-width="3"/>
        <circle cx="120" cy="70" r="12" fill="#e9fbff"/>
        <g fill="#4dd4ff">
            <rect x="22" y="62" width="6" height="16" rx="3"/><rect x="34" y="52" width="6" height="36" rx="3"/><rect x="46" y="58" width="6" height="24" rx="3"/><rect x="58" y="64" width="6" height="12" rx="3"/>
            <rect x="176" y="64" width="6" height="12" rx="3"/><rect x="188" y="58" width="6" height="24" rx="3"/><rect x="200" y="52" width="6" height="36" rx="3"/><rect x="212" y="62" width="6" height="16" rx="3"/>
        </g>
    </svg>`,
    'escape-room': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="146" y="20" width="12" height="22" fill="#6b4a2a"/>
        <path d="M60 56L120 14L180 56Z" fill="#8b5a2b"/>
        <rect x="70" y="52" width="100" height="78" fill="#a8703a"/>
        <rect x="76" y="58" width="42" height="32" rx="3" fill="#fff3d6"/>
        <rect x="87" y="63" width="20" height="18" rx="2" fill="#74c0fc"/><path d="M97 63v18M87 72h20" stroke="#fff3d6" stroke-width="2.5"/>
        <rect x="120" y="56" width="46" height="36" rx="5" fill="#ffd43b"/>
        <rect x="122" y="58" width="42" height="32" rx="3" fill="#fff0b3"/>
        <rect x="126" y="66" width="4" height="20" rx="1.5" fill="#6b4a2a"/>
        <rect x="130" y="77" width="28" height="8" rx="2" fill="#e03131"/><rect x="131" y="72" width="9" height="5" rx="2" fill="#ffffff"/>
        <rect x="76" y="94" width="42" height="32" rx="3" fill="#fff3d6"/>
        <rect x="81" y="99" width="16" height="24" rx="2" fill="#c2773a"/><path d="M81 107h16M81 115h16" stroke="#8b5a2b" stroke-width="2"/>
        <text x="108" y="118" text-anchor="middle" font-family="Nunito, sans-serif" font-size="20" font-weight="900" fill="#6b4a2a">?</text>
        <rect x="122" y="94" width="42" height="32" rx="3" fill="#fff3d6"/>
        <path d="M133 126V106a10 10 0 0 1 20 0V126Z" fill="#6b4a2a"/>
        <circle cx="148" cy="116" r="2.2" fill="#ffd43b"/>
        <rect x="56" y="128" width="128" height="5" rx="2.5" fill="#c9a26b"/>
        <path d="M156 78v19l5-5 4.5 8.5 3.5-1.8-4.5-8.5h7z" fill="#ffffff" stroke="#3b2412" stroke-width="2" stroke-linejoin="round"/>
        <g transform="rotate(-30 40 62)">
            <circle cx="28" cy="62" r="10" fill="none" stroke="#ffd43b" stroke-width="6"/>
            <rect x="37" y="59" width="28" height="6" rx="3" fill="#ffd43b"/>
            <rect x="54" y="64" width="5" height="8" rx="1.5" fill="#ffd43b"/><rect x="60" y="64" width="5" height="6" rx="1.5" fill="#ffd43b"/>
        </g>
        <path d="M195 82v-9a8.5 8.5 0 0 1 17 0v9" fill="none" stroke="#8a6d3b" stroke-width="5"/>
        <rect x="188" y="80" width="31" height="26" rx="5" fill="#d1a10f"/>
        <rect x="188" y="78" width="31" height="26" rx="5" fill="#ffd43b"/>
        <circle cx="203.5" cy="88" r="3.5" fill="#3b2412"/><path d="M202 90h3l1 7h-5z" fill="#3b2412"/>
    </svg>`,
    'textbased-game': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="20" y="14" width="200" height="112" rx="12" fill="#1c1f1c" stroke="#2f3a2f" stroke-width="3"/>
        <circle cx="38" cy="30" r="4" fill="#ff6b6b"/><circle cx="52" cy="30" r="4" fill="#ffd43b"/><circle cx="66" cy="30" r="4" fill="#39ff6a"/>
        <g font-family="ui-monospace, Consolas, monospace" font-size="14" font-weight="700" fill="#39ff6a">
            <text x="36" y="62">Eine Wache schläft…</text>
            <text x="36" y="84" fill="#b9ffc9">&gt; 1) Schleichen</text>
            <text x="36" y="104" fill="#b9ffc9">&gt; 2) Kämpfen</text>
        </g>
        <rect x="144" y="93" width="9" height="14" fill="#39ff6a"/>
    </svg>`,
    'hofladen-webshop': `<svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="44" y="28" width="7" height="72" fill="#9a5a26"/><rect x="189" y="28" width="7" height="72" fill="#9a5a26"/>
        <g>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 34 + i * 21.5, c = i % 2 ? '#fff8ec' : '#e03131';
            return `<rect x="${x}" y="14" width="21.6" height="20" fill="${c}"/><circle cx="${x + 10.75}" cy="34" r="10.75" fill="${c}"/>`;
        }).join('')}</g>
        <rect x="30" y="8" width="180" height="10" rx="5" fill="#a61e1e"/>
        <path d="M140 40v8" stroke="#5c2a06" stroke-width="2"/>
        <g transform="rotate(-8 140 56)">
            <rect x="124" y="47" width="32" height="18" rx="5" fill="#ffd43b"/>
            <text x="140" y="60" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" font-weight="900" fill="#5c2a06">-20%</text>
        </g>
        <circle cx="66" cy="74" r="9" fill="#e03131"/><circle cx="82" cy="72" r="9" fill="#f03e3e"/><circle cx="97" cy="74" r="9" fill="#e03131"/>
        <ellipse cx="85" cy="62" rx="5" ry="2.8" fill="#5cbf3a" transform="rotate(-25 85 62)"/>
        <rect x="56" y="78" width="52" height="18" rx="3" fill="#e8a35a"/><path d="M58 87h48" stroke="#c2773a" stroke-width="2"/>
        <ellipse cx="123" cy="77" rx="5.5" ry="7" fill="#fff8ec"/><ellipse cx="135" cy="76" rx="5.5" ry="7" fill="#f4e4cc"/><ellipse cx="147" cy="77" rx="5.5" ry="7" fill="#fff8ec"/>
        <rect x="114" y="84" width="42" height="12" rx="3" fill="#b9a487"/>
        <path d="M168 66l-4-10M175 64v-11M182 66l4-10" stroke="#5cbf3a" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="164" y="64" width="8" height="20" rx="4" fill="#fd7e14"/><rect x="171" y="62" width="8" height="22" rx="4" fill="#ff922b"/><rect x="178" y="64" width="8" height="20" rx="4" fill="#fd7e14"/>
        <rect x="160" y="80" width="30" height="16" rx="3" fill="#e8a35a"/>
        <rect x="30" y="94" width="180" height="9" rx="4" fill="#9a5a26"/>
        <rect x="36" y="102" width="168" height="30" rx="4" fill="#c2773a"/>
        <path d="M36 112h168M36 122h168" stroke="#a8622c" stroke-width="2"/>
    </svg>`,
    influencer: `<svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="92" y="13" width="56" height="124" rx="11" fill="#d6336c"/>
        <rect x="92" y="9" width="56" height="124" rx="11" fill="#5a0f2e"/>
        <rect x="96" y="15" width="48" height="112" rx="7" fill="#ffffff"/>
        <circle cx="120" cy="34" r="11" fill="#f03e7e"/><circle cx="120" cy="34" r="8.5" fill="#ffe3ec"/>
        <circle cx="120" cy="32" r="3.2" fill="#5a0f2e"/><path d="M114.5 40a5.5 5 0 0 1 11 0z" fill="#5a0f2e"/>
        <rect x="108" y="49" width="24" height="4" rx="2" fill="#5a0f2e"/>
        <rect x="102" y="57" width="10" height="3" rx="1.5" fill="#f7a8c4"/><rect x="115" y="57" width="10" height="3" rx="1.5" fill="#f7a8c4"/><rect x="128" y="57" width="10" height="3" rx="1.5" fill="#f7a8c4"/>
        <rect x="104" y="65" width="32" height="9" rx="4.5" fill="#f03e7e"/>
        ${[['#ffd43b', '#74c0fc', '#a9e34b'], ['#ff8fb1', '#6c3ce9', '#ffa94d']].map((row, r) => row.map((c, i) => (
            `<rect x="${99 + i * 14.5}" y="${80 + r * 14.5}" width="13" height="13" rx="2.5" fill="${c}"/>`
        )).join('')).join('')}
        <g transform="rotate(-6 56 48)">
            <rect x="30" y="34" width="52" height="26" rx="13" fill="#ffffff"/>
            <path d="M70 58l6 8 2-8z" fill="#ffffff"/>
            <path d="M40 46c0-5 7.5-5 7.5 0c0-5 7.5-5 7.5 0c0 5-7.5 8.5-7.5 11c0-2.5-7.5-6-7.5-11z" fill="#f03e7e"/>
            <text x="60" y="52" font-family="Nunito, sans-serif" font-size="11" font-weight="900" fill="#5a0f2e">12k</text>
        </g>
        <g transform="rotate(6 188 40)">
            <rect x="164" y="27" width="48" height="26" rx="13" fill="#5a0f2e"/>
            <circle cx="180" cy="36" r="3.5" fill="#ffffff"/><path d="M174 46a6 5 0 0 1 12 0z" fill="#ffffff"/>
            <path d="M196 40h10M201 35v10" stroke="#ffd43b" stroke-width="3" stroke-linecap="round"/>
        </g>
        <rect x="160" y="100" width="58" height="22" rx="11" fill="#ffffff"/>
        <rect x="162" y="102" width="27" height="18" rx="9" fill="#f03e7e"/>
        <text x="175.5" y="115" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" font-weight="900" fill="#ffffff">DE</text>
        <text x="203" y="115" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" font-weight="900" fill="#5a0f2e">US</text>
        <g transform="rotate(-4 50 108)">
            <rect x="26" y="96" width="46" height="24" rx="12" fill="#ffffff"/>
            <circle cx="39" cy="108" r="3" fill="#f03e7e"/><circle cx="49" cy="108" r="3" fill="#f03e7e"/><circle cx="59" cy="108" r="3" fill="#f03e7e"/>
        </g>
    </svg>`,
    mediensammlung: `<svg viewBox="0 0 240 140" aria-hidden="true">
        ${[[-14, '#183153', '<circle cx="113" cy="40" r="10" fill="#ffd43b"/><circle cx="118" cy="36" r="9" fill="#183153"/>'],
            [14, '#6c3ce9', '<path d="M120 26l4.5 9.2 10.1 1.5-7.3 7.1 1.7 10.1-9-4.8-9 4.8 1.7-10.1-7.3-7.1 10.1-1.5z" fill="#ffd43b"/>'],
            [0, '#e03131', '<circle cx="120" cy="44" r="14" fill="#ffffff"/><path d="M116 37v14l11-7z" fill="#e03131"/>'],
        ].map(([deg, bg, motif]) => `<g transform="rotate(${deg} 120 120)">
            <rect x="95" y="20" width="50" height="74" rx="6" fill="#1c7ed6"/>
            <rect x="95" y="16" width="50" height="74" rx="6" fill="#ffffff"/>
            <rect x="99" y="20" width="42" height="50" rx="3" fill="${bg}"/>${motif}
            <rect x="99" y="75" width="30" height="4" rx="2" fill="#183153"/><rect x="99" y="82" width="20" height="3" rx="1.5" fill="#a5c8ec"/>
        </g>`).join('')}
        <path d="M30 86h34l-4 42H34z" fill="#ffffff"/>
        <path d="M37 86h6l1 42h-5zM51 86h6l-1 42h-5z" fill="#e03131"/>
        <g fill="#fff3bf"><circle cx="34" cy="84" r="6"/><circle cx="43" cy="80" r="7"/><circle cx="53" cy="81" r="6.5"/><circle cx="61" cy="85" r="5.5"/><circle cx="47" cy="74" r="5"/></g>
        <g fill="#ffd43b"><circle cx="38" cy="78" r="2.5"/><circle cx="56" cy="76" r="2.5"/></g>
        <g transform="rotate(12 196 104)">
            <path d="M174 92h44v8a5 5 0 0 0 0 10v8h-44v-8a5 5 0 0 0 0-10z" fill="#ffd43b"/>
            <path d="M206 94v22" stroke="#183153" stroke-width="2" stroke-dasharray="3 3"/>
            <rect x="181" y="100" width="18" height="4" rx="2" fill="#183153"/><rect x="181" y="107" width="12" height="3" rx="1.5" fill="#183153" opacity=".5"/>
        </g>
    </svg>`,
};

const art = (slug, n) => indent(ART[slug].split('\n').map(l => l.replace(/^ {4}/, '')).join('\n'), n);

const artImage = (src, prefix, cls) => `<img src="${prefix}${src}" alt="" class="${cls}" width="600" height="600">`;

const artFor = (p, n, prefix) => {
    if (p.layers) {
        return indent([
            `<div class="art-layers art-${p.slug} is-looping">`,
            ...p.layers.flatMap(layer => {
                const img = (name, extra = '') => `    <img src="${prefix}assets/images/${name}.png" alt="" class="art-layer layer-${name}"${extra} width="600" height="600">`;
                if (typeof layer === 'string') return [img(layer)];
                const pct = v => +(v / 6).toFixed(3) + '%';
                return layer.strips.map(([a, b, f]) => img(layer.name, ` style="--f: ${f}; clip-path: inset(0 ${pct(600 - b - 1)} 0 ${pct(a - 1)})"`));
            }),
            '</div>',
        ].join('\n'), n);
    }
    if (p.frames) {
        return indent([
            '<div class="art-frames">',
            ...p.frames.map(src => '    ' + artImage(src, prefix, 'art-image art-frame')),
            '</div>',
        ].join('\n'), n);
    }
    if (p.image) {
        return indent(artImage(p.image, prefix, 'art-image'), n);
    }
    return art(p.slug, n);
};

const STATUS_BADGE = { 'Live': 'live', 'In Arbeit': 'wip', 'Prototyp': 'proto', 'Fertig': 'done' };

const tags = list => list.map(t => `<span class="tag">${esc(t)}</span>`).join('\n');

const links = (p, base) => {
    const out = [];
    if (p.live) out.push(`<a href="${p.live}" ${ext} class="project-link primary">Live ansehen</a>`);
    if (p.code) out.push(`<a href="${p.code}" ${ext} class="project-link">Code</a>`);
    if (!out.length) out.push('<span class="project-link soon">Bald spielbar</span>');
    return out.join('\n');
};

const indent = (html, n) => html.split('\n').map(l => (l ? ' '.repeat(n) + l : l)).join('\n');

const ARROW = '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const badge = p => `<span class="card-badge badge-${STATUS_BADGE[p.status]}">${esc(p.status)}</span>`;

// Play/Pause-Knopf für Animationen aus Ebenen: Klimmzug läuft standardmässig, der Knopf schaltet ihn aus und an
const PLAY_BUTTON = `<button class="art-play" type="button" aria-pressed="true" aria-label="Animation ausschalten">
    <svg class="art-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>
    <svg class="art-pause-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5.5" width="4" height="13" rx="1.2"/><rect x="13.5" y="5.5" width="4" height="13" rx="1.2"/></svg>
</button>`;

const cardArt = p => (p.layers ? `    <div class="card-art">
        <div class="art-stage">
            <a href="projekte/${p.slug}.html" class="card-art-link" tabindex="-1" aria-hidden="true">
${artFor(p, 16, '')}
            </a>
${indent(PLAY_BUTTON, 12)}
        </div>
    </div>` : `    <a href="projekte/${p.slug}.html" class="card-art" tabindex="-1" aria-hidden="true">
${artFor(p, 8, '')}
    </a>`);

function card(p) {
    const label = p.featured ? `
        <span class="project-label">${CATEGORY_LABELS[p.category]}</span>` : '';
    return `<div class="project-card theme-${p.slug}${p.featured ? ' featured' : ''}" data-category="${p.category}">
    ${badge(p)}
${cardArt(p)}
    <div class="project-content">${label}
        <h3><a href="projekte/${p.slug}.html" class="project-title-link">${esc(p.title)}</a></h3>
        <div class="card-details">
            <p class="project-desc">${esc(p.card)}</p>
            <div class="project-tags">
${indent(tags(p.tech), 16)}
            </div>
            <div class="card-footer">
                <div class="card-buttons">
${indent(links(p), 20)}
                </div>
                <a href="projekte/${p.slug}.html" class="arrow-link">Mehr lesen ${ARROW}</a>
            </div>
        </div>
    </div>
</div>`;
}

function sidebar(prefix, active) {
    const on = key => (active === key ? ' active' : '');
    return `<!-- --- Sidebar --- -->
<aside class="sidebar">
    <button class="theme-toggle" type="button" aria-label="Hell/Dunkel umschalten" aria-pressed="false">
        <svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
    </button>
    <div class="profile">
        <div class="profile-initials" aria-hidden="true">NB</div>
        <div class="profile-info">
            <h1 class="profile-name"><a href="${prefix}index.html">Nicolas Brand</a></h1>
            <p class="profile-headline">Webentwicklung · Websites &amp; Web-Tools</p>
        </div>
    </div>

    <p class="profile-bio">Ich baue Websites und kleine Web-Tools – von Community-Seiten bis zu Spielen im Browser.</p>

    <!-- --- Navigation --- -->
    <nav class="nav-menu" aria-label="Hauptnavigation">
        <a href="${prefix}ueber-mich.html" class="nav-link${on('about')}">
            <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
            <span>Über mich</span>
        </a>
        <a href="${prefix}index.html#projects" class="nav-link${on('projects')}" data-section="projects">
            <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            <span>Projekte</span>
        </a>
        <a href="${prefix}index.html#contact" class="nav-link${on('contact')}" data-section="contact">
            <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            <span>Kontakt</span>
        </a>
    </nav>

    <!-- --- Social Links --- -->
    <div class="social-links">
        <a href="https://github.com/n-brand" ${ext} class="social-icon" aria-label="GitHub">
            <svg viewBox="0 0 16 16" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="${GITHUB_PATH}"/></svg>
            <span>github.com/n-brand</span>
        </a>
    </div>

    <!-- --- Footer --- -->
    <footer class="footer">
        <p>&copy; <span id="year"></span> Nicolas Brand</p>
    </footer>
</aside>`;
}

function detailPage(p, i) {
    const prev = projects[i - 1];
    const next = projects[i + 1];
    const pager = [
        prev ? `<a href="${prev.slug}.html" class="pager-link prev"><span class="meta-label">← Vorheriges Projekt</span>${esc(prev.title)}</a>` : '',
        next ? `<a href="${next.slug}.html" class="pager-link next"><span class="meta-label">Nächstes Projekt →</span>${esc(next.title)}</a>` : '',
    ].filter(Boolean).join('\n');

    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(p.title)} – Nicolas Brand</title>
    <meta name="description" content="${esc(p.lead)}">
${appHead('../')}
${FONT_LINKS}
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

<div class="layout">

${indent(sidebar('../', 'projects'), 4)}

    <!-- --- Main Content --- -->
    <main class="main-content">
        <article class="detail">
            <a href="../index.html#projects" class="back-link">← Alle Projekte</a>

            <!-- --- Detail Art --- -->
            <div class="detail-art theme-${p.slug}">
                ${badge(p)}
${p.layers ? `                <div class="art-stage">
${artFor(p, 20, '../')}
${indent(PLAY_BUTTON, 20)}
                </div>` : artFor(p, 16, '../')}
            </div>

            <!-- --- Detail Header --- -->
            <header class="detail-header">
                <span class="project-label">${CATEGORY_LABELS[p.category]}</span>
                <h1>${esc(p.title)}</h1>
                <p class="detail-lead">${esc(p.lead)}</p>
                <div class="project-links">
${indent(links(p), 20)}
                </div>
            </header>

            <!-- --- Detail Meta --- -->
            <div class="detail-meta">
                <div class="meta-item">
                    <span class="meta-label">Zeitraum</span>
                    ${esc(p.period)}
                </div>
                <div class="meta-item">
                    <span class="meta-label">Status</span>
                    ${esc(p.status)}
                </div>
                <div class="meta-item">
                    <span class="meta-label">Tech</span>
                    <div class="project-tags">
${indent(tags(p.tech), 24)}
                    </div>
                </div>
            </div>

            <!-- --- Detail Body --- -->
            <div class="detail-body">
                <section>
                    <h2>Über das Projekt</h2>
${indent(p.about.map(t => `<p>${esc(t)}</p>`).join('\n'), 20)}

                    <h2>Features</h2>
                    <ul class="feature-list">
${indent(p.features.map(f => `<li>${esc(f)}</li>`).join('\n'), 24)}
                    </ul>
                </section>
                <section>
                    <h2>Technik</h2>
                    <ul class="feature-list">
${indent(p.techNotes.map(f => `<li>${esc(f)}</li>`).join('\n'), 24)}
                    </ul>
                </section>
            </div>

            <!-- --- Pager --- -->
            <nav class="detail-pager" aria-label="Weitere Projekte">
${indent(pager, 16)}
            </nav>
        </article>
    </main>
</div>

<script src="../javascript/main.js"></script>
</body>
</html>
`;
}

const INTEREST_ICONS = {
    calisthenics: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3.5h20"/><path d="M7 3.5l2.5 7M17 3.5l-2.5 7"/><path d="M9.5 10.5h5"/><circle cx="12" cy="7.5" r="2"/><path d="M12 10.5V16"/><path d="M12 16l-2.5 5M12 16l2.5 5"/></svg>',
    gaming: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="18" cy="14" r="1"/></svg>',
    ai: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
};

function aboutPage() {
    const intro = 'Ich bin Nicolas, Informatiker in Ausbildung (EFZ Applikationsentwicklung, seit 2025). Am liebsten baue ich Dinge fürs Web – von der Website meiner Calisthenics-Community bis zu kleinen Tools und Spielen im Browser. Neue Tools probiere ich gern aus, gerade im Bereich KI.';
    const facts = [
        ['Ausbildung', 'Informatiker EFZ – Applikationsentwicklung'],
        ['Lehrbeginn', '2025'],
        ['Schwerpunkt', 'Webentwicklung'],
    ];
    const timeline = [
        { date: 'Juni 2026 – heute', title: 'Webentwicklung bei Swan Calisthenics', text: 'Ich habe die Website der Community gebaut und betreue sie – vom Design über den Mitgliederbereich bis zum Blog.' },
        { date: '2025 – heute', title: 'Informatiker EFZ – Applikationsentwicklung', text: 'Berufslehre mit Schwerpunkt Softwareentwicklung.' },
        { date: '2022 – 2025', title: 'Sekundarschule' },
    ];
    const skills = [
        ['Frontend', ['HTML', 'CSS', 'JavaScript', 'Web Components', 'Canvas']],
        ['Backend & Daten', ['Supabase', 'Node.js', 'JSON']],
        ['Tools & Hosting', ['Git', 'GitHub Pages', 'Claude Code']],
    ];
    const interests = [
        { icon: 'calisthenics', title: 'Calisthenics', text: 'Training mit dem eigenen Körpergewicht – und Teil des Teams von Swan Calisthenics.' },
        { icon: 'gaming', title: 'Gaming', text: 'Videospiele – und eigene Spiele im Browser, zum Beispiel im Gamehub.' },
        { icon: 'ai', title: 'KI & neue Tools', text: 'Neue Tools ausprobieren – zum Beispiel Claude Code oder KI für Bilder.' },
    ];

    const factItems = facts.map(([label, value]) => `<div class="meta-item">
    <span class="meta-label">${esc(label)}</span>
    ${esc(value)}
</div>`).join('\n');
    const timelineItems = timeline.map(item => [
        '<div class="timeline-item">',
        '    <div class="timeline-dot"></div>',
        `    <div class="timeline-date">${esc(item.date)}</div>`,
        `    <h3>${esc(item.title)}</h3>`,
        ...(item.text ? [`    <p>${esc(item.text)}</p>`] : []),
        '</div>',
    ].join('\n')).join('\n');
    const skillGroups = skills.map(([name, list]) => `<div class="skill-group">
    <h3>${esc(name)}</h3>
    <div class="project-tags">
${indent(tags(list), 8)}
    </div>
</div>`).join('\n');
    const interestCards = interests.map(item => `<div class="interest-card">
    <div class="interest-icon">${INTEREST_ICONS[item.icon]}</div>
    <h3>${esc(item.title)}</h3>
    <p>${esc(item.text)}</p>
</div>`).join('\n');

    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Über mich – Nicolas Brand</title>
    <meta name="description" content="Über Nicolas Brand: Werdegang, Skills und Interessen.">
${appHead('./')}
${FONT_LINKS}
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>

<div class="layout">

${indent(sidebar('', 'about'), 4)}

    <!-- --- Main Content --- -->
    <main class="main-content">
        <article class="detail">

            <!-- --- About Header --- -->
            <header class="detail-header">
                <span class="project-label">Über mich</span>
                <h1>Hallo, ich bin Nicolas</h1>
                <p class="detail-lead">${esc(intro)}</p>
            </header>

            <!-- --- Profile Facts --- -->
            <div class="detail-meta">
${indent(factItems, 16)}
            </div>

            <div class="detail-body">

                <!-- --- Timeline --- -->
                <section>
                    <h2>Werdegang</h2>
                    <div class="timeline">
${indent(timelineItems, 24)}
                    </div>
                </section>

                <!-- --- Skills --- -->
                <section>
                    <h2>Skills</h2>
                    <div class="skill-groups">
${indent(skillGroups, 24)}
                    </div>
                </section>
            </div>

            <!-- --- Interests --- -->
            <section class="about-block">
                <h2>Interessen</h2>
                <div class="interest-grid">
${indent(interestCards, 20)}
                </div>
            </section>

            <!-- --- Call to Action --- -->
            <nav class="detail-pager" aria-label="Weiter">
                <a href="index.html#projects" class="pager-link"><span class="meta-label">Weiter zu</span>Meinen Projekten</a>
                <a href="index.html#contact" class="pager-link next"><span class="meta-label">Lust auf Austausch?</span>Kontakt</a>
            </nav>
        </article>
    </main>
</div>

<script src="./javascript/main.js"></script>
</body>
</html>
`;
}

fs.mkdirSync(path.join(ROOT, 'projekte'), { recursive: true });
projects.forEach((p, i) => fs.writeFileSync(path.join(ROOT, 'projekte', `${p.slug}.html`), detailPage(p, i)));

const indexPath = path.join(ROOT, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8').replace(/\r\n/g, '\n');
const start = index.indexOf('            <div class="projects-grid">');
const endMarker = '            </div>\n        </section>\n\n        <!-- --- Contact Section --- -->';
const end = index.indexOf(endMarker);
if (start < 0 || end < 0) throw new Error('grid markers not found');
const grid = '            <div class="projects-grid">\n' + indent(projects.map(card).join('\n'), 16) + '\n';
index = index.slice(0, start) + grid + index.slice(end);
const asideStart = index.indexOf('    <!-- --- Sidebar --- -->');
const asideEnd = index.indexOf('</aside>') + '</aside>'.length;
if (asideStart < 0 || asideEnd < 8) throw new Error('aside not found');
index = index.slice(0, asideStart) + indent(sidebar('', 'projects'), 4) + index.slice(asideEnd);
if (!index.includes('fonts.googleapis.com')) {
    index = index.replace('    <link rel="stylesheet" href="./css/styles.css">', FONT_LINKS + '\n    <link rel="stylesheet" href="./css/styles.css">');
} else if (!index.includes(THEME_SCRIPT)) {
    index = index.replace('    <link rel="preconnect" href="https://fonts.googleapis.com">', THEME_SCRIPT + '\n    <link rel="preconnect" href="https://fonts.googleapis.com">');
}
if (!index.includes('manifest.webmanifest')) {
    index = index.replace(THEME_SCRIPT, appHead('./') + '\n' + THEME_SCRIPT);
}

// Service Worker: alle Seiten, Styles, Skripte und Bilder für den Offline-Betrieb vorab laden
const walk = dir => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap(e => (
    e.isDirectory() ? walk(path.posix.join(dir, e.name)) : [path.posix.join(dir, e.name)]
));
const precache = [
    './', 'index.html', 'ueber-mich.html', 'manifest.webmanifest',
    ...projects.map(p => `projekte/${p.slug}.html`),
    'css/styles.css', 'javascript/main.js',
    ...walk('assets').filter(f => /\.(png|svg|webp|jpg)$/.test(f)),
];
const swPath = path.join(ROOT, 'sw.js');
const sw = fs.readFileSync(swPath, 'utf8');
const list = 'const PRECACHE = [\n' + precache.map(f => `    '${f.startsWith('./') ? f : './' + f}',`).join('\n') + '\n];';
fs.writeFileSync(swPath, sw.replace(/(\/\/ PRECACHE-START[^\n]*\n)[\s\S]*?(\n\/\/ PRECACHE-END)/, `$1${list}$2`));

fs.writeFileSync(path.join(ROOT, 'ueber-mich.html'), aboutPage());
fs.writeFileSync(indexPath, index);
console.log('ok', projects.length);
