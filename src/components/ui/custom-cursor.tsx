import { useEffect, useRef } from 'react';

// Particle type definitions
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: 'flame' | 'spark';
  color: string;
  wobbleOffset?: number;
};

type Shockwave = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
};

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const swordWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Fullscreen resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Physics state variables
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    
    let isHovering = false;
    let particles: Particle[] = [];
    let shockwaves: Shockwave[] = [];
    
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Reveal the cursor upon first move
      if (swordWrapperRef.current && swordWrapperRef.current.style.opacity !== '1') {
        swordWrapperRef.current.style.opacity = '1';
      }
    };

    // Helper: spawn limited particles
    const spawnParticle = (
      x: number, y: number, type: Particle['type'], 
      vx: number, vy: number, size: number, 
      maxLife: number, color: string
    ) => {
      if (particles.length > 200) return; // Cap particles for 60fps performance
      particles.push({
        x, y, vx, vy, life: maxLife, maxLife, size, type, color,
        wobbleOffset: Math.random() * Math.PI * 2
      });
    };

    const render = () => {
      // Linear Interpolation (Lerp) for smooth inertia tracking
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      mouseX += dx * 0.25; 
      mouseY += dy * 0.25;

      // Mouse velocity for tilt and particle direction
      const velX = mouseX - lastX;
      const velY = mouseY - lastY;
      const speed = Math.sqrt(velX * velX + velY * velY);
      
      lastX = mouseX;
      lastY = mouseY;

      // Calculate sword rotational tilt based on X velocity
      let tiltAngle = velX * 0.6; 
      tiltAngle = Math.max(-30, Math.min(30, tiltAngle)); // Clamp tilt
      
      if (swordWrapperRef.current) {
        // Offset so the top-left tip is precisely on the coordinates
        swordWrapperRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${tiltAngle}deg)`;
      }

      // --- PARTICLE EMISSION ---
      if (speed > 0.5) {
        
        // Energy Flames (Denser when hovering, acting as the main trail)
        const flameCount = isHovering ? 5 : 3;
        for (let i = 0; i < flameCount; i++) {
          spawnParticle(
            mouseX + (Math.random() - 0.5) * 15, 
            mouseY + (Math.random() - 0.5) * 15,
            'flame',
            -velX * 0.15 + (Math.random() - 0.5) * 2,
            -velY * 0.15 + (Math.random() - 0.5) * 2,
            Math.random() * 12 + 6,
            Math.random() * 15 + 10,
            isHovering ? 'rgba(150, 230, 255, 0.7)' : 'rgba(80, 180, 255, 0.5)'
          );
        }

        // Plasma Sparks
        if (Math.random() > 0.4) {
          spawnParticle(
            mouseX, mouseY, 'spark',
            -velX * 0.3 + (Math.random() - 0.5) * 8,
            -velY * 0.3 + (Math.random() - 0.5) * 8,
            Math.random() * 2 + 1,
            25,
            'rgba(255, 255, 255, 0.9)'
          );
        }
      } else if (isHovering) {
         // Idle hover flames radiating upward
         if (Math.random() > 0.5) {
           spawnParticle(
             mouseX + (Math.random() - 0.5) * 15, 
             mouseY + (Math.random() - 0.5) * 15,
             'flame',
             (Math.random() - 0.5), -1 - Math.random() * 1.5, 
             Math.random() * 8 + 4,
             20,
             'rgba(120, 200, 255, 0.5)'
           );
         }
      }

      // --- CANVAS DRAWING (Optimized) ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      // 1. Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 8; // Expand radius fast
        sw.opacity -= 0.05; // Fade out fast
        
        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150, 230, 255, ${sw.opacity})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // 2. Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;
        
        if (p.life <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;

        // Physics updates
        if (p.type === 'flame') {
          p.x += p.vx;
          p.y += p.vy - 0.5; // flames drift up
          p.size *= 0.92; // flames shrink rapidly
        } else if (p.type === 'spark') {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15; // slight gravity pull down
          p.vx *= 0.95; // friction
        }

        // Render as sharp streaks instead of round bubbles
        ctx.beginPath();
        
        if (p.type === 'spark') {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, ${lifeRatio})`;
          ctx.lineWidth = Math.max(0.5, p.size * 0.6);
          ctx.stroke();
        } else {
          // Flames drawn as sharp energy streaks
          ctx.moveTo(p.x, p.y);
          const streakVx = p.vx === 0 ? (Math.random() - 0.5) : p.vx;
          const streakVy = p.vy === 0 ? -2 : p.vy;
          ctx.lineTo(p.x - streakVx * 2, p.y - streakVy * 2);
          
          ctx.strokeStyle = p.color.replace(/[\d.]+\)$/g, `${lifeRatio * 0.8})`);
          ctx.lineWidth = Math.max(1, p.size * 0.8);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0; // Reset
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    // --- INTERACTION EVENT DELEGATION ---
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .group, .project-card, [tabindex="0"]';
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        isHovering = true;
        glowRef.current?.classList.add('animate-sword-glow-intense');
        glowRef.current?.classList.remove('animate-sword-glow');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        isHovering = false;
        glowRef.current?.classList.remove('animate-sword-glow-intense');
        glowRef.current?.classList.add('animate-sword-glow');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // 1. Canvas Shockwave Ring
      shockwaves.push({
        x: targetX,
        y: targetY,
        radius: 5,
        maxRadius: 80,
        opacity: 1
      });

      // 2. Canvas Radial Spark Burst
      for(let i=0; i<12; i++) {
        spawnParticle(
          targetX, targetY, 'spark',
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          Math.random() * 3 + 1,
          35,
          'rgba(200, 240, 255, 1)'
        );
      }
      
      // 3. DOM Flash Overlay
      if (swordWrapperRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute top-0 left-0 w-16 h-16 rounded-full bg-[rgba(150,230,255,0.7)] mix-blend-screen pointer-events-none';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'sword-click-ripple 0.35s ease-out forwards';
        
        swordWrapperRef.current.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 350);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas Effects Background Layer */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99998] hidden sm:block"
      />

      {/* Main Sword DOM Layer */}
      <div
        ref={swordWrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden sm:block will-change-transform opacity-0 origin-top-left"
        style={{
          // Offsets center the top-left tip exactly on the pointer coordinates
          marginLeft: '-10px',
          marginTop: '-10px', 
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Glow Wrapper */}
        <div ref={glowRef} className="animate-sword-glow w-[90px] h-auto pointer-events-none">
          <img 
            src="/images/Sword.png" 
            alt=""
            className="w-full h-auto drop-shadow-[0_0_12px_rgba(50,150,255,0.6)]"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
