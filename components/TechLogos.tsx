"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import { logos, Logo } from "@/data/logos";
import { EASE } from "@/lib/constants";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const logoVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.72 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: EASE } },
};

const PILE_OFFSETS = logos.map((_, i) => ({
  x: Math.sin(i * 2.4) * 14,
  y: Math.cos(i * 1.7) * 10,
}));

// Pre-computed raindrop stagger delays
const RAIN_DELAYS = logos.map((_, i) => i * 0.04);

function TrashIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width={48} height={48} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ overflow: "visible", display: "block" }}
    >
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
      <motion.g
        animate={{ y: isOpen ? -7 : 0, x: isOpen ? -5 : 0, rotate: isOpen ? -20 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
      </motion.g>
    </svg>
  );
}

interface LogoItemProps {
  logo: Logo;
  floatDelay: string;
  logoIndex: number;
  cursor: { x: number; y: number };
  isCollected: boolean;
  isDropping: boolean;
  isReturning: boolean;
  dropTarget: { x: number; y: number } | null;
  dropCount: number;
  onCollect: () => void;
}

function LogoItem({
  logo, floatDelay, logoIndex, cursor,
  isCollected, isDropping, isReturning, dropTarget, dropCount, onCollect,
}: LogoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const homeRef = useRef<{ x: number; y: number } | null>(null);

  function handleMouseEnter() {
    if (isDropping || isReturning) return;
    if (!homeRef.current && ref.current) {
      const r = ref.current.getBoundingClientRect();
      homeRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    onCollect();
  }

  let animateTarget: TargetAndTransition;

  if (isDropping && homeRef.current && dropTarget) {
    animateTarget = {
      x: dropTarget.x - homeRef.current.x,
      y: dropTarget.y - homeRef.current.y,
      scale: 0,
      opacity: [null, 1, 0],
    };
  } else if (isCollected && homeRef.current) {
    animateTarget = {
      x: cursor.x - homeRef.current.x + PILE_OFFSETS[logoIndex].x,
      y: cursor.y - homeRef.current.y + PILE_OFFSETS[logoIndex].y,
      scale: 1.5,
      opacity: 1,
    };
  } else {
    animateTarget = { x: 0, y: 0, scale: 1, opacity: 1 };
  }

  // Start from top of viewport: move up by the logo's screen y position
  const rainInitialY = homeRef.current ? -(homeRef.current.y + 20) : -300;

  const dropTransition = {
    x: { type: "tween" as const, duration: 0.45, ease: [0.4, 0, 0.8, 1] as [number, number, number, number] },
    y: { type: "tween" as const, duration: 0.45, ease: [0.4, 0, 0.8, 1] as [number, number, number, number] },
    scale: { type: "tween" as const, duration: 0.15, delay: 0.33 },
    opacity: { type: "tween" as const, duration: 0.45, times: [0, 0.8, 1] },
  };

  const returnTransition = {
    type: "spring" as const,
    stiffness: 220,
    damping: 20,
    delay: RAIN_DELAYS[logoIndex],
  };

  return (
    <div
      className={`logo-item${isCollected ? " logo-item-collected" : ""}`}
      style={{ "--float-delay": floatDelay } as React.CSSProperties}
    >
      <motion.div variants={logoVariant}>
        <motion.div
          key={`inner-${dropCount}`}
          ref={ref}
          initial={dropCount > 0 ? { y: rainInitialY, opacity: 0, scale: 0.5, x: 0 } : false}
          animate={animateTarget}
          transition={isDropping ? dropTransition : isReturning ? returnTransition : { type: "spring", stiffness: 160, damping: 20 }}
          style={{ position: "relative", zIndex: isCollected || isDropping ? 20 : "auto" }}
          onMouseEnter={handleMouseEnter}
        >
          <div className={`logo-float flex flex-col items-center gap-2 w-12${isCollected || isDropping ? " logo-float-paused" : ""}`}>
            <img
              src={`/images/logos/${logo.file}.${logo.ext ?? "png"}`}
              alt={logo.name}
              width={36}
              height={36}
              className="w-8 h-8 md:w-9 md:h-9 object-contain select-none"
              draggable={false}
            />
            <span
              className="text-[9px] text-white/40 font-medium tracking-wide text-center leading-tight"
              style={{ visibility: isCollected || isDropping ? "hidden" : "visible" }}
            >
              {logo.name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TechLogos() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const [collectedSet, setCollectedSet] = useState<Set<string>>(new Set());
  const [droppingSet, setDroppingSet] = useState<Set<string>>(new Set());
  const [dropTarget, setDropTarget] = useState<{ x: number; y: number } | null>(null);
  const [isDustbinActive, setIsDustbinActive] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  // Per-logo drop count — increments each time a logo is dropped, triggering only its inner div to remount
  const [dropCounts, setDropCounts] = useState<Record<string, number>>({});

  const dustbinRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const collectedSetRef = useRef(collectedSet);
  useEffect(() => { collectedSetRef.current = collectedSet; }, [collectedSet]);

  const triggerDrop = useCallback(() => {
    const current = collectedSetRef.current;
    if (current.size === 0) return;
    if (!dustbinRef.current) return;

    const rect = dustbinRef.current.getBoundingClientRect();
    const target = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    setDropTarget(target);
    setDroppingSet(new Set(current));
    setCollectedSet(new Set());

    setTimeout(() => {
      setDroppingSet(new Set());
      setDropTarget(null);
      setIsReturning(true);
      // Increment drop count only for logos that were dropped
      setDropCounts(prev => {
        const next = { ...prev };
        current.forEach(name => { next[name] = (next[name] ?? 0) + 1; });
        return next;
      });
    }, 540);

    setTimeout(() => setIsReturning(false), 540 + 1600);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    function onMouseMove(e: MouseEvent) {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setCursor({ ...cursorRef.current });
          rafRef.current = null;
        });
      }

    }

    function onMouseLeaveViewport() {
      triggerDrop();
    }

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveViewport);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveViewport);
    };
  }, [triggerDrop, isTouch]);

  const showDustbin = collectedSet.size > 0 || droppingSet.size > 0;
  const isLidOpen = isDustbinActive || droppingSet.size > 0;
  const dustbinScale = isDustbinActive ? 1.35 : 1 + collectedSet.size * 0.1;
  let idx = 0;

  return (
    <section className="relative py-20 px-6 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.18em] uppercase text-white/25 font-medium mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Technologies
        </motion.p>

        <motion.div
          className="logo-group grid grid-cols-4 sm:grid-cols-8 justify-items-center gap-x-5 gap-y-7 sm:gap-x-6 md:gap-x-8 md:gap-y-8 mx-auto md:max-w-xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {logos.map((logo) => {
            const logoIndex = idx++;
            return (
              <LogoItem
                key={logo.name}
                logo={logo}
                floatDelay={`${(logoIndex * 0.22).toFixed(2)}s`}
                logoIndex={logoIndex}
                cursor={cursor}
                isCollected={collectedSet.has(logo.name)}
                isDropping={droppingSet.has(logo.name)}
                isReturning={isReturning}
                dropTarget={dropTarget}
                dropCount={dropCounts[logo.name] ?? 0}
                onCollect={() => {
                  if (!isTouch) setCollectedSet(prev => new Set([...prev, logo.name]));
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Dustbin — desktop only */}
      {!isTouch && <motion.div
        ref={dustbinRef}
        className="fixed bottom-6 right-6 select-none z-50 overflow-visible"
        animate={{
          opacity: showDustbin ? 1 : 0,
          scale: dustbinScale,
          y: showDustbin ? -(dustbinScale - 1) * 30 : 20,
          x: showDustbin ? -(dustbinScale - 1) * 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onMouseEnter={() => { setIsDustbinActive(true); triggerDrop(); }}
        onMouseLeave={() => setIsDustbinActive(false)}
        style={{ pointerEvents: showDustbin ? "auto" : "none" }}
      >
        <div className={`transition-colors duration-200 ${isDustbinActive ? "text-white/90" : "text-white/40"}`} style={{ paddingTop: "16px", overflow: "visible" }}>
          <TrashIcon isOpen={isLidOpen} />
        </div>
      </motion.div>}
    </section>
  );
}
