import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
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
              Política de <span className="text-gradient">Privacidade</span>
            </h1>
            <p className="text-white/50 mb-12">Última atualização: Janeiro de 2026</p>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">1. Introdução</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  A AG LABS está comprometida em proteger sua privacidade. Esta Política de Privacidade explica 
                  como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza 
                  nossos serviços ou visita nosso site.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">2. Informações que Coletamos</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Podemos coletar os seguintes tipos de informações:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white">Informações de Contato:</strong> Nome, email, telefone, empresa</li>
                  <li><strong className="text-white">Informações de Uso:</strong> Dados sobre como você interage com nosso site</li>
                  <li><strong className="text-white">Informações do Projeto:</strong> Dados fornecidos para execução dos serviços contratados</li>
                  <li><strong className="text-white">Dados Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">3. Como Usamos Suas Informações</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Comunicar-nos sobre projetos e atualizações</li>
                  <li>Enviar informações relevantes sobre nossos serviços (com seu consentimento)</li>
                  <li>Cumprir obrigações legais e contratuais</li>
                  <li>Analisar e melhorar a experiência do usuário em nosso site</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">4. Proteção de Dados</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                  suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. 
                  Isso inclui:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Treinamento regular da equipe sobre práticas de privacidade</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">5. Compartilhamento de Dados</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Não vendemos suas informações pessoais. Podemos compartilhar dados apenas nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Com prestadores de serviços que nos auxiliam na operação (sob acordo de confidencialidade)</li>
                  <li>Quando exigido por lei ou ordem judicial</li>
                  <li>Para proteger nossos direitos legais</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">6. Seus Direitos (LGPD)</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Confirmar a existência de tratamento de dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar anonimização, bloqueio ou eliminação de dados</li>
                  <li>Solicitar portabilidade dos dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">7. Cookies</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Nosso site pode utilizar cookies para melhorar sua experiência de navegação. 
                  Cookies são pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a 
                  entender como você usa nosso site e a personalizar sua experiência.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">8. Retenção de Dados</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos 
                  descritos nesta política, a menos que um período de retenção mais longo seja exigido por lei.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">9. Alterações nesta Política</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                  alterações significativas publicando a nova política em nosso site com a data de atualização.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-white">10. Contato</h2>
                <p className="text-white/70 leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                  entre em contato conosco através do WhatsApp ou email disponibilizados em nosso site.
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
