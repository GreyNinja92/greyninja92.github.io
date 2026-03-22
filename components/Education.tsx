"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/constants";

interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

const education: EducationEntry[] = [
  {
    institution: "University of Illinois, Chicago",
    degree: "M.S. Computer Science",
    period: "2022 – 2023",
    gpa: "4.0 / 4.0",
  },
  {
    institution: "NMIMS Mukesh Patel School of Technology",
    degree: "B.Tech. Computer Engineering",
    period: "2017 – 2021",
  },
];

export default function Education() {
  return (
    <section className="py-16 md:py-32 px-6 border-t border-white/[0.06]">
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
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Education
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((entry, i) => (
            <motion.div
              key={entry.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="border border-white/[0.08] rounded-xl p-6 bg-white/[0.02]"
            >
              <div className="flex flex-col gap-2">
                <p className="text-white/80 font-semibold leading-snug">
                  {entry.institution}
                </p>
                <p className="text-sm text-white/40">{entry.degree}</p>
                <p className="text-xs font-mono text-white/25">{entry.period}</p>
                {entry.gpa && (
                  <span className="inline-flex self-start mt-1 text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    GPA {entry.gpa}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
