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
    initial: isMobile ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 },
    animate: isMobile ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
    exit: isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
    transition: { 
      type: isMobile ? "tween" : "spring", 
      stiffness: 300, 
      damping: 30,
      duration: isMobile ? 0.2 : undefined
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
    const isMobile = useIsMobile();
    const isInView = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    // Only animate when in view to save resources
    useEffect(() => {
      if (!containerRef.current) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          isInView.current = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const actualDelay = isMobile ? delay * 0.8 : delay; // Faster on mobile
      
      const timeout = setTimeout(() => {
        if (!isInView.current) return; // Skip animation if not in view
        
        if (index < childrenArray.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else if (loop) {
          // Pausar mais tempo antes de reiniciar para dar tempo de ver todos
          setTimeout(() => {
            setIndex(0);
          }, actualDelay * 1.5);
        }
      }, actualDelay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length, loop, isMobile]);

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
