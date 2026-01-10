import { useEffect, Suspense, lazy, memo } from "react";
import { useLocation } from "wouter";

// Critical above-fold components loaded synchronously
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Below-fold components lazy loaded for better initial performance
const Marquee = lazy(() => import("@/components/Marquee"));
const Services = lazy(() => import("@/components/Services"));
const RAGSectionNew = lazy(() => import("@/components/RAGSectionNew"));
const AppIntroTransition = lazy(() => import("@/components/AppIntroTransition"));
const AppShowcaseIntro = lazy(() => import("@/components/AppShowcaseIntro"));
const AppGalleryNew = lazy(() => import("@/components/AppGalleryNew"));
const CTASection = lazy(() => import("@/components/CTASection"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const Footer = lazy(() => import("@/components/Footer"));

// Minimal loading spinner component
const LoadingSpinner = memo(() => (
  <div className="h-32 flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500" />
  </div>
));
LoadingSpinner.displayName = "LoadingSpinner";

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
        <Suspense fallback={<LoadingSpinner />}>
          <Marquee />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <RAGSectionNew />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <CTASection />
        </Suspense>
        {/* Generous spacing before app showcase */}
        <div className="h-24 md:h-32 lg:h-40" />
        <Suspense fallback={<LoadingSpinner />}>
          <AppIntroTransition />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AppShowcaseIntro />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AppGalleryNew />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
