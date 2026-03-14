import { useState } from "react";
import { useInView } from "../hooks";
import { COURSES } from "../data";

function CourseCard({ course, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`card-base card-top-line p-6 cursor-pointer
                  transition-all duration-400
                  ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  ${hov ? "border-grv-sky/40 -translate-y-2 shadow-glow-sky" : ""}`}
      style={{ transitionDelay: delay }}>

      <div className="text-3xl mb-4">{course.icon}</div>
      <div className={`font-mono text-[0.58rem] uppercase tracking-[3px] text-grv-sky mb-1`}>
        {course.level}
      </div>
      <div className="font-orbitron text-sm font-bold text-grv-text mb-3">{course.name}</div>
      <div className="text-grv-text/50 text-sm leading-relaxed mb-5">{course.desc}</div>
      <div className="flex justify-between font-mono text-[0.62rem] text-grv-text/35
                      border-t border-grv-sky/10 pt-3">
        <span>{course.weeks}</span>
        <span>Next: <span className="text-grv-sky">{course.next}</span></span>
      </div>
    </div>
  );
}

export function Courses() {
  const [ref, inView] = useInView();

  return (
    <section id="courses" className="px-[5vw] py-24 bg-grv-black">
      <div ref={ref}
        className={`text-center mb-14 transition-all duration-700
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex justify-center items-center gap-3 font-mono text-[0.65rem]
                        uppercase tracking-[5px] text-grv-sky mb-2">
          // What We Offer
        </div>
        <h2 className="font-orbitron text-3xl md:text-4xl font-black leading-tight">
          Courses Built<br />
          <span className="text-grv-sky text-glow">for the Real World</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((c, i) => (
          <CourseCard key={c.name} course={c} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
