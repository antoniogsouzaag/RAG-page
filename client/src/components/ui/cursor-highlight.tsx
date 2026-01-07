"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorHighlightProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  showPointer?: boolean;
  pointerClassName?: string;
  rectangle?: string;
}

export function CursorHighlight({
  children,
  className,
  gradient = "from-purple-500 via-pink-500 to-purple-500",
  showPointer = true,
  pointerClassName = "text-purple-500",
  rectangle = "border-white/20 rounded-lg p-4",
}: CursorHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", rectangle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient text */}
      <div
        className={cn(
          `bg-linear-to-r ${gradient} bg-clip-text text-transparent`,
          className
        )}
      >
        {children}
      </div>

      {/* Animated pointer */}
      {showPointer && isHovered && (
        <motion.div
          className={cn("absolute pointer-events-none", pointerClassName)}
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-lg"
          >
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" />
          </svg>
        </motion.div>
      )}

      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 blur-xl opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.4), transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        />
      )}
    </div>
  );
}

export default CursorHighlight;
