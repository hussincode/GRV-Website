import { useState } from "react";
import { FOUNDERS, MEMBERS } from "../data";
import { useInView } from "../hooks";
import { T } from "../styles";

function SpiderWeb() {
  const particles = [
    { dur: "8s",  path: "M720,0 L80,420 L280,640 L720,900",   fill: T.neon,   r: 2 },
    { dur: "6s",  path: "M720,0 L1360,420 L1160,640 L720,900", fill: T.purple, r: 1.8, begin: "2s" },
    { dur: "10s", path: "M50,200 Q720,130 1390,200",            fill: T.pink,   r: 1.5, begin: "0.5s" },
    { dur: "7s",  path: "M720,0 L520,300 L300,560",             fill: T.gold,   r: 1.5, begin: "1s" },
    { dur: "9s",  path: "M720,0 L920,300 L1140,560",            fill: T.gold,   r: 1.5, begin: "3s" },
  ];

  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="wg" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor={T.neon} stopOpacity="0.7" />
          <stop offset="100%" stopColor={T.purple} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="url(#wg)" strokeWidth="0.7" opacity="0.55" filter="url(#glow)" fill="none">
        <line x1="720" y1="0" x2="80"   y2="420" />
        <line x1="720" y1="0" x2="280"  y2="640" />
        <line x1="720" y1="0" x2="500"  y2="800" />
        <line x1="720" y1="0" x2="720"  y2="900" />
        <line x1="720" y1="0" x2="940"  y2="800" />
        <line x1="720" y1="0" x2="1160" y2="640" />
        <line x1="720" y1="0" x2="1360" y2="420" />
        <line x1="720" y1="0" x2="50"   y2="200" />
        <line x1="720" y1="0" x2="1390" y2="200" />
        <path d="M50,200 Q200,160 720,185 Q1240,160 1390,200" />
        <path d="M80,420 Q300,360 720,390 Q1140,360 1360,420" />
        <path d="M280,640 Q500,590 720,610 Q940,590 1160,640" />
        <path d="M500,800 Q610,775 720,785 Q830,775 940,800" />
        <line x1="0"    y1="0" x2="400"  y2="700" strokeWidth="0.4" opacity="0.25" />
        <line x1="1440" y1="0" x2="1040" y2="700" strokeWidth="0.4" opacity="0.25" />
        <line x1="520" y1="300" x2="920"  y2="300" stroke={T.gold}  strokeWidth="1.2" opacity="0.6" />
        <line x1="520" y1="300" x2="300"  y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="520" y1="300" x2="460"  y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="520" y1="300" x2="620"  y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="780"  y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="980"  y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="1140" y2="560" stroke={T.neon}  strokeWidth="0.8" opacity="0.5" />
        <line x1="720" y1="0"   x2="520"  y2="300" stroke={T.neon}  strokeWidth="1"   opacity="0.6" />
        <line x1="720" y1="0"   x2="920"  y2="300" stroke={T.neon}  strokeWidth="1"   opacity="0.6" />
        <circle cx="720" cy="0"    r="5" fill={T.neon}   opacity="0.9" />
        <circle cx="50"  cy="200"  r="3" fill={T.neon}   opacity="0.5" />
        <circle cx="1390" cy="200" r="3" fill={T.neon}   opacity="0.5" />
        <circle cx="80"  cy="420"  r="3" fill={T.purple} opacity="0.5" />
        <circle cx="1360" cy="420" r="3" fill={T.purple} opacity="0.5" />
      </g>
      {particles.map((p, i) => (
        <circle key={i} r={p.r} fill={p.fill} opacity="0.9">
          <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin || "0s"} path={p.path} />
        </circle>
      ))}
    </svg>
  );
}

function MemberCard({ member, size = "normal" }) {
  const [hov, setHov] = useState(false);
  const isLarge = size === "large";

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", cursor: "pointer" }}>

      {/* Tooltip */}
      <div style={{
        position: "absolute", bottom: "calc(100% + 12px)", left: "50%",
        transform: `translateX(-50%) scale(${hov ? 1 : 0.88})`,
        background: "rgba(3,5,15,0.98)", border: "1px solid rgba(0,245,212,0.2)",
        padding: "0.9rem 1.1rem", minWidth: 185, zIndex: 20,
        fontFamily: T.font.mono, fontSize: "0.68rem", color: "rgba(224,247,250,0.7)", lineHeight: 1.7,
        opacity: hov ? 1 : 0, transition: "all 0.3s", pointerEvents: "none", whiteSpace: "nowrap",
      }}>
        {member.info.map((l, i) => <div key={i}>{l}</div>)}
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderWidth: 6, borderStyle: "solid", borderColor: "rgba(0,245,212,0.25) transparent transparent transparent" }} />
      </div>

      {/* Card */}
      <div style={{
        width: isLarge ? 158 : 128,
        background: "rgba(8,13,26,0.95)",
        border: `1px solid ${isLarge ? "rgba(0,245,212,0.4)" : "rgba(0,245,212,0.14)"}`,
        padding: isLarge ? "1.5rem 1.1rem 1.2rem" : "1.1rem 0.9rem 0.9rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", overflow: "hidden",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s",
        boxShadow: hov ? "0 20px 60px rgba(0,245,212,0.18)" : "none",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${isLarge ? T.gold : T.neon},transparent)` }} />
        <div style={{
          width: isLarge ? 86 : 68, height: isLarge ? 86 : 68, borderRadius: "50%",
          background: `linear-gradient(135deg,${member.grad[0]},${member.grad[1]})`,
          border: `2px solid ${isLarge ? "rgba(255,215,0,0.5)" : "rgba(0,245,212,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T.font.display, fontSize: isLarge ? "1.6rem" : "1.2rem", fontWeight: 800, color: "#fff",
          marginBottom: "0.8rem",
          boxShadow: isLarge ? "0 0 30px rgba(0,245,212,0.2)" : "none",
        }}>{member.initials}</div>
        <div style={{ fontFamily: T.font.body, fontSize: isLarge ? "0.88rem" : "0.75rem", fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: "0.25rem" }}>{member.name}</div>
        <div style={{ fontFamily: T.font.mono, fontSize: "0.58rem", letterSpacing: 1.5, color: isLarge ? T.gold : T.neon, textTransform: "uppercase", textAlign: "center" }}>{member.role}</div>
      </div>
    </div>
  );
}

export function HighBoard() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="high-board" style={{ background: T.dark, padding: "7rem 5vw 10rem", position: "relative", overflow: "hidden" }}>
      <SpiderWeb />

      <div ref={ref} style={{ position: "relative", zIndex: 5, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <div style={{ width: 40, height: 1, background: T.neon }} />
          <span style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 5, color: T.neon, textTransform: "uppercase" }}>// The High Board</span>
        </div>
        <h2 style={{ fontFamily: T.font.display, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "0.4rem" }}>Leadership Structure</h2>
        <p style={{ fontFamily: T.font.mono, fontSize: "0.78rem", color: "rgba(224,247,250,0.35)", letterSpacing: 2, marginBottom: "3rem" }}>The minds behind GRV</p>

        {/* Founders */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8rem", marginBottom: "4rem", position: "relative", zIndex: 5, flexWrap: "wrap" }}>
          {FOUNDERS.map((f, i) => (
            <div key={i} style={{ animation: `fadeDown 0.8s ease ${i * 0.15}s both` }}>
              <MemberCard member={f} size="large" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "3rem", position: "relative", zIndex: 5 }}>
          <div style={{ width: "30%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,245,212,0.35))" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.neon, margin: "0 1rem", boxShadow: `0 0 15px ${T.neon}` }} />
          <div style={{ width: "30%", height: 1, background: "linear-gradient(90deg,rgba(0,245,212,0.35),transparent)" }} />
        </div>

        {/* Members */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", position: "relative", zIndex: 5 }}>
          {MEMBERS.map((m, i) => (
            <div key={i} style={{ animation: `fadeDown 0.8s ease ${0.3 + i * 0.1}s both` }}>
              <MemberCard member={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
