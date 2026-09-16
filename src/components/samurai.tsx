"use client";
import React, { useEffect, useRef, useState } from "react";

export function useInkRipple() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "ink-ripple";
      document.body.appendChild(ripple);
      
      const size = 60;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - size / 2}px`;
      ripple.style.top = `${e.clientY - size / 2}px`;
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
}

export function SamuraiChrome() {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          mixBlendMode: "soft-light",
          opacity: 0.32,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-[99]"
        style={{
          background: "radial-gradient(120% 90% at 50% 45%, transparent 42%, rgba(10, 11, 12, 0.7) 70%)"
        }}
      />
    </>
  );
}

interface SamuraiBackgroundProps {
  glow?: boolean;
  grid?: boolean;
  orbs?: boolean;
  embers?: boolean;
  emberCount?: number;
  parallax?: boolean;
  kanji?: string;
}

export function SamuraiBackground({
  glow,
  grid,
  orbs,
  embers,
  emberCount = 60,
  parallax,
  kanji,
}: SamuraiBackgroundProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallax]);

  useEffect(() => {
    if (!embers || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number, y: number, speed: number, radius: number, opacity: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < emberCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 1,
        radius: 0.5 + Math.random() * 2,
        opacity: Math.random()
      });
    }

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.5;
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Use a computed style or fixed CSS variable for the fill
        ctx.fillStyle = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--samurai-effect').trim() || '255, 255, 255'}, ${p.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [embers, emberCount]);

  return (
    <div className="fixed inset-0 z-0 bg-[var(--samurai-bg)] overflow-hidden pointer-events-none transition-colors duration-500">
      
      {kanji && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-[40vw] font-bold select-none" style={{ fontFamily: "serif" }}>
          {kanji}
        </div>
      )}

      {glow && (
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "radial-gradient(120% 90% at 50% 115%, rgba(var(--samurai-effect), 0.1), transparent 60%)"
          }}
        />
      )}

      {grid && (
        <div 
          className="absolute inset-0 opacity-20 samurai-grid"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(75% 75% at 50% 45%, #000 30%, transparent)",
            WebkitMaskImage: "radial-gradient(75% 75% at 50% 45%, #000 30%, transparent)"
          }}
        />
      )}

      {orbs && (
        <>
          <div 
            className="absolute rounded-full samurai-orb mix-blend-screen transition-colors duration-500"
            style={{
              width: "46vmax", height: "46vmax",
              background: "rgba(var(--samurai-effect), 0.08)",
              filter: "blur(70px)",
              left: `calc(10% + ${mouse.x * -20}px)`,
              top: `calc(20% + ${mouse.y * -20}px)`,
              animationDelay: "0s"
            }}
          />
          <div 
            className="absolute rounded-full samurai-orb mix-blend-screen transition-colors duration-500"
            style={{
              width: "40vmax", height: "40vmax",
              background: "rgba(var(--samurai-effect), 0.06)",
              filter: "blur(70px)",
              right: `calc(10% + ${mouse.x * 20}px)`,
              bottom: `calc(10% + ${mouse.y * 20}px)`,
              animationDelay: "-3s"
            }}
          />
          <div 
            className="absolute rounded-full samurai-orb mix-blend-screen transition-colors duration-500"
            style={{
              width: "30vmax", height: "30vmax",
              background: "rgba(var(--samurai-effect), 0.05)",
              filter: "blur(60px)",
              left: `calc(40% + ${mouse.x * 10}px)`,
              top: `calc(60% + ${mouse.y * 10}px)`,
              animationDelay: "-1.5s"
            }}
          />
        </>
      )}

      {embers && (
        <canvas ref={canvasRef} className="absolute inset-0" />
      )}
    </div>
  );
}
