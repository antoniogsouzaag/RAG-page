import { Suspense, lazy, memo, useEffect } from "react";
import { useLocation } from "wouter";
import { useSeo } from "@/hooks/use-seo";

// Critical above-fold component
import AGLabsHero from "@/components/AGLabsHero";

// Lazy loaded components
const AGLabsMarquee = lazy(() => import("@/components/AGLabsMarquee"));
const AppIntroTransition = lazy(() => import("@/components/AppIntroTransition"));
const AppShowcaseIntro = lazy(() => import("@/components/AppShowcaseIntro"));
const AppGalleryNew = lazy(() => import("@/components/AppGalleryNew"));
const AGLabsCTA = lazy(() => import("@/components/AGLabsCTA"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading placeholder
const SectionPlaceholder = memo(({ height = "h-32" }: { height?: string }) => (
  <div className={height} />
));
SectionPlaceholder.displayName = "SectionPlaceholder";

export default function AGLabsApp() {
  const [location] = useLocation();

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Per-route SEO (title/description/canonical/og). Navigating away restores the
  // home values because Home calls useSeo too.
  useSeo({
    title:
      "APP AGLabs - IA Generativa | Crie Imagens, Vídeos e Áudio com Inteligência Artificial",
    description:
      "APP AGLabs - Crie imagens, vídeos, áudios e conteúdo com mais de 15 modelos de IA generativa. Flux, DALL-E, Sora, ElevenLabs e muito mais. O poder da IA no seu bolso.",
    path: "/app",
  });

  return (
    <div className="min-h-screen bg-[#050505] text-foreground overflow-x-hidden selection:bg-[#00fff0]/30 relative">
      <div className="bg-noise" />
      <main>
        <AGLabsHero />
        <Suspense fallback={<SectionPlaceholder height="h-24" />}>
          <AGLabsMarquee />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder height="h-[300vh]" />}>
          <AppIntroTransition />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder height="h-64" />}>
          <AppShowcaseIntro />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder height="h-96" />}>
          <AppGalleryNew />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder height="h-64" />}>
          <AGLabsCTA />
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
