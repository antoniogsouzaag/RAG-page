import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import phoneMockup from "@assets/generated_images/smartphone_app_mockup.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black">
      {/* High-End Shader Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-100">
        <ShaderGradientCanvas 
          style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            brightness={1.1}
            cAzimuthAngle={180}
            cDistance={4.01}
            cPolarAngle={115}
            cameraZoom={1}
            color1="#100f14"
            color2="#410096"
            color3="#199acd"
            embedMode="off"
            envPreset="city"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={-0.5}
            positionY={0.1}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={235}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.04}
            uStrength={1}
            uTime={0.2}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 backdrop-blur-xl mb-6 tracking-wide uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              AI Agency for the Next Era
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-8">
              <span className="block text-white">Scale with</span>
              <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">Intelligence.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-lg mb-10 font-light">
              We build autonomous agents and high-performance ecosystems that transform your business into an AI-first powerhouse.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="group relative overflow-hidden rounded-full h-16 px-10 text-lg font-bold bg-white text-black transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg border-white/10 hover:bg-white/5 text-white backdrop-blur-md transition-all hover:scale-105">
                Watch Reel
                <Play className="w-4 h-4 ml-2 fill-current" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Visual Content (Phone Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-1000 hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotateZ: [-1, 1, -1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex justify-center"
          >
            <div className="relative w-[340px] aspect-[9/19] rounded-[3.5rem] border-[12px] border-white/5 bg-zinc-950 p-2 overflow-hidden shadow-[0_0_100px_-20px_rgba(124,58,237,0.4)] backdrop-blur-3xl group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              <img 
                src={phoneMockup} 
                alt="AG LABS Interface" 
                className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            </div>

            {/* Floating Data Widgets */}
            <motion.div 
              className="absolute -left-20 top-1/3 p-5 rounded-2xl glass-card border border-white/10 flex flex-col gap-1 shadow-2xl backdrop-blur-2xl"
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Efficiency</div>
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "99.8%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
              </div>
            </motion.div>
          </motion.div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
