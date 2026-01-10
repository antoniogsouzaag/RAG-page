import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
const LightPillar = lazy(() => import("@/components/ui/light-pillar"));
const Globe = lazy(() => import("@/components/ui/globe").then((m) => ({ default: m.Globe })));
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HyperText } from "@/components/ui/hyper-text";
import { StatsCount } from "@/components/ui/stats-count";
import { useChatbot } from "@/components/ChatbotContext";

const WHATSAPP_LINK = "https://wa.me/5564993259857?text=Quero%20saber%20mais%20sobre%20o%20Agente%20RAG...";

const stats = [
  { value: 40, suffix: "h+", label: "Economizadas/mês" },
  { value: 99, suffix: "%", label: "Precisão" },
  { value: 24, suffix: "/7", label: "Disponível" },
];

export default function Hero() {
  const { openChat } = useChatbot();
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-black">
      {/* Light Pillar Background - Only on desktop for performance */}
      {!isMobile && (
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-purple-900/20 to-pink-900/20"><span className="text-white/60 animate-pulse">Carregando efeito visual...</span></div>}>
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
        </Suspense>
      )}

      {/* Mobile background fallback: use optimized static image for performance */}
      {isMobile && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/attached_assets/generated_images/optimized/dark_mesh_gradient_background.avif')" }}
        >
          {/* subtle overlay to keep contrast for text */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6"
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
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl mx-auto xl:mx-0 mb-6 sm:mb-8 px-2 sm:px-0"
            >
              Criamos funcionários digitais. Agentes que leem seus documentos e <strong className="text-white">reduzem 80% do trabalho manual</strong>. Atendimento 24/7, zero erros, escala infinita.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10 px-2 sm:px-0"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <RainbowButton className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base w-full">
                  <Sparkles className="w-4 h-4" />
                  Diagnóstico Gratuito
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </RainbowButton>
              </a>

              <button
                onClick={openChat}
                className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-lg border border-white/20 hover:border-purple-500/50 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 sm:hover:scale-105"
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
    
          {/* Right Column - Globe (desktop) */}
          <motion.div
            className="relative order-2 mt-8 xl:mt-0 hidden xl:flex items-center justify-center overflow-visible"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[1400px] aspect-square flex items-center justify-center overflow-visible translate-x-16 translate-y-48 scale-[1.5]">
              {/* Glow effect behind globe */}
              <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full scale-150" />
              <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><span className="text-white/60 animate-pulse">Carregando globo...</span></div>}>
                <Globe className="relative z-10 w-full h-full" />
              </Suspense>
            </div>
          </motion.div>

          {/* Small decorative globe for medium screens only — avoid initializing on small mobile to save CPU */}
          {!isMobile && (
            <div className="w-full flex justify-center xl:hidden order-3">
              <div className="w-70 h-70 md:w-56 md:h-56 relative">
                <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><span className="text-white/60 animate-pulse">Carregando globo...</span></div>}>
                  <Globe className="w-full h-full" />
                </Suspense>
              </div>
            </div>
          )}
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
