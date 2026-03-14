import { STATS } from "../data";
import { useInView, useCounter, useMouseParallax } from "../hooks";
import { T } from "../styles";

function Orb({ style }) {
  return <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", zIndex: 0, ...style }} />;
}

function StatItem({ num, suffix, label, active }) {
  const val = useCounter(num, active);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: T.font.display, fontSize: "2.1rem", fontWeight: 800,
        background: `linear-gradient(135deg,${T.neon},${T.purple})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{val}{suffix}</div>
      <div style={{
        fontFamily: T.font.mono, fontSize: "0.63rem",
        letterSpacing: 3, color: "rgba(224,247,250,0.4)", textTransform: "uppercase", marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

export function Hero() {
  const mousePos = useMouseParallax();
  const [statsRef, statsInView] = useInView(0.4);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden",
    }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,245,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,0.04) 1px,transparent 1px)`,
        backgroundSize: "60px 60px", animation: "gridPulse 8s ease-in-out infinite",
      }} />

      <Orb style={{ width: 600, height: 600, background: "rgba(123,47,255,0.18)", top: -150, left: -100, transform: `translate(${mousePos.x * 15}px,${mousePos.y * 15}px)`, transition: "transform 0.1s" }} />
      <Orb style={{ width: 400, height: 400, background: "rgba(0,245,212,0.14)", bottom: -100, right: -50, transform: `translate(${mousePos.x * -12}px,${mousePos.y * -12}px)`, transition: "transform 0.1s" }} />
      <Orb style={{ width: 300, height: 300, background: "rgba(255,60,172,0.09)", top: "40%", left: "50%", transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px))`, transition: "transform 0.1s" }} />

      <div style={{ position: "relative", zIndex: 2, animation: "fadeDown 0.7s ease both" }}>
        <div style={{
          fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 4,
          color: T.neon, textTransform: "uppercase",
          border: `1px solid rgba(0,245,212,0.3)`, padding: "0.4rem 1.2rem",
          display: "inline-block", marginBottom: "1.5rem",
        }}>// Tech Collective — Est. 2024</div>

        <h1 style={{
          fontFamily: T.font.display, fontWeight: 900,
          fontSize: "clamp(5rem,14vw,10rem)", lineHeight: 0.88, letterSpacing: -2, marginBottom: "0.3rem",
        }}>
          <span style={{
            display: "block",
            background: `linear-gradient(135deg,#fff 0%,${T.neon} 40%,${T.purple} 80%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(0,245,212,0.35))",
          }}>GRV</span>
          <span style={{
            display: "block", fontSize: "clamp(1.1rem,2.5vw,2rem)", letterSpacing: 12, fontWeight: 400,
            background: `linear-gradient(90deg,rgba(255,255,255,0.35),rgba(0,245,212,0.55))`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>TECH TEAM</span>
        </h1>

        <p style={{ fontFamily: T.font.body, fontSize: "clamp(0.9rem,1.4vw,1.1rem)", color: "rgba(224,247,250,0.5)", maxWidth: 540, margin: "1.8rem auto 0", lineHeight: 1.9 }}>
          We build the next generation of tech leaders. From zero to developer —
          our courses are crafted by industry professionals who know what it takes.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2.2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            fontFamily: T.font.mono, fontSize: "0.78rem", letterSpacing: 2, textTransform: "uppercase",
            padding: "0.95rem 2.2rem", background: `linear-gradient(135deg,${T.neon},${T.purple})`,
            color: T.dark, border: "none", fontWeight: 700, cursor: "pointer",
            clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
          }}>Explore Courses</button>
          <button style={{
            fontFamily: T.font.mono, fontSize: "0.78rem", letterSpacing: 2, textTransform: "uppercase",
            padding: "0.95rem 2.2rem", background: "transparent", color: T.neon,
            border: `1px solid rgba(0,245,212,0.4)`, cursor: "pointer",
            clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
          }}>Meet The Team</button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} style={{
        display: "flex", gap: "4rem", marginTop: "5rem", position: "relative", zIndex: 2,
        flexWrap: "wrap", justifyContent: "center", animation: "fadeDown 1s ease 0.4s both",
      }}>
        {STATS.map(s => <StatItem key={s.label} {...s} active={statsInView} />)}
      </div>
    </section>
  );
}
