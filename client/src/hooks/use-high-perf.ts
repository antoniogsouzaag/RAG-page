import { useEffect, useState } from 'react';

export function useHighPerfWebGL() {
  const [highPerf, setHighPerf] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setHighPerf(false);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) {
        setHighPerf(false);
        return;
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
        setHighPerf(false);
        return;
      }

      if (safeMode) {
        setHighPerf(false);
        return;
      }

      setHighPerf(true);
    } catch (e) {
      setHighPerf(false);
    }
  }, []);

  return highPerf;
}
