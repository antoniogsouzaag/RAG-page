import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
const RAGSectionNew = lazy(() => import("@/components/RAGSectionNew"));
const AppIntroTransition = lazy(() => import("@/components/AppIntroTransition"));
const AppShowcaseIntro = lazy(() => import("@/components/AppShowcaseIntro"));
const AppGalleryNew = lazy(() => import("@/components/AppGalleryNew"));
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  const [location] = useLocation();

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-purple-500/30 relative">
      <div className="bg-noise" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>}>
          <RAGSectionNew />
        </Suspense>
        <CTASection />
        {/* Generous spacing before app showcase */}
        <div className="h-24 md:h-32 lg:h-40" />
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>}>
          <AppIntroTransition />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>}>
          <AppShowcaseIntro />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>}>
          <AppGalleryNew />
        </Suspense>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
