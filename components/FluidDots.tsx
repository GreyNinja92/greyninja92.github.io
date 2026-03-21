"use client";

import { useEffect, useRef } from "react";

const SPACING       = 6;
const DOT_R         = 1.9;
const GRAVITY       = 0.10;
const FLOOR_K       = 0.28;   // soft floor — troughs can dip well below home
const SPRING_X      = 0.0016;
const DAMPING       = 0.978;
const CURSOR_R      = 60;
const CURSOR_F      = 7;
const COHESION      = 0.05;
const REST_FRAC     = 0.55;   // waves sit in the lower-mid hero

const WAVE_AMP      = 42;     // reduced since 5th-power sharpening is more extreme
const WAVE_K        = 0.014;

// ── stacked wave lines ────────────────────────────────────────────────────────
const LINE_COUNT    = 12;
const LINE_STEP     = 2;      // rows between each line (2 × 6px = 12px apart)
const OPACITY_TOP   = 0.18;   // topmost line
const OPACITY_BOT   = 0.03;   // bottommost line — faint but visible so gradient reads clearly
const CURSOR_GLOW_R = 220;    // wide glow to reveal hidden dots below waves
const WAVE_GLOW_R   = 70;     // small glow for wave line brightness boost
const HIDDEN_ROWS   = 30;     // extra invisible dot rows below the wave block

export default function FluidDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = devicePixelRatio;
    let animId: number;

    let hX: Float32Array, hY: Float32Array;
    let pX: Float32Array, pY: Float32Array;
    let vX: Float32Array, vY: Float32Array;
    let nb: Int32Array;
    let dotCol: Int32Array;
    let wlIdx: Int32Array;   // -1 = interior, 0..LINE_COUNT-1 = wave line index
    let N = 0;

    let mouse = { x: -9999, y: -9999 };

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      const startY = h * REST_FRAC;
      const cols   = Math.floor(w / SPACING) + 1;
      // Cap rows so only a tiny buffer exists below the last wave line.
      // This prevents gravity-pulled interior dots from dragging the bottom
      // wave line down via cohesion, which was causing unequal spacing.
      const waveRows = (LINE_COUNT - 1) * LINE_STEP + 4;
      const maxRows  = waveRows + HIDDEN_ROWS;
      const rows     = Math.min(Math.floor((h - startY) / SPACING) + 1, maxRows);
      N = cols * rows;

      hX   = new Float32Array(N); hY   = new Float32Array(N);
      pX   = new Float32Array(N); pY   = new Float32Array(N);
      vX   = new Float32Array(N); vY   = new Float32Array(N);
      nb   = new Int32Array(N * 8).fill(-1);
      dotCol = new Int32Array(N);
      wlIdx  = new Int32Array(N).fill(-1);

      const offX = (w - (cols - 1) * SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        const isHidden = r >= waveRows;
        const lineNum  = (!isHidden && r % LINE_STEP === 0) ? r / LINE_STEP : -1;
        const li       = isHidden ? -2 : (lineNum >= 0 && lineNum < LINE_COUNT) ? lineNum : -1;

        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          hX[i] = offX + c * SPACING;
          hY[i] = startY + r * SPACING;
          pX[i] = hX[i];
          pY[i] = hY[i];
          dotCol[i] = c;
          wlIdx[i]  = li;

          if (c + 1 < cols) nb[i*8+0] = r * cols + (c + 1);
          if (c - 1 >= 0)   nb[i*8+1] = r * cols + (c - 1);
          if (r + 1 < rows) nb[i*8+2] = (r + 1) * cols + c;
          if (r - 1 >= 0)   nb[i*8+3] = (r - 1) * cols + c;
          if (r+1 < rows && c+1 < cols) nb[i*8+4] = (r+1)*cols+(c+1);
          if (r+1 < rows && c-1 >= 0)   nb[i*8+5] = (r+1)*cols+(c-1);
          if (r-1 >= 0   && c+1 < cols) nb[i*8+6] = (r-1)*cols+(c+1);
          if (r-1 >= 0   && c-1 >= 0)   nb[i*8+7] = (r-1)*cols+(c-1);
        }
      }
    };

    const resize = () => {
      dpr = devicePixelRatio;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      init();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // ── 1. forces ────────────────────────────────────────────────────────
      for (let i = 0; i < N; i++) {
        let fx = (hX[i] - pX[i]) * SPRING_X;
        let fy: number;

        // All rows share identical wave force — uniform spacing + hidden rows animate too
        const c = dotCol[i];
        const theta  = t * 0.001  - c * 0.024;
        const theta2 = t * 0.0017 - c * 0.036 + 1.6;
        const theta3 = t * 0.0008 + c * 0.018 + 3.8;

        const s  = Math.sin(theta);
        const s2 = Math.sin(theta2);
        const s3 = Math.sin(theta3);

        const sharp  = s  * s  * s  * s  * Math.abs(s);
        const sharp2 = s2 * s2 * s2 * s2 * Math.abs(s2);
        const sharp3 = s3 * s3 * s3 * s3 * Math.abs(s3);

        const waveH = sharp * WAVE_AMP + sharp2 * WAVE_AMP * 0.38 + sharp3 * WAVE_AMP * 0.22;

        const targetY = hY[i] - waveH;
        fy = (targetY - pY[i]) * WAVE_K;
        if (pY[i] > hY[i] + 20) {
          fy += (hY[i] - pY[i]) * FLOOR_K;
          vY[i] *= 0.84;
        }

        // Cursor repulsion
        const dx   = pX[i] - mouse.x;
        const dy   = pY[i] - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_R && dist > 0.5) {
          const t01 = 1 - dist / CURSOR_R;
          const s   = t01 * t01 * (3 - 2 * t01);
          fx += (dx / dist) * CURSOR_F * s;
          fy += (dy / dist) * CURSOR_F * s;
        }

        vX[i] = (vX[i] + fx) * DAMPING;
        vY[i] = (vY[i] + fy) * DAMPING;
      }

      // ── 2. cohesion (two passes) ─────────────────────────────────────────
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < N; i++) {
          let nx = 0, ny = 0, cnt = 0;
          for (let d = 0; d < 8; d++) {
            const j = nb[i * 8 + d];
            if (j >= 0) { nx += vX[j]; ny += vY[j]; cnt++; }
          }
          if (cnt > 0) {
            vX[i] += (nx / cnt - vX[i]) * COHESION;
            vY[i] += (ny / cnt - vY[i]) * COHESION;
          }
        }
      }

      // ── 3. integrate + draw ──────────────────────────────────────────────
      for (let i = 0; i < N; i++) {
        pX[i] += vX[i];
        pY[i] += vY[i];

        const li         = wlIdx[i];
        const isWaveLine = li >= 0;
        const isHidden   = li === -2;
        const emergeUp   = hY[i] - pY[i];

        const cdx   = pX[i] - mouse.x;
        const cdy   = pY[i] - mouse.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        // Wide glow — reveals hidden dots and interior displaced dots
        const cProxWide = Math.max(0, 1 - cdist / CURSOR_GLOW_R);
        const glowWide  = cProxWide * cProxWide * (3 - 2 * cProxWide);

        // Tight glow — only brightens wave lines near the cursor
        const cProxTight = Math.max(0, 1 - cdist / WAVE_GLOW_R);
        const glowTight  = cProxTight * cProxTight * (3 - 2 * cProxTight);

        // Hidden dots: only visible via wide cursor glow
        if (isHidden && glowWide < 0.02) continue;
        // Interior wave-block dots: only visible when displaced or glowing
        if (!isWaveLine && !isHidden && emergeUp < 1.5 && glowWide < 0.02) continue;

        const dxH  = pX[i] - hX[i];
        const dyH  = pY[i] - hY[i];
        const disp = Math.sqrt(dxH * dxH + dyH * dyH);
        const d    = Math.min(disp / 40, 1);

        let alpha: number;

        if (isHidden) {
          alpha = glowWide * 0.55;
        } else if (isWaveLine) {
          // Power-curve falloff: top line bright, drops off quickly toward bottom
          const lineFrac = li / (LINE_COUNT - 1);
          const base = OPACITY_TOP * Math.pow(1 - lineFrac, 2) + OPACITY_BOT;
          // Tight glow only brightens lines within ~70px of cursor
          alpha = base + glowTight * (0.75 - base);
        } else {
          const emerge = Math.min(emergeUp / 14, 1);
          alpha = Math.max(emerge * 0.20, glowWide * 0.60) + d * 0.18;
        }

        // activation: blend from dark gray → bluish gray on cursor proximity only
        const act = isHidden ? glowWide : glowTight;
        const r = Math.round(80  + act * 50);
        const g = Math.round(82  + act * 65);
        const b = Math.round(85  + act * 110);

        ctx.beginPath();
        ctx.arc(pX[i], pY[i], DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
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
      style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
    />
  );
}
