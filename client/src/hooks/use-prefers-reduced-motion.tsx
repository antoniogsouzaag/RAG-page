import { useEffect, useState } from "react";

export default function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const evaluate = () => {
      setReduceMotion(mq.matches || !hoverMq.matches);
    };

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
