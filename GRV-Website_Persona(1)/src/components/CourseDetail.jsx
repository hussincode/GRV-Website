
import { useState, useRef } from "react";

const COURSE_DETAILS = {
  webdev: {
    id: "webdev", icon: "⚡", name: "Full-Stack Web Dev", color: "#2ea6dc",
    weeks: "12 weeks", level: "Beginner → Pro", students: 180, rating: 4.9,
    videoThumb: null,
    videoUrl: "",
    tagline: "From zero to shipping real products — end to end.",
    about: `This is GRV's flagship course. You'll go from writing your first line of HTML to deploying a full production web app with a backend, database, and live domain. No shortcuts — every concept is taught the way real developers use it on the job.`,
    whatYouLearn: [
      "Build pixel-perfect UIs with HTML, CSS & Tailwind",
      "Master JavaScript from fundamentals to async/await",
      "Create dynamic SPAs with React & state management",
      "Build REST APIs with Node.js and Express",
      "Design and query databases with SQL & MongoDB",
      "Deploy to production with CI/CD pipelines",
      "Authenticate users with JWT & OAuth",
      "Write clean, maintainable, professional code",
    ],
    benefits: [
      { icon: "💼", title: "Job Ready", desc: "Graduate with a portfolio of 3 real projects that employers actually want to see." },
      { icon: "⚡", title: "Fast Track", desc: "12 weeks of focused learning replaces 2 years of scattered tutorials." },
      { icon: "🤝", title: "1-on-1 Mentoring", desc: "Weekly sessions with a senior developer to review your code and give real feedback." },
      { icon: "🏆", title: "Certificate", desc: "GRV-verified certificate recognised by our hiring partners." },
    ],
    whoIsItFor: [
      "Complete beginners with zero coding experience",
      "Self-taught developers wanting to fill gaps",
      "Students looking to land their first dev job",
      "Anyone who started a bootcamp and quit halfway",
    ],
    curriculum: [
      { week: "Weeks 1–2",  title: "Web Foundations",    topics: ["HTML5 semantics", "CSS layouts & Flexbox", "Grid & responsive design"] },
      { week: "Weeks 3–4",  title: "JavaScript Core",    topics: ["Variables, loops, functions", "DOM manipulation", "Events & async JS"] },
      { week: "Weeks 5–6",  title: "React & Frontend",   topics: ["Components & props", "State & hooks", "React Router & forms"] },
      { week: "Weeks 7–8",  title: "Backend with Node",  topics: ["Node.js & Express", "REST API design", "Auth with JWT"] },
      { week: "Weeks 9–10", title: "Databases",          topics: ["SQL & PostgreSQL", "MongoDB & Mongoose", "Database design"] },
      { week: "Weeks 11–12",title: "Deploy & Ship",      topics: ["Docker basics", "CI/CD with GitHub Actions", "Deploy to AWS/Vercel"] },
    ],
  },
  ai: {
    id: "ai", icon: "🤖", name: "AI & Machine Learning", color: "#69cff6",
    weeks: "10 weeks", level: "Intermediate", students: 120, rating: 4.8,
    videoThumb: null, videoUrl: "",
    tagline: "Build, train and ship intelligent systems.",
    about: `Go beyond using AI tools — learn how to build them. This course takes you from Python fundamentals through to training neural networks and deploying ML models in production. Theory and practice in equal measure.`,
    whatYouLearn: [
      "Python for data science and ML",
      "Prompt engineering for LLMs",
      "Data cleaning, EDA and feature engineering",
      "Train and evaluate ML models with scikit-learn",
      "Build neural networks with TensorFlow & Keras",
      "Fine-tune pre-trained transformer models",
      "Package and deploy ML APIs",
      "Monitor model performance in production",
    ],
    benefits: [
      { icon: "🧠", title: "Real AI Skills", desc: "Learn what actually powers ChatGPT, image generators, and recommendation systems." },
      { icon: "📊", title: "Data Fluency", desc: "Read, clean and visualise any dataset with confidence." },
      { icon: "🚀", title: "Ship Models", desc: "Deploy a working ML API that anyone can call — not just a Jupyter notebook." },
      { icon: "🔬", title: "Research Ready", desc: "Understand papers and implement them — a skill almost no one teaches." },
    ],
    whoIsItFor: [
      "Developers who want to enter the AI space",
      "Data analysts levelling up to ML",
      "Students curious about how AI actually works",
      "Builders who want to add AI to their products",
    ],
    curriculum: [
      { week: "Weeks 1–2",  title: "Python & Data",       topics: ["Python for ML", "NumPy & Pandas", "Data visualisation"] },
      { week: "Weeks 3–4",  title: "ML Foundations",      topics: ["Supervised learning", "Model evaluation", "scikit-learn"] },
      { week: "Weeks 5–6",  title: "Deep Learning",       topics: ["Neural networks", "TensorFlow & Keras", "CNNs & RNNs"] },
      { week: "Weeks 7–8",  title: "LLMs & Prompting",    topics: ["Transformer architecture", "Fine-tuning", "Prompt engineering"] },
      { week: "Weeks 9–10", title: "Deploy & Monitor",    topics: ["FastAPI for ML", "Docker + cloud deploy", "Model monitoring"] },
    ],
  },
  cyber: {
    id: "cyber", icon: "🛡️", name: "Cybersecurity", color: "#0f5c85",
    weeks: "8 weeks", level: "All Levels", students: 95, rating: 4.9,
    videoThumb: null, videoUrl: "",
    tagline: "Think like an attacker. Defend like a pro.",
    about: `Cybersecurity is the fastest-growing field in tech. This course teaches you both sides — offensive (finding vulnerabilities) and defensive (stopping attacks). Hands-on labs, real CVEs, and CTF challenges included.`,
    whatYouLearn: [
      "TCP/IP networking fundamentals",
      "OSINT and passive reconnaissance",
      "Web app vulnerabilities (OWASP Top 10)",
      "Network scanning with Nmap and Metasploit",
      "Password attacks and credential dumping",
      "Cryptography and secure comms",
      "Blue team defense and incident response",
      "Compete and win CTF challenges",
    ],
    benefits: [
      { icon: "🔍", title: "Think Like a Hacker", desc: "Understanding attacks is the only way to build real defenses." },
      { icon: "🧪", title: "Lab Environment", desc: "Private virtual lab with real vulnerable systems to practice on legally." },
      { icon: "🚩", title: "CTF Competitions", desc: "Join GRV's internal CTFs and build a public hacking portfolio on HackTheBox." },
      { icon: "📜", title: "Cert Prep", desc: "Aligned with CEH and CompTIA Security+ exam objectives." },
    ],
    whoIsItFor: [
      "IT professionals wanting to move into security",
      "Developers who want to write secure code",
      "Students aiming for SOC or pen test roles",
      "Anyone curious about how systems get hacked",
    ],
    curriculum: [
      { week: "Weeks 1–2", title: "Networking & Linux",   topics: ["TCP/IP & protocols", "Linux command line", "Wireshark basics"] },
      { week: "Weeks 3–4", title: "Recon & OSINT",        topics: ["Passive recon", "Google dorking", "Shodan & OSINT tools"] },
      { week: "Weeks 5–6", title: "Exploitation",         topics: ["Web vulns (SQLi, XSS)", "Metasploit framework", "Privilege escalation"] },
      { week: "Weeks 7–8", title: "Defense & CTF",        topics: ["Incident response", "Log analysis", "CTF challenge sprint"] },
    ],
  },
};

function VideoPlayer({ color, courseId }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div style={{
      position: "relative", width: "100%", paddingTop: "56.25%",
      background: "#040c14", borderRadius: 12, overflow: "hidden",
      border: `1px solid ${color}33`,
      boxShadow: `0 0 40px ${color}22`,
    }}>
      {/* Video element */}
      <video
        ref={videoRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Custom play overlay */}
      {!playing && (
        <div
          onClick={() => { videoRef.current?.play(); setPlaying(true); }}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(135deg, rgba(7,31,46,0.95), rgba(4,4,4,0.9))",
          }}
        >
          {/* Decorative grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(46,166,220,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(46,166,220,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          {/* Glow orb behind button */}
          <div style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, ${color}22, transparent 70%)`,
            filter: "blur(30px)",
          }} />

          {/* Play button */}
          <div
            style={{
              position: "relative", zIndex: 2,
              width: 72, height: 72, borderRadius: "50%",
              background: `linear-gradient(135deg, ${color}, ${darkenColor(color, 0.25)})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 30px ${color}66, 0 0 60px ${color}33`,
              marginBottom: 16,
              transition: "transform 0.2s ease",
            }}
          >
            {/* Triangle play icon */}
            <div style={{
              width: 0, height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft: "20px solid #fff",
              marginLeft: 4,
            }} />
          </div>

          <div style={{
            position: "relative", zIndex: 2,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.8rem", fontWeight: 700,
            color: "#f5f5f5", letterSpacing: "3px", textTransform: "uppercase",
            marginBottom: 6,
          }}>Watch Course Preview</div>
          <div style={{
            position: "relative", zIndex: 2,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem", color: `${color}99`,
            letterSpacing: "2px",
          }}>// add your video src to go live</div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ label, title, color }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem", letterSpacing: "4px",
        color: color, textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 10, marginBottom: 6,
      }}>
        <div style={{ width: 30, height: 1, background: color }} />
        {label}
      </div>
      <h3 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
        fontWeight: 800, color: "#f5f5f5", lineHeight: 1.2,
      }}>{title}</h3>
    </div>
  );
}

export function CourseDetail({ courseId, onClose }) {
  const course = COURSE_DETAILS[courseId];
  if (!course) return null;

  const c = course.color;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(4,4,4,0.96)",
      backdropFilter: "blur(8px)",
      overflowY: "auto",
      animation: "fadeIn 0.3s ease",
    }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(4,4,4,0.95)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${c}22`,
        display: "flex", alignItems: "center",
        padding: "0 5vw", height: 56, gap: 16,
      }}>
        <button onClick={onClose} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem", color: c,
          background: `${c}15`, border: `1px solid ${c}44`,
          padding: "6px 14px", cursor: "pointer",
          letterSpacing: "2px", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.2s",
        }}>← Back</button>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#f5f5f5", letterSpacing: 2 }}>
          {course.icon} {course.name}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: `${c}88`, letterSpacing: "2px" }}>
            ⭐ {course.rating} · {course.students} students
          </div>
          <button style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
            background: `linear-gradient(135deg, ${c}, ${darkenColor(c, 0.3)})`,
            color: "#071f2e", border: "none", padding: "8px 20px",
            fontWeight: 700, cursor: "pointer", letterSpacing: "2px",
            textTransform: "uppercase",
          }}>Enroll Now</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 5vw 6rem", animation: "slideUp 0.4s ease 0.1s both" }}>

        {/* Hero area */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
            color: c, letterSpacing: "3px", textTransform: "uppercase",
            background: `${c}12`, border: `1px solid ${c}33`,
            padding: "4px 12px", borderRadius: 2, marginBottom: 16,
          }}>
            <span>{course.level}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{course.weeks}</span>
          </div>

          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900, lineHeight: 1,
            color: "#f5f5f5", marginBottom: 12,
          }}>
            {course.icon} {course.name}
          </h1>
          <p style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "1.1rem", color: c,
            fontWeight: 600, letterSpacing: "0.5px",
          }}>{course.tagline}</p>
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

          {/* LEFT — video + about + curriculum */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

            {/* VIDEO */}
            <VideoPlayer color={c} courseId={courseId} />

            {/* About */}
            <div>
              <SectionTitle label="// About" title="What is this course?" color={c} />
              <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.95rem", color: "rgba(245,245,245,0.65)", lineHeight: 1.9 }}>
                {course.about}
              </p>
            </div>

            {/* Curriculum */}
            <div>
              <SectionTitle label="// Curriculum" title="What you'll go through" color={c} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {course.curriculum.map((week, i) => (
                  <CurriculumRow key={i} week={week} color={c} index={i} />
                ))}
              </div>
            </div>

            {/* Who is it for */}
            <div>
              <SectionTitle label="// Who is this for" title="This course is made for you if..." color={c} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {course.whoIsItFor.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, marginTop: 7, flexShrink: 0, boxShadow: `0 0 8px ${c}` }} />
                    <span style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.9rem", color: "rgba(245,245,245,0.65)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — sticky sidebar */}
          <div style={{ position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* What you learn */}
            <div style={{
              background: "linear-gradient(135deg, #071f2e, #040c14)",
              border: `1px solid ${c}22`,
              borderRadius: 12, padding: "1.5rem",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: c, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 1, background: c }} /> What you'll learn
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 3, flexShrink: 0,
                      background: `${c}22`, border: `1px solid ${c}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginTop: 2,
                    }}>
                      <div style={{ width: 5, height: 5, background: c, borderRadius: 1 }} />
                    </div>
                    <span style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.82rem", color: "rgba(245,245,245,0.7)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {course.benefits.map((b, i) => (
                <div key={i} style={{
                  background: "rgba(7,31,46,0.6)",
                  border: `1px solid ${c}18`,
                  borderRadius: 10, padding: "1rem 1.1rem",
                  display: "flex", gap: 12, alignItems: "flex-start",
                  transition: "border-color 0.3s",
                }}>
                  <div style={{ fontSize: "1.4rem", lineHeight: 1, flexShrink: 0 }}>{b.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#f5f5f5", marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.78rem", color: "rgba(245,245,245,0.55)", lineHeight: 1.5 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              width: "100%", padding: "1rem",
              background: `linear-gradient(135deg, ${c}, ${darkenColor(c, 0.3)})`,
              color: "#071f2e", border: "none", cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem",
              fontWeight: 900, letterSpacing: "3px", textTransform: "uppercase",
              borderRadius: 8,
              boxShadow: `0 8px 30px ${c}44`,
              transition: "all 0.3s",
            }}>Enroll in This Course →</button>

            <div style={{ textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "rgba(245,245,245,0.25)", letterSpacing: "1.5px" }}>
              {course.weeks} · {course.level} · {course.students} enrolled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurriculumRow({ week, color, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? color + "44" : "rgba(46,166,220,0.1)"}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.3s" }}>
      <div
        onClick={() => setOpen(p => !p)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", cursor: "pointer",
          background: open ? `${color}0f` : "rgba(7,31,46,0.4)",
          transition: "background 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
            color: color, letterSpacing: "2px", textTransform: "uppercase",
            background: `${color}18`, padding: "2px 8px", borderRadius: 3,
          }}>{week.week}</div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#f5f5f5" }}>{week.title}</div>
        </div>
        <div style={{ color, fontSize: "0.9rem", transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
      </div>
      {open && (
        <div style={{ padding: "12px 16px 14px", background: "rgba(4,12,20,0.6)", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {week.topics.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Cairo', sans-serif", fontSize: "0.78rem",
              color: "rgba(245,245,245,0.65)",
              background: "rgba(46,166,220,0.07)", border: "1px solid rgba(46,166,220,0.15)",
              padding: "3px 10px", borderRadius: 4,
            }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper needed inside this file too
function darkenColor(hex, percent) {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))));
  const g = Math.max(0, Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 - percent))));
  const b = Math.max(0, Math.min(255, Math.floor((num & 0xff) * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
