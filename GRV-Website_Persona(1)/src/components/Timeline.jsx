import { useState, useRef } from "react";
import { useInView } from "../hooks";
import { TIMELINE } from "../data";

function TimelineCard({ item, isActive, onHover }) {
  return (
    <div onMouseEnter={onHover}
      className={`relative overflow-hidden cursor-pointer p-5 transition-all duration-500
                  border rounded-lg backdrop-blur-sm
                  ${isActive ? "border-opacity-60 bg-grv-dark/95 scale-[1.02] shadow-2xl" : "border-opacity-20 bg-grv-dark/70 hover:border-opacity-40"}`}
      style={{ 
        borderColor: item.tagColor,
        boxShadow: isActive ? `0 20px 40px -10px ${item.tagColor}80` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.tagColor}, transparent)`,
          opacity: isActive ? 1 : 0.3,
        }} />
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-transparent to-white/5 rounded-full blur-2xl" />
      <div className="relative">
        <span className="inline-block font-mono text-[0.55rem] uppercase tracking-widest
                       px-3 py-1.5 rounded-full mb-4 border"
          style={{ 
            color: item.tagColor, 
            borderColor: `${item.tagColor}40`, 
            backgroundColor: `${item.tagColor}15`,
            textShadow: `0 0 5px ${item.tagColor}40`
          }}>
          {item.tag}
        </span>
        <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">
          {item.icon}
        </div>
        <h3 className="font-orbitron text-sm font-bold text-grv-text mb-2 leading-relaxed">
          {item.title}
        </h3>
        <p className="text-grv-text/60 text-xs leading-relaxed line-clamp-3">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export function Timeline() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="timeline" className="relative py-28 bg-grv-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                      from-grv-sky/10 via-transparent to-transparent" />
      <div className="absolute inset-0">
        {TIMELINE.map((item, i) => (
          <div key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: item.tagColor,
              left: `${(i + 1) * 12}%`,
              top: i % 2 === 0 ? '20%' : '80%',
              opacity: 0.2,
              filter: `blur(1px)`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div ref={ref}
        className={`relative px-[5vw] mb-16 transition-all duration-700 z-10
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[5px] 
                        text-grv-sky/80 mb-4 before:w-12 before:h-px before:bg-grv-sky/30">
          ✦ OUR JOURNEY ✦
        </div>
        <div className="flex justify-between items-end flex-wrap gap-6">
          <h2 className="font-orbitron text-4xl md:text-5xl font-black leading-tight">
            <span className="text-grv-text">From</span>{' '}
            <span className="relative">
              <span className="absolute -inset-1 bg-grv-sky/20 blur-xl rounded-full" />
              <span className="relative text-grv-sky text-glow">Day One</span>
            </span>
            <br />
            <span className="text-grv-text/90">to Right Now</span>
          </h2>
          <div className="flex gap-3">
            {[
              { dir: -1, icon: "←", label: "السابق" },
              { dir: 1, icon: "→", label: "التالي" }
            ].map((btn, i) => (
              <button 
                key={i}
                onClick={() => scroll(btn.dir)}
                className="group relative w-12 h-12 rounded-full border-2 transition-all duration-300
                           flex items-center justify-center font-mono text-xl
                           hover:scale-110 active:scale-95 overflow-hidden"
                style={{ 
                  borderColor: `${TIMELINE[active].tagColor}40`,
                  color: TIMELINE[active].tagColor,
                }}>
                <span className="relative z-10 group-hover:scale-110 transition-transform">
                  {btn.icon}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: TIMELINE[active].tagColor }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="relative">
        {/* التمويه الجانبي */}
        <div className="absolute left-0 top-0 bottom-0 w-[5vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0B1F2E, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-[5vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #0B1F2E, transparent)" }} />
        <div ref={scrollRef}
          className="flex overflow-x-auto pb-8 scrollbar-hide gap-6"
          style={{ 
            scrollbarWidth: "none", 
            paddingLeft: "5vw", 
            paddingRight: "5vw",
            msOverflowStyle: "none" 
          }}>

          {TIMELINE.map((item, i) => {
            const isActive_item = active === i;
            
            return (
              <div key={i} className="flex flex-col items-center" style={{ minWidth: 260 }}>
                <div className={`w-full transition-all duration-700 ${i % 2 === 0 ? 'order-1' : 'order-3'}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView 
                      ? "none" 
                      : `translateY(${i % 2 === 0 ? '-20px' : '20px'})`,
                    transitionDelay: `${i * 0.1}s`,
                  }}>
                  <TimelineCard 
                    item={item} 
                    isActive={isActive_item} 
                    onHover={() => setActive(i)} 
                  />
                </div>
                <div className="flex items-center order-2 z-20 my-4">
                  {i > 0 && (
                    <div className="w-16 h-0.5 rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${TIMELINE[i-1].tagColor}80, ${item.tagColor}80)`,
                        boxShadow: isActive_item ? `0 0 8px ${item.tagColor}` : 'none'
                      }} 
                    />
                  )}
                  <div 
                    onClick={() => setActive(i)}
                    className="relative rounded-full cursor-pointer transition-all duration-300
                               hover:scale-125 active:scale-95"
                    style={{
                      width: isActive_item ? 22 : 16,
                      height: isActive_item ? 22 : 16,
                      background: `radial-gradient(circle at 30% 30%, white, ${item.tagColor})`,
                      border: `2px solid ${item.tagColor}`,
                      boxShadow: isActive_item
                        ? `0 0 20px ${item.tagColor}, 0 0 40px ${item.tagColor}60`
                        : `0 0 10px ${item.tagColor}60`,
                    }}>
                    {isActive_item && (
                      <span className="absolute inset-0 rounded-full animate-ping"
                        style={{ 
                          backgroundColor: item.tagColor,
                          opacity: 0.3
                        }} />
                    )}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-16 h-0.5 rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${item.tagColor}80, ${TIMELINE[i+1].tagColor}80)`,
                        boxShadow: isActive_item ? `0 0 8px ${item.tagColor}` : 'none'
                      }} 
                    />
                  )}
                </div>
                <div className={`font-mono text-xs uppercase tracking-widest text-center w-full
                                transition-all duration-300 order-${i % 2 === 0 ? '3' : '1'}
                                ${i % 2 === 0 ? 'mt-2' : 'mb-2'}`}
                  style={{ 
                    color: isActive_item ? item.tagColor : 'rgba(255,255,255,0.25)',
                    textShadow: isActive_item ? `0 0 10px ${item.tagColor}` : 'none',
                    fontWeight: isActive_item ? 'bold' : 'normal'
                  }}>
                  {item.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative mx-[5vw] mt-12 p-6 rounded-xl border backdrop-blur-md
                      transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: `linear-gradient(135deg, ${TIMELINE[active].tagColor}15, #0B1F2E)`,
          borderColor: `${TIMELINE[active].tagColor}30`,
          boxShadow: `0 10px 30px -10px ${TIMELINE[active].tagColor}80`
        }}>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-5xl transform hover:scale-110 transition-transform"
               style={{ filter: `drop-shadow(0 0 10px ${TIMELINE[active].tagColor})` }}>
            {TIMELINE[active].icon}
          </div>
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider mb-2"
                 style={{ color: TIMELINE[active].tagColor }}>
              <span>{TIMELINE[active].date}</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: TIMELINE[active].tagColor }} />
              <span>{TIMELINE[active].tag}</span>
            </div>
            
            <h3 className="font-orbitron text-lg font-bold text-grv-text mb-2">
              {TIMELINE[active].title}
            </h3>
            
            <p className="text-grv-text/70 text-sm leading-relaxed">
              {TIMELINE[active].desc}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {TIMELINE.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative h-2 rounded-full transition-all duration-300
                           hover:scale-y-125 focus:outline-none"
                style={{
                  width: active === i ? 32 : 8,
                  background: active === i 
                    ? TIMELINE[active].tagColor 
                    : 'rgba(255,255,255,0.1)',
                }}>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50
                                 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, white, transparent)`,
                      }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}