"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — thin progress bar at the very top of the viewport
 * that fills as the user scrolls down the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#ffb833]/60 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
