import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Masonry from "@/components/ui/masonry";
import { PixelHighlight } from "@/components/ui/pixel-highlight";

// Placeholder images - update paths later
const galleryItems = [
  { id: 1, img: "/app1.png", height: 400 },
  { id: 2, img: "/app2.png", height: 320 },
  { id: 3, img: "/app3.png", height: 480 },
  { id: 4, img: "/app4.png", height: 360 },
  { id: 5, img: "/app5.png", height: 420 },
  { id: 6, img: "/app6.png", height: 340 },
  { id: 7, img: "/app7.png", height: 400 },
  { id: 8, img: "/app8.png", height: 360 },
  { id: 9, img: "/app9.png", height: 440 },
  { id: 10, img: "/app10.png", height: 380 },
  { id: 11, img: "/app11.png", height: 420 },
  { id: 12, img: "/app12.png", height: 360 },
  { id: 13, img: "/app13.png", height: 400 },
  { id: 14, img: "/app14.png", height: 320 },
  { id: 15, img: "/app15.png", height: 380 },
];

export default function AppGallery() {
  return (
    <section id="showcase" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm font-medium text-pink-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>IA Generativa</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight"
          >
            Poder <span className="text-gradient">Generativo</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto mb-8"
          >
            Criamos imagens, vídeos e conteúdo com modelos de IA como Flux, Nano Banana Pro, Sora e muito mais.
          </motion.p>
          
          {/* APP AG LABS Title with PixelHighlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center mb-12"
          >
            <PixelHighlight
              text="APP AG LABS"
              colors="#8A6A18, #BB8A2C, #E3C770"
              direction="top"
              speed={70}
              gap={5}
              fontSize={12}
              className="w-full h-32"
            />
          </motion.div>
        </div>

        {/* Masonry Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Masonry 
            items={galleryItems}
            animateFrom="bottom"
            stagger={0.03}
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
          
          {/* Bottom gradient fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
