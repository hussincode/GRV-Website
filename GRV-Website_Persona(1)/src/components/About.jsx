import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks";

/* ── BlurText component ── */
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => { keyframes[k] = [from[k], ...steps.map(s => s[k])]; });
  return keyframes;
};

function BlurText({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.2,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  stepDuration = 0.4,
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(() =>
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -40 }
      : { filter: "blur(10px)", opacity: 0, y:  40 },
    [direction]
  );

  const defaultTo = useMemo(() => [
    { filter: "blur(5px)",  opacity: 0.5, y: direction === "top" ? 5 : -5 },
    { filter: "blur(0px)",  opacity: 1,   y: 0 },
  ], [direction]);

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots  = animationTo   ?? defaultTo;
  const stepCount    = toSnapshots.length + 1;
  const times        = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={`blur-text flex flex-wrap ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={fromSnapshot}
          animate={inView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot}
          transition={{
            duration: stepDuration * toSnapshots.length,
            times,
            delay: (index * delay) / 1000,
            ease: "easeOut",
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
}

/* ── BlurWords — same engine, but wraps in a span for headings ── */
function BlurWords({ text = "", delay = 100, className = "", direction = "bottom", stepDuration = 0.45 }) {
  const words = text.split(" ");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const from = { filter: "blur(12px)", opacity: 0, y: direction === "top" ? -30 : 30 };
  const to   = [
    { filter: "blur(6px)",  opacity: 0.5, y: direction === "top" ? 8 : -8 },
    { filter: "blur(0px)",  opacity: 1,   y: 0 },
  ];

  return (
    <span ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={from}
          animate={inView ? buildKeyframes(from, to) : from}
          transition={{
            duration: stepDuration * to.length,
            times: [0, 0.5, 1],
            delay: (i * delay) / 1000,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Pill with blur-in animation ── */
function BlurPill({ text, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, filter: "blur(8px)", scale: 0.85, y: 10 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1.5
                 border border-grv-sky/25 text-grv-sky bg-grv-sky/5
                 cursor-default"
      whileHover={{ scale: 1.08, borderColor: "rgba(46,166,220,0.6)", backgroundColor: "rgba(46,166,220,0.1)" }}
    >
      {text}
    </motion.span>
  );
}

const PILLS = ["Web Dev","AI & ML","Cybersecurity","Mobile Dev","Data Science","Cloud","UI/UX"];

/* ── About Section ── */
export function About() {
  const [ref, inView] = useInView();

  return (
    <section className="px-[5vw] py-24 grid md:grid-cols-2 gap-16 items-center bg-grv-dark/40">

      {/* Animated hex visual */}
      <motion.div
        className="relative h-72 md:h-80"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {[
          { size: 180, color: "rgba(15,92,133,0.5)",   top: 40,  left: 40,  delay: "0s"   },
          { size: 120, color: "rgba(46,166,220,0.4)",  top: 10,  left: 180, delay: "0.5s" },
          { size: 150, color: "rgba(105,207,246,0.3)", top: 160, left: 140, delay: "1s"   },
        ].map((h, i) => (
          <motion.div
            key={i}
            className="absolute clip-hex"
            style={{
              width: h.size, height: h.size * 1.1,
              background: `linear-gradient(135deg,${h.color},transparent)`,
              border: "1px solid rgba(46,166,220,0.2)",
              top: h.top, left: h.left,
            }}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.18, ease: "easeOut" }}
            animate={{
              y: [0, -14, 0],
              transition: { duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 40% 50%,rgba(15,92,133,0.2),transparent 65%)" }}
        />
      </motion.div>

      {/* Text */}
      <div ref={ref} className="flex flex-col gap-0">

        {/* Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          // Who We Are
        </motion.div>

        {/* Heading with blur-word effect */}
        <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight mb-6">
          <BlurWords
            text="Built by"
            delay={100}
            direction="bottom"
            className="text-grv-text"
          />
          {" "}
          <BlurWords
            text="Builders,"
            delay={100}
            direction="bottom"
            className="text-grv-sky"
            stepDuration={0.5}
          />
          <br />
          <BlurWords
            text="for Builders."
            delay={100}
            direction="bottom"
            className="text-grv-text"
            stepDuration={0.5}
          />
        </h2>

        {/* Paragraph 1 */}
        <BlurText
          text="GRV is a tech-first educational collective. We don't just teach code — we build careers, mindsets, and the next wave of digital innovators."
          delay={35}
          direction="bottom"
          threshold={0.3}
          stepDuration={0.35}
          className="text-grv-text/55 leading-relaxed mb-4 text-sm md:text-base"
        />

        {/* Paragraph 2 */}
        <BlurText
          text="Whether you're a complete beginner or leveling up your stack, our structured tracks and hands-on projects will get you there — fast."
          delay={30}
          direction="bottom"
          threshold={0.3}
          stepDuration={0.35}
          className="text-grv-text/55 leading-relaxed mb-8 text-sm md:text-base"
        />

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {PILLS.map((p, i) => (
            <BlurPill key={p} text={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}