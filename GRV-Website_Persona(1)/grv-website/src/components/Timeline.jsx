import { useState, useRef } from "react";
import { TIMELINE } from "../data";
import { useInView } from "../hooks";
import { T } from "../styles";

function TimelineCard({ item, isActive, onHover }) {
  return (
    <div onMouseEnter={onHover} style={{
      background: isActive ? "rgba(8,13,26,0.98)" : "rgba(8,13,26,0.7)",
      border: `1px solid ${isActive ? item.color + "55" : "rgba(0,245,212,0.08)"}`,
      padding: "1.3rem 1.2rem 1.1rem",
      position: "relative", overflow: "hidden", cursor: "pointer",
      transform: isActive ? "scale(1.03)" : "scale(1)",
      transition: "all 0.35s",
      boxShadow: isActive ? `0 10px 40px ${item.color}22` : "none",
    }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
        opacity: isActive ? 1 : 0.3, transition: "opacity 0.3s",
      }} />

      <div style={{
        display: "inline-block", fontFamily: T.font.mono, fontSize: "0.56rem",
        letterSpacing: 2, textTransform: "uppercase",
        padding: "0.2rem 0.6rem", marginBottom: "0.8rem",
        border: `1px solid ${item.color}44`, color: item.color, background: `${item.color}0f`,
      }}>{item.tag}</div>

      <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{item.icon}</div>
      <div style={{ fontFamily: T.font.display, fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{item.title}</div>
      <div style={{ fontSize: "0.78rem", color: "rgba(224,247,250,0.5)", lineHeight: 1.65 }}>{item.desc}</div>
    </div>
  );
}

export function Timeline() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="timeline" style={{ padding: "7rem 0 7rem", background: T.dark2, overflow: "hidden" }}>

      {/* Header */}
      <div ref={ref} style={{ padding: "0 5vw", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <div style={{ width: 40, height: 1, background: T.neon }} />
          <span style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 5, color: T.neon, textTransform: "uppercase" }}>// Our Journey</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: T.font.display, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1 }}>
            From Day One<br />to Right Now
          </h2>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {["←", "→"].map((arrow, i) => (
              <button key={i} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
                width: 44, height: 44, background: "rgba(0,245,212,0.06)",
                border: "1px solid rgba(0,245,212,0.2)", color: T.neon,
                fontSize: "1rem", cursor: "pointer", transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,245,212,0.15)"; e.currentTarget.style.borderColor = T.neon; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,245,212,0.06)"; e.currentTarget.style.borderColor = "rgba(0,245,212,0.2)"; }}
              >{arrow}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable track */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5vw", background: `linear-gradient(90deg,${T.dark2},transparent)`, zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "5vw", background: `linear-gradient(270deg,${T.dark2},transparent)`, zIndex: 10, pointerEvents: "none" }} />

        <div ref={scrollRef} style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: "2rem", scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "5vw", paddingRight: "5vw" }}>
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", minWidth: 0 }}>

              {/* Card alternates above/below */}
              <div style={{
                width: 260,
                order: i % 2 === 0 ? 1 : 3,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : (i % 2 === 0 ? "translateY(-20px)" : "translateY(20px)"),
                transition: `all 0.7s ease ${i * 0.08}s`,
              }}>
                <TimelineCard item={item} isActive={active === i} onHover={() => setActive(i)} />
              </div>

              {/* Track + node */}
              <div style={{ display: "flex", alignItems: "center", order: 2, position: "relative", zIndex: 2 }}>
                {i > 0
                  ? <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${TIMELINE[i-1].color}55,${item.color}55)` }} />
                  : <div style={{ width: 60 }} />
                }
                <div
                  onClick={() => setActive(i)}
                  style={{
                    width: active === i ? 22 : 16, height: active === i ? 22 : 16,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,${item.color},${item.color}44)`,
                    border: `2px solid ${item.color}`,
                    boxShadow: active === i ? `0 0 20px ${item.color},0 0 40px ${item.color}55` : `0 0 8px ${item.color}55`,
                    transition: "all 0.3s", flexShrink: 0, cursor: "pointer", zIndex: 3,
                  }} />
                {i < TIMELINE.length - 1
                  ? <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${item.color}55,${TIMELINE[i+1].color}55)` }} />
                  : <div style={{ width: 60 }} />
                }
              </div>

              {/* Date label */}
              <div style={{
                order: i % 2 === 0 ? 3 : 1,
                marginTop: i % 2 === 0 ? "0.8rem" : 0,
                marginBottom: i % 2 === 1 ? "0.8rem" : 0,
                fontFamily: T.font.mono, fontSize: "0.65rem", letterSpacing: 2,
                color: active === i ? item.color : "rgba(224,247,250,0.35)",
                textTransform: "uppercase", textAlign: "center", transition: "color 0.3s", width: 260,
              }}>{item.date}</div>

            </div>
          ))}
        </div>
      </div>

      {/* Active detail panel */}
      <div style={{
        margin: "2rem 5vw 0", padding: "1.5rem 2rem",
        background: `linear-gradient(135deg,${TIMELINE[active].color}0f,rgba(8,13,26,0.9))`,
        border: `1px solid ${TIMELINE[active].color}33`,
        display: "flex", alignItems: "center", gap: "2rem",
        transition: "all 0.4s", flexWrap: "wrap",
      }}>
        <div style={{ fontSize: "2.5rem" }}>{TIMELINE[active].icon}</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: T.font.mono, fontSize: "0.62rem", letterSpacing: 3, color: TIMELINE[active].color, textTransform: "uppercase", marginBottom: "0.3rem" }}>
            {TIMELINE[active].date} · {TIMELINE[active].tag}
          </div>
          <div style={{ fontFamily: T.font.display, fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>
            {TIMELINE[active].title}
          </div>
          <div style={{ fontSize: "0.88rem", color: "rgba(224,247,250,0.55)", lineHeight: 1.7 }}>
            {TIMELINE[active].desc}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {TIMELINE.map((_, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              width: active === i ? 24 : 7, height: 7, borderRadius: 4,
              background: active === i ? TIMELINE[active].color : "rgba(224,247,250,0.15)",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>

    </section>
  );
}
