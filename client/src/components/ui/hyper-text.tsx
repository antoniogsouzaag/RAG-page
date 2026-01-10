"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  framerProps?: Variants;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperTextComponent({
  children,
  className,
  duration = 150,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children.split(""));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (iterations.current < children.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= iterations.current
                ? children[i]
                : alphabets[getRandomInt(26)]
          )
        );
        iterations.current = iterations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (children.length * 10));
    return () => clearInterval(interval);
  }, [children, duration, trigger, animateOnLoad]);

  return (
    <span
      className={cn("inline-flex overflow-hidden", className)}
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(letter === " " ? "w-2" : "")}
            {...framerProps}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export const HyperText = memo(HyperTextComponent);
