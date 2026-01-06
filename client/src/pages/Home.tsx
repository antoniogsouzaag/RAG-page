import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import RAGSection from "@/components/RAGSection";
import AppGallery from "@/components/AppGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-purple-500/30">
      <div className="bg-noise" />
      
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <Services />
        <RAGSection />
        <AppGallery />
      </main>

      <Footer />
    </div>
  );
}
