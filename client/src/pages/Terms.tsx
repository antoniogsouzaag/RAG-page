import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  // Scroll ao topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Termos de <span className="text-gradient">Uso</span>
            </h1>
            <p className="text-white/50 mb-12">Última atualização: Janeiro de 2026</p>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">1. Aceitação dos Termos</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Ao acessar e utilizar os serviços da AG LABS, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">2. Descrição dos Serviços</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  A AG LABS oferece serviços de desenvolvimento de soluções em Inteligência Artificial, incluindo:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Desenvolvimento de Agentes de IA e Chatbots</li>
                  <li>Automação de processos empresariais</li>
                  <li>Criação de websites e aplicativos</li>
                  <li>Implementação de sistemas RAG (Retrieval-Augmented Generation)</li>
                  <li>Consultoria em Inteligência Artificial</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">3. Uso Aceitável</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Você concorda em utilizar nossos serviços apenas para fins legais e de acordo com estes Termos. 
                  Você não deve:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Utilizar os serviços para qualquer finalidade ilegal ou não autorizada</li>
                  <li>Violar quaisquer leis aplicáveis em sua jurisdição</li>
                  <li>Tentar interferir ou comprometer a integridade dos nossos sistemas</li>
                  <li>Reproduzir, duplicar ou revender qualquer parte dos serviços sem autorização</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">4. Propriedade Intelectual</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Todo o conteúdo, código-fonte, designs e materiais desenvolvidos pela AG LABS são de propriedade 
                  exclusiva da empresa ou de seus licenciadores. Após a conclusão e pagamento integral do projeto, 
                  os direitos de uso do produto final serão transferidos ao cliente conforme acordado em contrato.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">5. Pagamentos e Reembolsos</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Os termos de pagamento são definidos individualmente para cada projeto e formalizados em contrato específico. 
                  Políticas de reembolso serão aplicadas conforme o contrato de prestação de serviços assinado entre as partes.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">6. Limitação de Responsabilidade</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  A AG LABS não será responsável por danos indiretos, incidentais, especiais ou consequenciais 
                  resultantes do uso ou impossibilidade de uso dos serviços, exceto quando expressamente previsto em contrato.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">7. Modificações dos Termos</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  As modificações entrarão em vigor imediatamente após sua publicação nesta página.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">8. Contato</h2>
                <p className="text-white/70 leading-relaxed">
                  Para questões relacionadas a estes Termos de Uso, entre em contato conosco através do WhatsApp 
                  ou email disponibilizados em nosso site.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
