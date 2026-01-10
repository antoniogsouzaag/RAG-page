"use client";
import { useEffect, useId, useState, useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";

interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  color?: string;
  direction?: "top" | "bottom" | "left" | "right";
  opacitySpeed?: number;
  hovered?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacityDuration: number;
}

// Limit max particles for performance
const MAX_PARTICLES = 150;

function SparklesComponent({
  className = "",
  size = 1.2,
  density = 400,
  speed = 1,
  color = "#ffffff",
  direction = "top",
  opacitySpeed = 0.8,
  hovered = true,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const id = useId();

  // Limit particle count for performance
  const particleCount = useMemo(() => Math.min(density, MAX_PARTICLES), [density]);
  
  // Memoize particles to prevent regeneration
  const particles = useMemo(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * size + size * 0.5,
        delay: Math.random() * 2,
        duration: (Math.random() * 2 + 2) / speed,
        opacityDuration: Math.random() * 1 + opacitySpeed,
      });
    }
    return newParticles;
  }, [particleCount, size, speed, opacitySpeed]);

  // Use IntersectionObserver to pause animation when not in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const directionAnimation = useMemo(() => {
    switch (direction) {
      case "top":
        return { y: [0, -30], x: 0 };
      case "bottom":
        return { y: [0, 30], x: 0 };
      case "left":
        return { x: [0, -30], y: 0 };
      case "right":
        return { x: [0, 30], y: 0 };
      default:
        return { y: [0, -30], x: 0 };
    }
  }, [direction]);

  // Don't render particles if not in view
  const shouldAnimate = hovered && isInView;

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", contain: "layout style paint" }}>
      {particles.map((particle) => (
        <motion.div
          key={`${id}-${particle.id}`}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          initial={{ opacity: 0 }}
          animate={
            shouldAnimate
              ? {
                  opacity: [0, 1, 0],
                  ...directionAnimation,
                }
              : { opacity: 0 }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: shouldAnimate ? Infinity : 0,
            repeatType: "loop",
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export const Sparkles = memo(SparklesComponent);
export default Sparkles;
