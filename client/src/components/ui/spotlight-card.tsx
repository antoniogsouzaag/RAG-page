import React, { useRef, useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard = memo(function SpotlightCard({
  children,
  className,
  spotlightColor = "255, 255, 255",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const isMobile = useIsMobile();

  // Disable spotlight effect on mobile for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setOpacity(1);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setOpacity(0);
  }, [isMobile]);

  return (
    <div
      ref={divRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/50",
        className
      )}
      {...props}
    >
      {/* Spotlight effect - only render on desktop */}
      {!isMobile && (
        <>
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: opacity * 0.5,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, 0.08), transparent 50%)`,
            }}
          />
          {/* Border glow effect */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: opacity * 0.6,
              background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, 0.25), transparent 50%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              padding: "1px",
              borderRadius: "inherit",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
});
