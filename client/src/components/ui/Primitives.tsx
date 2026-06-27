import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white leading-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}
