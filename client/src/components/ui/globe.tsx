"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// NOTE: avoid reading `navigator` at module load to be safer with SSR environments.
// Provide a sane default config; specific per-device adjustments happen at runtime.
const DEFAULT_GLOBE_OPTIONS: COBEOptions = {
  width: 1400,
  height: 1400,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.6, 0.3, 1],
  glowColor: [0.4, 0.2, 0.8],
  markers: [
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
  config = DEFAULT_GLOBE_OPTIONS,
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

  // runtime-only checks
  const [glSupported, setGlSupported] = useState<boolean | null>(null);
  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


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

    // Allow user to opt into a safe (lightweight) mode
    const safeMode = (() => {
      try {
        return !!(localStorage && localStorage.getItem && localStorage.getItem('aglabs_safe_mode') === '1');
      } catch (e) {
        return false;
      }
    })();

    if (safeMode) {
      setGlSupported(false);
      window.removeEventListener("resize", onResize);
      return;
    }

    // Basic WebGL support check (defensive)
    const webglSupported = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })();

    if (!webglSupported) {
      // Avoid attempting to initialize the globe if WebGL isn't available
      setGlSupported(false);
      window.removeEventListener("resize", onResize);
      return;
    }

    let globeInstance: ReturnType<typeof createGlobe> | null = null;

    try {
      // compute per-device adjustments
      const runtimeIsMobile = isMobile;

      globeInstance = createGlobe(canvasRef.current!, {
        ...config,
        width: width * (runtimeIsMobile ? 1 : 2),
        height: width * (runtimeIsMobile ? 1 : 2),
        devicePixelRatio: runtimeIsMobile ? 1 : config.devicePixelRatio ?? 2,
        mapSamples: runtimeIsMobile ? 8000 : config.mapSamples ?? 16000,
        onRender: (state) => {
          try {
            if (!pointerInteracting.current) phi += runtimeIsMobile ? 0.001 : 0.002; // Slower rotation on mobile
            state.phi = phi + rs.get();
            state.width = width * (runtimeIsMobile ? 1 : 2);
            state.height = width * (runtimeIsMobile ? 1 : 2);
          } catch (e) {
            // protect render callback from throwing
            // eslint-disable-next-line no-console
            console.error('Error in globe onRender', e);
          }
        },
      });

      setGlSupported(true);

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 0);
    } catch (err) {
      // Log and gracefully fallback
      // eslint-disable-next-line no-console
      console.error('Globe initialization failed:', err);
      setGlSupported(false);
    }
    
    return () => {
      if (globeInstance && typeof globeInstance.destroy === 'function') {
        try {
          globeInstance.destroy();
        } catch (e) {
          // ignore
        }
      }
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  if (glSupported === false) {
    return (
      <div className={cn("relative w-full h-full aspect-square", className)}>
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-900/20 via-black to-pink-900/20 rounded-md">
          <span className="text-white/60 text-sm">Visual 3D não disponível neste dispositivo</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-full aspect-square",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
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
