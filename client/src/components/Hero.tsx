import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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

export default function Hero() {
  const { openChat } = useChatbot();
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Light Pillar Background */}
      <div className="absolute inset-0 z-0">
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

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid xl:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Left Column - Content (shows first on mobile) */}
          <div className="order-1 xl:order-1 text-center xl:text-left xl:-ml-1 2xl:-ml-36">
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
              <span className="text-gradient">
                <HyperText>Agentes de IA</HyperText>
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
                className="group h-14 px-8 text-base font-medium rounded-lg border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10"
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

          {/* Right Column - Globe (shows second on mobile, escapes to right/bottom on desktop) */}
          <motion.div
            className="order-2 xl:order-2 relative mt-8 xl:mt-0 xl:translate-x-42 xl:translate-y-68 xl:-mr-38 hidden xl:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md mx-auto xl:max-w-4xl xl:ml-auto">
              {/* Glow effect behind globe */}
              <div className="absolute inset-0 bg-purple-500/10 blur-[200px] rounded-full" />
              <Globe className="relative z-10 scale-100 xl:scale-[2.0]" />
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
