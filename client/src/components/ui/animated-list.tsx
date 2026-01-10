"use client";

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence, motion, MotionProps, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Item individual com animação baseada em inView
export const AnimatedListItem = React.memo(function AnimatedListItem({ 
  children,
  delay = 0,
  index,
}: { 
  children: React.ReactNode;
  delay?: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  
  return (
    <motion.div
      ref={ref}
      data-index={index}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      layout="position"
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
});

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  loop?: boolean;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, loop = true, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    // Track container visibility
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

    // Animation timer - only runs when visible
    useEffect(() => {
      if (!isVisible) return;
      
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => {
          // Se chegou ao final e loop está ativo, volta ao início
          if (prevIndex >= childrenArray.length - 1) {
            return loop ? 0 : prevIndex;
          }
          return prevIndex + 1;
        });
      }, delay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length, loop, isVisible]);

    // Items to show - sempre mostra do início até o índice atual
    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, index + 1);
    }, [index, childrenArray]);

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {itemsToShow.map((item, i) => (
            <AnimatedListItem 
              key={`${index >= childrenArray.length - 1 && loop ? 'loop-' : ''}${(item as React.ReactElement).key || i}`}
              delay={0.05 * i}
              index={i}
            >
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
