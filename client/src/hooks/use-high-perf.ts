import { useEffect, useState, useRef } from 'react';

// Cache the WebGL check result to prevent repeated checks and ensure stable initial value
let cachedHighPerfResult: boolean | null = null;

function checkHighPerfWebGL(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      return false;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    let renderer = '';

    if (debugInfo) {
      try {
        renderer = gl.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL) || '';
      } catch (e) {
        // ignore
      }
    }

    const lowEndRegex = /Mali|Adreno|PowerVR|Imagination|Apple A|Intel/gi;
    const isLowEndGPU = lowEndRegex.test(renderer);
    const dpr = window.devicePixelRatio || 1;

    const safeMode = (() => {
      try {
        return !!(localStorage && localStorage.getItem && localStorage.getItem('aglabs_safe_mode') === '1');
      } catch (e) {
        return false;
      }
    })();

    // Heuristic: require webgl + not low-end GPU (or sufficiently high DPR) and not safe mode
    if (isLowEndGPU && dpr < 2) {
      return false;
    }

    if (safeMode) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

// Initialize cache at module load for stable SSR hydration
if (typeof window !== 'undefined' && cachedHighPerfResult === null) {
  cachedHighPerfResult = checkHighPerfWebGL();
}

export function useHighPerfWebGL(): boolean {
  // Use cached result as initial value to prevent flickering
  const [highPerf, setHighPerf] = useState<boolean>(() => cachedHighPerfResult ?? false);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only check once per session
    if (hasChecked.current) return;
    hasChecked.current = true;

    if (typeof window === 'undefined') {
      setHighPerf(false);
      return;
    }

    // If already cached, use cached value
    if (cachedHighPerfResult !== null) {
      setHighPerf(cachedHighPerfResult);
      return;
    }

    // Otherwise compute and cache
    const result = checkHighPerfWebGL();
    cachedHighPerfResult = result;
    setHighPerf(result);
  }, []);

  return highPerf;
}
