"use client";

import { useEffect, useMemo, useRef, useState, memo, useCallback } from 'react';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  // Get initial value synchronously to avoid layout shift
  const getInitial = () => {
    if (typeof window === 'undefined') return defaultValue;
    const idx = queries.findIndex(q => matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };

  const [value, setValue] = useState(getInitial);

  useEffect(() => {
    const handlers: MediaQueryList[] = queries.map(q => matchMedia(q));
    const onChange = () => {
      const idx = queries.findIndex(q => matchMedia(q).matches);
      setValue(values[idx] ?? defaultValue);
    };

    handlers.forEach(mq => mq.addEventListener('change', onChange));
    return () => handlers.forEach(mq => mq.removeEventListener('change', onChange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join('|'), values.join('|')]);

  return value;
};



// Simplified image component for masonry items - with stable loading
const MasonryImage = memo(function MasonryImage({ 
  src, 
  alt = "",
  className = "",
  height,
  onLoad
}: { 
  src: string; 
  alt?: string; 
  className?: string;
  height: number;
  onLoad?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  
  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ 
        minHeight: loaded ? 'auto' : `${height}px`,
      }}
    >
      {/* Skeleton placeholder */}
      {!loaded && (
        <div 
          className="absolute inset-0 bg-zinc-800/50 animate-pulse rounded-xl"
          style={{ height: `${height}px` }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={handleLoad}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: 'opacity 0.3s ease-out',
          minHeight: loaded ? 'auto' : `${height}px`,
        }}
      />
    </div>
  );
});

interface MasonryItem {
  id: number;
  img: string;
  height: number;
  url?: string;
}

interface MasonryProps {
  items: MasonryItem[];
  scaleOnHover?: boolean;
  hoverScale?: number;
  colorShiftOnHover?: boolean;
}

const Masonry = ({
  items,
  scaleOnHover = true,
  hoverScale = 0.95,
  colorShiftOnHover = false
}: MasonryProps) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [5, 4, 3],
    2
  );

  const containerRef = useRef<HTMLDivElement>(null);
  // Store column count on mount to prevent layout shifts
  const initialColumnsRef = useRef<number | null>(null);
  
  // Lock column count after initial render to prevent reorganization during scroll
  useEffect(() => {
    if (initialColumnsRef.current === null) {
      initialColumnsRef.current = columns;
    }
  }, [columns]);

  // Memoize items to prevent unnecessary re-renders
  const masonryItems = useMemo(() => items, [items]);

  // Track which items entered viewport so we can toggle lightweight CSS animation
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedItemsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create single observer instance for all items
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Use requestAnimationFrame to batch DOM updates
          requestAnimationFrame(() => {
            el.classList.add('masonry-item-visible');
          });
          // Unobserve after visible to reduce overhead
          observerRef.current?.unobserve(el);
        }
      });
    }, { root: null, threshold: 0.01, rootMargin: '200px' });

    // Observe all items after a frame to ensure refs are populated
    requestAnimationFrame(() => {
      Object.entries(itemRefs.current).forEach(([id, el]) => { 
        if (el && !observedItemsRef.current.has(Number(id))) {
          observerRef.current?.observe(el);
          observedItemsRef.current.add(Number(id));
        }
      });
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [masonryItems.length]); // Only re-run when items count changes

  const handleMouseEnter = useCallback((id: number) => {
    if (!scaleOnHover) return;
    const el = itemRefs.current[id];
    if (!el) return;
    el.style.transform = `scale(${hoverScale})`;
  }, [scaleOnHover, hoverScale]);

  const handleMouseLeave = useCallback((id: number) => {
    if (!scaleOnHover) return;
    const el = itemRefs.current[id];
    if (!el) return;
    el.style.transform = '';
  }, [scaleOnHover]);

  // Use locked column count or current if not locked yet
  const stableColumns = initialColumnsRef.current ?? columns;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      {/* CSS-driven Masonry with stable column count */}
      <div
        className="w-full"
        style={{ 
          columnCount: stableColumns, 
          columnGap: 16,
          // Prevent layout recalculation
          contain: 'layout style',
        }}
      >
        {masonryItems.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            ref={(el) => { itemRefs.current[item.id] = el; }}
            className="mb-4 break-inside-avoid relative cursor-pointer overflow-hidden rounded-xl shadow-lg masonry-item"
            style={{ 
              contain: 'layout paint', 
              // Reserve space to prevent layout shifts
              minHeight: `${item.height}px`,
            }}
            onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
              <MasonryImage
                src={item.img}
                alt=""
                height={item.height}
                className="w-full block rounded-xl object-cover"
              />
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-xl bg-linear-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none transition-opacity duration-300" />
            )}
          </div>
        ))}
      </div>

      <style>{`
        .masonry-item { 
          opacity: 0; 
          transform: translate3d(0, 12px, 0); 
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          contain: layout style paint;
          will-change: opacity, transform;
        }
        .masonry-item-visible { 
          opacity: 1 !important; 
          transform: none !important;
          will-change: auto;
          contain: layout style;
          transition: transform 0.28s cubic-bezier(0.22, 0.9, 0.32, 1);
        }
        .break-inside-avoid { break-inside: avoid-column; }
        .w-full img { width: 100%; display: block; }
        @media (prefers-reduced-motion: reduce) {
          .masonry-item { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </div>
  );
};

export default Masonry;
