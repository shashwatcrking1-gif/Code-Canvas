"use client";

import { motion } from "framer-motion";
import { personalInfo, skills } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * About Section — short bio + two skill columns (Video Editing / CS Engineering).
 * Reveals on scroll with staggered animations.
 */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const skillItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function About() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="About"
          subtitle="Where creativity meets engineering"
        />

        {/* Bio */}
        <motion.p
          className="text-lg md:text-xl text-[#4a4a4a] font-light leading-relaxed max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* Two skill columns */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Video Editing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#a8b5a0]/20 flex items-center justify-center text-sm">
                  🎬
                </span>
                Video Editing
              </h3>
              <motion.ul
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.videoEditing.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={skillItem}
                    className="text-[#4a4a4a] font-light flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8b5a0]" />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>
          </motion.div>

          {/* CS Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#b8c8d4]/20 flex items-center justify-center text-sm">
                  💻
                </span>
                CS Engineering
              </h3>
              <motion.ul
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.csEngineering.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={skillItem}
                    className="text-[#4a4a4a] font-light flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8c8d4]" />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
