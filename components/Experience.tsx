"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
  current?: boolean;
}

const experiences: ExperienceEntry[] = [
  {
    period: "2024 – Present",
    role: "Software Development Engineer",
    company: "AWS",
    description:
      "Building and scaling cloud infrastructure and services at Amazon Web Services.",
    tech: ["ECS", "EC2", "Kinesis", "Lambda", "S3", "IAM", "Route53", "CloudWatch"],
    current: true,
  },
  {
    period: "Feb 2023 – Dec 2023",
    role: "Graduate Assistant",
    company: "UIC College of Engineering",
    description:
      "Built and maintained internal web applications for UIC faculty, including HR Recruitment, Travel Request, PhD Evaluation, and Research Expenditure portals.",
    tech: ["Laravel", "PHP", "React", "Node", "GraphQL", "MySQL", "Docker"],
    current: false,
  },
  {
    period: "Aug 2021 – Jan 2022",
    role: "Software Engineer",
    company: "Wednesday Solutions",
    description:
      "Delivered full-stack web projects, improved test coverage by 40%, and built CRON jobs for automated workflows.",
    tech: ["React", "Redux", "Node", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    current: false,
  },
  {
    period: "May 2019 – Jun 2019",
    role: "iOS Engineer Intern",
    company: "ReArk",
    description:
      "Built an iOS AR app for viewing 3D models and migrated a Unity AR application to native ARKit.",
    tech: ["Swift", "ARKit", "Unity"],
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-32 px-6 border-t border-white/[0.06]">
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
            Career
          </p>
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-white tracking-tight">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 flex-shrink-0">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            Experience
          </h2>
        </motion.div>

        {/* Timeline entries */}
        <div className="flex flex-col gap-10">
          {experiences.map((entry, i) => (
            <motion.div
              key={`${entry.role}-${entry.company}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="flex gap-6 md:gap-8"
            >
              {/* Left: period (desktop only) */}
              <div className="hidden md:flex w-32 flex-shrink-0 pt-0.5">
                <span className="text-xs font-mono text-white/25 leading-relaxed">
                  {entry.period}
                </span>
              </div>

              {/* Timeline line + dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                    entry.current ? "bg-blue-400" : "bg-white/20"
                  }`}
                />
                <div className="w-px bg-white/10 flex-1 mt-1.5" />
              </div>

              {/* Right: content */}
              <div className="flex-1 pb-10">
                {/* Period on mobile */}
                <span className="md:hidden block text-xs font-mono text-white/25 mb-1.5">
                  {entry.period}
                </span>

                {/* Role + company + current badge */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <span className="text-base font-semibold text-white/90">
                    {entry.role}
                  </span>
                  <span className="text-white/25 text-sm">@</span>
                  <span className="text-sm text-white/60">{entry.company}</span>
                  {entry.current && (
                    <span className="inline-flex items-center gap-1.5 ml-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                      </span>
                      <span className="text-[10px] font-mono text-green-400/70 tracking-wide uppercase">
                        Current
                      </span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-3">
                  {entry.description}
                </p>

                {/* Tech chips */}
                {entry.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded border border-white/[0.12]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
