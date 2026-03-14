import { useScrolled } from "../hooks";

const NAV_LINKS = ["About", "Courses", "Timeline", "High Board", "Join"];

export function Scanline() {
  return (
    <div
      className="fixed left-0 right-0 h-0.5 z-[9999] pointer-events-none animate-scan"
      style={{
        top: 0,
        background: "linear-gradient(90deg,transparent,#2ea6dc,transparent)",
        opacity: 0.35,
      }}
    />
  );
}

export function Navbar() {
  const scrolled = useScrolled();
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-[5vw] py-4
                     bg-grv-black/88 backdrop-blur-xl border-b border-grv-sky/[0.07]
                     transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_40px_rgba(0,0,0,0.6)]" : ""}`}>

      {/* Logo */}
      <span className="grv-logo-sm text-2xl tracking-widest">GRV</span>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(l => (
          <a key={l}
            href={`#${l.toLowerCase().replace(" ", "-")}`}
            className="font-mono text-[0.7rem] uppercase tracking-[3px] text-grv-text/50
                       hover:text-grv-sky transition-colors duration-300">
            {l}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button className="btn-outline text-[0.7rem]">Enroll Now</button>
    </nav>
  );
}
