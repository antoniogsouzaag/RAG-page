import { motion } from "framer-motion";

const technologies = [
  "OpenAI", "Google Gemini", "Flux", "ElevenLabs", "Suno", 
  "YouTube", "Instagram", "WhatsApp", "Replicate", 
  "Next.js", "Tailwind CSS", "Stripe", "Supabase PostgreSQL"
];

export default function Marquee() {
  return (
    <div className="py-10 bg-black/40 border-y border-white/5 backdrop-blur-sm overflow-hidden flex relative z-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div 
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...technologies, ...technologies].map((tech, index) => (
          <div 
            key={`${tech}-${index}`} 
            className="text-lg md:text-xl font-bold text-white/30 hover:text-white/80 transition-colors uppercase tracking-widest cursor-default select-none"
          >
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
