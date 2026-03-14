import { useState, useRef } from "react";
import { useInView } from "../hooks";
import { TIMELINE } from "../data";

function TimelineCard({ item, isActive, onHover }) {
  return (
    <div onMouseEnter={onHover}
      className={`relative overflow-hidden cursor-pointer p-4 transition-all duration-300
                  border ${isActive ? "border-grv-sky/50 bg-grv-dark/90 scale-[1.03]" : "border-grv-sky/10 bg-grv-dark/60"}`}
      style={{ boxShadow: isActive ? `0 10px 40px rgba(46,166,220,0.18)` : "none" }}>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg,transparent,${item.tagColor},transparent)`,
          opacity: isActive ? 1 : 0.3,
        }} />

      {/* Tag */}
      <span className="inline-block font-mono text-[0.55rem] uppercase tracking-widest
                       px-2 py-0.5 mb-3 border"
        style={{ color: item.tagColor, borderColor: `${item.tagColor}44`, background: `${item.tagColor}10` }}>
        {item.tag}
      </span>

      <div className="text-2xl mb-2">{item.icon}</div>
      <div className="font-orbitron text-xs font-bold text-grv-text mb-1">{item.title}</div>
      <div className="text-grv-text/50 text-[0.75rem] leading-relaxed">{item.desc}</div>
    </div>
  );
}

export function Timeline() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <section id="timeline" className="py-24 bg-grv-dark/40 overflow-hidden">

      {/* Header */}
      <div ref={ref}
        className={`px-[5vw] mb-12 transition-all duration-700
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="section-label">// Our Journey</div>
        <div className="flex justify-between items-end flex-wrap gap-4">
          <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight">
            From <span className="text-grv-sky text-glow">Day One</span><br />to Right Now
          </h2>
          <div className="flex gap-2">
            {["←", "→"].map((a, i) => (
              <button key={i} onClick={() => scroll(i === 0 ? -1 : 1)}
                className="w-10 h-10 border border-grv-sky/25 text-grv-sky bg-grv-sky/5
                           hover:bg-grv-sky/15 hover:border-grv-sky transition-all duration-300
                           flex items-center justify-center font-mono">
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-[5vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg,#071f2e,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-[5vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg,#071f2e,transparent)" }} />

        <div ref={scrollRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", paddingLeft: "5vw", paddingRight: "5vw" }}>

          {TIMELINE.map((item, i) => (
            <div key={i} className="flex flex-col items-center" style={{ minWidth: 0 }}>

              {/* Card above/below alternating */}
              <div className={`w-56 transition-all duration-700 order-${i % 2 === 0 ? 1 : 3}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : `translateY(${i % 2 === 0 ? -20 : 20}px)`,
                  transitionDelay: `${i * 0.08}s`,
                }}>
                <TimelineCard item={item} isActive={active === i} onHover={() => setActive(i)} />
              </div>

              {/* Track line + node */}
              <div className="flex items-center order-2 z-[2]">
                {i > 0
                  ? <div className="w-14 h-0.5"
                      style={{ background: `linear-gradient(90deg,${TIMELINE[i-1].tagColor}55,${item.tagColor}55)` }} />
                  : <div className="w-14" />}

                <div onClick={() => setActive(i)}
                  className="rounded-full border-2 cursor-pointer flex-shrink-0 transition-all duration-300"
                  style={{
                    width: active === i ? 20 : 14, height: active === i ? 20 : 14,
                    background: `radial-gradient(circle,${item.tagColor},${item.tagColor}44)`,
                    borderColor: item.tagColor,
                    boxShadow: active === i
                      ? `0 0 18px ${item.tagColor},0 0 36px ${item.tagColor}55`
                      : `0 0 6px ${item.tagColor}55`,
                  }} />

                {i < TIMELINE.length - 1
                  ? <div className="w-14 h-0.5"
                      style={{ background: `linear-gradient(90deg,${item.tagColor}55,${TIMELINE[i+1].tagColor}55)` }} />
                  : <div className="w-14" />}
              </div>

              {/* Date */}
              <div className={`font-mono text-[0.6rem] uppercase tracking-widest text-center w-56
                              transition-colors duration-300 order-${i % 2 === 0 ? 3 : 1}
                              ${i % 2 === 0 ? "mt-3" : "mb-3"}`}
                style={{ color: active === i ? item.tagColor : "rgba(245,245,245,0.3)" }}>
                {item.date}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Active panel */}
      <div className="mx-[5vw] mt-6 p-5 flex items-center gap-6 flex-wrap border transition-all duration-300"
        style={{
          background: `linear-gradient(135deg,${TIMELINE[active].tagColor}0f,rgba(7,31,46,0.9))`,
          borderColor: `${TIMELINE[active].tagColor}33`,
        }}>
        <div className="text-4xl">{TIMELINE[active].icon}</div>
        <div className="flex-1 min-w-48">
          <div className="font-mono text-[0.58rem] uppercase tracking-[3px] mb-1"
            style={{ color: TIMELINE[active].tagColor }}>
            {TIMELINE[active].date} · {TIMELINE[active].tag}
          </div>
          <div className="font-orbitron text-base font-bold text-grv-text mb-1">
            {TIMELINE[active].title}
          </div>
          <div className="text-grv-text/55 text-sm leading-relaxed">{TIMELINE[active].desc}</div>
        </div>
        {/* Progress pills */}
        <div className="flex gap-1.5 items-center">
          {TIMELINE.map((_, i) => (
            <div key={i} onClick={() => setActive(i)}
              className="h-1.5 rounded cursor-pointer transition-all duration-300"
              style={{
                width: active === i ? 24 : 6,
                background: active === i ? TIMELINE[active].tagColor : "rgba(245,245,245,0.15)",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}
