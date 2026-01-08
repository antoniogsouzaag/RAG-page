import { Sparkles } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

export default function AppShowcaseIntro() {
  return (
    <div className="w-full overflow-hidden bg-black relative">
      {/* Sparkles effect section */}
      <div className="relative h-80 w-full overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#9333ea,transparent_90%)] before:opacity-100 after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#a855f766] after:bg-zinc-900">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-size-[70px_80px]" />
        <Sparkles
          density={400}
          size={1.4}
          direction="top"
          color="#c084fc"
          className="absolute inset-x-0 top-0 h-full w-full mask-[radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
      
      {/* Logo/Icon */}
      <div className="mx-auto -mt-52 w-full max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-28 h-28 mx-auto grid place-content-center rounded-full bg-black/50 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_60px_-10px_rgba(147,51,234,0.5)]"
        >
          <img 
            src="/favicon.png" 
            alt="AG Labs Logo" 
            className="w-16 h-16 object-contain"
          />
        </motion.div>
      </div>
      
      {/* Text Content */}
      <article className="text-white pt-2 w-11/12 md:w-2/3 mx-auto block text-center z-10 relative pb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
          className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black py-3 tracking-tighter"
        >
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-linear-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent blur-2xl opacity-50">
              APP AG LABS
            </span>
            <span className="relative bg-linear-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              APP AG LABS
            </span>
          </span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mt-4 mb-4"
        >
          Poder <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Generativo</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Criamos imagens, vídeos e conteúdo com modelos de IA como Flux, Nano Banana Pro, Sora e muito mais.
        </motion.p>
      </article>
    </div>
  );
}
