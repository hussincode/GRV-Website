import { useInView } from "../hooks";
import { T } from "../styles";

export function About() {
  const [ref, inView] = useInView();

  const hexes = [
    { w: 200, h: 220, grad: `${T.purple},rgba(123,47,255,0.1)`, t: 60, l: 60, anim: "hexF1 6s ease-in-out infinite" },
    { w: 130, h: 145, grad: `${T.neon},rgba(0,245,212,0.1)`,    t: 20, l: 210, anim: "hexF1 8s ease-in-out infinite reverse" },
    { w: 160, h: 178, grad: `${T.pink},rgba(255,60,172,0.1)`,   t: 190, l: 160, anim: "hexF1 7s ease-in-out infinite 1s" },
  ];

  return (
    <section style={{
      padding: "7rem 5vw", display: "grid",
      gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center",
      background: T.dark2,
    }}>
      {/* Hex visual */}
      <div style={{ position: "relative", height: 360 }}>
        {hexes.map((h, i) => (
          <div key={i} style={{
            position: "absolute", width: h.w, height: h.h,
            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            background: `linear-gradient(135deg,${h.grad})`,
            top: h.t, left: h.l, animation: h.anim,
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 50%,rgba(123,47,255,0.22),transparent 65%)" }} />
      </div>

      {/* Text */}
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem" }}>
          <div style={{ width: 40, height: 1, background: T.neon }} />
          <span style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 5, color: T.neon, textTransform: "uppercase" }}>// Who We Are</span>
        </div>

        <h2 style={{ fontFamily: T.font.display, fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Built by Builders,<br />for Builders.
        </h2>

        <p style={{ fontSize: "0.95rem", color: "rgba(224,247,250,0.55)", lineHeight: 1.9, marginBottom: "1rem" }}>
          GRV is a tech-first educational collective. We don't just teach code — we build careers, mindsets, and the next wave of digital innovators.
        </p>
        <p style={{ fontSize: "0.95rem", color: "rgba(224,247,250,0.55)", lineHeight: 1.9, marginBottom: "2rem" }}>
          Whether you're a complete beginner or leveling up your stack, our structured tracks and hands-on projects will get you there — fast.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {["Web Dev","AI & ML","Cybersecurity","Mobile Dev","Data Science","Cloud","UI/UX"].map(p => (
            <span key={p} style={{
              fontFamily: T.font.mono, fontSize: "0.67rem", letterSpacing: 1.5, textTransform: "uppercase",
              padding: "0.4rem 1rem", border: `1px solid rgba(0,245,212,0.25)`,
              color: T.neon, background: "rgba(0,245,212,0.05)",
            }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
