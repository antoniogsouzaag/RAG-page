import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useChatbot } from "@/components/ChatbotContext";

export default function WhatsAppButton() {
  const { openChat } = useChatbot();
  
  return (
    <motion.button
      onClick={openChat}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main button - Glassmorphism */}
      <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-purple-500/30 transition-all duration-300">
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-zinc-900/80 backdrop-blur-xl text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap shadow-xl">
          Chat com IA
        </div>
      </div>
    </motion.button>
  );
}
