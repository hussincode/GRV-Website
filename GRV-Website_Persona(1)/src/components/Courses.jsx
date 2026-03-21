import { useState, useRef, useEffect } from "react";
import { useInView } from "../hooks";
import { CourseDetail } from "./CourseDetail";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))));
  const g = Math.max(0, Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 - percent))));
  const b = Math.max(0, Math.min(255, Math.floor((num & 0xff) * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const COURSES = [
  { id: "webdev", icon: "⚡", name: "Full-Stack Web Dev", color: "#2ea6dc", weeks: "12 weeks", level: "Beginner → Pro",
    files: [{ icon: "🌐", name: "HTML & CSS", desc: "Structure & styling" }, { icon: "⚙️", name: "JavaScript", desc: "Logic & interactivity" }, { icon: "⚛️", name: "React", desc: "Frontend framework" }, { icon: "🛢️", name: "Node.js", desc: "Backend & APIs" }, { icon: "🗄️", name: "Databases", desc: "SQL & MongoDB" }, { icon: "🚀", name: "Deploy", desc: "CI/CD & hosting" }] },
  { id: "ai", icon: "🤖", name: "AI & Machine Learning", color: "#69cff6", weeks: "10 weeks", level: "Intermediate",
    files: [{ icon: "🐍", name: "Python", desc: "Core language" }, { icon: "💬", name: "Prompting", desc: "Prompt engineering" }, { icon: "🧠", name: "Neural Nets", desc: "Deep learning basics" }, { icon: "📊", name: "Data Prep", desc: "Cleaning & EDA" }, { icon: "🏋️", name: "Training", desc: "Model training" }, { icon: "📦", name: "Deploy ML", desc: "Production models" }] },
  { id: "cyber", icon: "🛡️", name: "Cybersecurity", color: "#0f5c85", weeks: "8 weeks", level: "All Levels",
    files: [{ icon: "🔍", name: "OSINT", desc: "Recon techniques" }, { icon: "🕸️", name: "Networking", desc: "TCP/IP & protocols" }, { icon: "💣", name: "Pen Testing", desc: "Ethical hacking" }, { icon: "🔐", name: "Cryptography", desc: "Encryption basics" }, { icon: "🚩", name: "CTF", desc: "Capture the flag" }, { icon: "🛡️", name: "Defense", desc: "Blue team ops" }] },
  { id: "mobile", icon: "📱", name: "Mobile Dev", color: "#214b5f", weeks: "8 weeks", level: "Intermediate",
    files: [{ icon: "⚛️", name: "React Native", desc: "Cross-platform" }, { icon: "🐦", name: "Flutter", desc: "Dart & widgets" }, { icon: "📐", name: "UI Design", desc: "Mobile-first UX" }, { icon: "🔔", name: "Push Notifs", desc: "Engagement tools" }, { icon: "📲", name: "App Store", desc: "Publish & release" }, { icon: "🧪", name: "Testing", desc: "QA & automation" }] },
  { id: "cloud", icon: "☁️", name: "Cloud & DevOps", color: "#81c8e4", weeks: "6 weeks", level: "Advanced",
    files: [{ icon: "☁️", name: "AWS", desc: "Cloud services" }, { icon: "🐳", name: "Docker", desc: "Containers" }, { icon: "⚓", name: "Kubernetes", desc: "Orchestration" }, { icon: "🔄", name: "CI/CD", desc: "Pipelines" }, { icon: "📜", name: "IaC", desc: "Terraform" }, { icon: "📈", name: "Monitoring", desc: "Logs & alerts" }] },
  { id: "uiux", icon: "🎨", name: "UI/UX Design", color: "#2ea6dc", weeks: "6 weeks", level: "Beginner",
    files: [{ icon: "🎨", name: "Figma", desc: "Design tool" }, { icon: "🧩", name: "Components", desc: "Design systems" }, { icon: "📐", name: "Typography", desc: "Fonts & hierarchy" }, { icon: "🎭", name: "Prototyping", desc: "Interactive flows" }, { icon: "🔬", name: "User Testing", desc: "Feedback loops" }, { icon: "🌈", name: "Color Theory", desc: "Palettes & contrast" }] },
];

const INITIAL_POSITIONS = [
  { x: 60,  y: 60  }, { x: 260, y: 60  }, { x: 460, y: 60  },
  { x: 660, y: 60  }, { x: 60,  y: 280 }, { x: 260, y: 280 },
];

function FilePaper({ file, index, open, offset, onMouseMove, onMouseLeave }) {
  const positions = [
    { x: "-135%", y: "-75%",  rotate: "-18deg" },
    { x: "35%",   y: "-75%",  rotate: "18deg"  },
    { x: "-50%",  y: "-110%", rotate: "4deg"   },
  ];
  const pos = positions[index] || positions[0];
  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ position: "absolute", zIndex: 20, bottom: "10%", left: "50%", width: index === 0 ? "70%" : index === 1 ? "80%" : "90%", height: "80%", borderRadius: 10, background: index === 0 ? "#c8dfe8" : index === 1 ? "#d8ecf4" : "#eaf6fb", transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", transform: open ? `translate(${pos.x}, ${pos.y}) rotate(${pos.rotate}) translate(${offset.x}px, ${offset.y}px)` : `translateX(-50%) translateY(${index === 0 ? "10%" : index === 1 ? "5%" : "0%"})`, cursor: open ? "pointer" : "default", overflow: "hidden", border: "1px solid rgba(46,166,220,0.15)" }}>
      <div style={{ padding: "8px 10px", opacity: open ? 1 : 0, transition: "opacity 0.2s ease 0.2s", display: "flex", flexDirection: "column", gap: 4, height: "100%" }}>
        <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>{file.icon}</div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.55rem", fontWeight: 700, color: "#071f2e", lineHeight: 1.2 }}>{file.name}</div>
        <div style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.55rem", color: "#214b5f", lineHeight: 1.3 }}>{file.desc}</div>
      </div>
    </div>
  );
}

function DraggableFolder({ course, initialPos, zIndex, onDragStart, onOpenDetail }) {
  const [pos, setPos]           = useState(initialPos);
  const [open, setOpen]         = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offsets, setOffsets]   = useState([{x:0,y:0},{x:0,y:0},{x:0,y:0}]);
  const [activeFiles, setActiveFiles] = useState(0);
  const [hovered, setHovered]   = useState(false);
  const dragRef = useRef({ mx:0, my:0, px:0, py:0 });
  const movedRef = useRef(false);
  const dark = darkenColor(course.color, 0.12);
  const visibleFiles = course.files.slice(activeFiles * 3, activeFiles * 3 + 3);

  const onMouseDown = (e) => {
    e.preventDefault();
    onDragStart();
    setDragging(true);
    movedRef.current = false;
    dragRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const dx = e.clientX - dragRef.current.mx;
      const dy = e.clientY - dragRef.current.my;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
      setPos({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging]);

  const handleClick = (e) => {
    if (movedRef.current) return;
    setOpen(p => !p);
    if (open) setOffsets([{x:0,y:0},{x:0,y:0},{x:0,y:0}]);
  };

  const handleDoubleClick = (e) => {
    if (movedRef.current) return;
    onOpenDetail(course.id);
  };

  const handleMouseMove = (e, i) => {
    if (!open) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOffsets(prev => { const n=[...prev]; n[i]={ x:(e.clientX-(r.left+r.width/2))*0.15, y:(e.clientY-(r.top+r.height/2))*0.15 }; return n; });
  };

  return (
    <div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex, userSelect: "none", cursor: dragging ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover hint */}
      {hovered && !dragging && (
        <div style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.48rem", color: course.color, letterSpacing: "1.5px", whiteSpace: "nowrap", background: "rgba(4,12,20,0.9)", padding: "3px 8px", borderRadius: 4, border: `1px solid ${course.color}44`, pointerEvents: "none" }}>
          Click to open · Double-click for details
        </div>
      )}

      {/* Folder */}
      <div style={{ position: "relative", width: 130, height: 105, transform: open ? "translateY(-10px)" : "translateY(0)", transition: dragging ? "none" : "transform 0.3s ease, margin-top 0.3s ease", marginTop: open ? 90 : 0 }}>
        {/* Back */}
        <div style={{ position: "absolute", inset: 0, background: dark, borderRadius: "0 12px 12px 12px", zIndex: 0 }}>
          <span style={{ position: "absolute", bottom: "100%", left: 0, width: 38, height: 13, background: dark, borderRadius: "6px 6px 0 0", display: "block" }} />
        </div>
        {/* Papers */}
        {visibleFiles.map((file, i) => (
          <FilePaper key={i} file={file} index={i} open={open} offset={offsets[i]}
            onMouseMove={e => handleMouseMove(e, i)}
            onMouseLeave={() => setOffsets(prev => { const n=[...prev]; n[i]={x:0,y:0}; return n; })} />
        ))}
        {/* Flaps */}
        <div style={{ position: "absolute", inset: 0, zIndex: 30, background: course.color, borderRadius: "5px 12px 12px 12px", transformOrigin: "bottom center", transition: "transform 0.35s ease", transform: open ? "skew(15deg) scaleY(0.6)" : "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 30, background: course.color, borderRadius: "5px 12px 12px 12px", transformOrigin: "bottom center", transition: "transform 0.35s ease", transform: open ? "skew(-15deg) scaleY(0.6)" : "none" }} />
        {/* Icon */}
        <div style={{ position: "absolute", inset: 0, zIndex: 31, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", pointerEvents: "none", transform: open ? "scaleY(0.6)" : "none", transition: "transform 0.35s ease", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}>
          {course.icon}
        </div>
      </div>

      {/* Dot nav */}
      {open && course.files.length > 3 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }} onClick={e => e.stopPropagation()}>
          {Array.from({ length: Math.ceil(course.files.length / 3) }).map((_, i) => (
            <div key={i} onClick={() => setActiveFiles(i)} style={{ width: activeFiles === i ? 18 : 7, height: 7, borderRadius: 4, background: activeFiles === i ? course.color : "rgba(46,166,220,0.25)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      )}

      {/* Label */}
      <div style={{ textAlign: "center", marginTop: 10, maxWidth: 140 }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: open ? course.color : "#f5f5f5", letterSpacing: "0.5px", marginBottom: 3, transition: "color 0.3s", textShadow: open ? `0 0 12px ${course.color}88` : "none" }}>{course.name}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "rgba(46,166,220,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}>{course.weeks}</div>
      </div>
    </div>
  );
}

export function Courses() {
  const [ref, inView]   = useInView();
  const [zOrders, setZOrders] = useState(COURSES.map((_, i) => i + 1));
  const [detailId, setDetailId] = useState(null);
  const maxZ = useRef(COURSES.length);

  const bringToFront = (index) => {
    maxZ.current += 1;
    setZOrders(prev => { const n = [...prev]; n[index] = maxZ.current; return n; });
  };

  return (
    <>
      {/* Course detail overlay */}
      {detailId && <CourseDetail courseId={detailId} onClose={() => setDetailId(null)} />}

      <section id="courses" style={{ padding: "6rem 5vw 8rem", background: "#040404" }}>

        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "5px", color: "#2ea6dc", textTransform: "uppercase", marginBottom: "0.75rem" }}>// What We Offer</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, color: "#f5f5f5" }}>
            Courses Built<br />
            <span style={{ color: "#2ea6dc", textShadow: "0 0 20px rgba(46,166,220,0.4)" }}>for the Real World</span>
          </h2>
          <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.85rem", color: "rgba(245,245,245,0.35)", marginTop: "0.75rem" }}>
            Drag folders freely · Click to open · Double-click for full course details
          </p>
        </div>

        {/* Desktop window */}
        <div style={{ position: "relative", background: "linear-gradient(160deg,#071f2e 0%,#040c14 60%,#040404 100%)", border: "1px solid rgba(46,166,220,0.12)", borderRadius: 16, boxShadow: "0 0 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(46,166,220,0.08)", overflow: "hidden" }}>

          {/* Title bar */}
          <div style={{ height: 36, background: "rgba(15,92,133,0.2)", borderBottom: "1px solid rgba(46,166,220,0.1)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, flexShrink: 0 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            <div style={{ marginLeft: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(46,166,220,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}>GRV OS — /courses</div>
            <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(46,166,220,0.3)", letterSpacing: "2px" }}>{COURSES.length} items</div>
          </div>

          {/* Canvas */}
          <div style={{ position: "relative", height: 600, overflow: "hidden", backgroundImage: "radial-gradient(circle at 20% 30%, rgba(46,166,220,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(15,92,133,0.06) 0%, transparent 50%), linear-gradient(rgba(46,166,220,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(46,166,220,0.025) 1px, transparent 1px)", backgroundSize: "auto, auto, 40px 40px, 40px 40px" }}>
            {COURSES.map((c, i) => (
              <DraggableFolder key={c.id} course={c} initialPos={INITIAL_POSITIONS[i]} zIndex={zOrders[i]}
                onDragStart={() => bringToFront(i)}
                onOpenDetail={(id) => setDetailId(id)} />
            ))}
          </div>

          {/* Status bar */}
          <div style={{ height: 28, background: "rgba(15,92,133,0.12)", borderTop: "1px solid rgba(46,166,220,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "rgba(46,166,220,0.35)", letterSpacing: "2px" }}>{COURSES.length} courses · {COURSES.reduce((a,c) => a + c.files.length, 0)} topics</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "rgba(46,166,220,0.35)", letterSpacing: "2px" }}>GRV OS v1.0</div>
          </div>
        </div>
      </section>
    </>
  );
}
