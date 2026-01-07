import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "rainbow-btn group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
