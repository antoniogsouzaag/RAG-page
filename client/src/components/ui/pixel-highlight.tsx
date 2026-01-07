"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface PixelHighlightProps {
  text: string;
  colors?: string;
  direction?: "top" | "bottom" | "left" | "right";
  speed?: number;
  gap?: number;
  fontSize?: number;
  className?: string;
}

export function PixelHighlight({
  text,
  colors = "#8B5CF6, #A78BFA, #C4B5FD",
  direction = "top",
  speed = 70,
  gap = 4,
  fontSize = 10,
  className,
}: PixelHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const colorArray = useMemo(() => colors.split(",").map((c) => c.trim()), [colors]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const pixels = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    ctx.fillStyle = "#000";
    ctx.font = `bold ${fontSize * 10}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newPixels: { x: number; y: number; color: string; delay: number }[] = [];

    // Use larger gap for better performance
    const pixelGap = Math.max(gap, 4);

    for (let y = 0; y < canvas.height; y += pixelGap) {
      for (let x = 0; x < canvas.width; x += pixelGap) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          const color = colorArray[Math.floor(Math.random() * colorArray.length)];
          let delay = 0;
          
          switch (direction) {
            case "top":
              delay = y / canvas.height;
              break;
            case "bottom":
              delay = 1 - y / canvas.height;
              break;
            case "left":
              delay = x / canvas.width;
              break;
            case "right":
              delay = 1 - x / canvas.width;
              break;
          }

          newPixels.push({ x, y, color, delay: delay * (speed / 100) });
        }
      }
    }

    return newPixels;
  }, [dimensions, text, colorArray, direction, gap, fontSize, speed]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {dimensions.width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {pixels.map((pixel, index) => (
            <rect
              key={index}
              x={pixel.x}
              y={pixel.y}
              width={Math.max(gap, 4) - 1}
              height={Math.max(gap, 4) - 1}
              fill={pixel.color}
              className="animate-pixel-fade"
              style={{
                animationDelay: `${pixel.delay}s`,
                opacity: 0,
              }}
            />
          ))}
        </svg>
      )}
      <style>{`
        @keyframes pixel-fade {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-pixel-fade {
          animation: pixel-fade 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default PixelHighlight;
