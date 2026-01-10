import { memo } from "react";
import { SiOpenai, SiGooglecloud, SiWhatsapp, SiInstagram, SiYoutube, SiStripe, SiSupabase, SiPostgresql, SiNextdotjs, SiTailwindcss, SiReact, SiNodedotjs, SiTypescript, SiDocker, SiN8N } from "react-icons/si";

const models = [
  { name: "OpenAI", icon: SiOpenai },
  { name: "Gemini", icon: SiGooglecloud },
  { name: "n8n", icon: SiN8N },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "WhatsApp", icon: SiWhatsapp },
  { name: "Instagram", icon: SiInstagram },
  { name: "YouTube", icon: SiYoutube },
  { name: "Stripe", icon: SiStripe },
  { name: "Supabase", icon: SiSupabase },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker }
];

function Marquee() {
  return (
    <div className="py-10 sm:py-12 md:py-16 bg-black border-y border-white/5 relative z-20 overflow-hidden">
      {/* CSS for marquee animation - optimized for consistent speed across all screen sizes */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container {
          display: flex;
          width: fit-content;
        }
        .marquee-track {
          display: flex;
          flex-shrink: 0;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .marquee-item:hover {
          color: rgba(255, 255, 255, 0.7);
        }
        .marquee-item:hover .marquee-icon {
          opacity: 0.8;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
      
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-40 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-40 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="marquee-container">
        <div className="marquee-track gap-8 sm:gap-12 md:gap-16 items-center">
          {/* First set */}
          {models.map((model, index) => (
            <div 
              key={`a-${index}`} 
              className="marquee-item flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-display font-medium text-white/20 transition-colors duration-300 cursor-default px-4 sm:px-6"
            >
              <model.icon className="marquee-icon w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-50 shrink-0 transition-opacity duration-300" />
              <span className="tracking-tighter whitespace-nowrap">{model.name}</span>
            </div>
          ))}
          {/* Second set (duplicate for seamless loop) */}
          {models.map((model, index) => (
            <div 
              key={`b-${index}`} 
              className="marquee-item flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-display font-medium text-white/20 transition-colors duration-300 cursor-default px-4 sm:px-6"
            >
              <model.icon className="marquee-icon w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-50 shrink-0 transition-opacity duration-300" />
              <span className="tracking-tighter whitespace-nowrap">{model.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Marquee);
