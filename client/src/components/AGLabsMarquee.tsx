import { memo } from "react";

// Generative AI tools and models for the AGLabs app
const generativeTools = [
  { name: "Flux Pro", emoji: "🎨" },
  { name: "DALL-E 3", emoji: "🖼️" },
  { name: "Midjourney", emoji: "✨" },
  { name: "Stable Diffusion", emoji: "🌊" },
  { name: "Sora", emoji: "🎬" },
  { name: "Runway Gen-3", emoji: "🎥" },
  { name: "ElevenLabs", emoji: "🎙️" },
  { name: "Suno AI", emoji: "🎵" },
  { name: "Claude", emoji: "🧠" },
  { name: "GPT-4o", emoji: "💬" },
  { name: "Gemini", emoji: "💎" },
  { name: "LLaMA", emoji: "🦙" },
  { name: "Whisper", emoji: "👂" },
  { name: "Kling", emoji: "🎞️" },
  { name: "Luma Dream", emoji: "💭" },
];

function AGLabsMarquee() {
  return (
    <div className="py-10 sm:py-12 md:py-16 bg-[#050505] border-y border-white/5 relative z-20 overflow-hidden">
      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee-scroll-aglabs {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container-aglabs {
          display: flex;
          width: fit-content;
        }
        .marquee-track-aglabs {
          display: flex;
          flex-shrink: 0;
          animation: marquee-scroll-aglabs 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .marquee-item-aglabs:hover {
          color: rgba(255, 255, 255, 0.8);
          transform: scale(1.05);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-aglabs {
            animation: none;
          }
        }
      `}</style>
      
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-40 bg-linear-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-40 bg-linear-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      
      <div className="marquee-container-aglabs">
        <div className="marquee-track-aglabs gap-8 sm:gap-12 md:gap-16 items-center">
          {/* First set */}
          {generativeTools.map((tool, index) => (
            <div 
              key={`a-${index}`} 
              className="marquee-item-aglabs flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-display font-medium text-white/25 transition-all duration-300 cursor-default px-4 sm:px-6"
            >
              <span className="text-2xl sm:text-3xl">{tool.emoji}</span>
              <span className="tracking-tight whitespace-nowrap">{tool.name}</span>
            </div>
          ))}
          {/* Second set (duplicate for seamless loop) */}
          {generativeTools.map((tool, index) => (
            <div 
              key={`b-${index}`} 
              className="marquee-item-aglabs flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-display font-medium text-white/25 transition-all duration-300 cursor-default px-4 sm:px-6"
            >
              <span className="text-2xl sm:text-3xl">{tool.emoji}</span>
              <span className="tracking-tight whitespace-nowrap">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(AGLabsMarquee);
