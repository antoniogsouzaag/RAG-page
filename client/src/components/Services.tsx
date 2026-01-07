import { motion } from "framer-motion";
import { Bot, Globe, Layers, Zap, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const services = [
  {
    icon: Bot,
    title: "Agentes de IA",
    description: "Assistentes virtuais inteligentes que trabalham 24/7 para seu negócio.",
    colSpan: "lg:col-span-2",
    spotlightColor: "168, 85, 247" // Purple
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Design de alta conversão focado em performance e SEO.",
    colSpan: "lg:col-span-1",
    spotlightColor: "59, 130, 246" // Blue
  },
  {
    icon: Layers,
    title: "Sistemas & Apps",
    description: "Soluções SaaS escaláveis e aplicativos mobile nativos.",
    colSpan: "lg:col-span-1",
    spotlightColor: "236, 72, 153" // Pink
  },
  {
    icon: Zap,
    title: "Automações",
    description: "Workflows automatizados que eliminam tarefas repetitivas.",
    colSpan: "lg:col-span-2",
    spotlightColor: "245, 158, 11" // Amber
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 md:px-6 relative">
      <div className="container mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        >
          Soluções <span className="text-gradient bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Completas</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg max-w-2xl mx-auto"
        >
          Tecnologia de ponta aplicada para escalar sua operação.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={service.colSpan}
          >
            <SpotlightCard 
              spotlightColor={service.spotlightColor}
              className="group h-full backdrop-blur-2xl bg-black/50 border border-white/10 p-8 transition-all duration-500 rounded-[2.5rem] hover:scale-[1.01] hover:border-white/20"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:from-white/15 group-hover:to-white/10 transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <service.icon className="w-7 h-7 text-white transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
