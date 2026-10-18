// Berechnet die Keyframes fuer den Swan aus reinem CSS (css/swan-css.css).
// Ausgabe ersetzt den Block nach "/* Winkel berechnet" in swan-css.css. Aufruf: node tools/swan-css-keyframes.js
// Kinematik: Hand H fest, Schulter S steigt um D; Unterarm a, Oberarm b
const H = { x: 23, y: 24.5 }, S0 = { x: 36, y: 0 }, a = 13, b = 13, D = 15;
S0.y = H.y + Math.sqrt((a + b - 0.3) ** 2 - (S0.x - H.x) ** 2);
const deg = r => +(r * 180 / Math.PI).toFixed(2);
function angles(p) {
  const S = { x: S0.x, y: S0.y - D * p };
  const dx = S.x - H.x, dy = S.y - H.y, d = Math.hypot(dx, dy);
  const th = Math.atan2(-dx, dy);
  const g = Math.acos(Math.min(1, (a * a + d * d - b * b) / (2 * a * d)));
  const al = th + g; // Ellbogen nach aussen
  const E = { x: H.x - a * Math.sin(al), y: H.y + a * Math.cos(al) };
  const ab = Math.atan2(-(S.x - E.x), S.y - E.y);
  return { fore: deg(al), upper: deg(ab - al) };
}
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
// Phasen: 0-8 Ruhe, 8-40 hoch, 40-56 oben, 56-88 runter, 88-100 Ruhe
function prog(pc) {
  if (pc <= 8) return 0; if (pc <= 40) return ease((pc - 8) / 32);
  if (pc <= 56) return 1; if (pc <= 88) return 1 - ease((pc - 56) / 32); return 0;
}
const pcs = [0, 8, 12, 16, 20, 24, 28, 32, 36, 40, 56, 60, 64, 68, 72, 76, 80, 84, 88, 100];
let body = '@keyframes swan-css-body {\n', fl = '@keyframes swan-css-fore-l {\n', ul = '@keyframes swan-css-upper-l {\n', fr = '@keyframes swan-css-fore-r {\n', ur = '@keyframes swan-css-upper-r {\n';
for (const pc of pcs) {
  const p = prog(pc), A = angles(p);
  body += `    ${pc}% { transform: translateY(${(-D * p).toFixed(2)}cqw); }\n`;
  fl += `    ${pc}% { transform: rotate(${A.fore}deg); }\n`;
  ul += `    ${pc}% { transform: rotate(${A.upper}deg); }\n`;
  fr += `    ${pc}% { transform: rotate(${-A.fore}deg); }\n`;
  ur += `    ${pc}% { transform: rotate(${-A.upper}deg); }\n`;
}
console.log(`/* H=${JSON.stringify(H)} S0=${S0.x},${S0.y.toFixed(2)} a=${a} b=${b} D=${D} */`);
console.log([body, fl, ul, fr, ur].map(s => s + '}').join('\n\n'));
