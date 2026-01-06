import { motion } from "framer-motion";
import artImage from "@assets/generated_images/generative_ai_art.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function AppGallery() {
  return (
    <section id="showcase" className="py-24 px-4 md:px-6 container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Poder Generativo</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Veja o que é possível criar com as tecnologias mais avançadas como Banana Pro, Sora e Flux.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-white/10"
        >
          <img 
            src={artImage} 
            alt="AI Art Generation" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-black">
              <Play className="w-4 h-4 mr-2" />
              Ver Demo
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-xl font-bold text-white">Flux Generation</h3>
            <p className="text-sm text-white/60">Criação de assets visuais ultra-realistas</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-white/10"
        >
          {/* Placeholder for Video/Sora - using a dark gradient for now to represent video capability */}
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center">
             <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <span className="font-display font-bold text-2xl tracking-widest text-white/80">SORA 2</span>
             </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-xl font-bold text-white">Video Synthesis</h3>
            <p className="text-sm text-white/60">Narrativas visuais completas geradas por IA</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-white text-black hover:bg-white/90">
          Iniciar Projeto
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}
