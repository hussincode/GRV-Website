import { useState } from "react";
import { useInView } from "../hooks";
import { T } from "../styles";

export function Join() {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState("");

  return (
    <section id="join" style={{ padding: "7rem 5vw", background: T.dark2, textAlign: "center" }}>
      <div ref={ref} style={{ maxWidth: 660, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
        <div style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 5, color: T.neon, textTransform: "uppercase", marginBottom: "0.5rem" }}>// Ready to Start?</div>
        <h2 style={{ fontFamily: T.font.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, margin: "0.5rem 0 1.5rem" }}>
          Join the GRV<br />Movement
        </h2>
        <p style={{ fontSize: "0.95rem", color: "rgba(224,247,250,0.5)", lineHeight: 1.8, marginBottom: "2.2rem" }}>
          Drop your email and we'll reach out with the next available cohort.<br />No fluff — just tech.
        </p>
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              fontFamily: T.font.mono, fontSize: "0.78rem", letterSpacing: 1,
              padding: "0.95rem 1.4rem", background: "rgba(0,245,212,0.05)",
              border: "1px solid rgba(0,245,212,0.2)", color: "#fff", outline: "none",
              width: 250, clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            }}
          />
          <button style={{
            fontFamily: T.font.mono, fontSize: "0.78rem", letterSpacing: 2, textTransform: "uppercase",
            padding: "0.95rem 2rem",
            background: `linear-gradient(135deg,${T.neon},${T.purple})`,
            color: T.dark, border: "none", fontWeight: 700, cursor: "pointer",
            clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
          }}>Get Access</button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{
      background: "#020409", padding: "2.5rem 5vw",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "1rem",
      borderTop: "1px solid rgba(0,245,212,0.06)",
    }}>
      <div style={{ fontFamily: T.font.display, fontSize: "1.4rem", fontWeight: 900, letterSpacing: 4, background: `linear-gradient(90deg,${T.neon},${T.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GRV</div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {["Twitter", "LinkedIn", "Discord", "GitHub"].map(l => (
          <a key={l} href="#" style={{ fontFamily: T.font.mono, fontSize: "0.66rem", color: "rgba(224,247,250,0.4)", textDecoration: "none", letterSpacing: 1.5, transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = T.neon}
          onMouseLeave={e => e.target.style.color = "rgba(224,247,250,0.4)"}>{l}</a>
        ))}
      </div>
      <div style={{ fontFamily: T.font.mono, fontSize: "0.63rem", color: "rgba(224,247,250,0.2)", letterSpacing: 2 }}>
        © 2025 GRV Tech Team
      </div>
    </footer>
  );
}
