"use client";

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  };

  return (
    <motion.div {...animations} className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  loop?: boolean;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, loop = true, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (index < childrenArray.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else if (loop) {
          // Pausar mais tempo antes de reiniciar para dar tempo de ver todos
          setTimeout(() => {
            setIndex(0);
          }, delay * 1.5);
        }
      }, delay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length, loop]);

    // Mostrar itens na ordem correta (de cima para baixo)
    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, index + 1);
    }, [index, childrenArray]);

    return (
      <div
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
