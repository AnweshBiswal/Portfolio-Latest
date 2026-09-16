import React, { useEffect, useMemo, useRef, useState } from "react";

const STYLE_ID = "bento3-animations";

const flows = [
  {
    id: "01",
    variant: "orbit",
    meta: "Background",
    title: "Who I Am",
    description:
      "Hello, I am Anwesh Biswal from Koraput, Odisha. I am a passionate and determined individual with proven leadership, adaptability, and consistency.",
    statLabel: "Focus",
    statValue: "AI & ML",
  },
  {
    id: "02",
    variant: "relay",
    meta: "Discipline",
    title: "Leadership & Dedication",
    description:
      "Recognized as the NCC Best Cadet in the Junior Division and awarded the Governor’s Gold Medal, I have demonstrated dedication and discipline beyond academics.",
    statLabel: "Role",
    statValue: "NCC Sergeant",
  },
  {
    id: "03",
    variant: "wave",
    meta: "Current",
    title: "Academic Journey",
    description:
      "Currently pursuing B.Tech in Computer Science (AI & ML) at GIET University Gunupur. Eager to apply my knowledge in real-world engineering projects.",
    statLabel: "Graduation",
    statValue: "2029",
  },
  {
    id: "04",
    variant: "spark",
    meta: "Future",
    title: "Professional Goals",
    description:
      "Actively seeking internship opportunities where I can contribute, learn, and grow as an AI and CS professional in dynamic environments.",
    statLabel: "Status",
    statValue: "Available",
  }
];

const metrics = [
  { label: "Core Focus", value: "AI / ML" },
  { label: "Experience", value: "Student" },
  { label: "Location", value: "Odisha, India" },
];

const palettes = {
  dark: {
    surface: "bg-transparent text-neutral-100",
    heading: "text-foreground",
    muted: "text-neutral-400",
    capsule: "bg-foreground/5 border-foreground/10 text-foreground/80",
    card: "bg-neutral-900/55",
    cardBorder: "border-foreground/10",
    metric: "bg-foreground/5 border-foreground/10 text-foreground/70",
    headingAccent: "bg-foreground/10",
    toggleSurface: "bg-foreground/10",
    toggle: "border-foreground/15 text-foreground",
    button: "border-foreground/15 text-foreground hover:border-foreground/40 hover:bg-foreground/10",
    gridColor: "rgba(255, 255, 255, 0.06)",
    overlay: "transparent",
    focusGlow: "rgba(255, 255, 255, 0.14)",
    iconStroke: "#f8fafc",
    iconTrail: "rgba(148, 163, 184, 0.55)",
  },
  light: {
    surface: "bg-transparent text-neutral-900",
    heading: "text-neutral-900",
    muted: "text-neutral-600",
    capsule: "bg-foreground/70 border-neutral-200 text-neutral-700",
    card: "bg-foreground/80",
    cardBorder: "border-neutral-200",
    metric: "bg-foreground border-neutral-200 text-neutral-600",
    headingAccent: "bg-neutral-900/10",
    toggleSurface: "bg-foreground",
    toggle: "border-neutral-300 text-neutral-900",
    button: "border-neutral-300 text-neutral-900 hover:border-neutral-500 hover:bg-neutral-900/5",
    gridColor: "rgba(17, 17, 17, 0.08)",
    overlay: "transparent",
    focusGlow: "rgba(15, 23, 42, 0.15)",
    iconStroke: "#111827",
    iconTrail: "rgba(30, 41, 59, 0.42)",
  },
};

const getRootTheme = () => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark"; // Default to dark for this portfolio
  }
  return "dark"; // Always force dark for this portfolio
};

function Bento3Section() {
  const [theme, setTheme] = useState(() => getRootTheme());
  const [introReady, setIntroReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes bento3-card-in {
        0% { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.97); filter: blur(12px); }
        60% { filter: blur(0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
      }
      @keyframes bento3-flare {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes bento3-dash {
        0% { transform: translateX(-25%); opacity: 0; }
        30% { opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translateX(25%); opacity: 0; }
      }
      @keyframes bento3-wave {
        0% { transform: translateX(-45%); }
        100% { transform: translateX(45%); }
      }
      @keyframes bento3-pulse {
        0% { transform: scale(0.8); opacity: 0.6; }
        70% { opacity: 0.05; }
        100% { transform: scale(1.35); opacity: 0; }
      }
      .bento3-root {
        padding-inline: 0;
      }
      .bento3-section {
        gap: clamp(3rem, 6vw, 5rem);
        padding-inline: clamp(1.25rem, 5vw, 3.75rem);
        width: min(100%, 72rem);
      }
      .bento3-grid {
        gap: clamp(1.25rem, 4vw, 2.5rem);
      }
      .bento3-metrics {
        gap: clamp(1rem, 3vw, 1.5rem);
        padding: clamp(1.25rem, 4vw, 2.5rem);
      }
      .bento3-footer {
        gap: clamp(1.15rem, 3.5vw, 2.4rem);
      }
      .bento3-hero-pill {
        flex-wrap: wrap;
      }
      .bento3-hero-pill span:last-child {
        flex-shrink: 0;
      }
      .bento3-card {
        opacity: 0;
        transform: translate3d(0, 32px, 0);
        filter: blur(14px);
        transition: border-color 400ms ease, background 400ms ease, padding 300ms ease;
        padding: clamp(1.2rem, 3vw, 2.4rem);
        border-radius: clamp(1.5rem, 4vw, 28px);
      }
      .bento3-card[data-visible="true"] {
        animation: bento3-card-in 760ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
        animation-delay: var(--bento3-delay, 0ms);
      }
      .bento3-icon {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: clamp(2.75rem, 6vw, 3.25rem);
        width: clamp(2.75rem, 6vw, 3.25rem);
        border-radius: 9999px;
        overflow: hidden;
        isolation: isolate;
      }
      .bento3-icon::before,
      .bento3-icon::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: inherit;
        border: 1px solid var(--bento3-icon-trail);
        opacity: 0.45;
      }
      .bento3-icon::after {
        inset: 10px;
        opacity: 0.2;
      }
      .bento3-icon[data-variant="orbit"] span {
        position: absolute;
        height: 140%;
        width: 3px;
        background: linear-gradient(180deg, transparent, var(--bento3-icon-stroke) 55%, transparent);
        transform-origin: center;
        animation: bento3-flare 8s linear infinite;
      }
      .bento3-icon[data-variant="relay"] span {
        position: absolute;
        inset: 18px;
        border-top: 1px solid var(--bento3-icon-stroke);
        border-bottom: 1px solid var(--bento3-icon-stroke);
        transform: skewX(-15deg);
      }
      .bento3-icon[data-variant="relay"] span::before,
      .bento3-icon[data-variant="relay"] span::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 120%;
        left: -10%;
        background: linear-gradient(90deg, transparent, var(--bento3-icon-stroke), transparent);
        animation: bento3-dash 2.6s ease-in-out infinite;
      }
      .bento3-icon[data-variant="relay"] span::after {
        top: 70%;
        animation-delay: 0.9s;
      }
      .bento3-icon[data-variant="wave"] span {
        position: absolute;
        inset: 12px;
        border-radius: 999px;
        overflow: hidden;
      }
      .bento3-icon[data-variant="wave"] span::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 5%, var(--bento3-icon-stroke) 50%, transparent 95%);
        transform: translateX(-45%);
        animation: bento3-wave 2.8s ease-in-out infinite alternate;
      }
      .bento3-icon[data-variant="spark"] span {
        position: absolute;
        inset: 0;
      }
      .bento3-icon[data-variant="spark"] span::before,
      .bento3-icon[data-variant="spark"] span::after {
        content: "";
        position: absolute;
        inset: 12px;
        border-radius: 9999px;
        border: 1px solid var(--bento3-icon-stroke);
        opacity: 0.28;
        animation: bento3-pulse 2.8s ease-out infinite;
      }
      .bento3-icon[data-variant="spark"] span::after {
        animation-delay: 0.9s;
      }
      .bento3-icon[data-variant="loop"] span {
        position: absolute;
        inset: 12px;
      }
      .bento3-icon[data-variant="loop"] span::before,
      .bento3-icon[data-variant="loop"] span::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        background: linear-gradient(90deg, transparent, var(--bento3-icon-stroke), transparent);
      }
      .bento3-icon[data-variant="loop"] span::before {
        transform: rotate(90deg);
      }
      .bento3-icon[data-variant="loop"] span::after {
        opacity: 0.4;
        transform: rotate(0deg);
      }
      @media (max-width: 1024px) {
        .bento3-section {
          gap: clamp(2.5rem, 6vw, 4rem);
          padding-inline: clamp(1.1rem, 6vw, 3rem);
        }
        .bento3-metrics {
          border-radius: 24px;
        }
      }
      @media (max-width: 768px) {
        .bento3-section {
          gap: clamp(2rem, 7vw, 3.5rem);
          padding-inline: clamp(1rem, 8vw, 2.25rem);
          padding-block: clamp(3rem, 10vw, 4rem);
        }
        .bento3-card {
          padding: clamp(1rem, 5vw, 1.6rem);
          border-radius: 22px;
        }
        .bento3-grid {
          gap: clamp(1rem, 6vw, 2rem);
        }
        .bento3-metrics {
          padding: clamp(1rem, 6vw, 1.8rem);
          gap: clamp(0.75rem, 4vw, 1.25rem);
        }
        .bento3-footer {
          gap: clamp(1rem, 6vw, 1.75rem);
        }
      }
      @media (max-width: 640px) {
        .bento3-section {
          gap: clamp(1.75rem, 8vw, 3rem);
        }
        .bento3-hero-pill {
          justify-content: center;
          text-align: center;
        }
        .bento3-hero-pill span:last-child {
          width: 100%;
          text-align: center;
        }
        .bento3-card {
          padding: clamp(0.85rem, 6vw, 1.4rem);
        }
        .bento3-icon {
          height: clamp(2.25rem, 8vw, 2.75rem);
          width: clamp(2.25rem, 8vw, 2.75rem);
        }
        .bento3-metrics div {
          padding-block: clamp(1rem, 6vw, 1.5rem);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIntroReady(true);
      setVisible(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const palette = useMemo(() => palettes[theme] || palettes.dark, [theme]);

  const containerStyle = useMemo(
    () => ({
      "--bento3-grid-color": palette.gridColor,
      "--bento3-focus-glow": palette.focusGlow,
      "--bento3-icon-stroke": palette.iconStroke,
      "--bento3-icon-trail": palette.iconTrail,
    }),
    [palette.gridColor, palette.focusGlow, palette.iconStroke, palette.iconTrail]
  );

  return (
    <div
      id="about"
      className={`bento3-root relative w-full overflow-hidden transition-colors duration-700 ${palette.surface}`}
      style={containerStyle}
    >
      <div
        className="absolute inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--bento3-grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--bento3-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: palette.overlay }} />

      <section
        ref={sectionRef}
        className={`bento3-section relative z-10 mx-auto flex max-w-6xl flex-col gap-12 py-12 md:gap-16 ${
          introReady && visible ? "" : "opacity-0"
        }`}
      >
        <div
          className={`bento3-hero-pill mx-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-full border px-5 py-3 text-[11px] uppercase tracking-[0.5em] transition-all duration-700 ${
            introReady ? "opacity-100 translate-y-0" : "translate-y-5 opacity-0"
          } ${palette.capsule}`}
        >
          <span className="relative flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_0_6px_rgba(255,255,255,0.05)]" />
            Introduction
          </span>
          <span className="font-medium">About Me</span>
        </div>

        <header className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between text-center md:text-left">
          <div className="space-y-5 w-full max-w-3xl mx-auto md:mx-0">
            <h2 className={`text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl ${palette.heading}`}>
              An overview of who I am and what I aim for.
            </h2>
          </div>
        </header>

        <div className="bento3-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
          {flows.map((flow, index) => (
            <FlowCard key={flow.id} flow={flow} palette={palette} index={index} visible={visible} />
          ))}
        </div>

        <div className={`bento3-metrics grid grid-cols-1 gap-4 rounded-[28px] border p-6 sm:grid-cols-3 ${palette.cardBorder} ${palette.card}`}>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`rounded-[22px] border px-5 py-6 text-xs uppercase tracking-[0.22em] text-center sm:text-sm sm:tracking-[0.25em] ${palette.metric}`}
            >
              <span className="block text-[10px] opacity-60 sm:text-[11px]">{metric.label}</span>
              <span className="mt-2 block text-base font-semibold tracking-[0.08em] sm:text-lg sm:tracking-[0.12em]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FlowCard({ flow, palette, index, visible }) {
  const cardRef = useRef(null);

  const setGlow = (event) => {
    const target = cardRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--bento3-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--bento3-y", `${event.clientY - rect.top}px`);
  };

  const clearGlow = () => {
    const target = cardRef.current;
    if (!target) return;
    target.style.removeProperty("--bento3-x");
    target.style.removeProperty("--bento3-y");
  };

  return (
    <article
      ref={cardRef}
      className={`bento3-card group relative overflow-hidden rounded-[28px] border ${palette.cardBorder} ${palette.card} p-6 transition-colors duration-500`}
      data-visible={visible}
      style={{ "--bento3-delay": `${index * 90}ms` }}
      onMouseMove={setGlow}
      onMouseLeave={clearGlow}
    >
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-xs uppercase tracking-[0.3em] opacity-50 sm:h-12 sm:w-12">
          {flow.id}
        </div>
        <div className="flex flex-col gap-4 lg:flex-1 text-left">
          <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.4em] ${palette.cardBorder} ${palette.muted}`}>
            {flow.meta}
          </span>
          <h3 className={`text-xl font-semibold leading-tight sm:text-2xl ${palette.heading}`}>{flow.title}</h3>
          <p className={`text-sm leading-relaxed sm:text-base ${palette.muted}`}>{flow.description}</p>
        </div>
        <div className={`mt-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${palette.cardBorder} ${palette.card} sm:h-14 sm:w-14 lg:ml-auto lg:mt-0 lg:h-16 lg:w-16`}>
          <AnimatedIcon variant={flow.variant} />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-[0.65rem] uppercase tracking-[0.25em] opacity-70 sm:text-xs sm:tracking-[0.35em] sm:flex-row sm:items-center sm:justify-between">
        <span className="text-center sm:text-left">{flow.statLabel}</span>
        <span className="text-center font-semibold text-current sm:text-right">{flow.statValue}</span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at var(--bento3-x, 50%) var(--bento3-y, 50%), var(--bento3-focus-glow), transparent 68%)`,
        }}
      />
    </article>
  );
}

function AnimatedIcon({ variant }) {
  return (
    <span className="bento3-icon" data-variant={variant}>
      <span />
    </span>
  );
}

export default Bento3Section;
