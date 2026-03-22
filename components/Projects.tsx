"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards =
      containerRef.current?.querySelectorAll<HTMLElement>(".spotlight-card");
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <section id="projects" className="py-16 md:py-32 px-6 border-t border-white/[0.06]">
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
            Work
          </p>
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-white tracking-tight">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 flex-shrink-0">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Projects
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div className="spotlight-card project-card group h-full min-h-[200px] p-6 flex flex-col justify-between cursor-default">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-mono text-white/20 mt-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-2 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/60 transition-colors duration-200"
              title="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.link && project.video && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-red-500 transition-colors duration-200"
              title="Watch on YouTube"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          )}
          {project.link && !project.video && !project.github && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/60 transition-all duration-200 hover:translate-x-0.5 hover:-translate-y-0.5"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div>
        <h3 className="text-base font-semibold text-white/90 mb-1.5 transition-colors duration-200 group-hover:text-white">
          {project.title}
        </h3>
        <p className="text-sm text-white/35 leading-relaxed transition-colors duration-200 group-hover:text-white/50 mb-3">
          {project.description}
        </p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-white/30 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
