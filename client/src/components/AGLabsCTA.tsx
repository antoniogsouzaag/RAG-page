import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Video, Mic } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  { icon: Palette, text: "Imagens em segundos" },
  { icon: Video, text: "Vídeos com IA" },
  { icon: Mic, text: "Áudio e Narração" },
  { icon: Zap, text: "Sem limites" },
] as const;

function AGLabsCTA() {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden bg-[#050505]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40 z-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00fff0]/10 blur-[150px] rounded-full z-0" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#7000ff]/15 blur-[120px] rounded-full z-0" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.2 : 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#00fff0]/10 border border-[#00fff0]/20 text-xs sm:text-sm font-mono text-[#00fff0] mb-6 sm:mb-8 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Acesso Gratuito Disponível</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-6 leading-tight uppercase tracking-tight">
            <span className="bg-linear-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent">
              Libere sua
            </span>
            <br />
            <span className="bg-linear-to-r from-[#ff00c1] via-[#00fff0] to-[#7000ff] bg-clip-text text-transparent">
              Criatividade
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 font-light">
            Acesse o poder de mais de 15 modelos de IA generativa. 
            Crie conteúdo profissional para suas redes sociais, marketing e muito mais.
          </p>
          
          {/* Features grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#00fff0]" />
                <span className="text-xs sm:text-sm font-medium text-white/80">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <a href="https://app.agmusic.cloud/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <RainbowButton className="h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg w-full">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                Acessar o APP Grátis
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </RainbowButton>
            </a>
            
            <a 
              href="https://wa.me/5564993259857?text=Quero%20saber%20mais%20sobre%20o%20App%20AGLabs..."
              target="_blank"
              rel="noopener noreferrer"
              className="group h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg font-medium rounded-lg border border-white/20 hover:border-[#00fff0]/50 bg-white/5 backdrop-blur-md text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,255,240,0.3)] active:scale-95 sm:hover:scale-105 flex items-center justify-center gap-2"
            >
              Falar com Especialista
            </a>
          </div>
          
          {/* Social proof */}
          <p className="mt-8 text-sm text-white/40 font-mono">
            Usado por criadores de conteúdo e empresas
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AGLabsCTA);
