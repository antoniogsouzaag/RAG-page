"use client";

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const AnimatedListItem = React.memo(function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  const animations: MotionProps = useMemo(() => ({
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: isMobile ? 0.3 : undefined
    },
  }), [isMobile]);

  return (
    <motion.div {...animations} className="mx-auto w-full">
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
    const [isInView, setIsInView] = useState(false);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    // Track visibility with state instead of ref for proper reactivity
    useEffect(() => {
      if (!containerRef.current) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    // Animation timer - only runs when in view
    useEffect(() => {
      if (!isInView) return; // Don't start timer if not in view
      
      const actualDelay = isMobile ? delay * 0.7 : delay;
      
      const timeout = setTimeout(() => {
        if (index < childrenArray.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else if (loop) {
          // Reset after showing all items
          setIndex(0);
        }
      }, actualDelay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length, loop, isMobile, isInView]);

    // Mostrar itens na ordem correta (de cima para baixo)
    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, index + 1);
    }, [index, childrenArray]);

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        <AnimatePresence mode="sync">
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
