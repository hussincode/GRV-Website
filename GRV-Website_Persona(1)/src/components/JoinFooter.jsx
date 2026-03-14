import { useState } from "react";
import { useInView } from "../hooks";

export function Join() {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState("");

  return (
    <section id="join" className="px-[5vw] py-24 bg-grv-dark/40 text-center">
      <div ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div className="flex justify-center items-center gap-3 font-mono text-[0.65rem]
                        uppercase tracking-[5px] text-grv-sky mb-2">
          // Ready to Start?
        </div>

        <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight my-3">
          Join the <span className="text-grv-sky text-glow">GRV</span> Movement
        </h2>

        <p className="text-grv-text/50 leading-relaxed mb-8 text-sm md:text-base">
          Drop your email and we'll reach out with the next available cohort.<br />
          No fluff — just tech.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="font-mono text-xs tracking-wide px-5 py-3 w-64
                       bg-grv-sky/5 border border-grv-sky/20 text-grv-text
                       outline-none focus:border-grv-sky clip-skew placeholder-grv-text/30
                       transition-colors duration-300"
          />
          <button className="btn-primary">Get Access</button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-grv-black px-[5vw] py-8 flex justify-between items-center flex-wrap gap-4
                       border-t border-grv-sky/[0.06]">
      <span className="grv-logo-sm text-xl tracking-widest">GRV</span>
      <div className="flex gap-6">
        {["Twitter", "LinkedIn", "Discord", "GitHub"].map(l => (
          <a key={l} href="#"
            className="font-mono text-[0.62rem] uppercase tracking-widest
                       text-grv-text/35 hover:text-grv-sky transition-colors duration-300">
            {l}
          </a>
        ))}
      </div>
      <div className="font-mono text-[0.6rem] text-grv-text/20 tracking-widest">
        © 2025 GRV Tech Team
      </div>
    </footer>
  );
}
