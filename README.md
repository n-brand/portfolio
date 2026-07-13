Erstelle mir den vollständigen Code (HTML, CSS und JavaScript) für eine moderne, responsive persönliche Portfolio- und Blog-Website. Ich möchte ein sauberes, professionelles Design (helle/dunkle Akzente, ähnlich wie LinkedIn/GitHub).

Bitte trenne den Code übersichtlich in index.html, style.css und script.js.

Anforderungen an die Struktur & Features:
1. Navigation: Fixiert am oberen Rand, responsiv (mit einem Hamburger-Menü auf Mobilgeräten).
2. "Über mich" (LinkedIn-Style):
    - Ein Bereich für meine Bio und eine chronologische Zeitleiste (Timeline) für meinen Werdegang.
    - Ein Profilbild, das sich beim Anklicken in einer Lightbox (bildschirmfüllend, abgedunkelter Hintergrund, Schließen-Button oben rechts) vergrößert.
3. Social Links: Ein Bereich für Links (z.B. LinkedIn, GitHub) mit lokalen FontAwesome-Icons (nutze Klassen wie <i class="fa-brands fa-linkedin"></i>).
4. Projekte-Sektion mit interaktivem Filter:
    - Cards in einem Grid-Layout mit Titel, Beschreibung, Tags und Kategorien.
    - Filter-Buttons über dem Grid: "All", "Current", "School", "Official".
    - Vanilla JavaScript, das die Projekte flüssig filtert.
5. Kontaktseite mit Formsubmit.co:
    - Formular mit Name, E-Mail und Nachricht, vorbereitet für formsubmit.co.

Technische & Design-Vorgaben:
- CSS Klassen & Variablen: Alle Klassennamen und IDs müssen komplett auf Englisch sein (z.B. .profile-lightbox, .project-card, .filter-btn).
- Dark/Light Mode: Integriere ein automatisches Dark- und Light-Theme, das sich nach den Systemeinstellungen des Nutzers richtet (mittels @media (prefers-color-scheme: dark) im CSS unter Verwendung von CSS-Variablen).
- Kommentare: Schreibe ausschließlich strukturierende Kommentare (z.B. "/* --- Navigation --- */" oder "// --- Lightbox ---"). Lass jegliche erklärenden Kommentare komplett weg.
- Responsive Design: Verwende einen flexiblen Mobile-First-Ansatz mit CSS Grid und Flexbox.