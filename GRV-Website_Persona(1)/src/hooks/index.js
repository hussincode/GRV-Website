import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useCounter(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let c = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const id = setInterval(() => {
      c += step;
      if (c >= target) { setVal(target); clearInterval(id); }
      else setVal(c);
    }, 25);
    return () => clearInterval(id);
  }, [active, target]);
  return val;
}

export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setPos({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}
