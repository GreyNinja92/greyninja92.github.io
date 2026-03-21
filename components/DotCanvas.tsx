"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  birth: number; // timestamp ms
}

const SPACING = 30;
const BASE_R = 1.2;
const RIPPLE_SPEED = 220;   // px / second
const RIPPLE_LIFE = 1800;   // ms before a ripple dies
const RING_WIDTH = 55;      // px width of the bright ring
const MAX_RIPPLES = 12;

export default function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = devicePixelRatio;
    let animId: number;
    const ripples: Ripple[] = [];
    let lastRipple = 0;

    const resize = () => {
      dpr = devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnRipple = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastRipple < 60) return; // throttle ~16fps spawn rate
      lastRipple = now;
      ripples.push({ x, y, birth: now });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Cull dead ripples
      const now = performance.now();
      while (ripples.length && now - ripples[0].birth > RIPPLE_LIFE) {
        ripples.shift();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;

          // Gentle ambient wave
          const wave =
            Math.sin(t * 0.00045 + i * 0.36 + j * 0.27) * 0.5 + 0.5;

          // Accumulate ripple brightness for this dot
          let rippleBright = 0;
          for (const rip of ripples) {
            const age = now - rip.birth;
            const progress = age / RIPPLE_LIFE;          // 0 → 1
            const radius = age * (RIPPLE_SPEED / 1000);  // px

            const dx = x - rip.x;
            const dy = y - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Dot is inside the ring band
            const diff = Math.abs(dist - radius);
            if (diff < RING_WIDTH) {
              // Gaussian peak at the wavefront, decays as ripple ages
              const ringFactor = Math.exp(-(diff * diff) / (2 * 18 * 18));
              const ageFade = 1 - progress;
              rippleBright += ringFactor * ageFade;
            }
          }
          rippleBright = Math.min(rippleBright, 1);

          const alpha = 0.07 + wave * 0.06 + rippleBright * 0.75;
          const radius = BASE_R + rippleBright * 2.4;

          // Colour: grey-blue base → blue-400 at peak
          const r = Math.round(148 - rippleBright * 52);   // 148 → 96
          const g = Math.round(163 + rippleBright * 2);    // 163 → 165
          const b = Math.round(200 + rippleBright * 50);   // 200 → 250

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
