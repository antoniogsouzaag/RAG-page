import { motion } from "framer-motion";
import { Bot, Globe, Layers, Zap, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Bot,
    title: "Agentes de IA",
    description: "Assistentes virtuais inteligentes que trabalham 24/7 para seu negócio.",
    colSpan: "lg:col-span-2",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Design de alta conversão focado em performance e SEO.",
    colSpan: "lg:col-span-1",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Layers,
    title: "Sistemas & Apps",
    description: "Soluções SaaS escaláveis e aplicativos mobile nativos.",
    colSpan: "lg:col-span-1",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: Zap,
    title: "Automações",
    description: "Workflows automatizados que eliminam tarefas repetitivas.",
    colSpan: "lg:col-span-2",
    gradient: "from-amber-500/20 to-orange-500/20"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 md:px-6 container relative">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Soluções Completas</h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Tecnologia de ponta aplicada para escalar sua operação.
        </p>
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
            <Card className="h-full bg-zinc-950/40 border-white/5 backdrop-blur-2xl p-8 hover:border-purple-500/30 transition-all duration-700 group relative overflow-hidden rounded-[2.5rem] hover:scale-[1.02]">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
