import { memo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

function AppGallery() {
  return (
    <section id="showcase" className="py-24 px-4 md:px-6 container relative overflow-hidden">
      {/* Background Decor - simplified blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -z-10 rounded-full" />

      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
          Generative Power
        </h2>
        <p className="text-white/50 text-xl max-w-2xl mx-auto font-light">
          Pushing the boundaries of what's possible with next-gen AI models.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {[
          { 
            img: '/attached_assets/generated_images/generative_ai_art.png',
            title: "Flux Architecture", 
            desc: "Ultra-realistic visual asset generation for high-end branding.",
            tag: "Visuals"
          },
          { 
            type: "video",
            title: "Sora 2 Synthesis", 
            desc: "Complete cinematic narratives generated from pure text prompts.",
            tag: "Video"
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl"
          >
            <div className="aspect-16/10 overflow-hidden">
              {item.type === "video" ? (
                <div className="w-full h-full bg-linear-to-br from-zinc-900 via-purple-950 to-black flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/10">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <OptimizedImage
                  src={typeof item.img === 'string' ? item.img : '/attached_assets/generated_images/generative_ai_art.png'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80 mb-4">
                {item.tag}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/50 font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {item.desc}
              </p>
              <Button variant="link" className="text-white p-0 h-auto group/btn">
                Explorar Projeto <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-white text-black hover:scale-105 transition-transform duration-200">
          Start Your Project
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}

export default memo(AppGallery);
