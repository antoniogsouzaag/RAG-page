"use client";

import { memo, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  animateOnLoad?: boolean;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomChar = () => ALPHABETS[Math.floor(Math.random() * 26)];

export function HyperTextComponent({
  children,
  className,
  duration = 800,
  animateOnLoad = true,
}: HyperTextProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  
  // Memoize the text to prevent unnecessary recalculations
  const text = useMemo(() => children.toUpperCase(), [children]);
  const textChars = useMemo(() => text.split(""), [text]);
  const textLength = textChars.length;
  
  const [displayText, setDisplayText] = useState<string[]>(() => 
    animateOnLoad ? textChars.map(c => c === " " ? " " : getRandomChar()) : textChars
  );
  const [isAnimating, setIsAnimating] = useState(animateOnLoad);
  const iterationsRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Disable animation on mobile for performance and to fix touch issues
  const shouldAnimate = !isMobile && !reducedMotion;

  const triggerAnimation = useCallback(() => {
    if (!shouldAnimate || isAnimating) return;
    iterationsRef.current = 0;
    lastTimeRef.current = 0;
    setIsAnimating(true);
  }, [shouldAnimate, isAnimating]);

  // Animation effect using requestAnimationFrame for smoother performance
  useEffect(() => {
    if (!shouldAnimate || !isAnimating) {
      setDisplayText(textChars);
      return;
    }

    const intervalMs = duration / textLength;
    
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      
      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed >= intervalMs) {
        lastTimeRef.current = timestamp;
        iterationsRef.current += 1;
        
        if (iterationsRef.current >= textLength) {
          // Animation complete - set final text
          setDisplayText(textChars);
          setIsAnimating(false);
          return;
        }
        
        // Update display text
        setDisplayText(prev => 
          prev.map((char, i) => {
            if (textChars[i] === " ") return " ";
            if (i < iterationsRef.current) return textChars[i];
            return getRandomChar();
          })
        );
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [shouldAnimate, isAnimating, textLength, duration, textChars]);

  // Simple render for mobile - no animation, just text
  if (!shouldAnimate) {
    return (
      <span className={cn("inline-block", className)}>
        {text}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={triggerAnimation}
    >
      {displayText.map((letter, i) => (
        <span
          key={i}
          className={cn(letter === " " ? "w-[0.3em]" : "")}
          style={{ display: 'inline-block' }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export const HyperText = memo(HyperTextComponent);
