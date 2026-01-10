"use client";

import { memo, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperTextComponent({
  children,
  className,
  duration = 150,
  animateOnLoad = true,
}: HyperTextProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  
  const initialText = useMemo(() => children.split(""), [children]);
  const [displayText, setDisplayText] = useState(initialText);
  const [trigger, setTrigger] = useState(false);
  const iterationsRef = useRef(0);
  const isFirstRender = useRef(true);

  // Disable animation on mobile for performance and to fix touch issues
  const shouldAnimate = !isMobile && !reducedMotion;

  const triggerAnimation = useCallback(() => {
    if (!shouldAnimate) return;
    iterationsRef.current = 0;
    setTrigger(true);
  }, [shouldAnimate]);

  useEffect(() => {
    // Skip animation completely on mobile or if reduced motion
    if (!shouldAnimate) {
      setDisplayText(initialText);
      return;
    }
    
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (iterationsRef.current < children.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= iterationsRef.current
                ? children[i]
                : alphabets[getRandomInt(26)]
          )
        );
        iterationsRef.current = iterationsRef.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (children.length * 10));
    return () => clearInterval(interval);
  }, [children, duration, trigger, animateOnLoad, shouldAnimate, initialText]);

  // Simple render for mobile - no animation, just text
  // Use inline-block to preserve text gradient clipping from parent
  if (!shouldAnimate) {
    return (
      <span className={cn("inline-block", className)}>
        {children.toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex flex-wrap", className)}
      onMouseEnter={triggerAnimation}
    >
      {displayText.map((letter, i) => (
        <motion.span
          key={`${i}-${letter}`}
          className={cn(letter === " " ? "w-2" : "")}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{ display: 'inline-block' }}
        >
          {letter.toUpperCase()}
        </motion.span>
      ))}
    </span>
  );
}

export const HyperText = memo(HyperTextComponent);
