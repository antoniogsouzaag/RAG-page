import { useEffect, useState } from "react";

// Get initial value synchronously to prevent layout shifts
function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    return mq.matches || !hoverMq.matches;
  } catch {
    return false;
  }
}

// Cache initial value at module load
const INITIAL_REDUCED_MOTION = typeof window !== "undefined" 
  ? getInitialReducedMotion() 
  : false;

export default function usePrefersReducedMotion(): boolean {
  // Use stable initial value
  const [reduceMotion, setReduceMotion] = useState<boolean>(INITIAL_REDUCED_MOTION);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const evaluate = () => {
      setReduceMotion(mq.matches || !hoverMq.matches);
    };

    // Sync with actual value on mount
    evaluate();

    if (mq.addEventListener) mq.addEventListener("change", evaluate);
    else mq.addListener(evaluate);

    if (hoverMq.addEventListener) hoverMq.addEventListener("change", evaluate);
    else hoverMq.addListener(evaluate);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", evaluate);
      else mq.removeListener(evaluate);

      if (hoverMq.removeEventListener) hoverMq.removeEventListener("change", evaluate);
      else hoverMq.removeListener(evaluate);
    };
  }, []);

  return reduceMotion;
}
