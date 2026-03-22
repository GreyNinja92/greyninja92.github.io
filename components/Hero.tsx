"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import FluidDots from "./FluidDots";

import { EASE } from "@/lib/constants";

const EMAIL = "sakshamkhatod@gmail.com";

/* ─── Animated background ─────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Aurora blob 1 — deep blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: "-200px",
          left: "-180px",
          background:
            "radial-gradient(circle, rgba(29,78,216,0.22) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "aurora-1 22s ease-in-out infinite",
        }}
      />

      {/* Aurora blob 2 — sky blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          right: "-150px",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "aurora-2 28s ease-in-out infinite",
        }}
      />

      {/* Aurora blob 3 — royal blue, bottom */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: "5%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "aurora-3 18s ease-in-out infinite",
        }}
      />

      {/* Sweeping horizontal beam — runs every ~8s */}
      <div
        className="absolute"
        style={{
          top: "38%",
          left: 0,
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          animation: "beam-x 8s cubic-bezier(0.4,0,0.6,1) infinite 1.5s",
        }}
      />

      {/* Second beam offset */}
      <div
        className="absolute"
        style={{
          top: "55%",
          left: 0,
          width: "45%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.04) 70%, transparent 100%)",
          animation: "beam-x 8s cubic-bezier(0.4,0,0.6,1) infinite 4.5s",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, #000, transparent)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to top, #000, transparent)",
        }}
      />
    </div>
  );
}

/* ─── Copy-to-clipboard button ────────────────────────────── */
function CopyEmailButton({ onMouseEnter, onMouseLeave }: { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // fallback for non-secure contexts
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setState("copied");
    setTimeout(() => setState("idle"), 2200);
  };

  return (
    <div className="grey-border-hover" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grey-border-hover-inner">
        <button
          onClick={handleClick}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white/90 transition-colors duration-200 overflow-hidden"
          style={{ minWidth: 148 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {state === "copied" ? (
              <motion.span
                key="copied"
                className="flex items-center gap-2 w-full justify-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: EASE }}
              >
                {/* Checkmark */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-emerald-400 flex-shrink-0"
                >
                  <path
                    d="M2 7l3.5 3.5L12 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-emerald-400">Copied to clipboard</span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="flex items-center gap-2 w-full justify-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: EASE }}
              >
                Get in touch
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

const stats = [
  { value: "4.0", label: "MS GPA" },
  { value: "1+", label: "Yrs @ AWS" },
  { value: "M.S.", label: "Comp Sci" },
  { value: "Seattle", label: "Washington" },
];

/* ─── Main Hero ───────────────────────────────────────────── */
export default function Hero() {
  const [wavePaused, setWavePaused] = useState(false);
  const pauseWave = useCallback(() => setWavePaused(true), []);
  const resumeWave = useCallback(() => setWavePaused(false), []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(29,78,216,0.18) 0%, #000 70%)" }}
    >
      <HeroBackground />

      {/* Fluid dot layer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <FluidDots paused={wavePaused} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-32 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16" style={{ zIndex: 2 }}>

        {/* ── Left column ── */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <div className="mb-7 mt-4">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white"
              >
                Saksham
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white/20"
              >
                Khatod
              </motion.div>
            </div>
          </div>

          {/* Role */}
          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.4, ease: EASE }}
              className="text-base md:text-lg font-medium text-white/35 tracking-wide"
            >
              SDE @ AWS
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="rainbow-border-hover" onMouseEnter={pauseWave} onMouseLeave={resumeWave}>
              <div className="rainbow-border-hover-inner">
                <a
                  href="/#projects"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)" }}
                >
                  View work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
            <CopyEmailButton onMouseEnter={pauseWave} onMouseLeave={resumeWave} />
          </motion.div>
        </div>

        {/* ── Right panel (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="flex flex-col gap-3 w-full lg:w-64 xl:w-72 lg:flex-shrink-0"
        >
          {/* Currently card */}
          <div className="border border-white/[0.08] rounded-xl p-4 bg-white/[0.02] backdrop-blur-md">
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/25 font-medium mb-3">Currently</p>
            <div className="flex items-start gap-2.5">
              <span className="relative flex h-1.5 w-1.5 mt-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80 leading-snug">Software Development Engineer</p>
                <p className="text-xs text-white/35 mt-0.5">Amazon Web Services</p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="border border-white/[0.06] rounded-lg p-3 bg-white/[0.01] backdrop-blur-md">
                <p className="text-xl font-bold text-white/80 tracking-tight">{s.value}</p>
                <p className="text-[10px] font-medium text-white/30 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 px-1 pt-1">
            <a href="https://github.com/GreyNinja92" target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5 text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <span className="text-white/10">·</span>
            <a href="https://www.linkedin.com/in/saksham-khatod-83b997181/" target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5 text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Bottom meta */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="absolute bottom-6 md:bottom-14 left-6 text-sm text-white/50 font-mono tracking-widest"
        >
          Cloud · Distributed Systems · Full Stack · LLMs
        </motion.p>
      </div>
    </section>
  );
}
