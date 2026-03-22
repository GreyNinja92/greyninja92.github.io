"use client";

import { motion } from "framer-motion";
import { publications } from "@/data/publications";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function Publications() {
  return (
    <section
      id="publications"
      className="py-16 md:py-32 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs tracking-[0.18em] uppercase text-white/30 font-medium mb-3">
            Research
          </p>
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-white tracking-tight">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 flex-shrink-0">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Publications
          </h2>
        </motion.div>

        {/* Publication list */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {publications.map((pub, i) => (
            <motion.a
              key={pub.number}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group spotlight-card flex flex-col sm:flex-row sm:items-center gap-4 py-8 cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              {/* Number */}
              <span className="text-xs font-mono text-white/20 w-8 flex-shrink-0">
                {String(pub.number).padStart(2, "0")}
              </span>

              {/* Category badge */}
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded border border-white/10 text-white/35 flex-shrink-0 w-fit">
                {pub.category}
              </span>

              {/* Title */}
              <p className="flex-1 text-base font-medium text-white/60 group-hover:text-white/90 transition-colors duration-200 leading-snug">
                {pub.title}
              </p>

              {/* Arrow */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
