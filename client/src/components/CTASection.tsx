import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Shield, Zap } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useChatbot } from "@/components/Chatbot";

const WHATSAPP_LINK = "https://wa.me/5564993259857?text=Quero%20saber%20mais%20sobre%20o%20Agente%20RAG...";

export default function CTASection() {
  const { openChat } = useChatbot();
  
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* FlickeringGrid Background */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent_0%,white_15%,white_85%,transparent_100%)]"
          squareSize={4}
          gridGap={6}
          color="#A855F7"
          maxOpacity={0.3}
          flickerChance={0.1}
        />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40 z-[1]" />
      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30 z-[1]" />
      <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[150px] rounded-full z-0" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Vagas Limitadas para Janeiro 2026</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Pronto para{" "}
            <span className="text-gradient">Escalar</span>
            <br />
            seu Negócio com IA?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Agende uma consultoria gratuita de 30 minutos e descubra como podemos automatizar 80% das tarefas repetitivas do seu negócio.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: Clock, text: "Resposta em 24h" },
              { icon: Shield, text: "Dados 100% Seguros" },
              { icon: Zap, text: "Implementação Rápida" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 text-white/60"
              >
                <item.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <RainbowButton className="h-16 px-10 text-lg w-full sm:w-auto">
                <Sparkles className="w-5 h-5" />
                Agendar Diagnóstico Gratuito
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </RainbowButton>
            </a>
            
            <button 
              onClick={openChat}
              className="group h-16 px-10 text-lg font-medium rounded-lg border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white transition-all hover:bg-white/10"
            >
              Teste a Eficiência Agora
            </button>
          </motion.div>
          
          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-white/40"
          >
            +50 empresas já economizam tempo e dinheiro com nossas soluções
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
