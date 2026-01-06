import { motion } from "framer-motion";
import ragImage from "@assets/generated_images/rag_ai_visualization.png";
import { Database, FileText, BrainCircuit, Sparkles } from "lucide-react";

export default function RAGSection() {
  return (
    <section id="rag" className="py-24 px-4 md:px-6 border-y border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-20px_rgba(124,58,237,0.3)]">
              <img src={ragImage} alt="RAG Architecture" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating tech badges */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="flex-1 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-400" />
                  <div className="text-xs">
                    <div className="font-bold text-white">Knowledge Base</div>
                    <div className="text-white/50">Vector DB</div>
                  </div>
                </div>
                <div className="flex-1 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
                  <BrainCircuit className="w-5 h-5 text-purple-400" />
                  <div className="text-xs">
                    <div className="font-bold text-white">LLM Processing</div>
                    <div className="text-white/50">Context Aware</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-6">
              <Sparkles className="w-3 h-3" />
              <span>RAG Technology</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Sua IA, Seus Dados.
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Utilizamos RAG (Retrieval-Augmented Generation) para que nossos agentes de IA leiam, compreendam e respondam com base nos documentos e dados reais da sua empresa.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Ingestão de Documentos</h4>
                  <p className="text-muted-foreground">PDFs, Planilhas, Notion, Google Drive - conectamos tudo.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Respostas Precisas</h4>
                  <p className="text-muted-foreground">Sem alucinações. A IA cita as fontes de onde tirou a informação.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
