import { useInView } from "../hooks";

const PILLS = ["Web Dev","AI & ML","Cybersecurity","Mobile Dev","Data Science","Cloud","UI/UX"];

export function About() {
  const [ref, inView] = useInView();

  return (
    <section className="px-[5vw] py-24 grid md:grid-cols-2 gap-16 items-center bg-grv-dark/40">

      {/* Animated hex visual */}
      <div className="relative h-72 md:h-80">
        {[
          { size: 180, color: "rgba(15,92,133,0.5)",   top: 40,  left: 40,  delay: "0s"   },
          { size: 120, color: "rgba(46,166,220,0.4)",  top: 10,  left: 180, delay: "0.5s" },
          { size: 150, color: "rgba(105,207,246,0.3)", top: 160, left: 140, delay: "1s"   },
        ].map((h, i) => (
          <div key={i} className="absolute clip-hex animate-float"
            style={{
              width: h.size, height: h.size * 1.1,
              background: `linear-gradient(135deg,${h.color},transparent)`,
              border: "1px solid rgba(46,166,220,0.2)",
              top: h.top, left: h.left,
              animationDelay: h.delay,
            }} />
        ))}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 40% 50%,rgba(15,92,133,0.2),transparent 65%)" }} />
      </div>

      {/* Text */}
      <div ref={ref}
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        <div className="section-label">// Who We Are</div>

        <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight mb-6">
          Built by <span className="text-grv-sky text-glow">Builders</span>,<br />
          for Builders.
        </h2>

        <p className="text-grv-text/55 leading-relaxed mb-4 text-sm md:text-base">
          GRV is a tech-first educational collective. We don't just teach code — we build
          careers, mindsets, and the next wave of digital innovators.
        </p>
        <p className="text-grv-text/55 leading-relaxed mb-8 text-sm md:text-base">
          Whether you're a complete beginner or leveling up your stack, our structured
          tracks and hands-on projects will get you there — fast.
        </p>

        <div className="flex flex-wrap gap-2">
          {PILLS.map(p => (
            <span key={p}
              className="font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1.5
                         border border-grv-sky/25 text-grv-sky bg-grv-sky/5">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
