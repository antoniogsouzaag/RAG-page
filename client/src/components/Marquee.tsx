import { motion } from "framer-motion";
import { SiOpenai, SiGooglecloud, SiWhatsapp, SiInstagram, SiYoutube, SiStripe, SiSupabase, SiPostgresql, SiNextdotjs, SiTailwindcss, SiReact, SiNodedotjs, SiTypescript, SiDocker } from "react-icons/si";

const models = [
  { name: "OpenAI", icon: SiOpenai },
  { name: "Gemini", icon: SiGooglecloud },
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

export default function Marquee() {
  return (
    <div className="py-16 bg-black border-y border-white/5 relative z-20 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div 
        className="flex gap-20 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {[...models, ...models, ...models].map((model, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 text-2xl font-display font-medium text-white/20 hover:text-white/80 transition-all duration-500 grayscale hover:grayscale-0 cursor-default"
          >
            <model.icon className="w-8 h-8 opacity-50" />
            <span className="tracking-tighter">{model.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
