import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm hover:border-white/10 transition-all duration-300"
        >
          <div className="aspect-video w-full overflow-hidden bg-zinc-900">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="px-4 py-3">
            <p className="text-[11px] text-zinc-500 mb-0.5 uppercase tracking-wide">
              {item.category}
            </p>
            <h3 className="text-white font-semibold text-sm md:text-base leading-tight">
              {item.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
