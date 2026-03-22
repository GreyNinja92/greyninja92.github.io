"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  {
    label: "Experience",
    href: "/#experience",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/#projects",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Publications",
    href: "/#publications",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-black/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200"
        >
          SK
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-white/50 transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px w-5 bg-white/50 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-white/50 transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-b border-white/[0.06] bg-black/95 backdrop-blur-xl ${
          menuOpen ? "max-h-56" : "max-h-0 border-b-0"
        }`}
      >
        <nav className="px-6 py-5 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
