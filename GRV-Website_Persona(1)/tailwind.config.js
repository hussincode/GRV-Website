/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "grv-black":   "#040404",
        "grv-dark":    "#071f2e",
        "grv-medium":  "#0f5c85",
        "grv-ocean":   "#214b5f",
        "grv-sky":     "#2ea6dc",
        "grv-light":   "#69cff6",
        "grv-pale":    "#81c8e4",
        "grv-text":    "#f5f5f5",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up":    "fadeInUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float":      "float 4s ease-in-out infinite",
        "scan":       "scan 7s linear infinite",
        "grid-pulse": "gridPulse 8s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        scan: {
          from: { top: "-2px" },
          to:   { top: "100vh" },
        },
        gridPulse: {
          "0%,100%": { opacity: "0.5" },
          "50%":     { opacity: "1" },
        },
      },
      boxShadow: {
        "glow-sky":    "0 0 20px rgba(46,166,220,0.5)",
        "glow-light":  "0 0 30px rgba(105,207,246,0.4)",
        "glow-strong": "0 0 40px rgba(46,166,220,0.7)",
        "card":        "0 4px 20px rgba(0,0,0,0.5)",
        "inner-glow":  "inset 0 0 20px rgba(46,166,220,0.1)",
      },
      textShadow: {
        "glow": "0 0 10px rgba(46,166,220,0.5)",
        "glow-strong": "0 0 20px rgba(46,166,220,0.8), 0 0 40px rgba(46,166,220,0.4)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(46,166,220,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,166,220,0.05) 1px,transparent 1px)",
        "glow-radial":  "radial-gradient(circle, rgba(46,166,220,0.15), transparent 70%)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, addBase }) {
      addBase({
        "::-webkit-scrollbar":       { width: "8px" },
        "::-webkit-scrollbar-track": { background: "#040404" },
        "::-webkit-scrollbar-thumb": { background: "#2ea6dc", borderRadius: "4px" },
        "::-webkit-scrollbar-thumb:hover": { background: "#69cff6" },
      });
      addUtilities({
        ".text-glow":        { textShadow: "0 0 10px rgba(46,166,220,0.5)" },
        ".text-glow-strong": { textShadow: "0 0 20px rgba(46,166,220,0.8), 0 0 40px rgba(46,166,220,0.4)" },
        ".grv-logo-text": {
          color: "#f5f5f5",
          textShadow: "-4px 4px 0px #2ea6dc, -8px 8px 0px #071f2e",
          WebkitTextStroke: "2px #2ea6dc",
          letterSpacing: "0.05em",
        },
        ".clip-hex": {
          clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        },
        ".clip-skew": {
          clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
        },
        ".bg-grid": {
          backgroundImage: "linear-gradient(rgba(46,166,220,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,166,220,0.05) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": { display: "none" },
        },
      });
    },
  ],
};
