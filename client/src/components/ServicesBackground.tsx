import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ServicesBackground({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[360px] h-[360px] bg-linear-to-br from-purple-500/12 via-violet-500/06 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-[420px] h-[420px] bg-linear-to-br from-blue-500/10 via-cyan-500/06 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-linear-to-br from-pink-500/06 via-purple-500/03 to-transparent rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-linear-to-br from-purple-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.18, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-linear-to-br from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"
      />

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
}
