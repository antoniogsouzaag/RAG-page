import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import WavyButton from "@/components/ui/wavy-button";
import { Button } from "@/components/ui/button";

// Define nav links outside component to avoid recreation
const navLinks = [
  { name: "Serviços", href: "#services" },
  { name: "RAG", href: "#rag" },
  { name: "IA Generativa", href: "#app-intro" },
] as const;

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Check if we're on the home page
  const isHomePage = location === "/";

  useEffect(() => {
    // Use passive listener for better scroll performance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback((href: string) => {
    if (isHomePage) {
      // If we're on home page, just scroll
      smoothScrollTo(href);
    } else {
      // If we're on another page, navigate to home with hash
      setLocation("/" + href);
    }
    setIsMobileMenuOpen(false);
  }, [isHomePage, smoothScrollTo, setLocation]);

  const scrollToTop = useCallback(() => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLocation("/");
    }
  }, [isHomePage, setLocation]);

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-2xl py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          className="text-3xl font-display font-black tracking-tight bg-linear-to-r from-white via-white to-white/40 bg-clip-text text-transparent hover:to-white transition-all cursor-pointer"
        >
          AG<span className="text-purple-500">.</span>LABS
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <a href="https://wa.me/5564993259857?text=Quero%20automatizar%20meu%20negócio" target="_blank" rel="noopener noreferrer">
            <WavyButton variant="link" className="px-6 py-2">
              Quero Automatizar
            </WavyButton>
          </a>
        </div>

        {/* Mobile Toggle */}
        {!isMobileMenuOpen && (
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            onClick={openMobileMenu}
            aria-label="Abrir menu"
          >
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          </button>
        )}
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {typeof window !== "undefined" && isMobileMenuOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-100 bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-2xl"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Close button fixed at top right */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-end px-4">
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                onClick={closeMobileMenu}
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center px-8 py-12 gap-8 mt-16"
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-display font-semibold text-white/80 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-xs mt-4"
              >
                <a 
                  href="https://wa.me/5564993259857?text=Quero%20automatizar%20meu%20negócio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-full py-6 text-lg font-bold shadow-lg shadow-purple-500/25">
                    Solicitar Orçamento
                  </Button>
                </a>
              </motion.div>
              {/* Footer in mobile menu */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/30 text-sm mt-8"
              >
                AG.LABS © 2026
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}

// Export memoized component
export default memo(Navbar);