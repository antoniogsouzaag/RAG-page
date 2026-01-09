"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type SpeedType = number | "slow" | "normal" | "fast";

interface TypeanimationProps {
  words?: string[];
  className?: string;
  typingSpeed?: SpeedType;
  deletingSpeed?: SpeedType;
  pauseDuration?: number;
}

const normalizeSpeed = (s: SpeedType) => (typeof s === "number" ? s : s === "slow" ? 120 : s === "fast" ? 20 : 60);

const Typeanimation = ({
  words = ["existence", "reality", "the Internet"],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
}: TypeanimationProps) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const word = useMemo(() => words[index % words.length], [index, words]);
  const typeSpeed = normalizeSpeed(typingSpeed);
  const delSpeed = normalizeSpeed(deletingSpeed);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length - 1)), delSpeed);
      } else {
        setIsDeleting(false);
        setIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, word, typeSpeed, delSpeed, pauseDuration]);

  return (
    <motion.span
      className={cn(className)}
      style={{
        background: "linear-gradient(90deg, #c084fc, #22d3ee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {display}
      <span className="inline-block w-1 bg-white ml-1 align-middle animate-pulse" style={{ height: '1em', opacity: 0.9 }} />
    </motion.span>
  );
};

export default Typeanimation;
