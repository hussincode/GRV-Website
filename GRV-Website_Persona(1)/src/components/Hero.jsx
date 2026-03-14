import { useInView, useCounter, useMouseParallax } from "../hooks";
import { STATS } from "../data";

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

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid animate-grid opacity-50" />

      {/* Parallax orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,92,133,0.25), transparent 70%)",
          top: -100, left: -80,
          transform: `translate(${mouse.x * 18}px,${mouse.y * 18}px)`,
          filter: "blur(80px)", transition: "transform 0.15s",
        }} />
      <div className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(46,166,220,0.18), transparent 70%)",
          bottom: -80, right: -40,
          transform: `translate(${mouse.x * -14}px,${mouse.y * -14}px)`,
          filter: "blur(70px)", transition: "transform 0.15s",
        }} />
      <div className="absolute w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(105,207,246,0.12), transparent 70%)",
          top: "45%", left: "50%",
          transform: `translate(calc(-50% + ${mouse.x * 22}px), calc(-50% + ${mouse.y * 22}px))`,
          filter: "blur(60px)", transition: "transform 0.15s",
        }} />

      {/* Content */}
      <div className="relative z-10 animate-fade-up">

        {/* Tag */}
        <div className="inline-block font-mono text-[0.65rem] uppercase tracking-[4px]
                        text-grv-sky border border-grv-sky/30 px-4 py-1.5 mb-8">
          // Tech Collective — Est. 2024
        </div>

        {/* GRV Logo — matches the image style exactly */}
        <h1 className="grv-logo leading-none mb-3"
          style={{ fontSize: "clamp(5rem,15vw,11rem)" }}>
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
