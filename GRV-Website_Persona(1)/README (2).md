# GRV Tech Team — Tailwind + React Project

## 🚀 Quick Start

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
grv-tailwind/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js          ← GRV color tokens + custom utilities
└── src/
    ├── index.css               ← Global styles + .grv-logo effect
    ├── main.jsx                ← React entry point
    ├── App.jsx                 ← Root component
    │
    ├── data/
    │   └── index.js            ← All content: COURSES, FOUNDERS, MEMBERS, STATS, TIMELINE
    │
    ├── hooks/
    │   └── index.js            ← useInView, useCounter, useMouseParallax, useScrolled
    │
    └── components/
        ├── index.js            ← Barrel export
        ├── Navbar.jsx          ← Scanline animation + sticky nav
        ├── Hero.jsx            ← GRV logo (image style) + parallax orbs + stats
        ├── About.jsx           ← Floating hex visuals + about text
        ├── Courses.jsx         ← 6-card grid with hover effects
        ├── Timeline.jsx        ← Horizontal scrollable timeline
        ├── HighBoard.jsx       ← Spider web SVG + founder/member cards
        └── JoinFooter.jsx      ← Email CTA + footer
```

---

## 🎨 GRV Color Palette (tailwind.config.js)

| Token         | Hex       | Usage                  |
|---------------|-----------|------------------------|
| `grv-black`   | `#040404` | Page background        |
| `grv-dark`    | `#071f2e` | Section backgrounds    |
| `grv-medium`  | `#0f5c85` | Mid-tone accents       |
| `grv-ocean`   | `#214b5f` | Borders, overlays      |
| `grv-sky`     | `#2ea6dc` | Primary accent / CTA   |
| `grv-light`   | `#69cff6` | Highlights             |
| `grv-pale`    | `#81c8e4` | Subtle accents         |
| `grv-text`    | `#f5f5f5` | Body text              |

### Usage in JSX:
```jsx
<div className="bg-grv-dark text-grv-sky border-grv-sky/30" />
```

---

## ✏️ How to Customize

### Change content → `src/data/index.js`
```js
// Add a new course:
export const COURSES = [
  { icon: "🔥", level: "Beginner", name: "Your Course", desc: "...", weeks: "6 weeks", next: "May 1", color: "grv-sky" },
  // ...
];

// Add a team member:
export const MEMBERS = [
  { initials: "M", name: "Mohamed Ali", role: "Lead Instructor", info: ["Python expert", "5 yrs exp", "GRV mentor"] },
  // ...
];

// Add a timeline event:
export const TIMELINE = [
  { date: "Apr 2025", icon: "🎓", title: "New Event", desc: "Description here.", tag: "Milestone", tagColor: "#69cff6" },
  // ...
];
```

### Change colors → `tailwind.config.js`
```js
colors: {
  "grv-sky": "#2ea6dc",  // ← change this
}
```

### Add a new section:
1. Create `src/components/MySection.jsx`
2. Export it in `src/components/index.js`
3. Add `<MySection />` in `src/App.jsx`

---

## 🖋 GRV Logo Style (matches the image)

Defined in `src/index.css` as `.grv-logo`:

```css
.grv-logo {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  color: #f5f5f5;                        /* white fill */
  -webkit-text-stroke: 2px #2ea6dc;      /* sky blue outline */
  text-shadow:
    -4px  4px 0px #2ea6dc,              /* blue offset layer */
    -8px  8px 0px #0f5c85,              /* medium blue shadow */
    -12px 12px 0px #071f2e;             /* deep dark blue base */
}
```

Small version (used in navbar): `.grv-logo-sm`

---

## 🧩 Reusable CSS Classes (index.css)

| Class           | What it does                          |
|-----------------|---------------------------------------|
| `.grv-logo`     | Big hero logo — image style           |
| `.grv-logo-sm`  | Smaller logo for navbar               |
| `.btn-primary`  | Filled gradient CTA button            |
| `.btn-outline`  | Bordered outline button               |
| `.card-base`    | Dark card with hover border glow      |
| `.section-label`| Small uppercase section tag           |
| `.clip-skew`    | Parallelogram clip-path on buttons    |
| `.clip-hex`     | Hexagon clip-path                     |
| `.text-glow`    | Blue text glow shadow                 |
| `.bg-grid`      | Subtle grid background pattern        |
| `.scrollbar-hide`| Hide scrollbar (timeline)            |
