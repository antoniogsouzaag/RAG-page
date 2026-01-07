import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, Globe as GlobeIcon, Zap, Layers, Brain, Cpu, Database, Code2, Workflow } from "lucide-react";
import LightPillar from "@/components/ui/light-pillar";
import { Globe } from "@/components/ui/globe";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HyperText } from "@/components/ui/hyper-text";
import { StatsCount } from "@/components/ui/stats-count";
import { useChatbot } from "@/components/Chatbot";

const WHATSAPP_LINK = "https://wa.me/5564993259857?text=Quero%20saber%20mais%20sobre%20o%20Agente%20RAG...";

const stats = [
  { value: 40, suffix: "h+", label: "Economizadas/mês" },
  { value: 99, suffix: "%", label: "Precisão" },
  { value: 24, suffix: "/7", label: "Disponível" },
];

// Floating glass icons configuration - concentrated on the right side
const floatingIcons = [
  { Icon: Bot, size: 60, top: "25%", right: "15%", delay: 0, iconColor: "text-purple-400", opacity: 1 },
  { Icon: Brain, size: 48, top: "45%", right: "22%", delay: 0.3, iconColor: "text-pink-400", opacity: 0.9 },
  { Icon: Zap, size: 40, top: "65%", right: "13%", delay: 0.6, iconColor: "text-amber-400", opacity: 1 },
  { Icon: Code2, size: 52, top: "18%", right: "28%", delay: 0.9, iconColor: "text-cyan-400", opacity: 0.6 },
  { Icon: Database, size: 36, top: "80%", right: "20%", delay: 1.2, iconColor: "text-blue-400", opacity: 0.7 },
  { Icon: Cpu, size: 44, top: "55%", right: "32%", delay: 0.4, iconColor: "text-violet-400", opacity: 0.5 },
  { Icon: Workflow, size: 42, top: "35%", right: "38%", delay: 0.7, iconColor: "text-orange-400", opacity: 0.4 },
  { Icon: Layers, size: 38, top: "70%", right: "35%", delay: 1, iconColor: "text-rose-400", opacity: 0.6 },
];

export default function Hero() {
  const { openChat } = useChatbot();
  
  return (
    <section className="relative h-screen flex items-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Floating Glass Icons */}
      <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        {floatingIcons.map(({ Icon, size, top, right, delay, iconColor, opacity }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: opacity, scale: 1, y: 0 }}
            transition={{ 
              delay: 0.5 + delay, 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
            style={{
              position: 'absolute',
              top,
              right,
              width: size,
              height: size,
            }}
            className="hidden md:flex"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 4 + idx * 0.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full rounded-2xl bg-white/[0.08] backdrop-blur-lg border border-white/[0.15] flex items-center justify-center shadow-xl"
            >
              <Icon className={`w-1/2 h-1/2 ${iconColor}`} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Light Pillar Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <LightPillar
          topColor="#2d1f6b"
          bottomColor="#4a3259"
          intensity={0.5}
          rotationSpeed={0.1}
          glowAmount={0.01}
          pillarWidth={6.0}
          pillarHeight={0.25}
          noiseIntensity={0.5}
          mixBlendMode="screen"
          pillarRotation={55}
        />
      </div>

      <div className="relative z-10 px-4 md:px-6 mx-auto max-w-none w-full h-full flex items-center overflow-visible">
        <div className="grid w-full xl:grid-cols-2 gap-8 xl:gap-12 items-center overflow-visible">
          {/* Left Column - Content (shows first on mobile) */}
          <div className="relative order-1 text-center xl:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-xl mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Agência de IA em Rio Verde
            </motion.div>

            {/* Main Headline - SEO optimized with HyperText effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-white">Automatize seu negócio com</span>
              <br />
              <span className="bg-linear-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                <HyperText>AGENTES DE IA</HyperText>
              </span>
            </motion.h1>

            {/* Subtitle - Improved copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl mx-auto xl:mx-0 mb-8"
            >
              Criamos funcionários digitais. Agentes que leem seus documentos e <strong className="text-white">reduzem 80% do trabalho manual</strong>. Atendimento 24/7, zero erros, escala infinita.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <RainbowButton className="h-14 px-8 text-base w-full sm:w-auto">
                  <Sparkles className="w-4 h-4" />
                  Diagnóstico Gratuito
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </RainbowButton>
              </a>

              <button
                onClick={openChat}
                className="group h-14 px-8 text-base font-medium rounded-lg border border-white/20 hover:border-purple-500/50 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105"
              >
                Teste a Eficiência Agora
              </button>
            </motion.div>

            {/* Stats with animated counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <StatsCount stats={stats} showDividers={true} />
            </motion.div>
          </div>
    
          {/* Right Column - Globe (shows second on mobile) */}
          <motion.div
            className="relative order-2 mt-8 xl:mt-0 hidden xl:flex items-center justify-center overflow-visible"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[1400px] aspect-square flex items-center justify-center overflow-visible translate-x-16 translate-y-48 scale-[1.5]">
              {/* Glow effect behind globe */}
              <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full scale-150" />
              <Globe className="relative z-10 w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1 h-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
