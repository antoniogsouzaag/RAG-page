"use client";

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Simple fade-in animation for each item
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Item individual with stable animation
export const AnimatedListItem = React.memo(function AnimatedListItem({ 
  children,
  delay = 0,
}: { 
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      transition={{ 
        duration: 0.4, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
});

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  /** Cadência (ms) entre a revelação de cada item. */
  delay?: number;
  /** Tempo (ms) que a lista completa permanece visível antes de reiniciar o loop. */
  holdDelay?: number;
  loop?: boolean;
}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1500,
    holdDelay = 5000,
    loop = true,
    ...props
  }: AnimatedListProps) => {
    const [visibleCount, setVisibleCount] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    const totalItems = childrenArray.length;

    // Track container visibility with IntersectionObserver
    useEffect(() => {
      if (!containerRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    // Animation timer - only runs when visible, uses stable logic.
    // Cadence is uniform between reveals; once every item is shown the list
    // is held for `holdDelay` (much longer) so the final card stays readable
    // before the loop restarts.
    useEffect(() => {
      if (!isVisible) {
        // Clear timer when not visible
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      const allShown = visibleCount >= totalItems;

      // Nothing left to do when fully shown and not looping
      if (allShown && !loop) return;

      // Long hold once everything is visible, otherwise the regular cadence
      const wait = allShown ? holdDelay : delay;

      timerRef.current = setTimeout(() => {
        setVisibleCount((prev) => (prev >= totalItems ? 1 : prev + 1));
      }, wait);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [visibleCount, delay, holdDelay, totalItems, loop, isVisible]);

    // Get items to display
    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, visibleCount);
    }, [visibleCount, childrenArray]);

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        {itemsToShow.map((item, i) => (
          <AnimatedListItem 
            key={`item-${i}`}
            delay={i === visibleCount - 1 ? 0.1 : 0} // Only animate the newest item
          >
            {item}
          </AnimatedListItem>
        ))}
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
