"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const idx = queries.findIndex(q => matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Atualiza valor correto após montagem
    setValue(get());

    const handlers: MediaQueryList[] = queries.map(q => matchMedia(q));
    const onChange = () => setValue(get());

    handlers.forEach(mq => mq.addEventListener('change', onChange));
    return () => handlers.forEach(mq => mq.removeEventListener('change', onChange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join('|'), values.join('|')]);

  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// lightweight image preloader (kept for optional prefetching)
const preloadImages = async (urls: string[]) => {
  if (!urls || !urls.length) return;
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve(null);
        })
    )
  );
};

interface MasonryItem {
  id: number;
  img: string;
  height: number;
  url?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}: MasonryProps) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [5, 4, 3],
    2
  );

  const [containerRef, { width }] = useMeasure();
  const [inView, setInView] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        setInView(true);
      }
    }, { threshold: 0.1, rootMargin: '0px' });

    observerRef.current.observe(containerRef.current);

    return () => observerRef.current?.disconnect();
  }, [inView]);

  // Simpler CSS-driven masonry based on `column-count` to avoid heavy layout
  const grid = useMemo(() => ({ items, height: 0 }), [items]);

  // Track which items entered viewport so we can toggle lightweight CSS animation
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const id = Number(el.dataset.key);
        if (!isNaN(id) && entry.isIntersecting) {
          // add visible class for animation
          el.classList.add('masonry-item-visible');

          // lazy-load the image inside this item using data-src to avoid re-renders
          const img = el.querySelector('img[data-src]') as HTMLImageElement | null;
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        }
      });
    }, { root: null, threshold: 0.15 });

    Object.values(itemRefs.current).forEach(el => { if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items, containerRef]);

  const handleMouseEnter = (id: number) => {
    if (!scaleOnHover) return;
    const el = itemRefs.current[id];
    if (!el) return;
    el.style.transform = `scale(${hoverScale})`;
    el.style.transition = 'transform 0.28s cubic-bezier(.22,.9,.32,1)';
  };

  const handleMouseLeave = (id: number) => {
    if (!scaleOnHover) return;
    const el = itemRefs.current[id];
    if (!el) return;
    el.style.transform = '';
  };

  // Verifica se está pronto para renderizar: mostramos o grid quando o container entrar em view
  const isReady = inView && grid.items.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: !isReady ? 300 : undefined }}
    >
      {/* Loading skeleton enquanto carrega */}
      {!isReady && (
        <div className="w-full p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: Math.min(items.length || 6, 8) }).map((_, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-xl animate-pulse" style={{ height: 120 + (i % 3) * 40 }} />
            ))}
          </div>
        </div>
      )}

      {/* CSS-driven Masonry */}
      <div
        className="w-full"
        style={{ columnCount: columns, columnGap: 16, transition: 'column-count 0.25s ease' }}
      >
        {items.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            ref={(el) => { itemRefs.current[item.id] = el; }}
            className={`mb-4 break-inside-avoid relative cursor-pointer overflow-hidden rounded-xl shadow-lg transform transition-opacity duration-600 opacity-0`}
            style={{ willChange: 'transform, opacity, filter' }}
            onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
              <img
                // load only when item enters viewport (observer will set `src` from `data-src`)
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                data-src={item.img}
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full block rounded-xl object-cover"
                style={{ display: 'block' }}
                onLoad={() => setLoadedCount(c => c + 1)}
              />
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-xl bg-linear-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none transition-opacity duration-300" />
            )}
          </div>
        ))}
      </div>

      <style>{`\n        .masonry-item-visible { opacity: 1 !important; transform: translateY(0) !important; transition: opacity .5s ease, transform .5s cubic-bezier(.22,.9,.32,1); }\n        .break-inside-avoid { break-inside: avoid-column; }\n        .w-full img { width: 100%; }\n      `}</style>
    </div>
  );
};

export default Masonry;
