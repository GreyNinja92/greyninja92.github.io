"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/constants";

const interests = [
  "Distributed Systems",
  "Cloud Infrastructure",
  "Machine Learning",
  "Full Stack",
  "AR / VR",
  "LLMs",
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 px-6 border-t border-white/[0.06]">
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
            Background
          </p>
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-white tracking-tight">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 flex-shrink-0">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            About
          </h2>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-10 md:gap-16">

          {/* Text */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <div className="space-y-4 text-sm md:text-base text-white/50 leading-relaxed mb-8">
              <p>
                I&apos;m a Software Development Engineer at{" "}
                <span className="text-white/80 font-medium">Amazon Web Services</span>{" "}
                in Seattle, where I build and scale cloud infrastructure serving millions of customers.
              </p>
              <p>
                I hold an{" "}
                <span className="text-white/80 font-medium">M.S. in Computer Science</span>{" "}
                from the University of Illinois Chicago with a 4.0 GPA, and a B.Tech in Computer Engineering from NMIMS Mumbai. My graduate work spanned distributed systems, machine learning, and AR/VR.
              </p>
              <p>
                I&apos;m drawn to problems at the intersection of systems and intelligence — whether that&apos;s designing distributed pipelines, building full-stack products, or exploring what LLMs can do when given real infrastructure to work with.
              </p>
            </div>

            {/* Interest tags */}
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-white/35 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

