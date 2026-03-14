export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Syne:wght@400;500;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #03050f; color: #e0f7fa; font-family: 'Syne', sans-serif; overflow-x: hidden; }

  @keyframes scan        { from { top: -2px } to { top: 100vh } }
  @keyframes gridPulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes fadeDown    { from{opacity:0;transform:translateY(-28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hexF1       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

  input::placeholder { color: rgba(224,247,250,0.3); }
`;

/* ── Shared design tokens ── */
export const T = {
  neon:    "#00f5d4",
  purple:  "#7b2fff",
  pink:    "#ff3cac",
  gold:    "#ffd700",
  blue:    "#00b4d8",
  orange:  "#f77f00",
  teal:    "#2ec4b6",
  dark:    "#03050f",
  dark2:   "#080d1a",
  font: {
    display: "'Orbitron', sans-serif",
    body:    "'Syne', sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
};
