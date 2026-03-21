import { useState } from "react";
import { useInView, useCounter, useMouseParallax } from "../hooks";
import { STATS } from "../data";

/* ─────────────────────────────────────────
   ADD YOUR IMAGES HERE
   Put images in /public/hero/ folder
   Example: src: "/hero/laptop.png"
───────────────────────────────────────── */
const FLOAT_IMAGES = [
  { src: "/src/Images/Icons/Bran.png", top: "8%",  left: "25%",   size: 300, delay: "0s",   dur: "6s",   px: 40,  py: -8,  rotate: "-12deg" },
  { src: "/src/Images/Icons/folder.png", top: "50%",  right: "30%",  size: 100, delay: "0.5s", dur: "5s",   px: -14, py:  6,  rotate: "8deg"   },
  { src: "/src/Images/Icons/Courser.png", top: "70%", left: "4%",   size: 150,  delay: "1s",   dur: "10s",   px:  8,  py:  12, rotate: "-5deg"  },
];


function FloatingImage({ item, index, mouse }) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError ] = useState(false);

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top: item.top, left: item.left, right: item.right,
        zIndex: 2,
        width: item.size, height: item.size,
        transform: `rotate(${item.rotate})`,
        translate: `${mouse.x * item.px}px ${mouse.y * item.py}px`,
        transition: "translate 0.15s ease-out",
        animation: `grv-float ${item.dur} ease-in-out ${item.delay} infinite`,
        filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.55))",
      }}
    >
      {!error && (
        <img
          src={item.src}
          alt=""
          onLoad={()  => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "contain",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
      )}
      {(!loaded || error) && (
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: item.size * 0.52, lineHeight: 1,
          opacity: 0.5,
        }}>
        </div>
      )}
    </div>
  );
}

function StatItem({ num, suffix, label, active }) {
  const val = useCounter(num, active);
  return (
    <div className="text-center">
      <div className="font-orbitron text-3xl font-black text-grv-sky text-glow-strong">
        {val}{suffix}
      </div>
      <div className="font-mono text-[0.6rem] uppercase tracking-[3px] text-grv-text/40 mt-1">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  const mouse = useMouseParallax();
  const [statsRef, statsInView] = useInView(0.4);

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center
                                    text-center px-4 pt-28 pb-16 overflow-hidden">

      <style>{`
        @keyframes grv-float {
          0%, 100% { transform: translateY(0px)   rotate(var(--r, 0deg)); }
          50%       { transform: translateY(-18px) rotate(var(--r, 0deg)); }
        }
      `}</style>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid animate-grid opacity-50" />

      {/* Floating images — BEHIND everything */}
      {FLOAT_IMAGES.map((item, i) => (
        <FloatingImage key={i} item={item} index={i} mouse={mouse} />
      ))}

      {/* Parallax orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-[3]"
        style={{ background: "radial-gradient(circle,rgba(15,92,133,0.25),transparent 70%)", top: -100, left: -80, transform: `translate(${mouse.x * 18}px,${mouse.y * 18}px)`, filter: "blur(80px)", transition: "transform 0.15s" }} />
      <div className="absolute w-[350px] h-[350px] rounded-full pointer-events-none z-[3]"
        style={{ background: "radial-gradient(circle,rgba(46,166,220,0.18),transparent 70%)", bottom: -80, right: -40, transform: `translate(${mouse.x * -14}px,${mouse.y * -14}px)`, filter: "blur(70px)", transition: "transform 0.15s" }} />
      <div className="absolute w-[280px] h-[280px] rounded-full pointer-events-none z-[3]"
        style={{ background: "radial-gradient(circle,rgba(105,207,246,0.12),transparent 70%)", top: "45%", left: "50%", transform: `translate(calc(-50% + ${mouse.x * 22}px),calc(-50% + ${mouse.y * 22}px))`, filter: "blur(60px)", transition: "transform 0.15s" }} />

      {/* Soft vignette so images don't overpower the text */}
      <div className="absolute inset-0 z-[4] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 30%, rgba(4,4,4,0.5) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 animate-fade-up">
        <div className="inline-block font-mono text-[0.65rem] uppercase tracking-[4px]
                        text-grv-sky border border-grv-sky/30 px-4 py-1.5 mb-8">
          // Tech Collective — Est. 2024
        </div>

        <h1 className="grv-logo leading-none mb-3" style={{ fontSize: "clamp(5rem,15vw,11rem)" }}>
          GRV
        </h1>

        <p className="font-orbitron text-grv-text/40 tracking-[14px] text-sm md:text-lg font-light mb-8">
          TECH TEAM
        </p>

        <p className="font-cairo text-grv-text/55 max-w-xl mx-auto leading-relaxed text-sm md:text-base mb-8">
          We build the next generation of tech leaders. From zero to developer —
          our courses are crafted by industry professionals who know what it takes.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-primary">Explore Courses</button>
          <button className="btn-outline">Meet The Team</button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef}
        className="relative z-10 flex gap-12 mt-16 flex-wrap justify-center animate-fade-up delay-300">
        {STATS.map(s => <StatItem key={s.label} {...s} active={statsInView} />)}
      </div>
    </section>
  );
}
