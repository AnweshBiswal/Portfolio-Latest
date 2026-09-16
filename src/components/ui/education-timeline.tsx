"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  number: string;
  title: string;
  subtitle: string;
  institution: string;
  date: string;
  content?: React.ReactNode;
}

export const EducationTimeline = () => {
  const data: TimelineEntry[] = [
    {
      number: "01",
      title: "B.TECH",
      subtitle: "Computer Science & Engineering\nArtificial Intelligence & Machine Learning",
      institution: "GIET University, Gunupur",
      date: "2025 — Present",
    },
    {
      number: "02",
      title: "POST-MATRICULATION",
      subtitle: "",
      institution: "V.S. Vidyalaya, HAL Sunabeda-2",
      date: "2024–25",
    },
    {
      number: "03",
      title: "MATRICULATION",
      subtitle: "",
      institution: "V.S. Vidyalaya, HAL Sunabeda-2",
      date: "Completed 2023",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="education"
      className="w-full bg-muted/30 font-sans md:px-10 border-t border-border py-20 md:py-32 min-h-[100dvh] flex flex-col justify-center"
      ref={containerRef}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="space-y-1 text-left mb-20">
          <span className="text-[11px] font-bold tracking-[0.4em] text-foreground/50 uppercase">
            Academic Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground uppercase">
            Education
          </h2>
        </div>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10 group"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[var(--text-primary)] border border-foreground/20 p-2" />
              </div>
              <h3 className="hidden md:block text-5xl md:pl-20 font-bold text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500 font-mono tracking-widest">
                {item.number}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full flex flex-col">
              <h3 className="md:hidden block text-4xl mb-4 text-left font-bold text-foreground/30 font-mono tracking-widest">
                {item.number}
              </h3>
              
              <div className="flex flex-col space-y-4 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                <h4 className={`font-semibold tracking-wide uppercase text-foreground ${index === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                  {item.title}
                </h4>
                
                {item.subtitle && (
                  <div className={`text-foreground/80 font-light whitespace-pre-line ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {item.subtitle}
                  </div>
                )}
                
                <div className={`uppercase tracking-widest text-foreground/50 font-mono ${index === 0 ? 'text-sm mt-8' : 'text-xs mt-4'}`}>
                  <span className="block mb-2 text-foreground/70 font-sans tracking-normal font-medium">{item.institution}</span>
                  {item.date}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[1px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-foreground/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[var(--text-primary)]/50 via-[var(--text-primary)] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
