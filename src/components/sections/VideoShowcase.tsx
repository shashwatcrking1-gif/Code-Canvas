"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { videoProjects } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoModal } from "@/components/ui/VideoModal";

/**
 * Video Showcase Section — responsive grid of video editing project cards.
 * Each card shows a gradient placeholder thumbnail, title, description, and
 * a "Watch" button that opens the video in a modal.
 */

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export function VideoShowcase() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Video Work"
          subtitle="Cinematic edits, motion graphics, and visual storytelling"
        />

        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videoProjects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <GlassCard className="group">
                {/* Gradient thumbnail placeholder */}
                <div
                  className="aspect-video w-full rounded-t-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${project.thumbnailGradient[0]}, ${project.thumbnailGradient[1]})`,
                  }}
                >
                  {/* Play button overlay */}
                  <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="#1a1a1a"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#4a4a4a] font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <button
                    onClick={() => setActiveVideoId(project.youtubeId)}
                    className="text-sm font-medium text-[#8fa085] hover:text-[#6b7d63] transition-colors focus:outline-none focus:ring-2 focus:ring-[#a8b5a0]/50 rounded-lg px-3 py-1.5 -ml-3"
                  >
                    Watch →
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <VideoModal
        youtubeId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </section>
  );
}
