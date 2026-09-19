"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * GlassCard — reusable glassmorphism card component.
 * Semi-transparent white background with backdrop-blur, subtle border,
 * and a hover effect (slight scale + shadow increase).
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-[#0a0a0c]/60 backdrop-blur-xl
        border border-[#ffb833]/15
        shadow-lg shadow-black/[0.03]
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.08)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
