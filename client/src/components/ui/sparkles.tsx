"use client";
import { useEffect, useId, useState } from "react";
import { motion, useAnimation } from "framer-motion";

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

export function Sparkles({
  className = "",
  size = 1.2,
  density = 400,
  speed = 1,
  color = "#ffffff",
  direction = "top",
  opacitySpeed = 0.8,
  hovered = true,
}: SparklesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const id = useId();

  useEffect(() => {
    const particleCount = density;
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

    setParticles(newParticles);
  }, [density, size, speed, opacitySpeed]);

  const getDirectionAnimation = () => {
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
  };

  return (
    <div className={className} style={{ position: "relative" }}>
      {particles.map((particle) => (
        <motion.div
          key={`${id}-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          initial={{ opacity: 0 }}
          animate={
            hovered
              ? {
                  opacity: [0, 1, 0],
                  ...getDirectionAnimation(),
                }
              : { opacity: 0 }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default Sparkles;
