"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: typeof window !== "undefined" && window.innerWidth < 600 ? 320 : 600,
  height: typeof window !== "undefined" && window.innerWidth < 600 ? 320 : 600,
  onRender: () => {},
  devicePixelRatio: typeof window !== "undefined" && window.devicePixelRatio < 1.5 ? window.devicePixelRatio : 1.2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 8000,
  mapBrightness: 1.2,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.6, 0.3, 1],
  glowColor: [0.4, 0.2, 0.8],
  markers: [
    { location: [-23.5505, -46.6333], size: 0.12 }, // São Paulo
    { location: [-22.9068, -43.1729], size: 0.08 }, // Rio de Janeiro
    { location: [40.7128, -74.006], size: 0.1 }, // New York
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
    { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
    { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
    { location: [52.52, 13.405], size: 0.06 }, // Berlin
    { location: [48.8566, 2.3522], size: 0.06 }, // Paris
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
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.001; // Slower rotation
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
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
        "mx-auto aspect-square w-full max-w-[800px] lg:max-w-[900px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
