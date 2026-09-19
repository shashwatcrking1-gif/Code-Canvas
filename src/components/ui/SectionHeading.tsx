"use client";

import { motion } from "framer-motion";

/**
 * SectionHeading — consistent section title with scroll-triggered reveal animation.
 */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[#4a4a4a] font-light max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
