"use client";

import { useEffect, useMemo, useRef, useState, memo } from 'react';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const idx = queries.findIndex(q => matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(get());

    const handlers: MediaQueryList[] = queries.map(q => matchMedia(q));
    const onChange = () => setValue(get());

    handlers.forEach(mq => mq.addEventListener('change', onChange));
    return () => handlers.forEach(mq => mq.removeEventListener('change', onChange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join('|'), values.join('|')]);

  return value;
};



// Simplified image component for masonry items - uses direct PNG since optimized versions not available
const MasonryImage = memo(function MasonryImage({ 
  src, 
  alt = "",
  className = ""
}: { 
  src: string; 
  alt?: string; 
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className={className}
      style={{ contentVisibility: 'auto' }}
    />
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        setInView(true);
      }
    }, { threshold: 0.1, rootMargin: '100px' });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [inView]);

  // Memoize items for CSS masonry
  const masonryItems = useMemo(() => items, [items]);

  // Track which items entered viewport so we can toggle lightweight CSS animation
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Fallback: if IntersectionObserver isn't working, show items after a delay
    const fallbackTimer = setTimeout(() => {
      Object.values(itemRefs.current).forEach(el => {
        if (el && !el.classList.contains('masonry-item-visible')) {
          el.classList.add('masonry-item-visible');
        }
      });
    }, 500);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const id = Number(el.dataset.key);
        if (!isNaN(id) && entry.isIntersecting) {
          // add visible class for animation
          el.classList.add('masonry-item-visible');
        }
      });
    }, { root: null, threshold: 0.05, rootMargin: '50px' });

    // Small delay to ensure refs are populated
    requestAnimationFrame(() => {
      Object.values(itemRefs.current).forEach(el => { if (el) io.observe(el); });
    });

    return () => {
      clearTimeout(fallbackTimer);
      io.disconnect();
    };
  }, [items]);

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

  // Show content immediately since items use their own visibility logic
  const isReady = masonryItems.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
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
            className="mb-4 break-inside-avoid relative cursor-pointer overflow-hidden rounded-xl shadow-lg masonry-item"
            style={{ contain: 'layout paint' }}
            onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
              <MasonryImage
                src={item.img}
                alt=""
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
          transform: translateY(10px); 
          transition: opacity 0.4s ease-out, transform 0.4s ease-out; 
        }
        .masonry-item-visible { 
          opacity: 1 !important; 
          transform: translateY(0) !important; 
        }
        .break-inside-avoid { break-inside: avoid-column; }
        .w-full img { width: 100%; display: block; }
      `}</style>
    </div>
  );
};

export default Masonry;
