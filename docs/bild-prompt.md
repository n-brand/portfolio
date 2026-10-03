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

## Tipps

- Kommt trotzdem ein weißer Hintergrund: „Isolated subject on a fully transparent background, PNG“ anhängen oder den Hintergrund nachträglich entfernen (remove.bg oder „Hintergrund entfernen“ in Windows Fotos/Paint).
- Fertige Bilder können statt oder zusätzlich zu den SVG-Illustrationen (`ART` in `tools/build-pages.js`) in die Karten eingebaut werden.
