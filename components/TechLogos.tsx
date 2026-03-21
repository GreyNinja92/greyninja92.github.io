"use client";

import { motion } from "framer-motion";
import { logos } from "@/data/logos";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function TechLogos() {
  return (
    <section className="py-20 px-6 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.18em] uppercase text-white/25 font-medium mb-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Technologies
        </motion.p>

        <motion.div
          className="logo-group flex flex-wrap justify-center items-center gap-8 md:gap-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {logos.map((logo) => (
            <div key={logo.name} className="logo-item" title={logo.name}>
              <img
                src={`/images/logos/${logo.file}.png`}
                alt={logo.name}
                width={36}
                height={36}
                className="w-8 h-8 md:w-9 md:h-9 object-contain select-none"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
