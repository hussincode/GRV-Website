import { useState } from "react";
import { COURSES } from "../data";
import { useInView } from "../hooks";
import { T } from "../styles";

function CourseCard({ course, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(0,245,212,0.04)",
        border: `1px solid ${hov ? "rgba(0,245,212,0.3)" : "rgba(0,245,212,0.07)"}`,
        padding: "2rem", position: "relative", overflow: "hidden", cursor: "pointer",
        transform: inView ? (hov ? "translateY(-8px)" : "translateY(0)") : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition: `all 0.4s ease ${delay}s`,
        boxShadow: hov ? `0 20px 60px ${course.color}22` : "none",
      }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${course.color},transparent)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.4s",
      }} />

      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{course.icon}</div>
      <div style={{ fontFamily: T.font.mono, fontSize: "0.6rem", letterSpacing: 3, color: course.color, textTransform: "uppercase", marginBottom: "0.4rem" }}>{course.level}</div>
      <div style={{ fontFamily: T.font.display, fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.7rem" }}>{course.name}</div>
      <div style={{ fontSize: "0.83rem", color: "rgba(224,247,250,0.5)", lineHeight: 1.7, marginBottom: "1.4rem" }}>{course.desc}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.font.mono, fontSize: "0.66rem", color: "rgba(224,247,250,0.35)", borderTop: "1px solid rgba(0,245,212,0.08)", paddingTop: "1rem" }}>
        <span>{course.weeks}</span>
        <span>Next: <span style={{ color: course.color }}>{course.next}</span></span>
      </div>
    </div>
  );
}

export function Courses() {
  const [ref, inView] = useInView();

  return (
    <section id="courses" style={{ padding: "7rem 5vw", background: T.dark }}>
      <div ref={ref} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s" }}>
        <div style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: 5, color: T.neon, textTransform: "uppercase", marginBottom: "0.5rem" }}>// What We Offer</div>
        <h2 style={{ fontFamily: T.font.display, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1 }}>
          Courses Built<br />for the Real World
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.2rem" }}>
        {COURSES.map((c, i) => <CourseCard key={c.name} course={c} delay={i * 0.1} />)}
      </div>
    </section>
  );
}
