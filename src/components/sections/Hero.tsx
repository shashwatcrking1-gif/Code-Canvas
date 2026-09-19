"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

/**
 * Hero Section — full viewport height.
 * Name + tagline appear with staggered fade-in after a short delay
 * (giving the 3D centerpiece time to assemble).
 * Includes a scroll-down indicator.
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 2, // Wait for 3D assembly to finish
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#1a1a1a] tracking-tight leading-[1.1]"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl md:text-2xl text-[#4a4a4a] font-light max-w-lg mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#8fa085]"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-light">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
