import { memo } from "react";
import TextAnimation from "@/components/ui/scroll-text";
import { motion } from "motion/react";

function AppIntroTransition() {
  return (
    <section id="app-intro" className="relative bg-black overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-purple-950/10 to-black pointer-events-none" />
      
      {/* Spacer section - large spacing before animation */}
      <div className="h-[40vh] grid place-content-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-purple-400/90 text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[0.25em] text-center drop-shadow-md"
        >
          Economize mais tempo ainda 
        </motion.p>
      </div>
      
      {/* Main animated text section - center with blur effect */}
      <div className="h-[80vh] flex flex-col justify-center items-center text-center px-4 relative z-10">
        <TextAnimation
          text="Crie criativos, artes, vídeos e narração em segundos!"
          classname="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl mx-auto font-display font-bold text-white leading-tight normal-case tracking-tight"
          viewport={{ amount: 0.3, once: true }}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, translateY: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              translateY: 0,
              transition: { ease: 'linear' },
            },
          }}
        />
      </div>
      
      {/* Left side animated text - slides from left */}
      <div className="h-[80vh] flex items-center text-left px-4 md:px-12 relative z-10">
        <TextAnimation
          text="Tenha o poder da Inteligência artificial no seu bolso"
          direction="left"
          classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl font-semibold text-white normal-case"
          viewport={{ amount: 0.3, once: true }}
        />
      </div>
      
      {/* Right side animated text - slides from right */}
      <div className="h-[80vh] flex items-center justify-end text-right px-4 md:px-12 relative z-10">
        <TextAnimation
          text="Transforme ideias em realidade"
          direction="right"
          classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl ml-auto font-semibold text-white normal-case"
          viewport={{ amount: 0.3, once: true }}
        />
      </div>
      
      {/* Letter animation section - center */}
      <div className="h-[80vh] flex flex-col justify-center items-center text-center px-4 relative z-10">
        <TextAnimation
          as="p"
          text="Conheça o nosso APP"
          letterAnime={true}
          classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto font-semibold text-white normal-case"
          viewport={{ amount: 0.3, once: true }}
          variants={{
            hidden: { filter: 'blur(4px)', opacity: 0, translateY: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              translateY: 0,
              transition: {
                duration: 0.2,
              },
            },
          }}
        />
        
        {/* Animated arrow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-purple-500/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-12 md:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AppIntroTransition);
