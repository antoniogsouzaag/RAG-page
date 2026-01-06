import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@assets/generated_images/dark_mesh_gradient_background.png";
import hero3D from "@assets/generated_images/abstract_3d_glass_shape.png";
import phoneMockup from "@assets/generated_images/smartphone_app_mockup.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#020202]">
      {/* Modern Animated Gradient Background (ShaderGradient Style) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -left-[10%] w-[140%] h-[140%] opacity-40 blur-[120px]"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, #4f46e5 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 40%),
              radial-gradient(circle at 50% 80%, #2563eb 0%, transparent 50%),
              radial-gradient(circle at 10% 90%, #9333ea 0%, transparent 40%)
            `
          }}
        />
      </div>
      
      {/* Floating 3D Elements (Background) */}
      <motion.img 
        src={hero3D}
        alt="Abstract 3D Shape"
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] opacity-30 blur-3xl z-0 pointer-events-none mix-blend-overlay"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />

      <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary-foreground mb-4">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Inovação em Inteligência Artificial</span>
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent mb-6">
              O Futuro da Sua Empresa Começa Agora
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed md:max-w-lg mb-8">
              Transformamos dores operacionais em crescimento escalável com Agentes de IA, Automação e Design de alta conversão.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all duration-300 group">
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/10 hover:bg-white/5 text-white backdrop-blur-sm">
                Nossos Serviços
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Visual Content (Phone Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[800px] flex items-center justify-center"
        >
          <motion.div
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10"
          >
            <div className="relative w-[300px] md:w-[350px] aspect-[9/19] rounded-[3rem] border-8 border-white/10 bg-black overflow-hidden shadow-2xl backdrop-blur-sm">
               <img 
                src={phoneMockup} 
                alt="AG LABS App" 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Overlay Glint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating Cards around phone */}
            <motion.div 
              className="absolute -left-12 top-1/4 p-4 rounded-xl glass-card border border-white/10 flex items-center gap-3 shadow-xl"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-white/60">Conversão</div>
                <div className="text-sm font-bold text-white">+145%</div>
              </div>
            </motion.div>

             <motion.div 
              className="absolute -right-8 bottom-1/3 p-4 rounded-xl glass-card border border-white/10 flex items-center gap-3 shadow-xl"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div>
                <div className="text-xs text-white/60">Status</div>
                <div className="text-sm font-bold text-white">Online</div>
              </div>
            </motion.div>

          </motion.div>
          
          {/* Background Glow behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
