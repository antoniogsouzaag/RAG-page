"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsCountProps {
  stats: Stat[];
  className?: string;
  showDividers?: boolean;
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setIsInView(true);

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function StatsCount({ stats, className, showDividers = true }: StatsCountProps) {
  return (
    <div className={cn("flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-0", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center px-3 md:px-6 lg:px-8"
          >
            <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-white/40 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
          
          {showDividers && index < stats.length - 1 && (
            <div className="hidden md:block h-12 w-px bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(StatsCount);
