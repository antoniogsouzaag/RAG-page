import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useIsMobile } from "@/hooks/use-mobile";

function AGLabsHero() {
  const isMobile = useIsMobile();
  const latticeRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse follower and parallax effect
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor follower
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Parallax effect on shards
      if (latticeRef.current) {
        const shards = latticeRef.current.querySelectorAll('.hex-shard');
        shards.forEach((shard, index) => {
          const speed = (index + 1) * 0.02;
          const x = (window.innerWidth - e.pageX * speed) / 20;
          const y = (window.innerHeight - e.pageY * speed) / 20;
          (shard as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Generate shard elements
  const shards = Array.from({ length: 12 }, (_, i) => {
    const size = Math.random() * 100 + 50;
    return {
      id: i,
      size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 360,
      animationDuration: `${Math.random() * 10 + 10}s`,
    };
  });

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Prismatic Lattice Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
        }}
      />

      {/* Prism Flare */}
      <div 
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] -translate-x-1/2 -translate-y-1/2 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7000ff 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.15,
          animation: 'pulse 8s infinite alternate',
        }}
      />

      {/* Cursor Follower - Desktop only */}
      {!isMobile && (
        <div 
          ref={cursorRef}
          className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.1) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 sm:top-10 left-[8vw] right-[8vw] flex justify-between items-center font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase z-20"
      >
        <div className="text-white/80">AGLABS // IA</div>
        <div className="hidden sm:block text-white/50">CORE_SYSTEM: ACTIVE</div>
        <a href="/" className="text-white/50 hover:text-white transition-colors">VOLTAR</a>
      </motion.header>

      {/* Hero Content */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center px-[8vw] pt-20 sm:pt-0">
        <div className="max-w-[1200px]">
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2.5 font-mono text-sm text-[#00fff0] mb-5"
          >
            <span className="w-10 h-px bg-current" />
            <span>NEURAL GENERATIVE ENGINE</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] uppercase tracking-[-0.04em] mb-10"
          >
            <span className="block bg-linear-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent">
              APP
            </span>
            <div className="flex items-baseline gap-5">
              <span className="bg-linear-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent">
                AGLABS
              </span>
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="opacity-50 hidden sm:block">
                <polygon points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25" stroke="white" strokeWidth="1"/>
                <path d="M50 5 L50 95 M5 25 L95 75 M5 75 L95 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
              </svg>
            </div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-white/60 max-w-xl mb-8 font-light leading-relaxed"
          >
            Crie imagens, vídeos, áudios e conteúdo com modelos de IA de última geração. 
            O poder da inteligência artificial generativa no seu bolso.
          </motion.p>

          {/* Data Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 max-w-lg mb-12"
          >
            <div className="font-mono">
              <div className="text-[10px] uppercase text-white/40 mb-2 tracking-wider">Modelos IA</div>
              <div className="text-lg text-[#cbd5e1]">15+ APIs</div>
            </div>
            <div className="font-mono">
              <div className="text-[10px] uppercase text-white/40 mb-2 tracking-wider">Tempo de Resposta</div>
              <div className="text-lg text-[#cbd5e1]">&lt; 3 SEG</div>
            </div>
            <div className="font-mono">
              <div className="text-[10px] uppercase text-white/40 mb-2 tracking-wider">Gerações</div>
              <div className="text-lg text-[#cbd5e1]">∞ ILIMITADO</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="https://app.agmusic.cloud/" target="_blank" rel="noopener noreferrer">
              <RainbowButton className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg w-full sm:w-auto">
                <Sparkles className="w-5 h-5" />
                Começar a Criar
                <ArrowRight className="w-5 h-5" />
              </RainbowButton>
            </a>
            <a 
              href="#showcase" 
              className="group h-14 sm:h-16 px-8 sm:px-10 text-sm sm:text-base font-medium rounded-lg flex items-center justify-center gap-2 border border-white/20 text-white backdrop-blur-sm hover:bg-white/10 hover:border-[#00fff0]/50 transition-all duration-300"
            >
              Ver Galeria
            </a>
          </motion.div>
        </div>
      </main>

      {/* Floating Prismatic Shards - Desktop only */}
      {!isMobile && (
        <div 
          ref={latticeRef}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-80 pointer-events-none hidden lg:block"
        >
          {shards.map((shard) => (
            <div
              key={shard.id}
              className="hex-shard absolute border border-white/20 bg-white/3 backdrop-blur-[10px] transition-all duration-600"
              style={{
                width: `${shard.size}px`,
                height: `${shard.size}px`,
                left: shard.left,
                top: shard.top,
                opacity: shard.opacity,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                borderLeft: `1px solid hsla(${shard.hue}, 70%, 70%, 0.3)`,
                animation: `float ${shard.animationDuration} infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      )}

      {/* Keyframes style */}
      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.25; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}

export default memo(AGLabsHero);
