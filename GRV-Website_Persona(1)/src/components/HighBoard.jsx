import { useState } from "react";
import { useInView } from "../hooks";
import { FOUNDERS, MEMBERS } from "../data";

function SpiderWeb() {
  const particles = [
    { dur: "8s",  path: "M720,0 L80,420 L280,640 L720,900",   fill: "#2ea6dc", r: 2   },
    { dur: "6s",  path: "M720,0 L1360,420 L1160,640 L720,900", fill: "#69cff6", r: 1.8, begin: "2s" },
    { dur: "10s", path: "M50,200 Q720,130 1390,200",            fill: "#81c8e4", r: 1.5, begin: "0.5s" },
    { dur: "7s",  path: "M720,0 L520,300 L300,560",             fill: "#f59e0b", r: 1.5, begin: "1s" },
    { dur: "9s",  path: "M720,0 L920,300 L1140,560",            fill: "#f59e0b", r: 1.5, begin: "3s" },
  ];

  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
      <defs>
        <radialGradient id="wgb" cx="50%" cy="20%" r="80%">
          <stop offset="0%"   stopColor="#2ea6dc" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#071f2e" stopOpacity="0" />
        </radialGradient>
        <filter id="glowb">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="url(#wgb)" strokeWidth="0.7" opacity="0.5" filter="url(#glowb)" fill="none">
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
        <line x1="0"    y1="0" x2="400"  y2="700" strokeWidth="0.4" opacity="0.2" />
        <line x1="1440" y1="0" x2="1040" y2="700" strokeWidth="0.4" opacity="0.2" />
        <line x1="520" y1="300" x2="920"  y2="300" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" />
        <line x1="520" y1="300" x2="300"  y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="520" y1="300" x2="460"  y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="520" y1="300" x2="620"  y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="780"  y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="980"  y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="920" y1="300" x2="1140" y2="560" stroke="#2ea6dc" strokeWidth="0.8" opacity="0.5" />
        <line x1="720" y1="0"   x2="520"  y2="300" stroke="#2ea6dc" strokeWidth="1"   opacity="0.6" />
        <line x1="720" y1="0"   x2="920"  y2="300" stroke="#2ea6dc" strokeWidth="1"   opacity="0.6" />
        <circle cx="720" cy="0"    r="5" fill="#2ea6dc" opacity="0.9" />
        <circle cx="50"  cy="200"  r="3" fill="#2ea6dc" opacity="0.5" />
        <circle cx="1390" cy="200" r="3" fill="#2ea6dc" opacity="0.5" />
        <circle cx="80"  cy="420"  r="3" fill="#69cff6" opacity="0.5" />
        <circle cx="1360" cy="420" r="3" fill="#69cff6" opacity="0.5" />
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

  const avatarColors = {
    A: ["#2ea6dc", "#071f2e"],
    S: ["#f59e0b", "#071f2e"],
    O: ["#69cff6", "#071f2e"],
    L: ["#0f5c85", "#040404"],
    K: ["#81c8e4", "#071f2e"],
    N: ["#214b5f", "#040404"],
    Y: ["#2ea6dc", "#040404"],
  };
  const [c1, c2] = avatarColors[member.initials] || ["#2ea6dc", "#071f2e"];

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex flex-col items-center relative cursor-pointer">

      {/* Tooltip */}
      <div className={`absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2
                       bg-grv-black/98 border border-grv-sky/20
                       px-3 py-2.5 z-20 pointer-events-none transition-all duration-300 whitespace-nowrap
                       font-mono text-[0.65rem] text-grv-text/70 leading-relaxed
                       ${hov ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        style={{ minWidth: 175 }}>
        {member.info.map((l, i) => <div key={i}>{l}</div>)}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-solid"
          style={{ borderColor: "rgba(46,166,220,0.25) transparent transparent transparent" }} />
      </div>

      {/* Card */}
      <div className={`flex flex-col items-center relative overflow-hidden transition-all duration-400
                       bg-grv-dark/95 border
                       ${isLarge ? "w-40 px-4 pt-6 pb-4" : "w-32 px-3 pt-4 pb-3"}
                       ${hov ? "-translate-y-2 shadow-glow-sky" : ""}
                       ${isLarge ? "border-grv-sky/40" : "border-grv-sky/15"}`}>
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${isLarge ? "#f59e0b" : "#2ea6dc"},transparent)` }} />

        {/* Avatar */}
        <div className={`rounded-full flex items-center justify-center font-orbitron font-black text-white mb-3
                         border-2 transition-all duration-300
                         ${isLarge ? "w-20 h-20 text-2xl" : "w-16 h-16 text-xl"}
                         ${isLarge ? "border-yellow-400/50" : "border-grv-sky/30"}`}
          style={{
            background: `linear-gradient(135deg,${c1},${c2})`,
            boxShadow: isLarge ? "0 0 25px rgba(46,166,220,0.2)" : "none",
          }}>
          {member.img ? (
            <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            member.initials
          )}
        </div>

        <div className={`font-cairo font-bold text-grv-text text-center mb-1
                         ${isLarge ? "text-sm" : "text-xs"}`}>
          {member.name}
        </div>
        <div className={`font-mono uppercase tracking-wider text-center
                         ${isLarge ? "text-[0.6rem] text-yellow-400" : "text-[0.55rem] text-grv-sky"}`}>
          {member.role}
        </div>

      </div>
    </div>
  );
}

export function HighBoard() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="high-board"
      className="relative bg-grv-black px-[5vw] pt-24 pb-32 overflow-hidden">
      <SpiderWeb />

      <div ref={ref}
        className={`relative z-[5] transition-all duration-700
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div className="section-label">// The High Board</div>
        <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight mb-1">
          Leadership <span className="text-grv-sky text-glow">Structure</span>
        </h2>
        <p className="font-mono text-[0.72rem] text-grv-text/35 tracking-widest mb-14">
          The minds behind GRV
        </p>

        {/* Founders */}
        <div className="flex justify-center gap-24 mb-16 flex-wrap relative z-[5]">
          {FOUNDERS.map((f, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <MemberCard member={f} size="large" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12 relative z-[5]">
          <div className="w-[30%] h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(46,166,220,0.35))" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-grv-sky mx-4 shadow-glow-sky animate-pulse-slow" />
          <div className="w-[30%] h-px"
            style={{ background: "linear-gradient(90deg,rgba(46,166,220,0.35),transparent)" }} />
        </div>

        {/* Members */}
        <div className="flex justify-center gap-6 flex-wrap relative z-[5]">
          {MEMBERS.map((m, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <MemberCard member={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
