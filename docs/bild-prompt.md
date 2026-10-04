# Bild-Prompt: Bild im Art Style der Portfolio-Seite

Mit diesem Prompt wird ein bestehendes Bild in eine Illustration im Stil der Portfolio-Seite umgewandelt – als PNG ohne Hintergrund. Funktioniert mit Bildmodellen wie ChatGPT (GPT-Image), Gemini oder Midjourney: Bild hochladen und den Prompt dazu einfügen.

Der Stil ist **Flat Design** (flache Vektorgrafik): einfache geometrische Formen, kräftige Vollfarben, kaum Verläufe, keine Konturen.

## Prompt

```text
Redraw the attached image as a flat vector illustration in a playful, modern UI style (similar to Font Awesome's marketing illustrations).

Style rules:
- Flat design: simple geometric shapes, rounded corners, bold solid colors
- No outlines, no textures, no realistic shading, no photographic detail
- At most one soft glow or simple two-tone gradient for depth
- Friendly, slightly chunky proportions, clean and minimal, instantly readable at small size
- Keep the subject, pose and composition of the original recognizable, but simplify details

Color palette (use mainly these):
- Navy #183153
- Light blue #74C0FC
- Yellow #FFD43B
- Coral red #E63946 / #FF6B6B
- Lime green #A9E34B
- Purple #6C3CE9
- White #FFFFFF

Output:
- Transparent background (PNG with alpha channel)
- No background color, no floor, no frame, no drop shadow on the ground, no text
- Subject centered with some empty margin around it
- Square format, at least 1024×1024 px
```

## Varianten

**Pixel-Art** (wie bei Minecraft Skin Merger und Gamehub) – erste Zeile ersetzen durch:

```text
Redraw the attached image as clean pixel art (32×32 grid, upscaled with hard edges)
```

**Passend zu einer bestimmten Projektkarte** – die Farbpalette durch die Farben der Karte ersetzen (siehe `.theme-<slug>` in `css/styles.css`), z.B. für Minecraft: Lime `#A9E34B` + Navy `#183153`.

## Zweite Pose für eine Hover-Animation

Für eine Animation braucht es ein zweites Bild mit derselben Figur in einer anderen Pose (z.B. Swan Calisthenics: Schwan zieht sich hoch, bis die Brust über der Stange ist). Das bestehende Bild hochladen und **die Änderung zuerst und konkret beschreiben** – sonst ändert das Modell die Pose kaum:

```text
Edit the attached image: the swan pulls itself up much higher, like the top of a high pull-up.

Pose change (this is the important part):
- Move the swan's body, chest, neck and head clearly upward, so the chest is ABOVE the bar.
- The bar now crosses in front of the swan's belly.
- The fists stay on the bar at exactly the same spots; the elbows are bent tightly and point down below the bar.
- The legs and feet are higher too, with empty red space below them.
- The neck may bend more or the head may lean forward over the bar, so the head stays inside the circle.

Keep unchanged: circle, rings, red background, bar position, colors, art style, image size and framing.
```

Das Ergebnis **unter einem neuen Namen** in `originals/` speichern (z.B. `originals/swan-calisthenics-hoch.png`), nie über das Basisbild.

## Bilder zuschneiden

Runde Motive (Kreis mit Ring) schneidet `tools/crop-circle.ps1` aus: Es findet den Navy-Ring, schneidet den Kreis aus und speichert ein 600×600-PNG mit echter Transparenz – egal ob das Original einen schwarzen, weißen oder aufgemalten Schachbrett-Hintergrund hat.

```powershell
powershell -ExecutionPolicy Bypass -File tools/crop-circle.ps1 -InputPath originals/swan-calisthenics-hoch.png -OutputPath assets/images/swan-calisthenics-hoch.png
```

## Tipps

- Kommt trotzdem ein weißer Hintergrund: „Isolated subject on a fully transparent background, PNG“ anhängen oder den Hintergrund nachträglich entfernen (remove.bg oder „Hintergrund entfernen“ in Windows Fotos/Paint).
- Fertige Bilder können statt oder zusätzlich zu den SVG-Illustrationen (`ART` in `tools/build-pages.js`) in die Karten eingebaut werden.
