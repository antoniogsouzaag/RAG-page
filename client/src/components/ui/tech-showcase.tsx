import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface TechShowcaseProps {
  items: TechItem[];
  className?: string;
}

export default function TechShowcase({ items, className }: TechShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full',
        className,
      )}
    >
      {/* ── Left: photo grid ── */}
      <div className="flex gap-2 md:gap-3 shrink-0 overflow-x-auto pb-1 md:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((item) => (
            <TechCard
              key={item.id}
              item={item}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-2 md:gap-3 mt-12 sm:mt-14 md:mt-[68px]">
          {col2.map((item) => (
            <TechCard
              key={item.id}
              item={item}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — offset mid */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-8">
          {col3.map((item) => (
            <TechCard
              key={item.id}
              item={item}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: tech item list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {items.map((item) => (
          <TechRow
            key={item.id}
            item={item}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Tech photo card
───────────────────────────────────────── */

function TechCard({
  item,
  className,
  hoveredId,
  onHover,
}: {
  item: TechItem;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === item.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer shrink-0 transition-opacity duration-400 bg-zinc-900',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        loading="lazy"
        decoding="async"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(1)'
            : 'grayscale(1) brightness(0.6)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Tech item row
───────────────────────────────────────── */

function TechRow({
  item,
  hoveredId,
  onHover,
}: {
  item: TechItem;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === item.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'h-3 rounded-[5px] shrink-0 transition-all duration-300',
            isActive ? 'bg-white w-5' : 'bg-white/25 w-4',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-white' : 'text-white/80',
          )}
        >
          {item.name}
        </span>
      </div>

      <p className="mt-1.5 pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        {item.category}
      </p>
    </div>
  );
}
