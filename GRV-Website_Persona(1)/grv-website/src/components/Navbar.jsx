import { T } from "../styles";

export function Scanline() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 9999,
      pointerEvents: "none",
      background: `linear-gradient(90deg,transparent,${T.neon},transparent)`,
      animation: "scan 7s linear infinite", opacity: 0.35,
    }} />
  );
}

export function Navbar({ active }) {
  const links = ["About", "Courses", "Timeline", "High Board", "Join"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem 5vw",
      background: "rgba(3,5,15,0.88)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,245,212,0.07)",
      boxShadow: active ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
      transition: "box-shadow 0.4s",
    }}>
      <div style={{
        fontFamily: T.font.display, fontWeight: 900, fontSize: "1.7rem",
        letterSpacing: 4,
        background: `linear-gradient(90deg,${T.neon},${T.purple})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>GRV</div>

      <div style={{ display: "flex", gap: "2.2rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{
            fontFamily: T.font.mono, fontSize: "0.72rem",
            color: "rgba(224,247,250,0.55)", textDecoration: "none",
            letterSpacing: 2, textTransform: "uppercase", transition: "color 0.3s",
          }}
          onMouseEnter={e => e.target.style.color = T.neon}
          onMouseLeave={e => e.target.style.color = "rgba(224,247,250,0.55)"}
          >{l}</a>
        ))}
      </div>

      <button style={{
        fontFamily: T.font.mono, fontSize: "0.72rem",
        letterSpacing: 2, textTransform: "uppercase",
        padding: "0.6rem 1.5rem", border: `1px solid ${T.neon}`,
        color: T.neon, background: "transparent", cursor: "pointer",
        clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
        transition: "all 0.3s",
      }}
      onMouseEnter={e => { e.target.style.background = T.neon; e.target.style.color = T.dark; }}
      onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = T.neon; }}
      >Enroll Now</button>
    </nav>
  );
}
