"use client";

import { useEffect, useRef, useMemo } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Detect if we're on a mobile device
const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const GLOBE_CONFIG: COBEOptions = {
  width: isMobile ? 800 : 1400,
  height: isMobile ? 800 : 1400,
  onRender: () => {},
  devicePixelRatio: isMobile ? 1 : 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: isMobile ? 8000 : 16000, // Reduce samples on mobile
  mapBrightness: 1.2,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.6, 0.3, 1],
  glowColor: [0.4, 0.2, 0.8],
  markers: isMobile ? [
    // Reduce markers on mobile for performance
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
  ] : [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * (isMobile ? 1 : 2),
      height: width * (isMobile ? 1 : 2),
      onRender: (state) => {
        if (!pointerInteracting.current) phi += isMobile ? 0.001 : 0.002; // Slower rotation on mobile
        state.phi = phi + rs.get();
        state.width = width * (isMobile ? 1 : 2);
        state.height = width * (isMobile ? 1 : 2);
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);
    
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "relative w-full h-full aspect-square",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          // Disable interaction on mobile for performance
          if (!isMobile) {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }
        }}
        onPointerUp={() => !isMobile && updatePointerInteraction(null)}
        onPointerOut={() => !isMobile && updatePointerInteraction(null)}
        onMouseMove={(e) => !isMobile && updateMovement(e.clientX)}
        onTouchMove={(e) =>
          !isMobile && e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        style={{ touchAction: isMobile ? 'none' : 'auto' }}
      />
    </div>
  );
}
